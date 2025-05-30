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
  const apiUrl = import.meta.env.VITE_API_URL;


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
