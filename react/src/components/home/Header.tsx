// import  { useState } from "react";
// import { AppBar, Toolbar, Button, Box } from "@mui/material";
// import UpdateUser from "./user/UpdateUser";
// import Login from "./user/Login";
// import SignUp from "./user/SignUp";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [log, setLog] = useState(false);
//   const [signUp, setSignUp] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: "#002444", //"transparent", // רקע שקוף
//         boxShadow: "none", 
//         paddingX: 2,
//         borderBottom: "2px solid #9f94bb", // #cfa2ad
//       }}
//     >
//       <Toolbar
//         disableGutters
//         sx={{
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "600", fontFamily: "inherit" }}>
//                     My App
//                 </Typography> */}
//         <Button 
//         onClick={() => {
//               navigate("/");
//             }}> home 
//         </Button>
//         {/* Box שמכיל את הכפתורים ממוקם בצד ימין */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 0,
//             width: "100%",
//             justifyContent: "end",
//           }}
//         >
//           {!log && <Login setLog={setLog} />}
//           {!signUp && !log && <SignUp setSignUp={setSignUp} />}
//           {(log || signUp) && <UpdateUser />}
//           <Button
//             variant="text" // השתמש ב-variant "text" כדי להסיר את המסגרת
//             onClick={() => {
//               navigate("/challengeList");
//             }}
//             sx={{
//               marginLeft: "20px",
//               color: "white", // צבע טקסט לבן
//               backgroundColor: "transparent", // רקע שקוף
//               transition: "0.3s",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.1)", // רקע שקוף עם אפקט בהhover
//                 color: "white", // צבע טקסט לבן גם בהhover
//               },
//             }}
//           >
//             challenge list
//           </Button>         
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;




import { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { getUserDataFromToken } from "../../utils/authUtils";
import SignUp from "../user/SignUp";
import UserProfile from "../user/UserProfile";
import Login from "../user/Login";

const Header = () => {
  const [log, setLog] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {  name, email } = getUserDataFromToken();
  


  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setLog(false);
  };

  const handleEditProfile = () => {
    // נווט לעמוד עריכת הפרופיל
    navigate('/edit-profile');
  };

  const user = {
    name: name || "",
    email: email || ""
  };


  return (
    <AppBar position="fixed" className="space-header">
      <div className="header-background-effects">
        <div className="header-star header-star1"></div>
        <div className="header-star header-star2"></div>
        <div className="header-star header-star3"></div>
        <div className="header-orbit header-orbit1"></div>
      </div>
      
      <Toolbar disableGutters className="header-toolbar">
        {/* Logo section */}
        <div className="logo-container" onClick={() => navigate("/")}>
          <div className="logo-text">
            <span className="logo-pic">PIC</span>
            <span className="logo-battle">BATTLE</span>
          </div>
          <div className="logo-subtitle">הקרב על התמונה</div>
        </div>

        {/* Mobile menu icon */}
        <IconButton 
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </IconButton>

        {/* Navigation buttons */}
        <Box className={`nav-buttons ${menuOpen ? 'mobile-open' : ''}`}>
          <Button 
            className="nav-button"
            onClick={() => navigate("/")}
          >
            <span className="button-text">Home</span>
            <span className="button-highlight"></span>
          </Button>
          
          <Button 
            className="nav-button"
            onClick={() => navigate("/challengeList")}
          >
            <span className="button-text">Challenges</span>
            <span className="button-highlight"></span>
          </Button>

          <Button 
            className="nav-button"
            onClick={() => navigate("/history")}
          >
            <span className="button-text">History</span>
            <span className="button-highlight"></span>
          </Button>
          
          {/* Auth buttons */}
          <div className="auth-buttons">
            {!log && (
               <Login setLog={setLog} />
            )}
            
            {!signUp && !log && (
              <SignUp setSignUp={setSignUp} />
            )}
            
            {(log || signUp) && <UserProfile user={user} onLogout={handleLogout} onEditProfile={handleEditProfile} />}
          </div>
        </Box>
      </Toolbar>
      
    </AppBar>
  );
};

export default Header;