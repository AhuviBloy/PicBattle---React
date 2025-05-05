// import { use, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { creationStore } from "../../stores/creationStore";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { Dialog } from "@headlessui/react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import FileUploader from "./FileUploader ";
// import './CreationCarousel.css';
// import axios from "axios";
// import { getUserDataFromToken } from "../../utils/authUtils";


// const CreationCarousel = () => {
//   const {challengeId } = useParams();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [creations, setCreations] = useState<any[]>([]);
//   const [votedCreations, setVotedCreations] = useState<any[]>([]);
//   const [userIp, setUserIp] = useState("");
//   const  user = getUserDataFromToken();
//   // let ip="";

  

//   useEffect(() => {

//     const fetchCreations = async () => {
//       if (challengeId) {
//         const data = await creationStore.fetchCreationsByChallengeId(challengeId);
//         setCreations(data || []);
//       }

//     };
  
//     const fetchIpAndVotes = async () => {
//       try {
//         const response = await axios.get("https://api.ipify.org?format=json");
//         const ip = response.data.ip;
//         console.log(ip); 
//         setUserIp(ip);
        
  
//         let votedIds: any[] = [];
//         if (sessionStorage.getItem("token")) {
//           console.log("userId");
//           console.log(user.userId);
          
          
//           votedIds = await creationStore.getVotedCreationsByUser(user.userId);
//         } else {
//           console.log("ip");
//           console.log(ip);
        
//           votedIds = await creationStore.getVotedCreationsByIp(ip);
//         }
  
//         setVotedCreations(votedIds);
//       } catch (error) {
//         console.error("Error fetching IP or votes:", error);
//       }
//     };
  
//     fetchCreations();
//     fetchIpAndVotes();
//   }, [challengeId, user.userId]);
  

//   const hasVoted = (creationId:any) => {
//     return votedCreations.some(vote => vote.creationId === creationId);
//   };

//   const handleVote = async (creationId: number) => {
//     const alreadyVoted = hasVoted(creationId);
//     // const rate = votedCreations.filter((votedId: any) => votedId.creationId === creationId);
//     // if (rate.length === 0) {
//       try {
//         if (alreadyVoted) {
//           // Remove vote
//           await creationStore.vote(creationId, user.userId, Number(challengeId), userIp,-1);
          
//           // Update local state to reflect vote removal
//           setCreations(prevCreations =>
//             prevCreations.map(creation =>
//               creation.id === creationId ? { ...creation, votes: Math.max((creation.votes || 0) - 1, 0) } : creation
//             )
//           );
          
//           setVotedCreations(prevVotes =>
//             prevVotes.filter(vote => vote.creationId !== creationId)
//           );
//         } else {
//           // Add vote
//         await creationStore.vote(creationId, user.userId, Number(challengeId), userIp,1);
        
//         // עדכון מיידי של `creations` כך שמספר ההצבעות יעלה ב-1
//         setCreations((prevCreations) =>
//           prevCreations.map((creation) =>
//             creation.id === creationId ? { ...creation, votes: (creation.votes || 0) + 1 } : creation
//           )
//         );
  
//         // הוספת היצירה שהצבענו לה ל-votedCreations
//         setVotedCreations((prevItems) => [
//           ...prevItems,
//           {
//             creationId: creationId,
//             challengeId: Number(challengeId),
//             userId: Number(user.userId) || 0,
//             stars: 1,
//             ipAddress: userIp || "",
//           },
//         ]);
  
//         console.log("Updated votedCreations:", votedCreations);
//       }
//       } catch (error) {
//         console.error("Error voting:", error);
//         alert("הייתה שגיאה בהצבעה. נסה שוב מאוחר יותר.");
//       }
//     // } else {
//     //   alert("כבר הצבעת ליצירה זו!");
//     // }
//   };


//   const handleNewCreation = (newCreation: any) => {
//     setCreations((prev) => [...prev, newCreation]);
//   };

