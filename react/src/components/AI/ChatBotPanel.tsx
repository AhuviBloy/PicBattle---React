
// // //נסיון ראשוני עיצוב של GPT
// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { Card, CardContent, InputBase, Button, CircularProgress } from '@mui/material';

// // // const ChatBotPanel = () => {
// // //   const [question, setQuestion] = useState('');
// // //   const [answer, setAnswer] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const url = "https://localhost:7143";

// // //   const askChatBot = async () => {
// // //     if (!question.trim()) return;
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.post(`${url}/api/chat`, {
// // //         prompt: "אתה עוזר חכם, ענה תשובה מועילה בעברית.",
// // //         question: question
// // //       });
// // //       setAnswer(res.data.choices[0].message.content); // השרת מחזיר טקסט ישירות
// // //     } catch (e) {
// // //       setAnswer('⚠️ קרתה שגיאה בשליחה לשרת.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Card className="max-w-2xl mx-auto my-10 p-6 rounded-2xl shadow-lg border">
// // //       <CardContent>
// // //         <h2 className="text-2xl font-bold mb-4">🧠 שאל את ה-Chatbot</h2>
// // //         <div className="flex gap-2 mb-4">
// // //           <InputBase
// // //             className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
// // //             placeholder="מה אתה רוצה לדעת?"
// // //             value={question}
// // //             onChange={(e) => setQuestion(e.target.value)}
// // //             fullWidth
// // //           />
// // //           <Button
// // //             onClick={askChatBot}
// // //             disabled={loading}
// // //             variant="contained"
// // //             color="primary"
// // //           >
// // //             {loading ? <CircularProgress size={24} /> : 'שלח'}
// // //           </Button>
// // //         </div>
// // //         {answer && (
// // //           <div className="bg-white border p-4 rounded-md mt-2 whitespace-pre-wrap">
// // //             {answer}
// // //           </div>
// // //         )}
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default ChatBotPanel;















// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import {
//     Box, Button, Modal, Typography, TextField,
//     List, IconButton, Avatar, Paper, Divider, Fade,
//     Fab,
//     Tooltip,
//     Zoom
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import SendIcon from '@mui/icons-material/Send';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import PersonIcon from '@mui/icons-material/Person';
// import ChatIcon from '@mui/icons-material/Chat';

// export default function ChatBotPanel({ challengeTopic, challengeDescription }: { challengeTopic: string; challengeDescription: string; }) {
//     const [open, setOpen] = useState(false);
//     const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
//     const messagesEndRef = useRef<null | HTMLDivElement>(null);
//     const inputRef = useRef<null | HTMLDivElement>(null);
//     const apiUrl = "https://localhost:7143"; // For local testing

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//         if (open && inputRef.current) {
//             inputRef.current.focus();
//         }
//     }, [chat, open]);

//     const handleOpen = async () => {
//         setOpen(true);
//         setChat([]); // Initialize chat
//         await sendMessage("system", `You are a creative assistant on the Pic a Pick website, where users create AI images based on challenges and competing between themselves. Talk only about the website, challenges, inspiration, creativity, and ratings.`);
//         await sendMessage("user", `The current challenge is: "${challengeTopic}". Challenge description: "${challengeDescription}". Give me prompt ideas.`);
//     };

//     const sendMessage = async (role: string, content: string) => {
//         setChat((prev) => [...prev, {
//             role, content
//             // , timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
//         }]
//         );
//         if (role === "user" || role === "system") {
//             setLoading(true);
//             try {
//                 // const requestPayload = {
//                 //     messages: [...chat, { role, content }]
//                 //     //   Topic: challengeTopic,
//                 //     //   Description: challengeDescription,
//                 //     //   UserQuestion: content // Use the content of the user message
//                 // };
//                 const response = await axios.post(`${apiUrl}/api/chat`,
//                     { messages: [...chat, { role, content }] });
//                 const botReply = response.data.reply;
//                 setChat((prev) => [...prev, {
//                     role: "assistant",
//                     content: botReply,
//                 }]);
//             } catch (err) {
//                 console.error("Error during chat:", err);
//                 setChat((prev) => [...prev, {
//                     role: "assistant",
//                     content: "Sorry, I encountered an error. Please try again.",
//                 }]);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     const handleSend = async () => {
//         if (!input.trim()) return;
//         await sendMessage("user", input.trim());
//         setInput("");
//     };

//     // Function to format message content with better spacing
//     const formatMessageContent = (content: string) => {
//         // Split by double newlines to detect paragraphs
//         return content.split('\n\n').map((paragraph, idx) => (
//             <Typography key={idx} component="p" sx={{ mb: 1 }}>
//                 {paragraph}
//             </Typography>
//         ));
//     };

//     return (
//         <>
//         <Tooltip 
//         title="Get Creative Ideas" 
//         placement="left"
//         TransitionComponent={Zoom}
//         arrow
//       >
//         <Fab
//           onClick={handleOpen}
//           aria-label="chat"
//           sx={{
//             position: 'fixed',
//             right: 30,
//             bottom: 30,
//             zIndex: 1000,
//             background: 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)',
//             boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
//             color: 'white',
//             '&:hover': {
//               background: 'linear-gradient(90deg, #8e24aa 0%, #6a1b9a 100%)',
//               boxShadow: '0 6px 20px rgba(156, 39, 176, 0.6)',
//               transform: 'scale(1.05)',
//               transition: 'all 0.3s ease'
//             }
//           }}
//         >
//           <ChatIcon />
//         </Fab>
//       </Tooltip>
//             {/* <Button
//                 onClick={handleOpen}
//                 variant="contained"
//                 startIcon={<BoltIcon />}
//                 sx={{
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     borderRadius: 2,
//                     background: 'linear-gradient(90deg, #ff6ac1 0%, #ff8dc7 100%)',
//                     boxShadow: '0 4px 15px rgba(255, 106, 193, 0.3)',
//                     color: 'white',
//                     padding: '10px 16px',
//                     '&:hover': {
//                         background: 'linear-gradient(90deg, #ff5ab8 0%, #ff7dbd 100%)',
//                         boxShadow: '0 6px 20px rgba(255, 106, 193, 0.4)',
//                         transform: 'translateY(-2px)',
//                         transition: 'all 0.3s ease'
//                     }
//                 }}
//             >
//                 Get Creative Ideas
//             </Button> */}
// <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 closeAfterTransition
//             >
//                 <Fade in={open}>
//                     <Paper
//                         elevation={24}
//                         sx={{
//                             width: { xs: '90%', sm: 550 },
//                             maxHeight: '80vh',
//                             margin: 'auto',
//                             mt: { xs: 5, sm: 10 },
//                             borderRadius: 4,
//                             overflow: 'hidden',
//                             boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
//                             border: '1px solid rgba(128, 90, 213, 0.2)',
//                             display: 'flex',
//                             flexDirection: 'column'
//                         }}
//                     >
//                         <Box
//                             display="flex"
//                             justifyContent="space-between"
//                             alignItems="center"
//                             sx={{
//                                 p: 2,
//                                 background: 'linear-gradient(90deg, rgb(103, 58, 183) 0%, rgb(149, 117, 205) 100%)',
//                                 color: 'white',
//                                 borderBottom: '1px solid rgba(0,0,0,0.1)'
//                             }}
//                         >
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <SmartToyIcon />
//                                 <Box>
//                                     <Typography variant="subtitle1" fontWeight={600}>Inspiration Assistant</Typography>
//                                     <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                                         Challenge: {challengeTopic}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </Box>
//                         <List
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: 'auto',
//                                 p: 2,
//                                 background: '#f8f9fa',
//                                 display: 'flex',
//                                 flexDirection: 'column'
//                             }}
//                         >
//                             {chat.filter(m => m.role !== 'system').map((message, i) => (
//                                 <Box
//                                     key={i}
//                                     sx={{
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: message.role === "user" ? "flex-end" : "flex-start",
//                                         mb: 2,
//                                         maxWidth: '100%'
//                                     }}
//                                 >
//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             alignItems: 'flex-start',
//                                             flexDirection: message.role === "user" ? 'row-reverse' : 'row',
//                                             gap: 1,
//                                             maxWidth: '85%'
//                                         }}
//                                     >
//                                         <Avatar
//                                             sx={{
//                                                 bgcolor: message.role === "user" ? '#7B1FA2' : '#9575CD',
//                                                 width: 32,
//                                                 height: 32
//                                             }}
//                                         >
//                                             {message.role === "user" ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
//                                         </Avatar>

//                                         <Box>
//                                             <Paper
//                                                 elevation={1}
//                                                 sx={{
//                                                     p: 2,
//                                                     backgroundColor: message.role === "user" ? '#7B1FA2' : 'white',
//                                                     color: message.role === "user" ? 'white' : '#212529',
//                                                     borderRadius: message.role === "user"
//                                                         ? '20px 20px 4px 20px'
//                                                         : '20px 20px 20px 4px',
//                                                     wordBreak: 'break-word'
//                                                 }}
//                                             >
//                                                 {formatMessageContent(message.content)}
//                                             </Paper>

//                                             <Typography
//                                                 variant="caption"
//                                                 sx={{
//                                                     opacity: 0.7,
//                                                     mt: 0.5,
//                                                     display: 'block',
//                                                     textAlign: message.role === "user" ? 'right' : 'left'
//                                                 }}
//                                             >
//                                                 {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             ))}

//                             {loading && (
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         gap: 2,
//                                         alignSelf: 'flex-start',
//                                         ml: 6,
//                                         mt: 1
//                                     }}
//                                 >
//                                     <Box sx={{
//                                         display: 'flex',
//                                         gap: 0.5,
//                                         p: 1,
//                                         borderRadius: 2,
//                                         backgroundColor: 'white'
//                                     }}>
//                                         <Box sx={{
//                                             width: 6,
//                                             height: 6,
//                                             borderRadius: '50%',
//                                             backgroundColor: '#9C27B0',
//                                             animation: 'pulse 1s infinite ease-in-out',
//                                             animationDelay: '0s',
//                                             '@keyframes pulse': {
//                                                 '0%, 100%': { opacity: 0.5, transform: 'scale(0.8)' },
//                                                 '50%': { opacity: 1, transform: 'scale(1.2)' }
//                                             }
//                                         }} />
//                                         <Box sx={{
//                                             width: 6,
//                                             height: 6,
//                                             borderRadius: '50%',
//                                             backgroundColor: '#9C27B0',
//                                             animation: 'pulse 1s infinite ease-in-out',
//                                             animationDelay: '0.3s'
//                                         }} />
//                                         <Box sx={{
//                                             width: 6,
//                                             height: 6,
//                                             borderRadius: '50%',
//                                             backgroundColor: '#9C27B0',
//                                             animation: 'pulse 1s infinite ease-in-out',
//                                             animationDelay: '0.6s'
//                                         }} />
//                                     </Box>
//                                 </Box>
//                             )}
//                             <div ref={messagesEndRef} />
//                         </List>

//                         <Divider />

//                         <Box
//                             display="flex"
//                             gap={1}
//                             p={2}
//                             sx={{
//                                 backgroundColor: 'white',
//                                 borderTop: '1px solid rgba(0,0,0,0.08)'
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
//                                 placeholder="Type your message..."
//                                 size="small"
//                                 inputRef={inputRef}
//                                 multiline
//                                 maxRows={3}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 3,
//                                         backgroundColor: '#f8f9fa',
//                                         '& fieldset': {
//                                             borderColor: 'rgba(0,0,0,0.1)',
//                                         },
//                                         '&:hover fieldset': {
//                                             borderColor: '#9C27B0',
//                                         },
//                                         '&.Mui-focused fieldset': {
//                                             borderColor: '#9C27B0',
//                                             borderWidth: 2
//                                         },
//                                     }
//                                 }}
//                             />
//                             <Button
//                                 variant="contained"
//                                 onClick={handleSend}
//                                 disabled={loading || !input.trim()}
//                                 sx={{
//                                     minWidth: 'unset',
//                                     borderRadius: '50%',
//                                     width: 40,
//                                     height: 40,
//                                     p: 0,
//                                     background: input.trim() ? 'linear-gradient(90deg, rgb(156, 39, 176) 0%, rgb(186, 104, 200) 100%)' : '#e9ecef',
//                                     color: input.trim() ? 'white' : '#adb5bd',
//                                     '&:hover': {
//                                         background: 'linear-gradient(90deg, rgb(171, 71, 188) 0%, rgb(142, 36, 170) 100%)',
//                                     }
//                                 }}
//                             >
//                                 <SendIcon fontSize="small" />
//                             </Button>
//                         </Box>
//                     </Paper>
//                 </Fade>
//             </Modal>
//         </>
//     );
// }





// "use client"

// import { useState, useRef, useEffect } from "react"
// import axios from "axios"
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
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import SendIcon from "@mui/icons-material/Send"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// import PersonIcon from "@mui/icons-material/Person"
// import ChatIcon from "@mui/icons-material/Chat"
// import "./ChatBotPanel.css"

// export default function ChatBotPanel({
//   challengeTopic,
//   challengeDescription,
// }: { challengeTopic: string; challengeDescription: string }) {
//   const [open, setOpen] = useState(false)
//   const [chat, setChat] = useState<{ role: string; content: string }[]>([])
//   const [input, setInput] = useState("")
//   const [loading, setLoading] = useState(false)
//   const messagesEndRef = useRef<null | HTMLDivElement>(null)
//   const inputRef = useRef<null | HTMLDivElement>(null)
//   const apiUrl = "https://localhost:7143" // For local testing

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//     if (open && inputRef.current) {
//       inputRef.current.focus()
//     }
//   }, [chat, open])

//   const handleOpen = async () => {
//     setOpen(true)
//     setChat([]) // Initialize chat
//     await sendMessage(
//       "system",
//       `You are a creative assistant on the PicBattle website, where users create AI images based on challenges and competing between themselves. Talk only about the website, challenges, inspiration, creativity, and ratings.`,
//     )
//     await sendMessage(
//       "user",
//       `The current challenge is: "${challengeTopic}". Challenge description: "${challengeDescription}". Give me prompt ideas.`,
//     )
//   }

//   const sendMessage = async (role: string, content: string) => {
//     setChat((prev) => [
//       ...prev,
//       {
//         role,
//         content,
//       },
//     ])
//     if (role === "user" || role === "system") {
//       setLoading(true)
//       try {
//         const response = await axios.post(`${apiUrl}/api/chat`, { messages: [...chat, { role, content }] })
//         const botReply = response.data.reply
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: botReply,
//           },
//         ])
//       } catch (err) {
//         console.error("Error during chat:", err)
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, I encountered an error. Please try again.",
//           },
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   const handleSend = async () => {
//     if (!input.trim()) return
//     await sendMessage("user", input.trim())
//     setInput("")
//   }

//   // Function to format message content with better spacing
//   const formatMessageContent = (content: string) => {
//     // Split by double newlines to detect paragraphs
//     return content.split("\n\n").map((paragraph, idx) => (
//       <Typography key={idx} component="p" sx={{ mb: 1 }}>
//         {paragraph}
//       </Typography>
//     ))
//   }

//   return (
//     <>
//       {/* <Tooltip title="קבל רעיונות יצירתיים" placement="left" TransitionComponent={Zoom} arrow>
//         <Fab onClick={handleOpen} aria-label="chat" className="chat-fab">
//           <ChatIcon />
//         </Fab>
//       </Tooltip> */}


//       <Tooltip
//               title=" קבל רעיונות יצירתיים"
//               placement="left"
//               TransitionComponent={Zoom}
//               arrow
//             >
//               <Fab
//                 onClick={handleOpen}
//                 aria-label="chat"
//                 sx={{
//                   position: "fixed",
//                   right: 30,
//                   bottom: 80, // Positioned above the upload button
//                   zIndex: 1000,
//                   width: 60,
//                   height: 60,
//                   background: "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
//                   boxShadow: "0 4px 15px rgba(138, 79, 255, 0.4)",
//                   color: "white",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     transform: "scale(1.05) rotate(5deg)",
//                     boxShadow: "0 6px 16px rgba(138, 79, 255, 0.6)",
//                   },
//                 }}
//               >
//                 <ChatIcon />
//               </Fab>
//             </Tooltip>

//       <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
//         <Fade in={open}>
//           <Paper className="chat-modal">
//             <Box className="chat-header">
//               <Box display="flex" alignItems="center" gap={1}>
//                 <div className="chat-header-icon-container">
//                   <AutoAwesomeIcon className="chat-header-icon" />
//                 </div>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight={600}>
//                     עוזר השראה
//                   </Typography>
//                   <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                     אתגר: {challengeTopic}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             <List className="chat-messages">
//               {chat
//                 .filter((m) => m.role !== "system")
//                 .map((message, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: message.role === "user" ? "flex-end" : "flex-start",
//                       mb: 2,
//                       maxWidth: "100%",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "flex-start",
//                         flexDirection: message.role === "user" ? "row-reverse" : "row",
//                         gap: 1,
//                         maxWidth: "85%",
//                       }}
//                     >
//                       <Avatar className={message.role === "user" ? "user-avatar" : "assistant-avatar"}>
//                         {message.role === "user" ? <PersonIcon fontSize="small" /> : <AutoAwesomeIcon fontSize="small" />}
//                       </Avatar>

//                       <Box>
//                         <Paper elevation={1} className={message.role === "user" ? "user-message" : "assistant-message"}>
//                           {formatMessageContent(message.content)}
//                         </Paper>

//                         <Typography
//                           variant="caption"
//                           sx={{
//                             opacity: 0.7,
//                             mt: 0.5,
//                             display: "block",
//                             textAlign: message.role === "user" ? "right" : "left",
//                           }}
//                         >
//                           {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 ))}

//               {loading && (
//                 <Box className="typing-indicator-container">
//                   <Box className="typing-indicator">
//                     <Box className="typing-dot typing-dot-1" />
//                     <Box className="typing-dot typing-dot-2" />
//                     <Box className="typing-dot typing-dot-3" />
//                   </Box>
//                 </Box>
//               )}
//               <div ref={messagesEndRef} />
//             </List>

//             <Divider />

//             <Box className="chat-input-container">
//               <TextField
//                 fullWidth
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
//                 placeholder="הקלד את ההודעה שלך..."
//                 size="small"
//                 inputRef={inputRef}
//                 multiline
//                 maxRows={3}
//                 className="chat-input"
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleSend}
//                 disabled={loading || !input.trim()}
//                 className={`send-button ${!input.trim() ? "send-button-disabled" : ""}`}
//               >
//                 <SendIcon fontSize="small" />
//               </Button>
//             </Box>
//           </Paper>
//         </Fade>
//       </Modal>
//     </>
//   )
// }



// "use client"

// import { useState, useRef, useEffect } from "react"
// import axios from "axios"
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
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import SendIcon from "@mui/icons-material/Send"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// import PersonIcon from "@mui/icons-material/Person"
// import ChatIcon from "@mui/icons-material/Chat"
// import "./ChatBotPanel.css"

// export default function ChatBotPanel({
//   challengeTopic,
//   challengeDescription,
// }: {
//   challengeTopic: string
//   challengeDescription: string
// }) {
//   const [open, setOpen] = useState(false)
//   const [chat, setChat] = useState<{ role: string; content: string }[]>([])
//   const [input, setInput] = useState("")
//   const [loading, setLoading] = useState(false)
//   const messagesEndRef = useRef<null | HTMLDivElement>(null)
//   const inputRef = useRef<null | HTMLDivElement>(null)
//   const apiUrl = "https://localhost:7143" // For local testing

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//     if (open && inputRef.current) {
//       inputRef.current.focus()
//     }
//   }, [chat, open])

//   const handleOpen = async () => {
//     setOpen(true)
//     setChat([]) // Initialize chat

//     // במקום לשלוח הודעות אוטומטיות, נציג הודעת פתיחה מהעוזר
//     setChat([
//       {
//         role: "assistant",
//         content: `שלום! אני עוזר ההשראה של PicBattle.

// אני כאן לעזור לך עם האתגר הנוכחי: "${challengeTopic}"

// ${challengeDescription}

// אני יכול לעזור לך עם:
// • רעיונות לפרומפטים יצירתיים
// • טיפים לשיפור התמונות שלך
// • השראה ורעיונות לגישות שונות לאתגר

// איך אוכל לעזור לך היום?`,
//       },
//     ])
//   }

//   const sendMessage = async (role: string, content: string) => {
//     setChat((prev) => [
//       ...prev,
//       {
//         role,
//         content,
//       },
//     ])
//     if (role === "user") {
//       setLoading(true)
//       try {
//         // הוספת הוראות מערכת לכל בקשה כדי להגביל את התשובות לנושאי האתר
//         const systemMessage = {
//           role: "system",
//           content: `You are a creative assistant on the PicBattle website, where users create AI images based on challenges and competing between themselves. 
          
// IMPORTANT: You must ONLY talk about topics related to the website, challenges, AI image generation, creativity, inspiration, and ratings. 

// If the user asks about anything else, politely redirect them back to the challenge topic: "${challengeTopic}".

// Current challenge description: "${challengeDescription}"

// DO NOT provide any information, advice, or assistance on topics unrelated to the website or AI image generation.`,
//         }

//         const response = await axios.post(`${apiUrl}/api/chat`, {
//           messages: [systemMessage, ...chat, { role, content }],
//         })
//         const botReply = response.data.reply
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: botReply,
//           },
//         ])
//       } catch (err) {
//         console.error("Error during chat:", err)
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "מצטער, נתקלתי בשגיאה. אנא נסה שוב.",
//           },
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   const handleSend = async () => {
//     if (!input.trim()) return
//     await sendMessage("user", input.trim())
//     setInput("")
//   }

//   // Function to format message content with better spacing
//   const formatMessageContent = (content: string) => {
//     // Split by double newlines to detect paragraphs
//     return content.split("\n\n").map((paragraph, idx) => (
//       <Typography key={idx} component="p" sx={{ mb: 1 }}>
//         {paragraph}
//       </Typography>
//     ))
//   }

//   return (
//     <>
//       <Tooltip title="קבל רעיונות יצירתיים" placement="left" TransitionComponent={Zoom} arrow>
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
//           <ChatIcon />
//         </Fab>
//       </Tooltip>

//       <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
//         <Fade in={open}>
//           <Paper className="chat-modal">
//             <Box className="chat-header">
//               <Box display="flex" alignItems="center" gap={1}>
//                 <div className="chat-header-icon-container">
//                   <AutoAwesomeIcon className="chat-header-icon" />
//                 </div>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight={600}>
//                     עוזר השראה
//                   </Typography>
//                   <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                     אתגר: {challengeTopic}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             <List className="chat-messages">
//               {chat.map((message, i) => (
//                 <Box
//                   key={i}
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: message.role === "user" ? "flex-end" : "flex-start",
//                     mb: 2,
//                     maxWidth: "100%",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "flex-start",
//                       flexDirection: message.role === "user" ? "row-reverse" : "row",
//                       gap: 1,
//                       maxWidth: "85%",
//                     }}
//                   >
//                     <Avatar className={message.role === "user" ? "user-avatar" : "assistant-avatar"}>
//                       {message.role === "user" ? <PersonIcon fontSize="small" /> : <AutoAwesomeIcon fontSize="small" />}
//                     </Avatar>

//                     <Box>
//                       <Paper elevation={1} className={message.role === "user" ? "user-message" : "assistant-message"}>
//                         {formatMessageContent(message.content)}
//                       </Paper>

//                       <Typography
//                         variant="caption"
//                         sx={{
//                           opacity: 0.7,
//                           mt: 0.5,
//                           display: "block",
//                           textAlign: message.role === "user" ? "right" : "left",
//                         }}
//                       >
//                         {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               ))}

//               {loading && (
//                 <Box className="typing-indicator-container">
//                   <Box className="typing-indicator">
//                     <Box className="typing-dot typing-dot-1" />
//                     <Box className="typing-dot typing-dot-2" />
//                     <Box className="typing-dot typing-dot-3" />
//                   </Box>
//                 </Box>
//               )}
//               <div ref={messagesEndRef} />
//             </List>

//             <Divider />

//             <Box className="chat-input-container">
//               <TextField
//                 fullWidth
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
//                 placeholder="הקלד את ההודעה שלך..."
//                 size="small"
//                 inputRef={inputRef}
//                 multiline
//                 maxRows={3}
//                 className="chat-input"
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleSend}
//                 disabled={loading || !input.trim()}
//                 className={`send-button ${!input.trim() ? "send-button-disabled" : ""}`}
//               >
//                 <SendIcon fontSize="small" />
//               </Button>
//             </Box>
//           </Paper>
//         </Fade>
//       </Modal>
//     </>
//   )
// }



"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  List,
  IconButton,
  Avatar,
  Paper,
  Divider,
  Fade,
  Fab,
  Tooltip,
  Zoom,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import PersonIcon from "@mui/icons-material/Person"
import ChatIcon from "@mui/icons-material/Chat"
import "./ChatBotPanel.css"

export default function ChatBotPanel({
  challengeTopic,
  challengeDescription,
}: {
  challengeTopic: string
  challengeDescription: string
}) {
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const inputRef = useRef<null | HTMLDivElement>(null)
  // const apiUrl = "https://localhost:7143" // For local testing
  const apiUrl = process.env.REACT_APP_API_URL;


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [chat, open])

  // פונקציה ליצירת הודעת פתיחה דינמית
  const generateWelcomeMessage = () => {
    // מערך של פתיחות אפשריות
    const greetings = [
      "שלום וברוכים הבאים!",
      "היי! איזה כיף שהצטרפת אלינו!",
      "ברוך הבא לעולם היצירה!",
      "שמח לראות אותך כאן!",
      "איזה יופי שהגעת!",
    ]

    // מערך של תיאורים אפשריים לעוזר
    const assistantDescriptions = [
      "אני העוזר היצירתי שלך באתגר הזה.",
      "אני כאן כדי לעזור לך להפיק את המיטב מהאתגר הנוכחי.",
      "אני מומחה ההשראה של PicBattle, ואשמח לסייע לך.",
      "אני עוזר ההשראה שלך, מוכן לסייע ביצירת תמונות מדהימות.",
      "אני כאן כדי לספק לך רעיונות והשראה לאתגר הנוכחי.",
    ]

    // מערך של הצעות עזרה אפשריות
    const helpOffers = [
      "איך אוכל לעזור לך היום?",
      "במה אוכל לסייע לך?",
      "מה תרצה ליצור היום?",
      "איזה סוג עזרה תרצה לקבל?",
      "האם יש לך רעיון התחלתי שתרצה לפתח?",
    ]

    // בחירה אקראית מכל מערך
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    const randomDescription = assistantDescriptions[Math.floor(Math.random() * assistantDescriptions.length)]
    const randomHelpOffer = helpOffers[Math.floor(Math.random() * helpOffers.length)]

    // יצירת הודעת פתיחה דינמית
    return `${randomGreeting} ${randomDescription}

אני כאן לעזור לך עם האתגר: "${challengeTopic}"

${challengeDescription}

אני יכול לעזור לך עם:
• רעיונות לפרומפטים יצירתיים
• טיפים לשיפור התמונות שלך
• השראה וגישות שונות לאתגר

${randomHelpOffer}`
  }

  const handleOpen = async () => {
    setOpen(true)
    setChat([]) // Initialize chat

    // הצגת הודעת פתיחה דינמית
    setChat([
      {
        role: "assistant",
        content: generateWelcomeMessage(),
      },
    ])
  }

  const sendMessage = async (role: string, content: string) => {
    setChat((prev) => [
      ...prev,
      {
        role,
        content,
      },
    ])
    if (role === "user") {
      setLoading(true)
      try {
        // הוראות מערכת משופרות עם דגש על נימוס
        const systemMessage = {
          role: "system",
          content: `You are a creative assistant on the PicBattle website, where users create AI images based on challenges and competing between themselves. 
          
IMPORTANT: You must ONLY talk about topics related to the website, challenges, AI image generation, creativity, inspiration, and ratings. 

If the user asks about anything else, be VERY POLITE and explain that you're specialized in helping with the current challenge: "${challengeTopic}". 

For example: "אני מצטער, אני מתמחה בעזרה עם אתגרי יצירת תמונות AI ובמיוחד באתגר הנוכחי: '${challengeTopic}'. אשמח לעזור לך בנושאים הקשורים לאתגר זה או ליצירת תמונות AI. האם אוכל לעזור לך עם רעיונות או טיפים לאתגר הנוכחי?"

Current challenge description: "${challengeDescription}"

Always be polite, friendly, and helpful. Use a warm and encouraging tone.

DO NOT provide any information, advice, or assistance on topics unrelated to the website or AI image generation.`,
        }

        const response = await axios.post(`${apiUrl}/api/chat`, {
          messages: [systemMessage, ...chat, { role, content }],
        })
        const botReply = response.data.reply
        setChat((prev) => [
          ...prev,
          {
            role: "assistant",
            content: botReply,
          },
        ])
      } catch (err) {
        console.error("Error during chat:", err)
        setChat((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "מצטער, נתקלתי בשגיאה. אנא נסה שוב.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    await sendMessage("user", input.trim())
    setInput("")
  }

  // Function to format message content with better spacing
  const formatMessageContent = (content: string) => {
    // Split by double newlines to detect paragraphs
    return content.split("\n\n").map((paragraph, idx) => (
      <Typography key={idx} component="p" sx={{ mb: 1 }}>
        {paragraph}
      </Typography>
    ))
  }

  return (
    <>
      <Tooltip title="קבל רעיונות יצירתיים" placement="left" TransitionComponent={Zoom} arrow>
        <Fab
          onClick={handleOpen}
          aria-label="chat"
          sx={{
            position: "fixed",
            right: 30,
            bottom: 80, // Positioned above the upload button
            zIndex: 1000,
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
            boxShadow: "0 4px 15px rgba(138, 79, 255, 0.4)",
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05) rotate(5deg)",
              boxShadow: "0 6px 16px rgba(138, 79, 255, 0.6)",
            },
          }}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>

      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <Fade in={open}>
          <Paper className="chat-modal">
            <Box className="chat-header">
              <Box display="flex" alignItems="center" gap={1}>
                <div className="chat-header-icon-container">
                  <AutoAwesomeIcon className="chat-header-icon" />
                </div>
                <Box>
                  <Typography variant="h6" fontWeight={600} className="chat-title">
                    עוזר השראה
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    אתגר: {challengeTopic}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <List className="chat-messages">
              {chat.map((message, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: message.role === "user" ? "flex-end" : "flex-start",
                    mb: 3, // יותר מרווח בין הודעות
                    maxWidth: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: message.role === "user" ? "row-reverse" : "row",
                      gap: 1.5, // יותר מרווח בין האווטאר להודעה
                      maxWidth: "85%",
                    }}
                  >
                    <Avatar className={message.role === "user" ? "user-avatar" : "assistant-avatar"}>
                      {message.role === "user" ? <PersonIcon fontSize="small" /> : <AutoAwesomeIcon fontSize="small" />}
                    </Avatar>

                    <Box>
                      <Paper
                        elevation={message.role === "user" ? 2 : 1}
                        className={message.role === "user" ? "user-message" : "assistant-message"}
                      >
                        {formatMessageContent(message.content)}
                      </Paper>

                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          mt: 0.5,
                          display: "block",
                          textAlign: message.role === "user" ? "right" : "left",
                        }}
                      >
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}

              {loading && (
                <Box className="typing-indicator-container">
                  <Box className="typing-indicator">
                    <Box className="typing-dot typing-dot-1" />
                    <Box className="typing-dot typing-dot-2" />
                    <Box className="typing-dot typing-dot-3" />
                  </Box>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </List>

            <Divider />

            <Box className="chat-input-container">
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="הקלד את ההודעה שלך..."
                size="small"
                inputRef={inputRef}
                multiline
                maxRows={3}
                className="chat-input"
              />
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={`send-button ${!input.trim() ? "send-button-disabled" : ""}`}
              >
                <SendIcon fontSize="small" />
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}
