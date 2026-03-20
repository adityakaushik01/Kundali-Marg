// hooks/useAuth.js
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";

const TOKEN_KEY = "token";

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const decoded = token ? decodeToken(token) : null;
    if (decoded) {
      setUser(decoded);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((token) => {
    const decoded = decodeToken(token);
    if (!decoded) return false;
    localStorage.setItem(TOKEN_KEY, token);
    setUser(decoded);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const getToken = useCallback(() => localStorage.getItem(TOKEN_KEY), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        role: user?.user_role || null,
        name: user
          ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
          : "",
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};

export default useAuth;
