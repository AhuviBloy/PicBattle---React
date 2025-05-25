// import type React from "react"
// import { useState } from "react"
// import { Box, Card, Typography, Button, IconButton } from "@mui/material"
// import "./InformationCards.css"
// import { useNavigate } from "react-router-dom"
// import {
//   FlipCameraAndroid,
//   Camera,
//   Brush,
//   ColorLens,
//   AutoAwesome,
//   Palette,
//   Image,
//   PhotoCamera,
//   Layers,
//   Lightbulb,
//   Animation,
//   Gesture,
//   Crop,
//   Filter,
//   Style,
// } from "@mui/icons-material"

// // Array of icons for challenge cards
// const challengeIcons = [
//   Camera,
//   Brush,
//   ColorLens,
//   AutoAwesome,
//   Palette,
//   Image,
//   PhotoCamera,
//   Layers,
//   Lightbulb,
//   Animation,
//   Gesture,
//   Crop,
//   Filter,
//   Style,
//   FlipCameraAndroid,
// ]

// // Function to get a random icon from the array
// const getRandomIcon = (id: number) => {
//   // Use the challenge ID to ensure the same challenge always gets the same icon
//   const iconIndex = id % challengeIcons.length
//   const IconComponent = challengeIcons[iconIndex]
//   return <IconComponent sx={{ fontSize: 40 }} className="card-icon" />
// }

// // Interface for card props
// interface CardItemProps {
//   icon?: React.ReactNode
//   title: string
//   description: string
//   startDate: string
//   endDate: string
//   buttonText: string
//   onButtonClick: () => void
//   challengeId?: number
//   isVotingClosed?: boolean
// }

// // Card component
// const CardItem: React.FC<CardItemProps> = ({
//   icon,
//   title,
//   description,
//   startDate,
//   endDate,
//   buttonText,
//   onButtonClick,
//   challengeId,
//   isVotingClosed,
// }) => {
//   const [isHovered] = useState(false)
//   const navigate = useNavigate()

//   const handleChallengeClick = (id: number) => {
//     navigate(`/creationsForChallenge/${id}`)
//   }

//   const handleButtonClick = (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (challengeId !== undefined) {
//       handleChallengeClick(challengeId)
//     } else {
//       onButtonClick()
//     }
//   }

//   const formatDateRange = (startDate: any, endDate: any) => {
//     // Format date in DD.MM.YY - DD.MM.YY format
//     const formattedStartDate = new Date(startDate)
//       .toLocaleDateString("he-IL", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "2-digit",
//       })
//       .replace(/\//g, ".")

//     const formattedEndDate = new Date(endDate)
//       .toLocaleDateString("he-IL", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "2-digit",
//       })
//       .replace(/\//g, ".")

//     return `${formattedEndDate} - ${formattedStartDate}`
//   }

//   return (
//     <div
//       className={`card-container challenge-text ${isHovered ? "hovered" : ""}`}
//       // onMouseEnter={() => setIsHovered(true)}
//       // onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Voting Closed Badge */}
//       {isVotingClosed && (
//         <div className="voting-closed-badge">
//           <span>Voting Closed</span>
//         </div>
//       )}

//       <div className="icon-circle">{icon || <IconButton sx={{ fontSize: 40 }} className="card-icon" />}</div>

//       <Card className="styled-card">
//         <Box sx={{ height: 40 }} /> {/* Spacer for the icon */}
//         <Typography
//           variant="h4"
//           component="h2"
//           align="center"
//           sx={{
//             mb: 2,
//             fontWeight: "bold",
//             direction: "rtl",
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography
//           variant="h5"
//           component="h2"
//           align="center"
//           sx={{
//             mb: 2,
//             direction: "rtl",
//           }}
//         >
//           {description}
//         </Typography>
//         <Box sx={{ height: 43 }} /> {/* Spacer for the icon */}
//         <Typography
//           variant="h6"
//           component="h2"
//           align="center"
//           sx={{
//             mb: 2,
//             direction: "rtl",
//           }}
//         >
//           {formatDateRange(startDate, endDate)}
//         </Typography>
//         <div className="button-ellipse">
//           <Button variant="contained" className="gradient-button" onClick={handleButtonClick}>
//             {buttonText}
//           </Button>
//         </div>
//       </Card>

//       <div className={`overlay-container ${isHovered ? "visible" : ""}`}>
//         <div className="overlay"></div>
//       </div>

//       <div className={`icon-overlay ${isHovered ? "visible" : ""}`}></div>

//       {isHovered && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 7,
//             pointerEvents: "none",
//           }}
//         >
//           <Typography className="unavailable-text">אתגר לא זמין</Typography>
//         </Box>
//       )}
//     </div>
//   )
// }

// // Main component
// interface InformationCardsProps {
//   challenge: any
// }

// const InformationCards: React.FC<InformationCardsProps> = ({ challenge }) => {
//   const navigate = useNavigate()

//   const handleCardClick = () => {
//     if (challenge && challenge.id) {
//       navigate(`/creationsForChallenge/${challenge.id}`)
//     }
//   }

//   // Check if voting is closed
//   const isVotingClosed = () => {
//     const currentDate = new Date()
//     const challengeEndDate = new Date(challenge.endDate)
//     return currentDate > challengeEndDate
//   }

//   return (
//     <Box
//       sx={{
//         p: 2,
//         pt: 6,
//         pb: 6,
//         bgcolor: "transparent",
//         direction: "rtl",
//       }}
//     >
//       <CardItem
//         icon={getRandomIcon(challenge.id)}
//         title={challenge.title || "אתגר"}
//         description={challenge.description}
//         startDate={challenge.startDate}
//         endDate={challenge.endDate}
//         buttonText="להצבעה והצגה"
//         onButtonClick={handleCardClick}
//         challengeId={challenge.id}
//         isVotingClosed={isVotingClosed()}
//       />
//     </Box>
//   )
// }

