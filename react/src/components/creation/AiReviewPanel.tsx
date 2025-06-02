import { useState } from "react"
import { Button, CircularProgress, Typography, Collapse, IconButton, Box } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import "./AiReviewPanel.css"

interface AiReviewPanelProps {
  challengeTopic: string
  challengeDescription: string
  creationDescription: string
  creationId: number
  creationUrl: string
}

const AiReviewPanel = ({  challengeDescription, creationDescription }: AiReviewPanelProps) => {
  const [aiResponse, setAiResponse] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleGetAiReview = async () => {
    if (aiResponse && showResponse) {
      setShowResponse(!showResponse)
      return
    }

    setLoading(true)
    setError("")
    setAiResponse("")
    setShowResponse(true)
    
    try {
      const response = await axios.post(`${apiUrl}/api/ai/review`, {
        challengeDescription: challengeDescription,
        creationDescription: creationDescription,
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