//   return (
//     <>
//       <FileUploader onUploadSuccess={handleNewCreation}  />
//       <div className="p-6 bg-gray-50 rounded-xl shadow-md max-w-6xl mx-auto">
//         {/* <div
//           className="flex justify-center items-center flex-wrap gap-8"
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "35px",
//             margin: "6%",
//             cursor: "pointer",
//             justifyContent: "center",
//             objectFit: "cover",
//             borderTopLeftRadius: "12px",
//             borderTopRightRadius: "12px",
//           }}
//         > */}
//          <div className="creation-grid">
//           {creations.map((creation) => (
//             <Card
//               key={creation.id}
//               // className="w-full sm:w-80 mb-8 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300"
//               // variant="outlined"
//               // style={{
//               //   backgroundColor: "#fff",
//               //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//               //   transform: "scale(1)",
//               //   transition: "transform 0.2s ease-in-out",
//               // }}
//               // onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//               // onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//               className="creation-card"
//             >
//           <div className="image-container">

//               <CardMedia
//                 component="img"
//                 height="350"
//                 image={creation.imageUrl}
//                 alt={creation.title}
//                 onClick={() => setSelectedImage(creation.imageUrl)}
//                 // style={{
//                 //   cursor: "pointer",
//                 //   objectFit: "cover",
//                 //   borderTopLeftRadius: "12px",
//                 //   borderTopRightRadius: "12px",
//                 // }}
//                  className="creation-image"
//               />

//              <div className="image-overlay">
//                   <div className="overlay-content">
//                     {/* <Typography variant="h6" component="h3" className="overlay-title">
//                       {creation.title}
//                     </Typography> */}
//                     <Typography variant="body2" className="overlay-creator">
//                       מאת: {creation.creatorName  || "אנונימי"}
//                     </Typography>
//                     <Typography variant="body2" className="overlay-description">
//                     תאור: {creation.description || "אין תיאור"}
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//               <CardContent className="text-center py-4">
//                 <Typography variant="h6" component="h2" className="font-semibold text-lg text-gray-800">
//                   {creation.title}
//                 </Typography>
//                 <div className="flex justify-center gap-2 mt-2">
//                   <IconButton
//                     onClick={() => handleVote(creation.id)}
//                     // // disabled={votedCreations.has(creation.id)}
//                     // className={`text-white px-4 py-2 rounded-xl shadow-lg transition duration-200 ${
//                     //   votedCreations.find(r=>r.creationId==creation.id) ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
//                     // }`}
//                     // // title={votedCreations.has(creation.id) ? "כבר הצבעת" : "הצבע ליצירה"}
//                     className="vote-button"
//                     title={hasVoted(creation.id) ? "בטל הצבעה" : "הצבע ליצירה"}
//                   >
//                     <div className="flex items-center gap-1">
//                     {hasVoted(creation.id) ? (
//                         <FaHeart className="heart-icon filled" />
//                       ) : (
//                         <FaRegHeart className="heart-icon outline" />
//                       )}
//                       <span>{creation.votes || 0}</span>
//                     </div>
//                   </IconButton>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="fixed z-50 inset-0">
//           <div className="flex items-center justify-center min-h-screen bg-black/80">
//             <img src={selectedImage || ""} alt="Full view" className="max-w-4xl max-h-[70vh] rounded-xl" onClick={() => setSelectedImage(null)} />
//           </div>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default CreationCarousel;










// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { creationStore } from "../../stores/creationStore";
// import { FaHeart, FaRegHeart, FaExpand } from "react-icons/fa";
// import { Dialog } from "@headlessui/react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   DialogContent,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import './CreationCarousel.css';
// import axios from "axios";
// import { getUserDataFromToken } from "../../utils/authUtils";
// import FileUploader from "./FileUploader ";
// import ChatBotPanel from "../AI/ChatBotPanel";
// import challengeStore from "../../stores/challengeStore";