// export default InformationCards







//with timer
import type React from "react"
import { useState, useEffect } from "react"
import { Box, Card, Typography, Button, IconButton } from "@mui/material"
import "./InformationCards.css"
import { useNavigate } from "react-router-dom"
import {
  FlipCameraAndroid,
  Camera,
  Brush,
  ColorLens,
  AutoAwesome,
  Palette,
  Image,
  PhotoCamera,
  Layers,
  Lightbulb,
  Animation,
  Gesture,
  Crop,
  Filter,
  Style,
  AccessTime,
} from "@mui/icons-material"

// Array of icons for challenge cards
const challengeIcons = [
  Camera,
  Brush,
  ColorLens,
  AutoAwesome,
  Palette,
  Image,
  PhotoCamera,
  Layers,
  Lightbulb,
  Animation,
  Gesture,
  Crop,
  Filter,
  Style,
  FlipCameraAndroid,
]

// Function to get a random icon from the array
const getRandomIcon = (id: number) => {
  // Use the challenge ID to ensure the same challenge always gets the same icon
  const iconIndex = id % challengeIcons.length
  const IconComponent = challengeIcons[iconIndex]
  return <IconComponent sx={{ fontSize: 40 }} className="card-icon" />
}

// קומפוננטה של שעון ספירה לאחור
const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date(endDate).getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    // חישוב ראשוני
    calculateTimeLeft();

    // עדכון כל שנייה
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="countdown-timer expired">
        <AccessTime className="timer-icon" />
        <span>האתגר הסתיים</span>
      </div>
    );
  }

  const formatTime = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days} ימים, ${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;
    }
    return `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    const totalHours = timeLeft.days * 24 + timeLeft.hours;
    if (totalHours < 24) return 'countdown-timer danger'; // פחות מיום - אדום
    if (totalHours < 72) return 'countdown-timer warning'; // פחות מ-3 ימים - כתום
    return 'countdown-timer success'; // יותר מ-3 ימים - ירוק
  };

  return (
    <div className={getTimerClass()}>
      <AccessTime className="timer-icon" />
      <span>{formatTime()}</span>
    </div>
  );
};

// Interface for card props
interface CardItemProps {
  icon?: React.ReactNode
  title: string
  description: string
  startDate: string
  endDate: string
  buttonText: string
  onButtonClick: () => void
  challengeId?: number
  isVotingClosed?: boolean
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
  challengeId,
  
}) => {
  const [isHovered] = useState(false)
  const navigate = useNavigate()

  const handleChallengeClick = (id: number) => {
    navigate(`/creationsForChallenge/${id}`)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (challengeId !== undefined) {
      handleChallengeClick(challengeId)
    } else {
      onButtonClick()
    }
  }

  const formatDateRange = (startDate: any, endDate: any) => {
    // Format date in DD.MM.YY - DD.MM.YY format
    const formattedStartDate = new Date(startDate)
      .toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, ".")

    const formattedEndDate = new Date(endDate)
      .toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, ".")

    return `${formattedEndDate} - ${formattedStartDate}`
  }

  return (
    <div
      className={`card-container challenge-text ${isHovered ? "hovered" : ""}`}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {/* Voting Closed Badge */}
      {/* {isVotingClosed && (
        <div className="voting-closed-badge">
          <span>Voting Closed</span>
        </div>
      )} */}

      {/* שעון ספירה לאחור */}
      <div className="timer-container">
        <CountdownTimer endDate={endDate} />
      </div>

      <div className="icon-circle">{icon || <IconButton sx={{ fontSize: 40 }} className="card-icon" />}</div>

      <Card className="styled-card">
        <Box sx={{ height: 40 }} /> {/* Spacer for the icon */}
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: "bold",
            direction: "rtl",
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
            direction: "rtl",
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
            direction: "rtl",
          }}
        >
          {formatDateRange(startDate, endDate)}
        </Typography>
        <div className="button-ellipse">
          <Button variant="contained" className="gradient-button" onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </div>
      </Card>

      <div className={`overlay-container ${isHovered ? "visible" : ""}`}>
        <div className="overlay"></div>
      </div>

      <div className={`icon-overlay ${isHovered ? "visible" : ""}`}></div>

      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 7,
            pointerEvents: "none",
          }}
        >
          <Typography className="unavailable-text">אתגר לא זמין</Typography>
        </Box>
      )}
    </div>
  )
}

// Main component
interface InformationCardsProps {
  challenge: any
}

const InformationCards: React.FC<InformationCardsProps> = ({ challenge }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (challenge && challenge.id) {
      navigate(`/creationsForChallenge/${challenge.id}`)
    }
  }

  // Check if voting is closed
  const isVotingClosed = () => {
    const currentDate = new Date()
    const challengeEndDate = new Date(challenge.endDate)
    return currentDate > challengeEndDate
  }

  return (
    <Box
      sx={{
        p: 2,
        pt: 6,
        pb: 6,
        bgcolor: "transparent",
        direction: "rtl",
      }}
    >
      <CardItem
        icon={getRandomIcon(challenge.id)}
        title={challenge.title || "אתגר"}
        description={challenge.description}
        startDate={challenge.startDate}
        endDate={challenge.endDate}
        buttonText="להצבעה והצגה"
        onButtonClick={handleCardClick}
        challengeId={challenge.id}
        isVotingClosed={isVotingClosed()}
      />
    </Box>
  )
}

export default InformationCards