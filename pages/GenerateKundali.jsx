import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Stars from "../components/Stars";
import DecorativeElement from "../components/DecorativeElement";
import BottomDecorativeElement from "../components/BottomDecorativeElement";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';



const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f59e0b",
    },
    background: {
      default: "#1f2937",
      paper: "rgba(255, 255, 255, 0.1)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "0.5rem",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f59e0b",
              },
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f59e0b",
                borderWidth: "2px",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-focused": {
              color: "#f59e0b",
            },
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
            cursor: "pointer",
          },
          "& .MuiSvgIcon-root": {
            color: "#f59e0b",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(31, 41, 55, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.2)",
          },
          "&.Mui-selected": {
            backgroundColor: "#f59e0b",
            "&:hover": {
              backgroundColor: "#d97706",
            },
          },
        },
      },
    },
    MuiClock: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(31, 41, 55, 0.9)",
          borderRadius: "50%",
        },
        clock: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "2px solid rgba(245, 158, 11, 0.3)",
        },
        pin: {
          backgroundColor: "#f59e0b",
          boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)",
        },
        amButton: {
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          color: "#ffffff",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          "&.Mui-selected": {
            backgroundColor: "#f59e0b",
            color: "#000000",
            fontWeight: "bold",
          },
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.2)",
          },
        },
        pmButton: {
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          color: "#ffffff",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          "&.Mui-selected": {
            backgroundColor: "#f59e0b",
            color: "#000000",
            fontWeight: "bold",
          },
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.2)",
          },
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          fontSize: "1.1rem",
          fontWeight: "500",
          "&.Mui-selected": {
            backgroundColor: "#f59e0b",
            color: "#000000",
            fontWeight: "bold",
            transform: "scale(1.1)",
            boxShadow: "0 0 15px rgba(245, 158, 11, 0.6)",
          },
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiClockPointer: {
      styleOverrides: {
        root: {
          backgroundColor: "#f59e0b",
          boxShadow: "0 0 8px rgba(245, 158, 11, 0.4)",
        },
        thumb: {
          backgroundColor: "#f59e0b",
          borderColor: "#f59e0b",
          boxShadow: "0 0 15px rgba(245, 158, 11, 0.6)",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
        switchViewButton: {
          color: "#f59e0b",
        },
        iconButton: {
          color: "#f59e0b",
        },
      },
    },
    MuiTimeClock: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(31, 41, 55, 0.95)",
          padding: "24px",
          backdropFilter: "blur(20px)",
        },
        arrowSwitcher: {
          "& .MuiIconButton-root": {
            color: "#f59e0b",
            "&:hover": {
              backgroundColor: "rgba(245, 158, 11, 0.1)",
            },
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          "& .MuiButton-root": {
            color: "#f59e0b",
            "&:hover": {
              backgroundColor: "rgba(245, 158, 11, 0.1)",
            },
          },
        },
      },
    },
  },
});

const GenerateKundali = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: dayjs(),
    birthTime: dayjs(),
    address: "",
    latitude: null,
    longitude: null,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [kundaliData, setKundaliData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (value) => {
    handleChange("address", value);
    if (value.length < 3) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: suggestion.display_name,
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    }));
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const combinedDateTime = formData.birthDate
      .hour(formData.birthTime.hour())
      .minute(formData.birthTime.minute());

    try {
      // 🔑 Step 1: Get token from your backend
      const tokenResponse = await fetch("http://localhost:5000/api/token", {
        method: "POST",
      });
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const kundaliDataInput = JSON.stringify({
    datetime: combinedDateTime.toISOString(),
    latitude: formData.latitude,
    longitude: formData.longitude,
    accessToken: accessToken,
  })

  console.log("kundaliDataInput", kundaliDataInput);

      // ⚡ Step 2: Call Prokerala API using the access token
      const response = await fetch('http://localhost:5000/api/kundli', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: kundaliDataInput,
});

      const data = await response.json();
      console.log("data", data);
      setKundaliData(data);
      navigate('/ShowKundali', { state: { kundaliData: data } });
    } catch (error) {
      console.error("Error generating kundali:", error);
    }

    setLoading(false);
  };

  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 text-white overflow-hidden">
      <Stars />
      <DecorativeElement />
      <BottomDecorativeElement />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Generate Your Janam Kundali
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the cosmic blueprint of your life through ancient Vedic
            astrology
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-10 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20"
        >
          <div className="mb-6">
            <label className="block text-lg font-medium mb-3 text-amber-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-4 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30"
              placeholder="Enter your full name"
              required
            />
          </div>

          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-medium mb-3 text-amber-300">
                    Date of Birth
                  </label>
                  <DatePicker
                    value={formData.birthDate}
                    onChange={(newValue) => {
                      handleChange("birthDate", newValue);
                    }}
                    open={openDate}
                    onClose={() => setOpenDate(false)}
                    onOpen={() => setOpenDate(true)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        placeholder: "Select date",
                        onClick: () => setOpenDate(true), // open on click
                        InputProps: {
                          style: { fontSize: "16px", cursor: "pointer" },
                          readOnly: true, // to prevent typing
                        },
                      },
                    }}
                    format="DD/MM/YYYY"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3 text-amber-300">
                    Time of Birth
                  </label>
                  <TimePicker
                    value={formData.birthTime}
                    onChange={(newValue) => {
                      handleChange("birthTime", newValue);
                    }}
                    open={openTime}
                    onClose={() => setOpenTime(false)}
                    onOpen={() => setOpenTime(true)}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    views={["hours", "minutes"]}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        placeholder: "Select time",
                        onClick: () => setOpenTime(true), // open on click
                        InputProps: {
                          style: { fontSize: "16px", cursor: "pointer" },
                          readOnly: true,
                        },
                      },
                    }}
                    format="hh:mm A"
                    ampm
                  />
                </div>
              </div>
            </LocalizationProvider>
          </ThemeProvider>

          <div className="mb-8">
            <label className="block text-lg font-medium mb-3 text-amber-300">
              Place of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for your birth place..."
                className="w-full p-4 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50 border border-amber-400/30">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectSuggestion(item)}
                      className="p-4 hover:bg-amber-500/20 cursor-pointer text-white border-b border-white/10 last:border-b-0 transition-colors duration-200"
                    >
                      <div className="font-medium">{item.display_name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                Generating Your Kundali...
              </div>
            ) : (
              "Generate Kundali ✨"
            )}
          </button>
        </form>

        {kundaliData && (
          <div className="mt-16 bg-white/10 p-10 rounded-2xl text-white shadow-2xl backdrop-blur-md border border-white/20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Your Vedic Chart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kundaliData.data.chart.rasi.map((item, index) => (
                <div
                  key={index}
                  className="p-6 border-2 border-amber-400/50 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:border-amber-400 hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <p className="text-amber-300 font-semibold">
                      House:{" "}
                      <span className="text-white font-normal">
                        {item.house}
                      </span>
                    </p>
                    <p className="text-amber-300 font-semibold">
                      Sign:{" "}
                      <span className="text-white font-normal">
                        {item.sign}
                      </span>
                    </p>
                    <p className="text-amber-300 font-semibold">
                      Planet:{" "}
                      <span className="text-white font-normal">
                        {item.planet}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateKundali;
