
//נסיון ראשוני עיצוב של GPT
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, InputBase, Button, CircularProgress } from '@mui/material';

// const ChatBotPanel = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(false);
//   const url = "https://localhost:7143";

//   const askChatBot = async () => {
//     if (!question.trim()) return;
//     setLoading(true);
//     try {
//       const res = await axios.post(`${url}/api/chat`, {
//         prompt: "אתה עוזר חכם, ענה תשובה מועילה בעברית.",
//         question: question
//       });
//       setAnswer(res.data.choices[0].message.content); // השרת מחזיר טקסט ישירות
//     } catch (e) {
//       setAnswer('⚠️ קרתה שגיאה בשליחה לשרת.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="max-w-2xl mx-auto my-10 p-6 rounded-2xl shadow-lg border">
//       <CardContent>
//         <h2 className="text-2xl font-bold mb-4">🧠 שאל את ה-Chatbot</h2>
//         <div className="flex gap-2 mb-4">
//           <InputBase
//             className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
//             placeholder="מה אתה רוצה לדעת?"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             fullWidth
//           />
//           <Button
//             onClick={askChatBot}
//             disabled={loading}
//             variant="contained"
//             color="primary"
//           >
//             {loading ? <CircularProgress size={24} /> : 'שלח'}
//           </Button>
//         </div>
//         {answer && (
//           <div className="bg-white border p-4 rounded-md mt-2 whitespace-pre-wrap">
//             {answer}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ChatBotPanel;











//מעוצב יפה ולא עובד בשליחה לשרת
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Modal,
//   Typography,
//   TextField,
//   List,
//   IconButton,
//   Avatar,
//   Paper,
//   Fab,
//   Tooltip,
//   Zoom,
//   Fade,
//   Backdrop,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import PersonIcon from "@mui/icons-material/Person";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";

// export default function ChatBotPanel({
//   challengeTopic,
//   challengeDescription,
// }: {
//   challengeTopic: string;
//   challengeDescription: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<null | HTMLDivElement>(null);
//   const inputRef = useRef<null | HTMLInputElement>(null);
//   const url = "https://localhost:7143";
  
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//     if (open && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [chat, open]);

//   const handleOpen = async () => {
//     setOpen(true);
//     setChat([]); // Initialize chat
//     await sendMessage(
//       "system",
//       `You are a creative assistant on the PicBattle website, where users create AI images based on challenges. Talk only about the website, challenges, inspiration, creativity, and ratings.`
//     );
//     await sendMessage(
//       "user",
//       `The current challenge is: "${challengeTopic}". Challenge description: "${challengeDescription}". Give me prompt ideas.`
//     );
//   };

//   const sendMessage = async (role: string, content: string) => {
//     setChat((prev) => [...prev, { role, content }]);
//     if (role === "user" || role === "system") {
//       setLoading(true);
//       try {
//         const response = await axios.post(`${url}/api/chat`, {
//           messages: [...chat, { role, content }],
//         });
//         const botReply = response.data.reply;
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: botReply,
//           },
//         ]);
//       } catch (err) {
//         console.error("Error during chat:", err);
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, I encountered an error. Please try again.",
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     await sendMessage("user", input.trim());
//     setInput("");
//   };

//   // Function to format message content with better spacing
//   const formatMessageContent = (content: string) => {
//     return content.split("\n\n").map((paragraph, idx) => (
//       <Typography key={idx} component="p" sx={{ mb: 1 }}>
//         {paragraph}
//       </Typography>
//     ));
//   };

//   return (
//     <>
//       <Tooltip
//         title="קבל רעיונות יצירתיים"
//         placement="left"
//         TransitionComponent={Zoom}
//         arrow
//       >
//         <Fab
//           onClick={handleOpen}
//           aria-label="chat"
//           sx={{
//             position: "fixed",
//             right: 30,
//             bottom: 80, // Positioned above the upload button
//             zIndex: 1000,
//             width: 60,
//             height: 60,
//             background: "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
//             boxShadow: "0 4px 15px rgba(138, 79, 255, 0.4)",
//             color: "white",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               transform: "scale(1.05) rotate(5deg)",
//               boxShadow: "0 6px 16px rgba(138, 79, 255, 0.6)",
//             },
//           }}
//         >
//           <LightbulbIcon />
//         </Fab>
//       </Tooltip>

//       <Modal 
//         open={open} 
//         onClose={() => setOpen(false)} 
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//           sx: { backdropFilter: "blur(3px)" }
//         }}
//       >
//         <Fade in={open}>
//           <Paper
//             elevation={24}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { xs: "90%", sm: 480 },
//               maxHeight: "80vh",
//               borderRadius: 3,
//               overflow: "hidden",
//               boxShadow: "0 15px 50px rgba(0, 0, 0, 0.12)",
//               border: "1px solid rgba(138, 79, 255, 0.1)",
//               display: "flex",
//               flexDirection: "column",
//               direction: "rtl",
//             }}
//           >
//             {/* Chat Header */}
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{
//                 p: 2,
//                 background: "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
//                 color: "white",
//                 position: "relative",
//               }}
//             >
//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Avatar
//                   sx={{
//                     bgcolor: "white",
//                     color: "#8A4FFF",
//                     width: 36,
//                     height: 36,
//                     boxShadow: "0 2px 6px rgba(138, 79, 255, 0.3)",
//                   }}
//                 >
//                   <LightbulbIcon sx={{ fontSize: 20 }} />
//                 </Avatar>
//                 <Box>
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight={600}
//                     sx={{ lineHeight: 1.2 }}
//                   >
//                     עוזר יצירתי
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{ opacity: 0.8, fontSize: "0.75rem" }}
//                   >
//                     {challengeTopic}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton
//                 onClick={() => setOpen(false)}
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.15)",
//                   },
//                 }}
//                 size="small"
//               >
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </Box>

//             {/* Chat Messages */}
//             <List
//               sx={{
//                 flexGrow: 1,
//                 overflowY: "auto",
//                 p: 2,
//                 background: "#F9F9FF",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//               }}
//             >
//               {chat
//                 .filter((m) => m.role !== "system")
//                 .map((message, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems:
//                         message.role === "user" ? "flex-start" : "flex-end",
//                       maxWidth: "100%",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "flex-start",
//                         flexDirection:
//                           message.role === "user" ? "row" : "row-reverse",
//                         gap: 1.5,
//                         maxWidth: "85%",
//                       }}
//                     >
//                       <Avatar
//                         sx={{
//                           bgcolor:
//                             message.role === "user"
//                               ? "white"
//                               : "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
//                           color:
//                             message.role === "user" ? "#8A4FFF" : "white",
//                           width: 32,
//                           height: 32,
//                           boxShadow:
//                             message.role === "user"
//                               ? "0 3px 8px rgba(0, 0, 0, 0.06)"
//                               : "0 3px 8px rgba(138, 79, 255, 0.3)",
//                         }}
//                       >
//                         {message.role === "user" ? (
//                           <PersonIcon sx={{ fontSize: 18 }} />
//                         ) : (
//                           <SmartToyIcon sx={{ fontSize: 18 }} />
//                         )}
//                       </Avatar>

//                       <Box sx={{ maxWidth: "100%" }}>
//                         <Paper
//                           elevation={message.role === "user" ? 1 : 0}
//                           sx={{
//                             p: 2,
//                             backgroundColor:
//                               message.role === "user"
//                                 ? "white"
//                                 : "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
//                             color: message.role === "user" ? "#444" : "white",
//                             borderRadius:
//                               message.role === "user"
//                                 ? "4px 18px 18px 18px"
//                                 : "18px 4px 18px 18px",
//                             wordBreak: "break-word",
//                             boxShadow:
//                               message.role === "user"
//                                 ? "0 2px 6px rgba(0, 0, 0, 0.06)"
//                                 : "0 3px 10px rgba(138, 79, 255, 0.2)",
//                             position: "relative",
//                             ...(message.role === "user" && {
//                               "&:before": {
//                                 content: '""',
//                                 position: "absolute",
//                                 top: 0,
//                                 right: 0,
//                                 width: 3,
//                                 height: "100%",
//                                 background:
//                                   "linear-gradient(to bottom, #8A4FFF, #4FC1FF)",
//                                 borderRadius: "0 4px 18px 0",
//                               },
//                             }),
//                           }}
//                         >
//                           {formatMessageContent(message.content)}
//                         </Paper>

//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "#666",
//                             fontSize: "0.65rem",
//                             mt: 0.5,
//                             display: "block",
//                             textAlign:
//                               message.role === "user" ? "left" : "right",
//                             px: 0.5,
//                           }}
//                         >
//                           {new Date().toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 ))}

//               {loading && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                     alignSelf: "flex-end",
//                     mr: 6,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       gap: 0.5,
//                       p: 1,
//                       borderRadius: 2,
//                       backgroundColor: "rgba(138, 79, 255, 0.1)",
//                     }}
//                   >
//                     {[0, 0.3, 0.6].map((delay, i) => (
//                       <Box
//                         key={i}
//                         sx={{
//                           width: 6,
//                           height: 6,
//                           borderRadius: "50%",
//                           backgroundColor: "#8A4FFF",
//                           animation: "pulse 1.2s infinite ease-in-out",
//                           animationDelay: `${delay}s`,
//                           "@keyframes pulse": {
//                             "0%, 100%": {
//                               opacity: 0.4,
//                               transform: "scale(0.75)",
//                             },
//                             "50%": { opacity: 1, transform: "scale(1.2)" },
//                           },
//                         }}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}
//               <div ref={messagesEndRef} />
//             </List>

//             {/* Chat Input */}
//             <Box
//               display="flex"
//               gap={1.5}
//               p={2}
//               sx={{
//                 backgroundColor: "white",
//                 borderTop: "1px solid rgba(138, 79, 255, 0.2)",
//               }}
//             >
//               <TextField
//                 fullWidth
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) =>
//                   e.key === "Enter" && !e.shiftKey && handleSend()
//                 }
//                 placeholder="הקלד את הודעתך..."
//                 size="small"
//                 inputRef={inputRef}
//                 multiline
//                 maxRows={3}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "30px",
//                     backgroundColor: "#F9F9FF",
//                     "& fieldset": {
//                       borderColor: "rgba(138, 79, 255, 0.3)",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#8A4FFF",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#8A4FFF",
//                       borderWidth: 1.5,
//                     },
//                   },
//                   "& .MuiInputBase-input": {
//                     padding: "12px 20px",
//                     fontSize: "0.95rem",
//                     color: "#444",
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleSend}
//                 disabled={loading || !input.trim()}
//                 sx={{
//                   minWidth: "44px",
//                   width: "44px",
//                   height: "44px",
//                   borderRadius: "50%",
//                   padding: 0,
//                   background: input.trim()
//                     ? "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)"
//                     : "#e8edff",
//                   color: input.trim() ? "white" : "#adb5bd",
//                   boxShadow: input.trim()
//                     ? "0 4px 15px rgba(138, 79, 255, 0.4)"
//                     : "none",
//                   "&:hover": {
//                     background: input.trim()
//                       ? "linear-gradient(135deg, #7A3FEF 0%, #3FB1EF 100%)"
//                       : "#e8edff",
//                     transform: input.trim() ? "scale(1.05)" : "none",
//                     boxShadow: input.trim()
//                       ? "0 8px 25px rgba(138, 79, 255, 0.5)"
//                       : "none",
//                   },
//                 }}
//               >
//                 <SendIcon fontSize="small" />
//               </Button>
//             </Box>
//           </Paper>
//         </Fade>
//       </Modal>
//     </>
//   );
// }




















//לא עובד  נופל בשליחה לשרת
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Modal,
//   Typography,
//   TextField,
//   List,
//   IconButton,
//   Avatar,
//   Paper,
//   Divider,
//   Fade,
//   Fab,
//   Tooltip,
//   Zoom,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import PersonIcon from "@mui/icons-material/Person";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";


// export default function ChatBotPanel({
//   challengeTopic,
//   challengeDescription,
// }: {
//   challengeTopic: string;
//   challengeDescription: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<null | HTMLDivElement>(null);
//   const inputRef = useRef<null | HTMLInputElement>(null);
//   const url = "https://localhost:7143";
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//     if (open && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [chat, open]);

//   const handleOpen = async () => {
//     setOpen(true);
//     setChat([]); // Initialize chat
//     await sendMessage(
//       "system",
//       `You are a creative assistant on the PicBattle website, where users create AI images based on challenges. Talk only about the website, challenges, inspiration, creativity, and ratings.`
//     );
//     await sendMessage(
//       "user",
//       `The current challenge is: "${challengeTopic}". Challenge description: "${challengeDescription}". Give me prompt ideas.`
//     );
//   };

//   const sendMessage = async (role: string, content: string) => {
//     setChat((prev) => [...prev, { role, content }]);
//     if (role === "user" || role === "system") {
//       setLoading(true);
//       try {
//         const response = await axios.post(`${url}/api/chat`, {
//           messages: [...chat, { role, content }],
//         });
//         const botReply = response.data.reply;
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: botReply,
//           },
//         ]);
//       } catch (err) {
//         console.error("Error during chat:", err);
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, I encountered an error. Please try again.",
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     await sendMessage("user", input.trim());
//     setInput("");
//   };

//   // Function to format message content with better spacing
//   const formatMessageContent = (content: string) => {
//     return content.split("\n\n").map((paragraph, idx) => (
//       <Typography key={idx} component="p" sx={{ mb: 1 }}>
//         {paragraph}
//       </Typography>
//     ));
//   };

//   return (
//     <>
//       <Tooltip
//         title="Get Creative Ideas"
//         placement="left"
//         TransitionComponent={Zoom}
//         arrow
//       >
//         <Fab
//           onClick={handleOpen}
//           aria-label="chat"
//           className="primary-button"
//           sx={{
//             position: "fixed",
//             right: 30,
//             bottom: 30,
//             zIndex: 1000,
//             background: "linear-gradient(135deg, #8fabff, #a78fff) !important",
//             boxShadow: "0 4px 15px rgba(143, 171, 255, 0.4) !important",
//             color: "#050d24 !important",
//             "&:hover": {
//               transform: "translateY(-3px) !important",
//               boxShadow: "0 8px 25px rgba(143, 171, 255, 0.5) !important",
//               transition: "all 0.3s ease !important",
//             },
//           }}
//         >
//           <LightbulbIcon />
//         </Fab>
//       </Tooltip>

