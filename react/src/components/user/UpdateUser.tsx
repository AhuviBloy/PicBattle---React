import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { getUserDataFromToken } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { userId, name, email } = getUserDataFromToken();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    
    if (!nameRef.current?.value) {
      setNameError("Please enter a name");
      isValid = false;
    } else {
      setNameError("");
    }
    
    if (!emailRef.current?.value) {
      setEmailError("Please enter an email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    
    return isValid;
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId || !validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.put(
        `${apiUrl}/api/User/${userId}`,
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      
      if (res.status === 200) {
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
          navigate("/"); 
        }, 4000);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          setEmailError("User not found");
        } else if (e.response?.status === 403) {
          setEmailError("Unauthorized access");
        } else {
          setEmailError("Unknown error occurred");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (!name) return "U";
    return name.split(" ").map((name) => name[0]).join("").toUpperCase();
  };

  return (
    <Box
      sx={{
        maxWidth: 650,
        width: "100%",
        margin: "0 auto",
        padding: { xs: "20px", md: "40px 20px" },
        direction: "ltr", 
      }}
    >
      <Box
        sx={{
          padding: "25px 30px 20px",
          background: "linear-gradient(135deg, rgba(5, 13, 36, 0.02), rgba(5, 13, 36, 0.06))",
          position: "relative",
          overflow: "hidden",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottom: "1px solid rgba(143, 171, 255, 0.15)",
          boxShadow: "0 2px 10px rgba(5, 13, 36, 0.04)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "3px",
              height: "3px", 
              background: "white",
              borderRadius: "50%",
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))",
              top: "15%",
              left: "10%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: "white",
              borderRadius: "50%",
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))",
              top: "60%",
              left: "85%",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#050d24",
              fontSize: "1.5rem",
              position: "relative",
              display: "inline-block",
            }}
          >
            Update Personal Information
            <Box
              sx={{
                position: "absolute",
                bottom: -5,
                left: 0, 
                width: 40,
                height: 3,
                background: "linear-gradient(90deg, #8fabff, #a78fff)",
                borderRadius: 1,
              }}
            />
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mt: 1,
          }}
        >
          You can update your personal information here
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          boxShadow: "0 10px 35px rgba(5, 13, 36, 0.1)",
          border: "1px solid rgba(143, 171, 255, 0.2)",
          borderTop: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px 30px",
            borderBottom: "1px solid rgba(143, 171, 255, 0.15)",
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              padding: "3px",
              background: "linear-gradient(135deg, #8fabff, #a78fff)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(143, 171, 255, 0.4)",
              mr: 2.5, 
            }}
          >
            <Avatar
              sx={{
                width: 55,
                height: 55,
                background: "#f5f7ff",
                color: "#050d24",
                fontWeight: 600,
                fontSize: "1.3rem",
                border: "2px solid white",
              }}
            >
              {getInitials()}
            </Avatar>
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "#050d24",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {name || "User"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              {email || "Email"}
            </Typography>
          </Box>
        </Box>

        <Box component="form" onSubmit={handleUpdate} sx={{ padding: "25px 30px" }}>
          <Box sx={{ position: "relative", mb: 3 }}>
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              inputRef={nameRef}
              defaultValue={name || ""}
              error={!!nameError}
              helperText={nameError}
              InputProps={{
                startAdornment: (
                  <PersonIcon
                    sx={{ color: "#8fabff", mr: 1, width: 20, height: 20 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(143, 171, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8fabff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8fabff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#8fabff",
                },
                "& .MuiFormHelperText-root": {
                  fontWeight: 500,
                },
              }}
            />
          </Box>

          <Box sx={{ position: "relative", mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              inputRef={emailRef}
              defaultValue={email || ""}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                startAdornment: (
                  <EmailIcon
                    sx={{ color: "#a78fff", mr: 1, width: 20, height: 20 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(143, 171, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#a78fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a78fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#a78fff",
                },
                "& .MuiFormHelperText-root": {
                  fontWeight: 500,
                },
              }}
            />
          </Box>

          {updateSuccess && (
            <Box 
              sx={{ 
                padding: "10px 16px", 
                mb: 3, 
                borderRadius: "10px", 
                background: "rgba(76, 175, 80, 0.1)", 
                color: "#2e7d32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
              }}
            >
              Information updated successfully!
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleUpdate}
              disabled={loading}
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #8fabff, #a78fff) !important",
                color: "#050d24 !important",
                fontWeight: 600,
                padding: "12px 0",
                borderRadius: "12px",
                fontSize: "1rem",
                textTransform: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(143, 171, 255, 0.4)",
                border: "none",
                "&:hover": {
                  boxShadow: "0 8px 25px rgba(143, 171, 255, 0.5)",
                },
                "&.Mui-disabled": {
                  background: "rgba(143, 171, 255, 0.5) !important",
                  color: "rgba(5, 13, 36, 0.5) !important",
                },
              }}
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateUser;