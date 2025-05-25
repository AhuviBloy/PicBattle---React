// import { useState } from "react"
// import { Button, CircularProgress, Typography } from "@mui/material"
// import SmartToyIcon from "@mui/icons-material/SmartToy"
// import axios from "axios"

// interface AiReviewPanelProps {
//   challengeTopic: string
//   challengeDescription: string
//   creationDescription: string
//   creationId: number
//   creationUrl: string
// }

// const AiReviewPanel = ({ challengeTopic, challengeDescription, creationDescription, creationId,creationUrl }: AiReviewPanelProps) => {
//   const [aiResponse, setAiResponse] = useState<string>("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleGetAiReview = async () => {
//     setLoading(true)
//     setError("")
//     setAiResponse("")
    
//     console.log("Sending request to AI with data:");
    
//     try {
//         const response = await axios.post(`https://localhost:7143/api/ai/review`, {
//             ChallengeDescription: challengeDescription,
//             CreationDescription: creationDescription,
//             creationUrl: creationUrl,
//           })
//       console.log("-------sending-----------");
//       setAiResponse(response.data?.response  || "לא התקבלה תגובה מה-AI.")
//     } catch (err: any) {
//       setError("שגיאה בשליחת הבקשה ל-AI.")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div style={{ marginTop: "0.5rem" }}>
//       <Button
//         variant="outlined"
//         onClick={handleGetAiReview}
//         startIcon={<SmartToyIcon />}
//         disabled={loading}
//         size="small"
//       >
//         בקש חוות דעת AI
//       </Button>

//       {loading && <CircularProgress size={20} style={{ marginLeft: 10 }} />}

//       {error && (
//         <Typography variant="body2" color="error" style={{ marginTop: "0.5rem" }}>
//           {error}
//         </Typography>
//       )}

//       {aiResponse && (
//         <Typography variant="body2" style={{ marginTop: "0.5rem", whiteSpace: "pre-line" }}>
//           <strong>AI:</strong> {aiResponse}
//         </Typography>
//       )}
//     </div>
//   )
// }

// export default AiReviewPanel

















import { useState } from "react"
import { Button, CircularProgress, Typography, Collapse, IconButton, Box } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import "./AiReviewPanel.css" // Import your CSS file for styling

interface AiReviewPanelProps {
  challengeTopic: string
  challengeDescription: string
  creationDescription: string
  creationId: number
  creationUrl: string
}

const AiReviewPanel = ({  challengeDescription, creationDescription, creationUrl }: AiReviewPanelProps) => {
  const [aiResponse, setAiResponse] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleGetAiReview = async () => {
    if (aiResponse && showResponse) {
      // אם כבר יש תגובה והיא מוצגת, רק נסתיר/נציג אותה
      setShowResponse(!showResponse)
      return
    }

    setLoading(true)
    setError("")
    setAiResponse("")
    setShowResponse(true)
    
    try {
      const response = await axios.post(`${apiUrl}/api/ai/review`, {
        ChallengeDescription: challengeDescription,
        CreationDescription: creationDescription,
        creationUrl: creationUrl,
      })
      setAiResponse(response.data?.response || "לא התקבלה תגובה מה-AI.")
    } catch (err: any) {
      setError("שגיאה בשליחת הבקשה ל-AI.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-review-container">
      <Button
        variant="contained"
        onClick={handleGetAiReview}
        startIcon={<SmartToyIcon />}
        disabled={loading}
        className="ai-review-button"
        size="small"
      >
        {aiResponse && showResponse ? "הסתר חוות דעת AI" : "בקש חוות דעת AI"}
      </Button>

      {loading && <CircularProgress size={20} className="ai-loading-spinner" />}

      <Collapse in={showResponse && (!!aiResponse || !!error)} timeout="auto">
        <div className="ai-response-container">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" className="ai-response-title">
              <SmartToyIcon fontSize="small" className="ai-icon" /> חוות דעת AI
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setShowResponse(false)}
              className="ai-close-button"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {error ? (
            <Typography variant="body2" color="error" className="ai-error-message">
              {error}
            </Typography>
          ) : (
            <Typography variant="body2" className="ai-response-text">
              {aiResponse}
            </Typography>
          )}
        </div>
      </Collapse>
    </div>
  )
}

export default AiReviewPanel