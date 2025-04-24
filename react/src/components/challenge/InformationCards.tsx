// import React, { useState } from 'react';
// import { Box, Card, Typography, Button, Grid, IconButton } from '@mui/material';
// import './InformationCards.css';
// import { useNavigate } from 'react-router-dom';

// // Interface for card props
// interface CardItemProps {
//   icon: React.ReactNode;
//   title: string;
//   buttonText: string;
//   onButtonClick: () => void;
//   challengeId?: number; 
// }

// // Card component
// const CardItem: React.FC<CardItemProps> = ({ icon, title, buttonText, onButtonClick,challengeId }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const navigate = useNavigate();

//   const handleChallengeClick = (challengeId: number) => {
//     navigate(`/creationsForChallenge/${challengeId}`);
//   };
  
//   const handleButtonClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (challengeId !== undefined) {
//       handleChallengeClick(challengeId);
//     }
//     onButtonClick();
//   };

//   return (
//     <div 
//       className={`card-container ${isHovered ? 'hovered' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="icon-circle">
//         {icon}
//       </div>

//       <Card className="styled-card">
//         <Box sx={{ height: 40 }} /> {/* Spacer for the icon */}
//         <Typography 
//           variant="h6" 
//           component="h2" 
//           align="center" 
//           sx={{ 
//             mb: 2, 
//             fontWeight: 'bold',
//             direction: 'rtl'
//           }}
//         >
//           {title}
//         </Typography>
//         <div className="button-ellipse">
//           <Button 
//             variant="contained"
//             className="gradient-button"
//             onClick={handleButtonClick}
//           >
//             {buttonText}
//           </Button>
//         </div>
//       </Card>
      
//       <div className={`overlay-container ${isHovered ? 'visible' : ''}`}>
//         <div className="overlay"></div>
//       </div>

//       <div className={`icon-overlay ${isHovered ? 'visible' : ''}`}></div>
      
//       {isHovered && (
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 7,
//             pointerEvents: 'none',
//           }}
//         >
//           <Typography className="unavailable-text">אתגר לא זמין</Typography>
//         </Box>
//       )}
//     </div>
//   );
// };

// // Main component
// interface InformationCardsProps {
//   challenge: any;
// }

// const InformationCards: React.FC<InformationCardsProps> = ({ challenge }) => {
//   // const cards: CardItemProps[] = [
//   //   {
//   //     icon: <IconButton sx={{ fontSize: 40 }} className="card-icon" />,
//   //     title: "מידע כללי שאלות ותשובות",
//   //     buttonText: "לפרטים נוספים",
//   //     onButtonClick: () => console.log("כפתור 1 נלחץ")
//   //   },
//   //   {
//   //     icon: <IconButton sx={{ fontSize: 40 }} className="card-icon" />,
//   //     title: "רגע לפני המשכנתא",
//   //     buttonText: "לפרטים נוספים",
//   //     onButtonClick: () => console.log("כפתור 2 נלחץ")
//   //   },
//   //   {
//   //     icon: <IconButton sx={{ fontSize: 40 }} className="card-icon" />,
//   //     title: "מסלולי משכנתא",
//   //     buttonText: "ספרו לי עוד",
//   //     onButtonClick: () => console.log("כפתור 3 נלחץ")
//   //   },
//   //   {
//   //     icon: <IconButton sx={{ fontSize: 40 }} className="card-icon" />,
//   //     title: "משכנתא משפחתית",
//   //     buttonText: "לפרטים נוספים",
//   //     onButtonClick: () => console.log("כפתור 4 נלחץ")
//   //   }
//   // ];