// const CreationCarousel = () => {
//   const {challengeId } = useParams();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [creations, setCreations] = useState<any[]>([]);
//   const [votedCreations, setVotedCreations] = useState<any[]>([]);
//   const [userIp, setUserIp] = useState("");
//   const [challengeTopic, setChallengeTopic] = useState("");
//   const [challengeDescription, setchallengeDescription] = useState("");
//   const [isChallengeActive, setIsChallengeActive] = useState(true); 
//   const user = getUserDataFromToken();
  
//   useEffect(() => {
//     const fetchCreations = async () => {
//       if (challengeId) {
//         const data = await creationStore.fetchCreationsByChallengeId(challengeId);
//         setCreations(data || []);
//       }
//     };
  
//     const fetchIpAndVotes = async () => {
//       try {
//         const response = await axios.get("https://api.ipify.org?format=json");
//         const ip = response.data.ip;
//         console.log(ip); 
//         setUserIp(ip);
        
//         let votedIds: any[] = [];
//         if (sessionStorage.getItem("token")) {
//           console.log("userId");
//           console.log(user.userId);
          
//           votedIds = await creationStore.getVotedCreationsByUser(user.userId);
//         } else {
//           console.log("ip");
//           console.log(ip);
        
//           votedIds = await creationStore.getVotedCreationsByIp(ip);
//         }
  
//         setVotedCreations(votedIds);
//       } catch (error) {
//         console.error("Error fetching IP or votes:", error);
//       }
//     };
   
//     challengeStore.fetchChallengeById(challengeId).then((data: any) => {
//       console.log("data", data);
//       if (data ) {
//         setChallengeTopic(data.title);
//         setchallengeDescription(data.description);
//         const endDate = new Date(data.endDate); // ✅ בדיקת תאריך
//         setIsChallengeActive(endDate > new Date());

//       }
//     }).catch((error) => {
//       console.error("Error fetching challenge topic:", error);
//     });
    
//     fetchCreations();
//     fetchIpAndVotes();
//   }, [challengeId, user.userId]);
  
//   const hasVoted = (creationId:any) => {
//     return votedCreations.some(vote => vote.creationId === creationId);
//   };

//   const handleVote = async (creationId: number) => {

//     if (!isChallengeActive) {
//       alert("ההצבעה הסתיימה. לא ניתן להצביע יותר.");
//       return;
//     }

//     const alreadyVoted = hasVoted(creationId);
//     try {
//       if (alreadyVoted) {
//         // Remove vote
//         await creationStore.vote(creationId, user.userId, Number(challengeId), userIp, -1);
        
//         // Update local state to reflect vote removal
//         setCreations(prevCreations =>
//           prevCreations.map(creation =>
//             creation.id === creationId ? { ...creation, votes: Math.max((creation.votes || 0) - 1, 0) } : creation
//           )
//         );
        
//         setVotedCreations(prevVotes =>
//           prevVotes.filter(vote => vote.creationId !== creationId)
//         );
//       } else {
//         // Add vote
//         await creationStore.vote(creationId, user.userId, Number(challengeId), userIp, 1);
        
//         // עדכון מיידי של `creations` כך שמספר ההצבעות יעלה ב-1
//         setCreations((prevCreations) =>
//           prevCreations.map((creation) =>
//             creation.id === creationId ? { ...creation, votes: (creation.votes || 0) + 1 } : creation
//           )
//         );
  
//         // הוספת היצירה שהצבענו לה ל-votedCreations
//         setVotedCreations((prevItems) => [
//           ...prevItems,
//           {
//             creationId: creationId,
//             challengeId: Number(challengeId),
//             userId: Number(user.userId) || 0,
//             stars: 1,
//             ipAddress: userIp || "",
//           },
//         ]);
  
//         console.log("Updated votedCreations:", votedCreations);
//       }
//     } catch (error) {
//       console.error("Error voting:", error);
//       alert("הייתה שגיאה בהצבעה. נסה שוב מאוחר יותר.");
//     }
//   };

//   const handleNewCreation = (newCreation: any) => {
//     setCreations((prev) => [...prev, newCreation]);
//   };

//   return (
//     <>
  
//     {isChallengeActive && (<>
//         <FileUploader onUploadSuccess={handleNewCreation} />
//         <ChatBotPanel 
//                   challengeTopic= {challengeTopic}
//                   challengeDescription={challengeDescription}
//          />
//         </>
//     )}
    
//       <div className="p-6 bg-gray-50 rounded-xl shadow-md max-w-6xl mx-auto">
//         <div className="creation-grid">
//           {creations.map((creation) => (
//             <Card
//               key={creation.id}
//               className="creation-card"
//             >
//               <div className="image-container relative">
//                 <CardMedia
//                   component="img"
//                   height="350"
//                   image={creation.imageUrl}
//                   alt={creation.title}
//                   className="creation-image"
//                 />
//                 <IconButton
//                   onClick={() => setSelectedImage(creation.imageUrl)
//                   }
//                   className="expand-button"
//                   style={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     backgroundColor: "rgba(255, 255, 255, 0.7)",
//                     padding: "4px",
//                   }}
//                 >
//                   <FaExpand />
//                 </IconButton>
//               </div>

//               <CardContent className="text-center py-4" style={{display:"flex", justifyContent:"space-between"}}>
//                 {/* <Typography variant="h6" component="h2" className="font-semibold text-lg text-gray-800">
//                   {creation.title}
//                 </Typography> */}
                
//                 <div className="flex justify-center gap-2 mt-2">
                  
//                   <IconButton
//                     onClick={() => handleVote(creation.id)}
//                     className="vote-button"
//                     title={hasVoted(creation.id) ? "בטל הצבעה" : "הצבע ליצירה"}
//                   >
//                     <div className="flex items-center gap-1">
//                       {hasVoted(creation.id) ? (
//                         <FaHeart className="heart-icon filled" />
//                       ) : (
//                         <FaRegHeart className="heart-icon outline" />
//                       )}
//                       <span>{creation.votes || 0}</span>
//                     </div>
//                   </IconButton>
//                 </div>

//                 <div >
//                 <Typography variant="body2" className="creator-info mb-2">
//                   מאת: {creation.creatorName || "אנונימי"}
//                 </Typography>
                
                
                
//                   <Typography variant="body2" className="description-info mb-3">
//                     תיאור: {creation.description || "אין תיאור"}
//                   </Typography>
//                 </div>
                
//               </CardContent>
//             </Card>
//           ))}
//         </div>



//   <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)}>
//   <DialogContent style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 0 }}>
//     {selectedImage && (
//       <img
//         src={selectedImage}
//         alt="Full view"
//         style={{
//           maxWidth: "100%",
//           maxHeight: "80vh",
//           display: "block",
//           margin: "0 auto",
//           borderRadius: "12px",
//           cursor: "pointer",
//         }}
//         onClick={() => setSelectedImage(null)}
//       />
//     )}
//     <h1>xrcvybui</h1>
//   </DialogContent>
// </Dialog>


        
//       </div>

//       <footer className="simple-footer">
//         <div className="footer-content">
//           <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default CreationCarousel;





// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { creationStore } from "../../stores/creationStore"
// import { FaHeart, FaRegHeart, FaExpand } from "react-icons/fa"
// import { Card, CardContent, CardMedia, IconButton, Typography, Modal, Box } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import "./CreationCarousel.css"
// import axios from "axios"
// import { getUserDataFromToken } from "../../utils/authUtils"
// import FileUploader from "./FileUploader "
// import ChatBotPanel from "../AI/ChatBotPanel"
// import challengeStore from "../../stores/challengeStore"

// const CreationCarousel = () => {
//   const { challengeId } = useParams()
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [creations, setCreations] = useState<any[]>([])
//   const [votedCreations, setVotedCreations] = useState<any[]>([])
//   const [userIp, setUserIp] = useState("")
//   const [challengeTopic, setChallengeTopic] = useState("")
//   const [challengeDescription, setchallengeDescription] = useState("")
//   const [isChallengeActive, setIsChallengeActive] = useState(true)
//   const user = getUserDataFromToken()

