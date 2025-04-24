// import { Typography, Box } from "@mui/material";
// import { observer } from "mobx-react-lite";
// import { useState, useEffect } from "react";
// import challengeStore from "../../stores/challengeStore";
// import { userStore } from "../../stores/userStore";




// // קומפוננטה להצגת התמונה הזוכה
// const WinningCreation = observer(({ challengeId }: { challengeId: number }) => {
//     const [winningCreation, setWinningCreation] = useState<any | null>(null);
//     const [user, setUser] = useState<any | null>(null);

//     useEffect(() => {
//         const fetchWinningCreation = async () => {
//             const creation = await challengeStore.fetchWinner(challengeId);
//             setWinnin   gCreation(creation);

//             if (creation) {
//                 const userData = await userStore.fetchUser(creation.userId);
                
//                 setUser(userData);
//             }
//         };
//         fetchWinningCreation();
//     }, [challengeId]);

//     if (!winningCreation || !user) {
//         return <Typography variant="body2">טוען את התמונה הזוכה...</Typography>;
//     }

//     return (
//         <Box sx={{ marginTop: 2, textAlign: "center" }}>
//             {/* <img src={winningCreation.imageUrl} alt={winningCreation.fileName} style={{ width: "100%", borderRadius: "8px" }} /> */}
//             <Typography variant="body2">{winningCreation.fileName}</Typography>
//             <Typography variant="body2">יוצר: {user.name}</Typography>
//             <Typography variant="body2">אימייל: {user.email}</Typography>
//             <Typography variant="body2">כמות דירוגים: {winningCreation.votes || 0}</Typography>
//         </Box>
//     );
// });

// export default WinningCreation;