//   return (
//     <Box sx={{ 
//       p: 4, 
//       pt: 6,
//       pb: 6,
//       bgcolor: '#f5f5f5',
//       direction: 'rtl'
//     }}>
//       <Grid container spacing={4}>
//         {/* {cards.map((card, index) => ( */}
//           <Grid item xs={12} sm={6} md={3} key={0}>
//             <CardItem
//               icon=  {""}/*{card.icon}*/
//               title={challenge.title}
//               buttonText={"להצבעה והצגה"}
//               onButtonClick={ () => console.log("כפתור נלחץ")}
//             />
//           </Grid>
//         {/* ))} */}
//       </Grid>
//     </Box>
//   );
// };

// export default InformationCards;













import React, { useState } from 'react';
import { Box, Card, Typography, Button, Grid, IconButton } from '@mui/material';
import './InformationCards.css';
import { useNavigate } from 'react-router-dom';
import * as Icons from '@mui/icons-material';
import { FlipCameraAndroid } from '@mui/icons-material';


// Interface for card props
interface CardItemProps {
  icon?: React.ReactNode;
  title: string;
  description:string;
  startDate: string;
  endDate: string;
  buttonText: string;
  onButtonClick: () => void;
  challengeId?: number;
}

// Card component
const CardItem: React.FC<CardItemProps> = ({ 
  icon, 
  title, 
  description,
  startDate,
  endDate,
  buttonText, 
  onButtonClick,
  challengeId 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleChallengeClick = (id: number) => {
    navigate(`/creationsForChallenge/${id}`);
  };
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (challengeId !== undefined) {
      handleChallengeClick(challengeId);
    } else {
      onButtonClick();
    }
  };

    const formatDateRange = (startDate: any, endDate: any) => {
    // Format date in DD.MM.YY - DD.MM.YY format
    const formattedStartDate = new Date(startDate).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).replace(/\//g, '.');
    
    const formattedEndDate = new Date(endDate).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).replace(/\//g, '.');
    
    return `${formattedEndDate} - ${formattedStartDate}`;
  };

  return (
    <div 
      className={`card-container ${isHovered ? 'hovered' : ''}`}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-circle">
        {icon || <IconButton sx={{ fontSize: 40 }} className="card-icon" />}
      </div>

      <Card className="styled-card">
        <Box sx={{ height: 40 }} /> {/* Spacer for the icon */}
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            direction: 'rtl'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 2, 
            direction: 'rtl'
          }}
        >
          {description}
        </Typography>
        <Box sx={{ height: 43 }} /> {/* Spacer for the icon */}
        <Typography 
          variant="h6" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 2, 
            direction: 'rtl'
          }}
        >
          {formatDateRange(startDate, endDate)}
        </Typography>
        <div className="button-ellipse">
          <Button 
            variant="contained"
            className="gradient-button"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </Card>
      
      <div className={`overlay-container ${isHovered ? 'visible' : ''}`}>
        <div className="overlay"></div>
      </div>

      <div className={`icon-overlay ${isHovered ? 'visible' : ''}`}></div>
      
      {isHovered && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 7,
            pointerEvents: 'none',
          }}
        >
          <Typography className="unavailable-text">אתגר לא זמין</Typography>
        </Box>
      )}
    </div>
  );
};

// Main component
interface InformationCardsProps {
  challenge: any;
}

const InformationCards: React.FC<InformationCardsProps> = ({ challenge }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    if (challenge && challenge.id) {
      navigate(`/creationsForChallenge/${challenge.id}`);
    }
  };

  const iconList = Object.values(Icons).filter(
    (Icon) => typeof Icon === 'function'
  );

  return (
    <Box sx={{ 
      p: 2,
      pt: 6,
      pb: 6,
      bgcolor: 'transparent',
      direction: 'rtl'
    }}>
      <CardItem
        icon={<FlipCameraAndroid sx={{ fontSize: 40 }} className="card-icon" />}
        title={challenge.title || "אתגר"}
        description={challenge.description }
        startDate={challenge.startDate}
        endDate={challenge.endDate}
        buttonText="להצבעה והצגה"
        onButtonClick={handleCardClick}
        challengeId={challenge.id}
      />
    </Box>
  );
};

export default InformationCards;