import { useState } from "react";
import { observer } from "mobx-react-lite";
import challengeStore from "../../stores/challengeStore";
// import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Box, Button} from "@mui/material";
import "./ChallengeList.css";
import InformationCards from "./InformationCards";

const ITEMS_PER_LOAD = 6; // מספר האתגרים שמוצגים בכל טעינה

type SortOption = 'startDate' | 'endDate';

const ChallengeList = observer(() => {
  // const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [sortOption] = useState<SortOption>('startDate');

  // const handleChallengeClick = (challengeId: number) => {
  //   navigate(`/creationsForChallenge/${challengeId}`);
  // };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
  };

  // const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setSortOption(event.target.value as SortOption);
  // };

  const sortedChallenges = [...challengeStore.challenges].sort((a: { startDate: string; endDate: string }, b: { startDate: string; endDate: string }) => {
    if (sortOption === 'startDate') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else { // endDate
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
  });

  const visibleChallenges = sortedChallenges.slice(0, visibleCount);
  const hasMore = visibleCount < challengeStore.challenges.length;

  // const isChallengeAvailable = (endDate: string) => {
  //   const currentDate = new Date();
  //   const challengeEndDate = new Date(endDate);
  //   return currentDate <= challengeEndDate;
  // };

  return (
    <div className="space-challenges-container">
        <section className="challenges-banner">
        </section>

      {/* תיבת בחירה למיון */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <FormControl variant="outlined" size="small">
          <InputLabel>מיין לפי</InputLabel>
          <Select
            label="מיין לפי"
            value={sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="startDate">תאריך התחלה</MenuItem>
            <MenuItem value="endDate">תאריך סיום</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      
      <Box className="challenges-wrapper">
        <Grid container spacing={3} justifyContent="center">
          {visibleChallenges.map((challenge: { id: number; startDate: string; endDate: string }) => (
            <Grid item xs={12} sm={6} md={4} key={challenge.id} > 
              <div className="relative">
                <InformationCards challenge={challenge} />
              </div>
            </Grid>
          ))}
        </Grid>
        
        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button className="show-more" variant="contained" onClick={handleLoadMore}>
              הצג עוד
            </Button>
          </Box>
        )}
      </Box>

      <footer className="simple-footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
});

export default ChallengeList;











// import { useState, useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import challengeStore from "../../stores/challengeStore";
// // import { useNavigate } from "react-router-dom";
// import Grid from '@mui/material/Grid';
// import { Box, Button, Typography, Chip } from "@mui/material";
// import { AccessTime } from '@mui/icons-material';
// import "./ChallengeList.css";
// import InformationCards from "./InformationCards";

// const ITEMS_PER_LOAD = 6; // מספר האתגרים שמוצגים בכל טעינה

// type SortOption = 'startDate' | 'endDate';

// // קומפוננטה של שעון ספירה לאחור
// const CountdownTimer = ({ endDate }: { endDate: string }) => {
//   const [timeLeft, setTimeLeft] = useState<{
//     days: number;
//     hours: number;
//     minutes: number;
//     seconds: number;
//     isExpired: boolean;
//   }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date().getTime();
//       const endTime = new Date(endDate).getTime();
//       const difference = endTime - now;

//       if (difference <= 0) {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
//         return;
//       }

//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
//     };

//     // חישוב ראשוני
//     calculateTimeLeft();

//     // עדכון כל שנייה
//     const timer = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(timer);
//   }, [endDate]);

//   if (timeLeft.isExpired) {
//     return (
//       <Chip 
//         icon={<AccessTime />}
//         label="האתגר הסתיים"
//         color="error"
//         variant="filled"
//         sx={{ 
//           fontWeight: 'bold',
//           fontSize: '0.9rem',
//           padding: '4px 8px'
//         }}
//       />
//     );
//   }

//   const formatTime = () => {
//     if (timeLeft.days > 0) {
//       return `${timeLeft.days} ימים, ${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;
//     }
//     return `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;
//   };

//   const getTimerColor = () => {
//     const totalHours = timeLeft.days * 24 + timeLeft.hours;
//     if (totalHours < 24) return 'error'; // פחות מיום - אדום
//     if (totalHours < 72) return 'warning'; // פחות מ-3 ימים - כתום
//     return 'success'; // יותר מ-3 ימים - ירוק
//   };

//   return (
//     <Chip 
//       icon={<AccessTime />}
//       label={formatTime()}
//       color={getTimerColor()}
//       variant="filled"
//       sx={{ 
//         fontWeight: 'bold',
//         fontSize: '0.9rem',
//         padding: '4px 8px',
//         fontFamily: 'monospace'
//       }}
//     />
//   );
// };

// const ChallengeList = observer(() => {
//   // const navigate = useNavigate();
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
//   const [sortOption] = useState<SortOption>('startDate');

//   // const handleChallengeClick = (challengeId: number) => {
//   //   navigate(`/creationsForChallenge/${challengeId}`);
//   // };

//   const handleLoadMore = () => {
//     setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
//   };

//   // const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//   //   setSortOption(event.target.value as SortOption);
//   // };

//   const sortedChallenges = [...challengeStore.challenges].sort((a: { startDate: string; endDate: string }, b: { startDate: string; endDate: string }) => {
//     if (sortOption === 'startDate') {
//       return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
//     } else { // endDate
//       return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
//     }
//   });

//   const visibleChallenges = sortedChallenges.slice(0, visibleCount);
//   const hasMore = visibleCount < challengeStore.challenges.length;

//   // const isChallengeAvailable = (endDate: string) => {
//   //   const currentDate = new Date();
//   //   const challengeEndDate = new Date(endDate);
//   //   return currentDate <= challengeEndDate;
//   // };

//   return (
//     <div className="space-challenges-container">
//         <section className="challenges-banner">
//         </section>

//       {/* תיבת בחירה למיון */}
//       {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
//         <FormControl variant="outlined" size="small">
//           <InputLabel>מיין לפי</InputLabel>
//           <Select
//             label="מיין לפי"
//             value={sortOption}
//             onChange={handleSortChange}
//           >
//             <MenuItem value="startDate">תאריך התחלה</MenuItem>
//             <MenuItem value="endDate">תאריך סיום</MenuItem>
//           </Select>
//         </FormControl>
//       </Box> */}
      
//       <Box className="challenges-wrapper">
//         <Grid container spacing={3} justifyContent="center">
//           {visibleChallenges.map((challenge: { id: number; startDate: string; endDate: string }) => (
//             <Grid item xs={12} sm={6} md={4} key={challenge.id} > 
//               <div className="relative">
//                 {/* שעון ספירה לאחור */}
//                 <Box sx={{ 
//                   position: 'absolute', 
//                   top: 10, 
//                   right: 10, 
//                   zIndex: 10,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'flex-end',
//                   gap: 1
//                 }}>
//                   <CountdownTimer endDate={challenge.endDate} />
//                 </Box>
                
//                 <InformationCards challenge={challenge} />
//               </div>
//             </Grid>
//           ))}
//         </Grid>
        
//         {hasMore && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <Button className="show-more" variant="contained" onClick={handleLoadMore}>
//               הצג עוד
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <footer className="simple-footer">
//         <div className="footer-content">
//           <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// });

// export default ChallengeList;