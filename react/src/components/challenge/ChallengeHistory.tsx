// import { observer } from "mobx-react-lite";
// import { Box, Typography, Grid, Paper } from "@mui/material";


// const ChallengeHistory = observer(() => {    
//     const notActiveCallenges = challengeStore.getNotActiveCallenges;

//     return (
//         <Box sx={{ padding: 3, backgroundColor: "#000000", color: "#ffffff" }}>
//             <Typography sx={{
//                 fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
//                 fontWeight: 700,
//                 lineHeight: 1.4,
//                 fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
//                 marginTop: "40px",
//                 textAlign: "left",
//                 marginBottom: "20px",
//                 background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 30.52%, #edc106 75.8%) text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//             }}>
//                 Challenge History
//             </Typography>
//             <Grid container spacing={3} sx={{ marginTop: 2 }}>
//                 {notActiveCallenges.length > 0 ? (
//                     notActiveCallenges.map((challenge) => (
//                         <Grid item xs={12} sm={6} md={4} key={challenge.id}>
//                             <Paper sx={{
//                                 padding: 2,
//                                 textAlign: "center",
//                                 backgroundColor: "#1e1e1e",
//                                 border: "1px solid #26272c",
//                                 borderRadius: 2,
//                             }}>
//                                 <Typography variant="h5" sx={{ color: "#ffffff" }}>
//                                     {challenge.title}
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: "#ffffff", marginTop: 1 }}>
//                                     Participants: {challenge.countCreations}
//                                 </Typography>
                                
//                                 {/* Winning image */}
//                                 <WinningCreation challengeId={challenge.id} />
//                             </Paper>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Grid item xs={12}>
//                         <Typography sx={{ padding: 2, color: "#ffffff" }}>No inactive challenges found</Typography>
//                     </Grid>
//                 )}
//             </Grid>
//         </Box>
//     );
// });

// export default ChallengeHistory;



