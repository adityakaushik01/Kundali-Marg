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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user makes changes
  };

  const handleSearch = async (value) => {
    handleChange("address", value);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: suggestion.display_name,
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
    }));
    setSuggestions([]);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your full name");
      return false;
    }
    if (!formData.birthDate) {
      setError("Please select your birth date");
      return false;
    }
    if (!formData.birthTime) {
      setError("Please select your birth time");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Please enter your birth place");
      return false;
    }
    if (!formData.latitude || !formData.longitude) {
      setError("Please select a valid location from the suggestions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const combinedDateTime = formData.birthDate
      .hour(formData.birthTime.hour())
      .minute(formData.birthTime.minute())
      .second(0)
      .millisecond(0);

      console.log("combinedDateTime", combinedDateTime);

    try {
      const kundaliDataInput = {
        datetime: combinedDateTime.toISOString(),
        latitude: formData.latitude,
        longitude: formData.longitude,
        name: formData.name.trim()
      };

      console.log("Sending kundali request:", kundaliDataInput);

      // Call your local backend API
      const response = await fetch('http://localhost:5000/api/kundli', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kundaliDataInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Kundali data received:", data);
      
      if (data.status === 'success' && data.data) {
        // Navigate to ShowKundali page with the data
        navigate('/ShowKundali', { 
          state: { 
            kundaliData: data,
            name: formData.name.trim(),
            birthDetails: {
              date: combinedDateTime.format('DD/MM/YYYY'),
              time: combinedDateTime.format('hh:mm A'),
              place: formData.address
            }
          } 
        });
      } else {
        throw new Error(data.message || "Failed to generate kundali");
      }
      
    } catch (error) {
      console.error("Error generating kundali:", error);
      setError(`Error: ${error.message}. Please ensure the server is running on port 5000.`);
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
          className="max-w-2xl mx-auto p-10 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 bg-white/5"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
              <p className="text-red-200 text-center">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-lg font-medium mb-3 text-amber-300">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-4 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30 bg-white/10"
              placeholder="Enter your full name"
              required
            />
          </div>

          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-medium mb-3 text-amber-300">
                    Date of Birth *
                  </label>
                  <DatePicker
                    value={formData.birthDate}
                    onChange={(newValue) => {
                      handleChange("birthDate", newValue);
                    }}
                    open={openDate}
                    onClose={() => setOpenDate(false)}
                    onOpen={() => setOpenDate(true)}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        placeholder: "Select date",
                        onClick: () => setOpenDate(true),
                        InputProps: {
                          style: { fontSize: "16px", cursor: "pointer" },
                          readOnly: true,
                        },
                      },
                    }}
                    format="DD/MM/YYYY"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3 text-amber-300">
                    Time of Birth *
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
                    }}
                    views={["hours", "minutes"]}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        placeholder: "Select time",
                        onClick: () => setOpenTime(true),
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
              Place of Birth *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for your birth place..."
                className="w-full p-4 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30 bg-white/10"
                required
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50 border border-amber-400/30">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectSuggestion(item)}
                      className="p-4 hover:bg-amber-500/20 cursor-pointer text-white border-b border-white/10 last:border-b-0 transition-colors duration-200"
                    >
                      <div className="font-medium text-sm">{item.display_name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Lat: {parseFloat(item.lat).toFixed(4)}, Lon: {parseFloat(item.lon).toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formData.latitude && formData.longitude && (
              <div className="mt-2 text-sm text-green-300">
                ✓ Location selected: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
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

        {/* Additional Info Section */}
        <div className="max-w-2xl mx-auto mt-12 p-6 rounded-xl backdrop-blur-md border border-white/10 bg-white/5">
          <h3 className="text-xl font-semibold text-amber-300 mb-4 text-center">
            Why Accurate Birth Details Matter
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="text-center">
              <div className="text-amber-400 text-lg mb-2">📅</div>
              <p><strong>Date:</strong> Determines planetary positions</p>
            </div>
            <div className="text-center">
              <div className="text-amber-400 text-lg mb-2">⏰</div>
              <p><strong>Time:</strong> Critical for ascendant calculation</p>
            </div>
            <div className="text-center">
              <div className="text-amber-400 text-lg mb-2">📍</div>
              <p><strong>Location:</strong> Affects house placements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateKundali;