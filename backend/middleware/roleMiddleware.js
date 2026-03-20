export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.user_role) {
        return res.status(403).json({
          message: "Access denied. No role found"
        });
      }

      if (!allowedRoles.includes(req.user.user_role)) {
        return res.status(403).json({
          message: "Access forbidden: insufficient permissions"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Role authorization error"
      });
    }
  };
};