//   useEffect(() => {
//     const fetchCreations = async () => {
//       if (challengeId) {
//         const data = await creationStore.fetchCreationsByChallengeId(challengeId)
//         setCreations(data || [])
//       }
//     }

//     const fetchIpAndVotes = async () => {
//       try {
//         const response = await axios.get("https://api.ipify.org?format=json")
//         const ip = response.data.ip
//         console.log(ip)
//         setUserIp(ip)

//         let votedIds: any[] = []
//         if (sessionStorage.getItem("token")) {
//           console.log("userId")
//           console.log(user.userId)

//           votedIds = await creationStore.getVotedCreationsByUser(user.userId)
//         } else {
//           console.log("ip")
//           console.log(ip)

//           votedIds = await creationStore.getVotedCreationsByIp(ip)
//         }

//         setVotedCreations(votedIds)
//       } catch (error) {
//         console.error("Error fetching IP or votes:", error)
//       }
//     }

//     challengeStore
//       .fetchChallengeById(challengeId)
//       .then((data: any) => {
//         console.log("data", data)
//         if (data) {
//           setChallengeTopic(data.title)
//           setchallengeDescription(data.description)
//           const endDate = new Date(data.endDate) 
//           setIsChallengeActive(endDate > new Date())
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching challenge topic:", error)
//       })

//     fetchCreations()
//     fetchIpAndVotes()
//   }, [challengeId, user.userId])

//   const hasVoted = (creationId: any) => {
//     return votedCreations.some((vote) => vote.creationId === creationId)
//   }

//   const handleVote = async (creationId: number) => {
//     if (!isChallengeActive) {
//       alert("ההצבעה הסתיימה. לא ניתן להצביע יותר.")
//       return
//     }

//     const alreadyVoted = hasVoted(creationId)
//     try {
//       if (alreadyVoted) {
//         // Remove vote
//         await creationStore.vote(creationId, user.userId, Number(challengeId), userIp, -1)

//         // Update local state to reflect vote removal
//         setCreations((prevCreations) =>
//           prevCreations.map((creation) =>
//             creation.id === creationId ? { ...creation, votes: Math.max((creation.votes || 0) - 1, 0) } : creation,
//           ),
//         )

//         setVotedCreations((prevVotes) => prevVotes.filter((vote) => vote.creationId !== creationId))
//       } else {
//         // Add vote
//         await creationStore.vote(creationId, user.userId, Number(challengeId), userIp, 1)

//         // עדכון מיידי של `creations` כך שמספר ההצבעות יעלה ב-1
//         setCreations((prevCreations) =>
//           prevCreations.map((creation) =>
//             creation.id === creationId ? { ...creation, votes: (creation.votes || 0) + 1 } : creation,
//           ),
//         )

//         // הוספת היצירה שהצבענו לה ל-votedCreations
//         setVotedCreations((prevItems) => [
//           ...prevItems,
//           {
//             creationId: creationId,
//             challengeId: Number(challengeId),
//             userId: Number(user.userId) || 0,
//             stars: 1,
//             ipAddress: userIp || "",
//           },
//         ])

//         console.log("Updated votedCreations:", votedCreations)
//       }
//     } catch (error) {
//       console.error("Error voting:", error)
//       alert("הייתה שגיאה בהצבעה. נסה שוב מאוחר יותר.")
//     }
//   }

//   const handleNewCreation = (newCreation: any) => {
//     setCreations((prev) => [...prev, newCreation])
//   }

//   return (
//     <>
//     <ChatBotPanel challengeTopic={challengeTopic} challengeDescription={challengeDescription} />
//       {isChallengeActive && (
//         <>
//           <FileUploader onUploadSuccess={handleNewCreation} />
//           <ChatBotPanel challengeTopic={challengeTopic} challengeDescription={challengeDescription} />
//         </>
//       )}

