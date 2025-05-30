// import { useState, useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import challengeStore from "../../stores/challengeStore";
// // import { useNavigate } from "react-router-dom";
// import Grid from '@mui/material/Grid';
// import { Box, Button} from "@mui/material";
// import { FaSpinner } from "react-icons/fa";
// import "./ChallengeList.css";
// import InformationCards from "./InformationCards";

// const ITEMS_PER_LOAD = 6; // מספר האתגרים שמוצגים בכל טעינה

// type SortOption = 'startDate' | 'endDate';

// const ChallengeList = observer(() => {
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
//   const [sortOption] = useState<SortOption>('startDate');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       await challengeStore.fetchChallenges();
//       setTimeout(() => {
//         setLoading(false);
//       }, 800); // תוספת של השהייה קטנה למראה טעינה חלק יותר
//     };

//     fetchData();
//   }, []);

//   const handleLoadMore = () => {
//     setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
//   };

//   if (loading) {
//     return (
//       <div className="loader-container">
//         <div className="challenge-loader">
//           <div className="spinner-container">
//             <FaSpinner className="spinner-icon" />
//           </div>
//           <span className="loading-text">טוען רשימת אתגרים...</span>
//         </div>
//       </div>
//     );
//   }

//   const sortedChallenges = [...challengeStore.challenges].sort((a: { startDate: string; endDate: string }, b: { startDate: string; endDate: string }) => {
//     if (sortOption === 'startDate') {
//       return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
//     } else { // endDate
//       return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
//     }
//   });

//   const visibleChallenges = sortedChallenges.slice(0, visibleCount);
//   const hasMore = visibleCount < challengeStore.challenges.length;

//   return (
//     <div className="space-challenges-container">
//         {/* <section className="challenges-banner"></section> */}

//      <div className="challengePage-header">
//         <h2 className="challengePage-title">
//           {/* <FaTrophy className="trophy-icon" /> היסטוריית אתגרים */}
//           רשימת אתגרים
//         </h2>
//         <p className="challengePage-subtitle">צפו ברשימת האתגרים הקיימים</p>
//       </div>
     
      
//       <Box className="challenges-wrapper">
//         <Grid container spacing={3} justifyContent="center">
//           {visibleChallenges.map((challenge: { id: number; startDate: string; endDate: string }) => (
//             <Grid item xs={12} sm={6} md={4} key={challenge.id} > 
//               <div className="relative">
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


import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import challengeStore from "../../stores/challengeStore";
// import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Box, Button} from "@mui/material";
import { FaSpinner } from "react-icons/fa";
import "./ChallengeList.css";
import InformationCards from "./InformationCards";

const ITEMS_PER_LOAD = 6; // Number of challenges displayed per load

type SortOption = 'startDate' | 'endDate';

const ChallengeList = observer(() => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [sortOption] = useState<SortOption>('startDate');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await challengeStore.fetchChallenges();
      setTimeout(() => {
        setLoading(false);
      }, 800); // Adding a small delay for smoother loading appearance
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="challenge-loader">
          <div className="spinner-container">
            <FaSpinner className="spinner-icon" />
          </div>
          <span className="loading-text">Loading challenges list...</span>
        </div>
      </div>
    );
  }

  const sortedChallenges = [...challengeStore.challenges].sort((a: { startDate: string; endDate: string }, b: { startDate: string; endDate: string }) => {
    if (sortOption === 'startDate') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else { // endDate
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
  });

  const visibleChallenges = sortedChallenges.slice(0, visibleCount);
  const hasMore = visibleCount < challengeStore.challenges.length;

  return (
    <div className="space-challenges-container">
        {/* <section className="challenges-banner"></section> */}

     <div className="challengePage-header">
        <h2 className="challengePage-title">
          {/* <FaTrophy className="trophy-icon" /> Challenge History */}
          Challenges List
        </h2>
        <p className="challengePage-subtitle">View the list of existing challenges</p>
      </div>
     
      
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
              Show More
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