//       <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
//         <Fade in={open}>
//           <Paper
//             elevation={24}
//             sx={{
//               width: { xs: "90%", sm: 480 },
//               maxHeight: "80vh",
//               margin: "auto",
//               mt: { xs: 5, sm: 10 },
//               borderRadius: 3,
//               overflow: "hidden",
//               boxShadow: "0 15px 50px rgba(0, 0, 0, 0.12)",
//               border: "1px solid rgba(143, 171, 255, 0.1)",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             {/* Chat Header */}
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{
//                 p: 2,
//                 background: "linear-gradient(135deg, #8fabff, #a78fff)",
//                 color: "#050d24",
//                 position: "relative",
//                 "&:after": {
//                   content: '""',
//                   position: "absolute",
//                   bottom: 0,
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   width: 60,
//                   height: 3,
//                   background: "linear-gradient(90deg, #8fabff, #a78fff)",
//                   opacity: 0.7,
//                 },
//               }}
//             >
//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Avatar
//                   sx={{
//                     bgcolor: "white",
//                     color: "#050d24",
//                     width: 36,
//                     height: 36,
//                     boxShadow: "0 2px 6px rgba(143, 171, 255, 0.3)",
//                   }}
//                 >
//                   <LightbulbIcon sx={{ fontSize: 20 }} />
//                 </Avatar>
//                 <Box>
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight={600}
//                     sx={{ lineHeight: 1.2 }}
//                   >
//                     Inspiration Assistant
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color="#050d24"
//                     sx={{ opacity: 0.8, fontSize: "0.75rem" }}
//                   >
//                     {challengeTopic}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton
//                 onClick={() => setOpen(false)}
//                 sx={{
//                   color: "#050d24",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.15)",
//                   },
//                 }}
//                 size="small"
//               >
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </Box>

//             {/* Chat Messages */}
//             <List
//               sx={{
//                 flexGrow: 1,
//                 overflowY: "auto",
//                 p: 2,
//                 background: "#f5f7ff",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//               }}
//             >
//               {chat
//                 .filter((m) => m.role !== "system")
//                 .map((message, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems:
//                         message.role === "user" ? "flex-end" : "flex-start",
//                       maxWidth: "100%",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "flex-start",
//                         flexDirection:
//                           message.role === "user" ? "row-reverse" : "row",
//                         gap: 1.5,
//                         maxWidth: "85%",
//                       }}
//                     >
//                       <Avatar
//                         sx={{
//                           bgcolor:
//                             message.role === "user"
//                               ? "linear-gradient(135deg, #8fabff, #a78fff)"
//                               : "white",
//                           color:
//                             message.role === "user" ? "#050d24" : "#8fabff",
//                           width: 32,
//                           height: 32,
//                           boxShadow:
//                             message.role === "user"
//                               ? "0 3px 8px rgba(143, 171, 255, 0.3)"
//                               : "0 3px 8px rgba(0, 0, 0, 0.06)",
//                         }}
//                       >
//                         {message.role === "user" ? (
//                           <PersonIcon sx={{ fontSize: 18 }} />
//                         ) : (
//                           <SmartToyIcon sx={{ fontSize: 18 }} />
//                         )}
//                       </Avatar>

//                       <Box sx={{ maxWidth: "100%" }}>
//                         <Paper
//                           elevation={message.role === "user" ? 0 : 1}
//                           sx={{
//                             p: 2,
//                             backgroundColor:
//                               message.role === "user"
//                                 ? "linear-gradient(135deg, #8fabff, #a78fff)"
//                                 : "white",
//                             color: message.role === "user" ? "#050d24" : "#444",
//                             borderRadius:
//                               message.role === "user"
//                                 ? "18px 4px 18px 18px"
//                                 : "4px 18px 18px 18px",
//                             wordBreak: "break-word",
//                             boxShadow:
//                               message.role === "user"
//                                 ? "0 3px 10px rgba(143, 171, 255, 0.2)"
//                                 : "0 2px 6px rgba(0, 0, 0, 0.06)",
//                             position: "relative",
//                             ...(message.role !== "user" && {
//                               "&:before": {
//                                 content: '""',
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: 3,
//                                 height: "100%",
//                                 background:
//                                   "linear-gradient(to bottom, #8fabff, #a78fff)",
//                                 borderRadius: "4px 0 0 18px",
//                               },
//                             }),
//                           }}
//                         >
//                           {formatMessageContent(message.content)}
//                         </Paper>

//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "#666",
//                             fontSize: "0.65rem",
//                             mt: 0.5,
//                             display: "block",
//                             textAlign:
//                               message.role === "user" ? "right" : "left",
//                             px: 0.5,
//                           }}
//                         >
//                           {new Date().toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 ))}

//               {loading && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                     alignSelf: "flex-start",
//                     ml: 6,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       gap: 0.5,
//                       p: 1,
//                       borderRadius: 2,
//                       backgroundColor: "rgba(255, 255, 255, 0.7)",
//                     }}
//                   >
//                     {[0, 0.3, 0.6].map((delay, i) => (
//                       <Box
//                         key={i}
//                         sx={{
//                           width: 6,
//                           height: 6,
//                           borderRadius: "50%",
//                           backgroundColor: "#a78fff",
//                           animation: "pulse 1.2s infinite ease-in-out",
//                           animationDelay: `${delay}s`,
//                           "@keyframes pulse": {
//                             "0%, 100%": {
//                               opacity: 0.4,
//                               transform: "scale(0.75)",
//                             },
//                             "50%": { opacity: 1, transform: "scale(1.2)" },
//                           },
//                         }}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}
//               <div ref={messagesEndRef} />
//             </List>

//             {/* Chat Input */}
//             <Box
//               display="flex"
//               gap={1.5}
//               p={2}
//               sx={{
//                 backgroundColor: "white",
//                 borderTop: "1px solid rgba(143, 171, 255, 0.2)",
//               }}
//             >
//               <TextField
//                 fullWidth
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) =>
//                   e.key === "Enter" && !e.shiftKey && handleSend()
//                 }
//                 placeholder="Type your message..."
//                 size="small"
//                 inputRef={inputRef}
//                 multiline
//                 maxRows={3}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "30px",
//                     backgroundColor: "#f5f7ff",
//                     "& fieldset": {
//                       borderColor: "rgba(143, 171, 255, 0.3)",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#a78fff",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#8fabff",
//                       borderWidth: 1.5,
//                     },
//                   },
//                   "& .MuiInputBase-input": {
//                     padding: "12px 20px",
//                     fontSize: "0.95rem",
//                     color: "#050d24",
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleSend}
//                 disabled={loading || !input.trim()}
//                 className={input.trim() ? "primary-button" : ""}
//                 sx={{
//                   minWidth: "44px",
//                   width: "44px",
//                   height: "44px",
//                   borderRadius: "50%",
//                   padding: 0,
//                   background: input.trim()
//                     ? "linear-gradient(135deg, #8fabff, #a78fff)"
//                     : "#e8edff",
//                   color: input.trim() ? "#050d24" : "#adb5bd",
//                   boxShadow: input.trim()
//                     ? "0 4px 15px rgba(143, 171, 255, 0.4)"
//                     : "none",
//                   "&:hover": {
//                     background: input.trim()
//                       ? "linear-gradient(135deg, #8fabff, #a78fff)"
//                       : "#e8edff",
//                     transform: input.trim() ? "translateY(-3px)" : "none",
//                     boxShadow: input.trim()
//                       ? "0 8px 25px rgba(143, 171, 255, 0.5)"
//                       : "none",
//                   },
//                 }}
//               >
//                 <SendIcon fontSize="small" />
//               </Button>
//             </Box>
//           </Paper>
//         </Fade>
//       </Modal>
//     </>
//   );
// }