//       <div className="p-6 bg-gray-50 rounded-xl shadow-md max-w-6xl mx-auto">
//         <div className="creation-grid">
//           {creations.map((creation) => (
//             <Card key={creation.id} className="creation-card">
//               <div className="image-container relative">
//                 <CardMedia
//                   component="img"
//                   height="350"
//                   image={creation.imageUrl}
//                   alt={creation.title}
//                   className="creation-image"
//                 />
//                 <IconButton
//                   onClick={() => setSelectedImage(creation.imageUrl)}
//                   className="expand-button"
//                   style={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     backgroundColor: "rgba(255, 255, 255, 0.7)",
//                     padding: "4px",
//                   }}
//                 >
//                   <FaExpand />
//                 </IconButton>
//               </div>

//               <CardContent className="text-center py-4" style={{ display: "flex", justifyContent: "space-between" }}>
//                 {/* <Typography variant="h6" component="h2" className="font-semibold text-lg text-gray-800">
//                   {creation.title}
//                 </Typography> */}

//                 <div className="flex justify-center gap-2 mt-2">
//                   <IconButton
//                     onClick={() => handleVote(creation.id)}
//                     className="vote-button"
//                     title={hasVoted(creation.id) ? "בטל הצבעה" : "הצבע ליצירה"}
//                   >
//                     <div className="flex items-center gap-1">
//                       {hasVoted(creation.id) ? (
//                         <FaHeart className="heart-icon filled" />
//                       ) : (
//                         <FaRegHeart className="heart-icon outline" />
//                       )}
//                       <span>{creation.votes || 0}</span>
//                     </div>
//                   </IconButton>
//                 </div>

//                 <div>
//                   <Typography variant="body2" className="creator-info mb-2">
//                     מאת: {creation.creatorName || "אנונימי"}
//                   </Typography>

//                   <Typography variant="body2" className="description-info mb-3">
//                     תיאור: {creation.description || "אין תיאור"}
//                   </Typography>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <Modal
//           open={!!selectedImage}
//           onClose={() => setSelectedImage(null)}
//           aria-labelledby="image-modal-title"
//           aria-describedby="image-modal-description"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             bgcolor: "rgba(0, 0, 0, 0.8)",
//           }}
//         >
//           <Box
//             sx={{
//               position: "relative",
//               maxWidth: "90%",
//               maxHeight: "90%",
//               outline: "none",
//             }}
//           >
//             {selectedImage && (
//               <img
//                 src={selectedImage || "/placeholder.svg"}
//                 alt="תצוגה מלאה"
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "80vh",
//                   display: "block",
//                   margin: "0 auto",
//                   borderRadius: "8px",
//                 }}
//               />
//             )}
//             <IconButton
//               aria-label="סגור"
//               onClick={() => setSelectedImage(null)}
//               sx={{
//                 position: "absolute",
//                 top: -40,
//                 right: -40,
//                 color: "white",
//                 bgcolor: "rgba(0, 0, 0, 0.5)",
//                 "&:hover": {
//                   bgcolor: "rgba(0, 0, 0, 0.7)",
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </Modal>
//       </div>

//       <footer className="simple-footer">
//         <div className="footer-content">
//           <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   )
// }

// export default CreationCarousel



"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { creationStore } from "../../stores/creationStore"
import { FaHeart, FaRegHeart, FaExpand, FaCalendarAlt, FaInfoCircle, FaSpinner } from "react-icons/fa"
import { Card, CardContent, CardMedia, IconButton, Typography, Modal, Box, Tooltip, Fade } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import "./CreationCarousel.css"
import axios from "axios"
import { getUserDataFromToken } from "../../utils/authUtils"
import FileUploader from "./FileUploader "
import ChatBotPanel from "../AI/ChatBotPanel"
import challengeStore from "../../stores/challengeStore"

