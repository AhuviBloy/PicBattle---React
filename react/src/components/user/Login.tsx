import { Box, Button, Modal, TextField, Typography, IconButton, Fade } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setLog }: { setLog: (log: boolean) => void }) => {
  const [open, setOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  // Form validation
  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!emailRef.current?.value) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    
    // Validate password
    if (!passwordRef.current?.value) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    
    return isValid;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        {
          Email: emailRef.current?.value,
          Password: passwordRef.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(res.data);

      if (res.data && res.data) {
        sessionStorage.setItem("token", res.data.token);
        setLog(true);
        setOpen(false);
        navigate("/");
      }
    } catch (e: any) {
      console.log(e);
      if ((e.response && e.response.status === 401) || e.response?.status === 400) {
        setEmailError("Email or password are incorrect");
        setPasswordError(" ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="auth-button login-button"
        variant="outlined"
        onClick={() => setOpen(true)}
        // sx={{
        //   borderRadius: "30px",
        //   padding: "8px 25px",
        //   background: "linear-gradient(135deg, rgba(143, 171, 255, 0.1), rgba(167, 143, 255, 0.1))",
        //   borderColor: "rgba(143, 171, 255, 0.5)",
        //   color: "#050d24",
        //   fontWeight: 500,
        //   transition: "all 0.3s ease",
        //   textTransform: "none",
        //   "&:hover": {
        //     transform: "translateY(-3px)",
        //     borderColor: "rgba(143, 171, 255, 0.8)",
        //     boxShadow: "0 4px 15px rgba(143, 171, 255, 0.3)",
        //   },
        // }}
      >
        Log In
      </Button>

      <Modal
        open={open}
        onClose={() => !loading && setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 35px rgba(5, 13, 36, 0.1)",
              overflow: "hidden",
              border: "1px solid rgba(143, 171, 255, 0.2)",
              outline: "none",
            }}
          >
            {/* Header section with gradient background */}
            <Box
              sx={{
                padding: "25px 30px 20px",
                background: "linear-gradient(135deg, rgba(5, 13, 36, 0.02), rgba(5, 13, 36, 0.06))",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(143, 171, 255, 0.15)",
              }}
            >
              {/* Star decoration elements */}
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
                <Box
                  sx={{
                    position: "absolute",
                    width: "5px",
                    height: "5px",
                    background: "white",
                    borderRadius: "50%",
                    filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                    top: "75%",
                    left: "30%",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <IconButton
                  onClick={() => !loading && setOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    color: "#666",
                    padding: "5px",
                  }}
                >
                  <CloseIcon />
                </IconButton>

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
                  Welcome Back
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
                Enter your credentials to access your account
              </Typography>
            </Box>

            {/* Form fields */}
            <Box component="form" sx={{ padding: "25px 30px" }}>
              <Box sx={{ position: "relative", mb: 3 }}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  inputRef={emailRef}
                  error={!!emailError}
                  helperText={emailError}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon
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
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  inputRef={passwordRef}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    startAdornment: (
                      <LockIcon
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

              {/* <Typography
                variant="body2"
                sx={{
                  color: "#8fabff",
                  textAlign: "right",
                  mb: 3,
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#a78fff",
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Typography> */}

              {/* Action button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  onClick={handleLogin}
                  disabled={loading}
                  fullWidth
                  sx={{
                    background: "linear-gradient(135deg, #8fabff, #a78fff) !important",
                    color: "white !important",
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
                      color: "rgba(255, 255, 255, 0.7) !important",
                    },
                  }}
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </Box>

              {/* <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  textAlign: "center",
                  mt: 3,
                }}
              >
                Don't have an account?{" "}
                <span
                  style={{
                    color: "#a78fff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </span>
              </Typography> */}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Login;