//רחלי שחר
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
    Box, Button, Modal, Typography, TextField,
    List, IconButton, Avatar, Paper, Divider, Fade,
    Fab,
    Tooltip,
    Zoom
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
// import BoltIcon from '@mui/icons-material/Bolt';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
// import BoltIcon from '@mui/icons-material/Bolt';


export default function SendPrompt({ challengeTopic, challengeDescription }: { challengeTopic: string; challengeDescription: string; }) {
    const [open, setOpen] = useState(false);
    const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const inputRef = useRef<null | HTMLDivElement>(null);
    const apiUrl = "https://localhost:7143"; 



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chat, open]);

    const handleOpen = async () => {
        setOpen(true);
        setChat([]); // Initialize chat
        await sendMessage("system", `You are a creative assistant on the Pic a Pick website, where users create AI images based on challenges. Talk only about the website, challenges, inspiration, creativity, and ratings.`);
        await sendMessage("user", `The current challenge is: "${challengeTopic}". Challenge description: "${challengeDescription}". Give me prompt ideas.`);
    };

    const sendMessage = async (role: string, content: string) => {
        setChat((prev) => [...prev, {
            role, content
        }]
        );
        if (role === "user" || role === "system") {
            setLoading(true);
            try {
              
                const response = await axios.post(`${apiUrl}/api/chat`,
                    { messages: [...chat, { role, content }] });
                const botReply = response.data.reply;
                setChat((prev) => [...prev, {
                    role: "assistant",
                    content: botReply,
                }]);
            } catch (err) {
                console.error("Error during chat:", err);
                setChat((prev) => [...prev, {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                }]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        await sendMessage("user", input.trim());
        setInput("");
    };

    // Function to format message content with better spacing
    const formatMessageContent = (content: string) => {
        // Split by double newlines to detect paragraphs
        return content.split('\n\n').map((paragraph, idx) => (
            <Typography key={idx} component="p" sx={{ mb: 1 }}>
                {paragraph}
            </Typography>
        ));
    };

    return (
        <>
        <Tooltip 
        title="Get Creative Ideas" 
        placement="left"
        TransitionComponent={Zoom}
        arrow
      >
        <Fab
          onClick={handleOpen}
          aria-label="chat"
          sx={{
            position: 'fixed',
            right: 30,
            bottom: 30,
            zIndex: 1000,
            background: 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)',
            boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(90deg, #8e24aa 0%, #6a1b9a 100%)',
              boxShadow: '0 6px 20px rgba(156, 39, 176, 0.6)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>
            

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Paper
                        elevation={24}
                        sx={{
                            width: { xs: '90%', sm: 550 },
                            maxHeight: '80vh',
                            margin: 'auto',
                            mt: { xs: 5, sm: 10 },
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 106, 193, 0.2)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Chat Header */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                p: 2,
                                background: 'linear-gradient(90deg,rgb(247, 72, 221) 0%,rgb(243, 105, 250) 100%)',
                                color: 'white',
                                borderBottom: '1px solid rgba(0,0,0,0.1)'
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <SmartToyIcon />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>Inspiration Assistant</Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                        Challenge: {challengeTopic}
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Chat Messages */}
                        <List
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                p: 2,
                                background: '#f8f9fa',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {chat.filter(m => m.role !== 'system').map((message, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: message.role === "user" ? "flex-end" : "flex-start",
                                        mb: 2,
                                        maxWidth: '100%'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: message.role === "user" ? 'row-reverse' : 'row',
                                            gap: 1,
                                            maxWidth: '85%'
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: message.role === "user" ? '#ff6ac1' : '#6c757d',
                                                width: 32,
                                                height: 32
                                            }}
                                        >
                                            {message.role === "user" ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                                        </Avatar>

                                        <Box>
                                            <Paper
                                                elevation={1}
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: message.role === "user" ? '#ff6ac1' : 'white',
                                                    color: message.role === "user" ? 'white' : '#212529',
                                                    borderRadius: message.role === "user"
                                                        ? '20px 20px 4px 20px'
                                                        : '20px 20px 20px 4px',
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                {formatMessageContent(message.content)}
                                            </Paper>

                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.7,
                                                    mt: 0.5,
                                                    display: 'block',
                                                    textAlign: message.role === "user" ? 'right' : 'left'
                                                }}
                                            >
                                                {/* {message.timestamp} */}
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}

                            {loading && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        alignSelf: 'flex-start',
                                        ml: 6,
                                        mt: 1
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 0.5,
                                        p: 1,
                                        borderRadius: 2,
                                        backgroundColor: 'white'
                                    }}>
                                        <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#ff6ac1',
                                            animation: 'pulse 1s infinite ease-in-out',
                                            animationDelay: '0s',
                                            '@keyframes pulse': {
                                                '0%, 100%': { opacity: 0.5, transform: 'scale(0.8)' },
                                                '50%': { opacity: 1, transform: 'scale(1.2)' }
                                            }
                                        }} />
                                        <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#ff6ac1',
                                            animation: 'pulse 1s infinite ease-in-out',
                                            animationDelay: '0.3s'
                                        }} />
                                        <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#ff6ac1',
                                            animation: 'pulse 1s infinite ease-in-out',
                                            animationDelay: '0.6s'
                                        }} />
                                    </Box>
                                </Box>
                            )}
                            <div ref={messagesEndRef} />
                        </List>

                        <Divider />

                        {/* Chat Input */}
                        <Box
                            display="flex"
                            gap={1}
                            p={2}
                            sx={{
                                backgroundColor: 'white',
                                borderTop: '1px solid rgba(0,0,0,0.08)'
                            }}
                        >
                            <TextField
                                fullWidth
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                placeholder="Type your message..."
                                size="small"
                                inputRef={inputRef}
                                multiline
                                maxRows={3}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': {
                                            borderColor: 'rgba(0,0,0,0.1)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ff6ac1',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ff6ac1',
                                            borderWidth: 2
                                        },
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                sx={{
                                    minWidth: 'unset',
                                    borderRadius: '50%',
                                    width: 40,
                                    height: 40,
                                    p: 0,
                                    background: input.trim() ? 'linear-gradient(90deg,rgb(225, 52, 205) 0%,rgb(250, 84, 247) 100%)' : '#e9ecef',
                                    color: input.trim() ? 'white' : '#adb5bd',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg,rgb(234, 79, 226) 0%,rgb(235, 22, 210) 100%)',
                                    }
                                }}
                            >
                                <SendIcon fontSize="small" />
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            </Modal>
        </>
    );
}













