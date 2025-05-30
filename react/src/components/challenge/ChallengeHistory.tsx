// import {useEffect, useState } from "react";
// import { observer } from "mobx-react-lite";
// import challengeStore from "../../stores/challengeStore";
// import { toJS } from "mobx";
// import { FaTrophy, FaHeart, FaUser, FaCalendarAlt, FaImage, FaStar, FaSpinner } from "react-icons/fa";
// import "./ChallengeHistory.css";
// import { Challenge, Winner } from "../../interfaces/interfaces";

// const ChallengeHistory = observer(() => {
//   const [loading, setLoading] = useState(true);
//   const [winners, setWinners] =useState<Record<string, Winner>>({});
//   useEffect(() => {
//     const fetchData = async () => {
//       await challengeStore.fetchChallenges();
//       const endedChallenges = (toJS(challengeStore.challenges)as Challenge[]).filter(
//         (c) => new Date(c.endDate) < new Date()
//       );

//       const winnersData: Record<string, Winner> = {};
//       for (const challenge of endedChallenges) {
//         const res = await challengeStore.fetchWinner(challenge.id);
//         if (res) {
//           winnersData[challenge.id] = res;
//         }
//       }
      
//       setWinners(winnersData);
//       setTimeout(() => {
//         setLoading(false);
//       }, 800); // תוספת של השהייה קטנה למראה טעינה חלק יותר
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="loader-container">
//         <div className="challenge-loader">
//           <div className="spinner-container">
//             <FaSpinner className="spinner-icon" />
//           </div>
//           <span className="loading-text">טוען היסטוריית אתגרים...</span>
//         </div>
//       </div>
//     );
//   }

//   const endedChallenges = (challengeStore.challenges as { id: string; endDate: string; title: string; description: string }[]).filter(
//     (c) => new Date(c.endDate) < new Date()
//   );

//   const formatDate = (dateString: string | number | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   return (
//     <>
//     <div className="challenge-history-container">
//       <div className="history-header">
//         <h2 className="history-title">
//           הסטורית אתגרים
//         </h2>
//         <p className="history-subtitle">צפו בהישגים המרשימים של האתגרים שהסתיימו</p>
//       </div>

//       <div className="challenge-grid">
//         {endedChallenges.map((challenge) => {
//           const winner = winners[challenge.id];
//           const hasWinner = !!winner;
          
//           return (
//             <div
//               key={challenge.id}
//               className={`challenge-card-history ${hasWinner ? 'has-winner' : 'no-winner'}`}
//             >
//               {hasWinner && <div className="trophy-watermark"><FaTrophy /></div>}
              
//               <div className="challenge-header">
//                 <h3 className="challenge-title">{challenge.title}</h3>
//                 <div className="challenge-dates">
//                   <FaCalendarAlt className="date-icon" />
//                   <span>{formatDate(challenge.endDate)}</span>
//                 </div>
//               </div>
              
//               <p className="challenge-description">{challenge.description}</p>

//               {hasWinner ? (
//                 <div className="winner-container">
//                   <div className="winner-image-container">
//                     <img
//                       src={winner.imageUrl}
//                       alt="תמונה זוכה"
//                       className="winner-image"
//                       loading="lazy"
//                     />
//                     <div className="winner-badge">
//                       <FaStar className="winner-badge-icon" />
//                       <span>מקום ראשון</span>
//                     </div>
//                   </div>
                  
//                   <div className="winner-details">
//                     <div className="winner-stats">
//                       <div className="stat-item">
//                         <FaUser className="stat-icon creator-icon" />
//                         <span className="creator-name">{winner.user?.name || "לא ידוע"}</span>
//                       </div>
                      
//                       <div className="stat-item votes-item">
//                         <FaHeart className="stat-icon vote-icon" />
//                         <span className="votes-count">{winner.votes}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="no-winner-container">
//                   <FaImage className="no-image-icon" />
//                   <p className="no-winner-text">אין תמונה זוכה</p>
//                 </div>
//               )}
              
//             </div>
//           );
//         })}
//       </div>
      
