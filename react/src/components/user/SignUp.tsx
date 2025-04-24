








// import { Box, Button, Modal, TextField } from "@mui/material"
// import axios from "axios";
// import { FormEvent, useRef, useState } from "react";

// const SignUp = ({ setSignUp }: { setSignUp: (signUp: boolean) => void }) => {
//     const [open, setOpen] = useState(false);
//     const userIdRef = useRef<HTMLInputElement>(null);
//     const nameRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const PasswordHashRef = useRef<HTMLInputElement>(null);

//     const handleLogin = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post(`https://localhost:7143/api/User/registerUser`, {
//                 UserId:userIdRef.current?.value,
//                 Name:nameRef.current?.value,
//                 Email: emailRef.current?.value,
//                 PasswordHash: PasswordHashRef.current?.value,
//             }, 
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json' 
//                 }
//             });

//             if (res.data && res.data.token) {
//                 sessionStorage.setItem('token', res.data.token);
//                 console.log('Token stored:', res.data.token); // Log the token being stored
//                 setSignUp(true)
//             }
//             else {
//                 console.log('Token not found in response');
//             }

//             setOpen(false);
//         }
//         catch (e: any) {
//             console.log(e)
//             if ((e.response && e.status === 401) || e.status === 400) {
//                 alert('email or password are not correct')
//             }
//         }
//     }
//     return (<>
//         <div 
//         // style={{position: 'absolute', top: 0, left: 0, marginLeft: '120px', marginTop: '20px' }}
//         >

//         <Button
//           variant="text" // השתמש ב-variant "text" כדי להסיר את המסגרת
//           onClick={() => {
//             setOpen(true);
//           }}
//           sx={{
//             marginLeft: "20px",
//             color: "white", // צבע טקסט לבן
//             backgroundColor: "transparent", // רקע שקוף
//             transition: "0.3s",
//             "&:hover": {
//               backgroundColor: "rgba(255, 255, 255, 0.1)", // רקע שקוף עם אפקט בהhover
//               color: "white", // צבע טקסט לבן גם בהhover
//             },
//           }}
//         >
//           Register
//         </Button>

//             <Modal open={open} onClose={() => { setOpen(false) }}>
//                 <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
//                     <h2>Sign Up</h2>

//                     <TextField label="UserId" type='number' variant="outlined" fullWidth margin="normal" inputRef={userIdRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
//                     <TextField label="Name" type='text' variant="outlined" fullWidth margin="normal" inputRef={nameRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
//                     <TextField label="email" type='email' variant="outlined" fullWidth margin="normal" inputRef={emailRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
//                     <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" inputRef={PasswordHashRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />

//                     <Button variant="outlined" onClick={handleLogin} fullWidth sx={{ textTransform: 'none', marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>
//                         You're In!
//                     </Button>
//                 </Box>
//             </Modal>
//         </div>
//     </>)
// }

// export default SignUp






// import { Box, Button, Modal } from "@mui/material";
// import axios from "axios";
// import { FormEvent, useRef, useState } from "react";
// import "./Auth.css"; // Shared CSS file

// const SignUp = ({ setSignUp }: { setSignUp: (signUp: boolean) => void }) => {
//   const [open, setOpen] = useState(false);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const usernameRef = useRef<HTMLInputElement>(null);

//   const handleSignUp = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `https://localhost:7143/api/auth/register`,
//         {
//           Email: emailRef.current?.value,
//           Password: passwordRef.current?.value,
//           ConfirmPassword: passwordRef.current?.value,
//           Name: usernameRef.current?.value,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );


//       if (res.data && res.data) {
//         sessionStorage.setItem("token", res.data.token);
//         setSignUp(true);
//       }
      
//       setOpen(false);
//     } catch (e: any) {
//       console.log(e);
//       if (e.response && e.response.status === 400) {
//         alert("Registration failed. Please check your information.");
//       }
//     }
//   };

//   return (
//     <>
//       <Button 
//         className="auth-button signup-button"
//         onClick={() => setOpen(true)}
//       >
//         Sign Up
//       </Button>

