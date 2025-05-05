// import React, { useState } from 'react';
// import { IconButton, Popover, Typography, Button, Box } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';

// // Interface for user props
// interface UserProfileProps {
//   user: {
//     name: string;
//     email: string;
//   };
//   onLogout: () => void;
//   onEditProfile: () => void;
// }

// const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onEditProfile }) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const navigate = useNavigate();

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <>
//       <IconButton onClick={handleClick} color="inherit">
//         <AccountCircleIcon sx={{ fontSize: 32, color: 'white' }} />
//       </IconButton>

//       <Popover
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <Box sx={{ p: 2, minWidth: 250 }}>
//           <Typography variant="h6" gutterBottom>
//             פרופיל משתמש
//           </Typography>
//           <Typography variant="body1">שם: {user.name}</Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>אימייל: {user.email}</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={() => {
//               handleClose();
//               onEditProfile();
//             }}
//             sx={{ mb: 1 }}
//           >
//             עריכת פרטים אישיים
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             fullWidth
//             onClick={() => {
//               handleClose();
//               onLogout();
//             }}
//           >
//             התנתקות
//           </Button>
//         </Box>
//       </Popover>
//     </>
//   );
// };

// export default UserProfile;






import React, { useState } from 'react';
import { IconButton, Popover, Typography, Button, Box, Avatar, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

// Interface for user props
interface UserProfileProps {
  user: {
    name: string;
    email: string;
    profileImage?: string;
  };
  onLogout: () => void;
  onEditProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onEditProfile }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Generate initials for avatar if no profile image exists
  const getInitials = () => {
    if (!user.name) return "U";
    return user.name.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  return (
    <>
      <IconButton 
        onClick={handleClick} 
        sx={{ 
          p: 0.5, 
          '&:hover': { 
            transform: 'translateY(-3px)',
            transition: 'transform 0.3s ease'
          } 
        }}
      >
        {user.profileImage ? (
          <Avatar 
            src={user.profileImage} 
            alt={user.name}
            sx={{ 
              width: 40, 
              height: 40,
              border: '2px solid rgba(1, 1, 1, 0.7)',  
            }}
          />
        ) : (
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              background: 'linear-gradient(135deg, #8fabff, #a78fff)',
              color: '#050d24',
              fontWeight: 600,
              border: '2px solid rgba(143, 171, 255, 0.5)',
              boxShadow: '0 4px 10px rgba(143, 171, 255, 0.3)'
            }}
          >
            {getInitials()}
          </Avatar>
        )}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            boxShadow: '0 5px 25px rgba(5, 13, 36, 0.15)',
            overflow: 'hidden',
            border: '1px solid rgba(143, 171, 255, 0.2)'
          }
        }}
      >
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(5, 13, 36, 0.03), rgba(5, 13, 36, 0.07))',
            p: 3,
            position: 'relative',
            overflow: 'hidden',
            direction: 'rtl', // RTL support for Hebrew
          }}
        >
          {/* Star decoration effect similar to hero section */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.3,
              pointerEvents: 'none'
            }}
          >
            <Box 
              sx={{
                position: 'absolute', 
                width: '3px',
                height: '3px',
                background: 'white',
                borderRadius: '50%',
                filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))',
                top: '15%',
                left: '10%'
              }}
            />
            <Box 
              sx={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'white',
                borderRadius: '50%',
                filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))',
                top: '60%',
                left: '85%'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {user.profileImage ? (
              <Avatar 
                src={user.profileImage} 
                alt={user.name}
                sx={{ 
                  width: 60, 
                  height: 60,
                  border: '3px solid rgba(143, 171, 255, 0.7)',  
                  boxShadow: '0 4px 10px rgba(143, 171, 255, 0.2)',
                  mr: 2,
                }}
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60,
                  background: 'linear-gradient(135deg, #8fabff, #a78fff)',
                  color: '#050d24',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  border: '3px solid rgba(143, 171, 255, 0.5)',
                  boxShadow: '0 4px 10px rgba(143, 171, 255, 0.3)',
                  mr: 2,
                  margin:2,
                }}
              >
                {getInitials()}
              </Avatar>
            )}
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#050d24', 
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                {user.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  fontWeight: 500
                }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.7 }} />

        <Box sx={{ p: 2, width: 280, direction: 'rtl' }}>
          <Button
            variant="text"
            startIcon={<EditIcon />}
            onClick={() => {
              handleClose();
              onEditProfile();
            }}
            fullWidth
            sx={{ 
              mb: 1,
              justifyContent: 'flex-start',
              color: '#050d24',
              textAlign: 'right',
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(143, 171, 255, 0.1)'
              }
            }}
          >
            עריכת פרטים אישיים
          </Button>
          
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={() => {
              handleClose();
              onLogout();
            }}
            fullWidth
            sx={{ 
              color: '#d32f2f',
              justifyContent: 'flex-start',
              textAlign: 'right',
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.08)'
              }
            }}
          >
            התנתקות
          </Button>
        </Box>

        <Box 
          sx={{ 
            p: 2, 
            pt: 1,
            background: 'linear-gradient(135deg, #f5f7ff, #e8edff)',
            borderTop: '1px solid rgba(143, 171, 255, 0.2)',
            direction: 'rtl'
          }}
        >
          <Button
            fullWidth
            sx={{
              background: 'linear-gradient(135deg, #8fabff, #a78fff) !important',
              color: '#050d24 !important',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              textTransform: 'none',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(143, 171, 255, 0.4)',
              border: 'none',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(143, 171, 255, 0.5)'
              }
            }}
            onClick={() => {
              handleClose();
              navigate('/edit-profile');
            }}
          >
            צפייה בפרופיל
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default UserProfile;