//       {endedChallenges.length === 0 && (
//         <div className="no-challenges">
//           <FaImage className="no-challenges-icon" />
//           <p>אין אתגרים שהסתיימו עדיין.</p>
//         </div>
//       )}
//     </div>
//     <footer className="simple-footer">
//         <div className="footer-content">
//           <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// });

// export default ChallengeHistory;

import {useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import challengeStore from "../../stores/challengeStore";
import { toJS } from "mobx";
import { FaTrophy, FaHeart, FaUser, FaCalendarAlt, FaImage, FaStar, FaSpinner } from "react-icons/fa";
import "./ChallengeHistory.css";
import { Challenge, Winner } from "../../interfaces/interfaces";

const ChallengeHistory = observer(() => {
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState<Record<string, Winner>>({});
  
  useEffect(() => {
    const fetchData = async () => {
      await challengeStore.fetchChallenges();
      const endedChallenges = (toJS(challengeStore.challenges) as Challenge[]).filter(
        (c) => new Date(c.endDate) < new Date()
      );

      const winnersData: Record<string, Winner> = {};
      for (const challenge of endedChallenges) {
        const res = await challengeStore.fetchWinner(challenge.id);
        if (res) {
          winnersData[challenge.id] = res;
        }
      }
      
      setWinners(winnersData);
      setTimeout(() => {
        setLoading(false);
      }, 800); // Adding a small delay for smoother loading appearance
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="challenge-loader">
          <div className="spinner-container">
            <FaSpinner className="spinner-icon" />
          </div>
          <span className="loading-text">Loading challenge history...</span>
        </div>
      </div>
    );
  }

  const endedChallenges = (challengeStore.challenges as { id: string; endDate: string; title: string; description: string }[]).filter(
    (c) => new Date(c.endDate) < new Date()
  );

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
    <div className="challenge-history-container">
      <div className="history-header">
        <h2 className="history-title">
          Challenge History
        </h2>
        <p className="history-subtitle">View the impressive achievements of completed challenges</p>
      </div>

      <div className="challenge-grid">
        {endedChallenges.map((challenge) => {
          const winner = winners[challenge.id];
          const hasWinner = !!winner;
          
          return (
            <div
              key={challenge.id}
              className={`challenge-card-history ${hasWinner ? 'has-winner' : 'no-winner'}`}
            >
              {hasWinner && <div className="trophy-watermark"><FaTrophy /></div>}
              
              <div className="challenge-header">
                <h3 className="challenge-title">{challenge.title}</h3>
                <div className="challenge-dates">
                  <FaCalendarAlt className="date-icon" />
                  <span>{formatDate(challenge.endDate)}</span>
                </div>
              </div>
              
              <p className="challenge-description">{challenge.description}</p>

              {hasWinner ? (
                <div className="winner-container">
                  <div className="winner-image-container">
                    <img
                      src={winner.imageUrl}
                      alt="Winning image"
                      className="winner-image"
                      loading="lazy"
                    />
                    <div className="winner-badge">
                      <FaStar className="winner-badge-icon" />
                      <span>First Place</span>
                    </div>
                  </div>
                  
                  <div className="winner-details">
                    <div className="winner-stats">
                      <div className="stat-item">
                        <FaUser className="stat-icon creator-icon" />
                        <span className="creator-name">{winner.user?.name || "Unknown"}</span>
                      </div>
                      
                      <div className="stat-item votes-item">
                        <FaHeart className="stat-icon vote-icon" />
                        <span className="votes-count">{winner.votes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-winner-container">
                  <FaImage className="no-image-icon" />
                  <p className="no-winner-text">No winning image</p>
                </div>
              )}
              
            </div>
          );
        })}
      </div>
      
      {endedChallenges.length === 0 && (
        <div className="no-challenges" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          margin: '40px 0'
        }}>
          <FaImage className="no-challenges-icon" style={{
            fontSize: '4rem',
            marginBottom: '20px',
            color: '#ccc'
          }} />
          <p style={{
            fontSize: '1.2rem',
            margin: 0,
            fontWeight: '500'
          }}>No completed challenges yet.</p>
        </div>
      )}
    </div>
    <footer className="simple-footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
});

export default ChallengeHistory;