//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//       >
//         <Box className="auth-modal">
//           <div className="modal-background-effects">
//             <div className="modal-star modal-star1"></div>
//             <div className="modal-star modal-star2"></div>
//             <div className="modal-star modal-star3"></div>
//             <div className="modal-orbit modal-orbit1"></div>
//           </div>
          
//           <h2 className="modal-title">Join the Battle</h2>
          
//           <div className="form-group">
//             <input 
//               type="text" 
//               className="space-input" 
//               placeholder="Username"
//               ref={usernameRef}
//               required
//             />
//             <div className="input-highlight"></div>
//           </div>
          
//           <div className="form-group">
//             <input 
//               type="email" 
//               className="space-input" 
//               placeholder="Email"
//               ref={emailRef}
//               required
//             />
//             <div className="input-highlight"></div>
//           </div>
          
//           <div className="form-group">
//             <input 
//               type="password" 
//               className="space-input" 
//               placeholder="Password"
//               ref={passwordRef}
//               required
//             />
//             <div className="input-highlight"></div>
//           </div>
          
//           <Button 
//             className="auth-button signup-button modal-submit-btn"
//             onClick={handleSignUp}
//           >
//             Start Your Journey
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default SignUp;





import { Box, Button, Modal, TextField, Typography, IconButton, Fade } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

const SignUp = ({ setSignUp }: { setSignUp: (signUp: boolean) => void }) => {
  const [open, setOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Form validation
  const validateForm = () => {
    let isValid = true;
    
    // Validate username
    if (!usernameRef.current?.value) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }
    
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
    } else if (passwordRef.current.value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    
    return isValid;
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `https://localhost:7143/api/auth/register`,
        {
          Email: emailRef.current?.value,
          Password: passwordRef.current?.value,
          ConfirmPassword: passwordRef.current?.value,
          Name: usernameRef.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (res.data && res.data) {
        sessionStorage.setItem("token", res.data.token);
        setSignUp(true);
        setOpen(false);
      }
    } catch (e: any) {
      console.log(e);
      if (e.response && e.response.status === 400) {
        if (e.response.data && e.response.data.errors) {
          // Handle specific validation errors from API
          const errors = e.response.data.errors;
          if (errors.Email) setEmailError(errors.Email[0]);
          if (errors.Password) setPasswordError(errors.Password[0]);
          if (errors.Name) setUsernameError(errors.Name[0]);
        } else {
          setEmailError("Registration failed. Please check your information.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        className="auth-button signup-button"
        onClick={() => setOpen(true)}
        // sx={{
        //   borderRadius: "30px",
        //   padding: "8px 25px",
        //   background: "linear-gradient(135deg, #8fabff, #a78fff)",
        //   color: "white",
        //   fontWeight: 500,
        //   transition: "all 0.3s ease",
        //   textTransform: "none",
        //   boxShadow: "0 4px 15px rgba(143, 171, 255, 0.4)",
        //   "&:hover": {
        //     transform: "translateY(-3px)",
        //     boxShadow: "0 8px 25px rgba(143, 171, 255, 0.5)",
        //     background: "linear-gradient(135deg, #a78fff, #8fabff)",
        //   },
        // }}
      >
        Sign Up
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
                  Join the Battle
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
                Create your account to start your journey
              </Typography>
            </Box>

            {/* Form fields */}
            <Box component="form" sx={{ padding: "25px 30px" }}>
              <Box sx={{ position: "relative", mb: 3 }}>
                <TextField
                  label="Username"
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputRef={usernameRef}
                  error={!!usernameError}
                  helperText={usernameError}
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

              <Box sx={{ position: "relative", mb: 3 }}>
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

              {/* Action button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<RocketLaunchIcon />}
                  onClick={handleSignUp}
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
                  {loading ? "Creating account..." : "Start Your Journey"}
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
                Already have an account?{" "}
                <span
                  style={{
                    color: "#a78fff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Log In
                </span>
              </Typography> */}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SignUp;