const CreationCarousel = () => {
  const { challengeId } = useParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCreation, setSelectedCreation] = useState<any | null>(null)
  const [creations, setCreations] = useState<any[]>([])
  const [votedCreations, setVotedCreations] = useState<any[]>([])
  const [userIp, setUserIp] = useState("")
  const [challengeTopic, setChallengeTopic] = useState("")
  const [challengeDescription, setcChallengeDescription] = useState("")
  const [isChallengeActive, setIsChallengeActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [challengeData, setChallengeData] = useState<any>(null)
  const user = getUserDataFromToken()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        // Fetch challenge data
        if (challengeId) {
          const data = await challengeStore.fetchChallengeById(challengeId)
          if (data) {
            setChallengeData(data)
            setChallengeTopic(data.title)
            setcChallengeDescription(data.description)
            const endDate = new Date(data.endDate)
            setIsChallengeActive(endDate > new Date())
          }
        }

        // Fetch creations
        if (challengeId) {
          const data = await creationStore.fetchCreationsByChallengeId(challengeId)
          setCreations(data || [])
        }

        // Fetch IP and votes
        const response = await axios.get("https://api.ipify.org?format=json")
        const ip = response.data.ip
        setUserIp(ip)

        let votedIds: any[] = []
        if (sessionStorage.getItem("token")) {
          votedIds = await creationStore.getVotedCreationsByUser(user.userId)
        } else {
          votedIds = await creationStore.getVotedCreationsByIp(ip)
        }

        setVotedCreations(votedIds)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        // Add a small delay to make the loading animation visible
        setTimeout(() => {
          setLoading(false)
        }, 800)
      }
    }

    fetchData()
  }, [challengeId, user.userId])

  const hasVoted = (creationId: any) => {
    return votedCreations.some((vote) => vote.creationId === creationId)
  }

  const handleVote = async (creationId: number, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent opening the modal when clicking the vote button

    if (!isChallengeActive) {
      alert("ההצבעה הסתיימה. לא ניתן להצביע יותר.")
      return
    }

    const alreadyVoted = hasVoted(creationId)
    try {
      if (alreadyVoted) {
        // Remove vote
        await creationStore.vote(creationId, user.userId, Number(challengeId), userIp, -1)

        // Update local state to reflect vote removal
        setCreations((prevCreations) =>
          prevCreations.map((creation) =>
            creation.id === creationId ? { ...creation, votes: Math.max((creation.votes || 0) - 1, 0) } : creation,
          ),
        )

        setVotedCreations((prevVotes) => prevVotes.filter((vote) => vote.creationId !== creationId))
      } else {
        // Add vote
        await creationStore.vote(creationId, user.userId, Number(challengeId), userIp, 1)

        // עדכון מיידי של `creations` כך שמספר ההצבעות יעלה ב-1
        setCreations((prevCreations) =>
          prevCreations.map((creation) =>
            creation.id === creationId ? { ...creation, votes: (creation.votes || 0) + 1 } : creation,
          ),
        )

        // הוספת היצירה שהצבענו לה ל-votedCreations
        setVotedCreations((prevItems) => [
          ...prevItems,
          {
            creationId: creationId,
            challengeId: Number(challengeId),
            userId: Number(user.userId) || 0,
            stars: 1,
            ipAddress: userIp || "",
          },
        ])
      }
    } catch (error) {
      console.error("Error voting:", error)
      alert("הייתה שגיאה בהצבעה. נסה שוב מאוחר יותר.")
    }
  }

  const handleNewCreation = (newCreation: any) => {
    setCreations((prev) => [...prev, newCreation])
  }

  const handleImageClick = (creation: any) => {
    setSelectedImage(creation.imageUrl)
    setSelectedCreation(creation)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="spinner-container">
        <FaSpinner className="spinner-icon" />
        <div className="loading-text">טוען יצירות...</div>
      </div>
    )
  }

  return (
    <>
      {isChallengeActive && (
        <>
          <FileUploader onUploadSuccess={handleNewCreation} />
          <ChatBotPanel challengeTopic={challengeTopic} challengeDescription={challengeDescription} />
        </>
      )}

      <div className="creations-container">
        {/* Decorative elements */}
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>

        <div className="creations-header">
          <h2 className="creations-title">יצירות לאתגר: {challengeTopic}</h2>
          <p className="creations-subtitle">
            {isChallengeActive
              ? "הצביעו ליצירות האהובות עליכם והעלו את היצירות שלכם"
              : "ההצבעה לאתגר זה הסתיימה. תוכלו לצפות ביצירות שהועלו"}
          </p>
        </div>

        {creations.length > 0 ? (
          <div className="creation-grid" ref={gridRef}>
            {creations.map((creation, index) => (
              <Card
                key={creation.id}
                className="creation-card"
                onClick={() => handleImageClick(creation)}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                <div className="image-container">
                  <CardMedia
                    component="img"
                    image={creation.imageUrl}
                    alt={creation.title || "יצירה"}
                    className="creation-image"
                  />
                  <Tooltip title="הצג בגודל מלא" placement="top">
                    <IconButton
                      className="expand-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageClick(creation)
                      }}
                    >
                      <FaExpand />
                    </IconButton>
                  </Tooltip>
                </div>

                <CardContent className="card-content">
                  {/* Description first */}
                  {creation.description && (
                    <div className="description-container">
                      <Typography className="description-label">תיאור:</Typography>
                      <Typography className="description-info">{creation.description}</Typography>
                    </div>
                  )}

                  {/* Bottom section with creator and votes */}
                  <div className="bottom-section">
                   

                    {/* Vote section */}
                    <Tooltip title={hasVoted(creation.id) ? "בטל הצבעה" : "הצבע ליצירה"} placement="top">
                      <IconButton
                        onClick={(e) => handleVote(creation.id, e)}
                        className="vote-button"
                        disabled={!isChallengeActive}
                      >
                        <div className="vote-count">
                          {hasVoted(creation.id) ? (
                            <FaHeart className="heart-icon filled" />
                          ) : (
                            <FaRegHeart className="heart-icon outline" />
                          )}
                          <span>{creation.votes || 0}</span>
                        </div>
                      </IconButton>
                    </Tooltip>


                     {/* Creator section */}
                     <div className="creator-section">
                     <Typography className="creator-info">{creation.creatorName || "אנונימי"}</Typography>
                      <div className="creator-avatar">
                        {creation.creatorName ? creation.creatorName.charAt(0).toUpperCase() : "A"}
                      </div>
                      
                    </div>
                  </div>

                  {/* Date at the bottom */}
                  {creation.createdAt && (
                    <div className="creation-date">
                      <FaCalendarAlt className="date-icon" />
                      <span>{formatDate(creation.createdAt)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-creations">
            <FaInfoCircle className="no-creations-icon" />
            <p className="no-creations-text">אין יצירות עדיין לאתגר זה. היו הראשונים להעלות יצירה!</p>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      <Modal
        open={!!selectedImage}
        onClose={() => {
          setSelectedImage(null)
          setSelectedCreation(null)
        }}
        className="image-modal"
        closeAfterTransition
      >
        <Fade in={!!selectedImage}>
          <Box className="modal-content">
            {selectedImage && (
              <>
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={selectedCreation?.title || "תצוגה מלאה"}
                  className="modal-image"
                />

                {selectedCreation && (
                  <div className="modal-info">
                    {selectedCreation.title && (
                      <Typography className="modal-title">{selectedCreation.title}</Typography>
                    )}

                    <Typography className="modal-creator">יוצר: {selectedCreation.creatorName || "אנונימי"}</Typography>

                    {selectedCreation.description && (
                      <Typography className="modal-description">{selectedCreation.description}</Typography>
                    )}
                  </div>
                )}

                <IconButton
                  className="modal-close-button"
                  onClick={() => {
                    setSelectedImage(null)
                    setSelectedCreation(null)
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <footer className="simple-footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default CreationCarousel
