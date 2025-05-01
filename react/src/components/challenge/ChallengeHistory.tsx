// import React, { useEffect, useState } from "react";
// import { observer } from "mobx-react-lite";
// import challengeStore from "../../stores/challengeStore";
// import { toJS } from "mobx";


// const ChallengeHistory = observer(() => {
//   const [loading, setLoading] = useState(true);
//   const [winners, setWinners] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       await challengeStore.fetchChallenges();
//       const endedChallenges = toJS(challengeStore.challenges).filter(
//         (c: any) => new Date(c.endDate) < new Date()
//       );

//       console.log("end", endedChallenges);

//       const winnersData: any = {};
//       for (const challenge of endedChallenges as any[]) {
//         const res = await challengeStore.fetchWinner(challenge.id);
//         if (res) {
//           winnersData[challenge.id] = res;
//         }
//       }
//       console.log("winnersData", winnersData);
      
//       setWinners(winnersData);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="text-center text-gray-500 p-4">טוען...</div>;

//   const endedChallenges = challengeStore.challenges.filter(
//     (c: { endDate: string | number | Date; }) => new Date(c.endDate) < new Date()
//   );

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">היסטוריית אתגרים</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {endedChallenges.map((challenge: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
//           const winner = winners[challenge.id];
//           return (
//             <div
//               key={challenge.id}
//               className="border rounded-xl shadow p-4 hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold text-purple-700">{challenge.title}</h3>
//               <p className="text-gray-600 mb-3">{challenge.description}</p>

//               {winner ? (
//                 <div>
//                   <img
//                     src={winner.imageUrl}
//                     alt="תמונה זוכה"
//                     className="rounded-lg w-full h-64 object-cover mb-2"
//                   />
//                   <p>
//                     <strong>יוצר:</strong> {winner.user?.name || "לא ידוע"}
//                   </p>
//                   <p>
//                     <strong>הצבעות:</strong> {winner.votes}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500">אין תמונה זוכה עדיין</p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// });

// export default ChallengeHistory;





import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import challengeStore from "../../stores/challengeStore";
import { toJS } from "mobx";
import { FaTrophy, FaHeart, FaUser, FaCalendarAlt, FaImage, FaStar, FaSpinner } from "react-icons/fa";
import "./ChallengeHistory.css";

const ChallengeHistory = observer(() => {
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await challengeStore.fetchChallenges();
      const endedChallenges = toJS(challengeStore.challenges).filter(
        (c) => new Date(c.endDate) < new Date()
      );

      const winnersData = {};
      for (const challenge of endedChallenges) {
        const res = await challengeStore.fetchWinner(challenge.id);
        if (res) {
          winnersData[challenge.id] = res;
        }
      }
      
      setWinners(winnersData);
      setTimeout(() => {
        setLoading(false);
      }, 800); // תוספת של השהייה קטנה למראה טעינה חלק יותר
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
          <span className="loading-text">טוען היסטוריית אתגרים...</span>
        </div>
      </div>
    );
  }

  const endedChallenges = (challengeStore.challenges as { endDate: string; title: string }[]).filter(
    (c) => new Date(c.endDate) < new Date()
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="challenge-history-container">
      <div className="history-header">
        <h2 className="history-title">
          <FaTrophy className="trophy-icon" /> היסטוריית אתגרים
        </h2>
        <p className="history-subtitle">צפו בהישגים המרשימים של האתגרים שהסתיימו</p>
      </div>

      <div className="challenge-grid">
        {endedChallenges.map((challenge) => {
          const winner = winners[challenge.id];
          const hasWinner = !!winner;
          
          return (
            <div
              key={challenge.id}
              className={`challenge-card ${hasWinner ? 'has-winner' : 'no-winner'}`}
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
                      alt="תמונה זוכה"
                      className="winner-image"
                      loading="lazy"
                    />
                    <div className="winner-badge">
                      <FaStar className="winner-badge-icon" />
                      <span>מקום ראשון</span>
                    </div>
                  </div>
                  
                  <div className="winner-details">
                    <div className="winner-stats">
                      <div className="stat-item">
                        <FaUser className="stat-icon creator-icon" />
                        <span className="creator-name">{winner.user?.name || "לא ידוע"}</span>
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
                  <p className="no-winner-text">אין תמונה זוכה</p>
                </div>
              )}
              
            </div>
          );
        })}
      </div>
      
      {endedChallenges.length === 0 && (
        <div className="no-challenges">
          <FaImage className="no-challenges-icon" />
          <p>אין אתגרים שהסתיימו עדיין.</p>
        </div>
      )}
    </div>
  );
});

export default ChallengeHistory;