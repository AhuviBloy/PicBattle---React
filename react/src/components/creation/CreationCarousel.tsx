// import { useEffect, useState, useRef } from "react"
// import { useParams } from "react-router-dom"
// import { creationStore } from "../../stores/creationStore"
// import { FaHeart, FaRegHeart, FaExpand, FaCalendarAlt, FaInfoCircle, FaSpinner } from "react-icons/fa"
// import { Card, CardContent, CardMedia, IconButton, Typography, Modal, Box, Tooltip, Fade } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import "./CreationCarousel.css"
// import axios from "axios"
// import { getUserDataFromToken } from "../../utils/authUtils"
// import FileUploader from "./FileUploader "
// import ChatBotPanel from "../AI/ChatBotPanel"
// import challengeStore from "../../stores/challengeStore"
// import AiReviewPanel from "./AiReviewPanel"
// import { useAlert } from "../home/Alert"

// const CreationCarousel = () => {
//   const { challengeId } = useParams()
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [selectedCreation, setSelectedCreation] = useState<any | null>(null)
//   const [creations, setCreations] = useState<any[]>([])
//   const [votedCreations, setVotedCreations] = useState<any[]>([])
//   const [userIp, setUserIp] = useState("")
//   const [challengeTopic, setChallengeTopic] = useState("")
//   const [challengeDescription, setcChallengeDescription] = useState("")
//   const [isChallengeActive, setIsChallengeActive] = useState(true)
//   const [loading, setLoading] = useState(true)
//   const [challengeData, setChallengeData] = useState<any>(null)
//   const user = getUserDataFromToken()
//   const gridRef = useRef<HTMLDivElement>(null)
//   const {  showAlert } = useAlert();



//   // const handleSuccess = (msg:string): void => {
//   //   showAlert(msg, 'success', 3000);
//   // };

//   const handleError = (msg:string): void => {
//     showAlert(msg, 'error', 4000);
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)

//       try {
//         // Fetch challenge data
//         console.log(challengeData);
        
//         if (challengeId) {
//           const data = await challengeStore.fetchChallengeById(challengeId)
//           if (data) {
//             setChallengeData(data)
//             setChallengeTopic(data.title)
//             setcChallengeDescription(data.description)
//             const endDate = new Date(data.endDate)
//             setIsChallengeActive(endDate > new Date())
//           }
//         }

//         // Fetch creations
//         if (challengeId) {
//           const data = await creationStore.fetchCreationsByChallengeId(challengeId)
//           setCreations(data || [])
//         }

//         // Fetch IP and votes
//         const response = await axios.get("https://api.ipify.org?format=json")
//         const ip = response.data.ip
//         setUserIp(ip)

//         let votedIds: any[] = []
//         if (sessionStorage.getItem("token")) {
//           votedIds = await creationStore.getVotedCreationsByUser(user.userId)
//         } else {
//           votedIds = await creationStore.getVotedCreationsByIp(ip)
//         }

//         setVotedCreations(votedIds)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       } finally {
//         // Add a small delay to make the loading animation visible
//         setTimeout(() => {
//           setLoading(false)
//         }, 800)
//       }
//     }

//     fetchData()
//   }, [challengeId, user.userId])



//   const hasVoted = (creationId: any) => {
//     return votedCreations.some((vote) => vote.creationId === creationId)
//   }

//   const handleVote = async (creationId: number, event: React.MouseEvent) => {
//     event.stopPropagation() // Prevent opening the modal when clicking the vote button

//     if (!isChallengeActive) {
//       handleError("ההצבעה הסתיימה. לא ניתן להצביע יותר.")
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
//       }
//     } catch (error) {
//       console.error("Error voting:", error)
//       handleError("הייתה שגיאה בהצבעה. נסה שוב מאוחר יותר.")
//     }
//   }

//   const handleNewCreation = (newCreation: any) => {
//     setCreations((prev) => [...prev, newCreation])
//   }

//   const handleImageClick = (creation: any) => {
//     console.log("==================");
//     console.log(creation.imageUrl);
    
    
//     setSelectedImage(creation.imageUrl)
//     setSelectedCreation(creation)
//   }

//   const formatDate = (dateString: string) => {
//     if (!dateString) return ""
//     const date = new Date(dateString)
//     return date.toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" })
//   }

//   if (loading) {
//     return (
//       <div className="loader-container">
//         <div className="challenge-loader">
//           <div className="spinner-container">
//             <FaSpinner className="spinner-icon" />
//           </div>
//           <span className="loading-text">טוען יצירות...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {isChallengeActive && (
//         <>
//           <FileUploader onUploadSuccess={handleNewCreation} />
//           <ChatBotPanel challengeTopic={challengeTopic} challengeDescription={challengeDescription} />
//         </>
//       )}

//       <div className="creations-container">
//         {/* Decorative elements */}
//         <div className="decoration-circle decoration-circle-1"></div>
//         <div className="decoration-circle decoration-circle-2"></div>

//         <div className="creations-header">
//           <h2 className="creations-title">יצירות לאתגר: {challengeTopic}</h2>
//           <p className="creations-subtitle">
//             {isChallengeActive
//               ? "הצביעו ליצירות האהובות עליכם והעלו את היצירות שלכם"
//               : "ההצבעה לאתגר זה הסתיימה. תוכלו לצפות ביצירות שהועלו"}
//           </p>
//         </div>

//         {creations.length > 0 ? (
//           <div className="creation-grid" ref={gridRef}>
//             {creations.map((creation, index) => (
//               <Card
//                 key={creation.id}
//                 className="creation-card"
//                 // onClick={() => handleImageClick(creation)}
//                 style={{ "--card-index": index } as React.CSSProperties}
//               >
//                 <div className="image-container">
//                   <CardMedia
//                     component="img"
//                     image={creation.imageUrl}
//                     alt={creation.title || "יצירה"}
//                     className="creation-image"
//                   />
//                   <Tooltip title="הצג בגודל מלא" placement="top">
//                     <IconButton
//                       className="expand-button"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         handleImageClick(creation)
//                       }}
//                     >
//                       <FaExpand />
//                     </IconButton>
//                   </Tooltip>
//                 </div>

//                 <CardContent className="card-content">
//                   {/* AI Review Panel */}
//                   <AiReviewPanel
//                     challengeTopic={challengeTopic}
//                     challengeDescription={challengeDescription}
//                     creationDescription={creation.description}
//                     creationId={creation.id}
//                     creationUrl={creation.imageUrl}
//                   />

//                   {/* Description first */}
//                   {/* {creation.description && (
//                     <div className="description-container">
//                       <Typography className="description-label">תיאור:</Typography>
//                       <Typography className="description-info">{creation.description}</Typography>
//                     </div>
//                   )} */}

//                   {/* Bottom section with creator and votes */}
//                   <div className="bottom-section">
//                     {/* Vote section */}
//                     <Tooltip title={hasVoted(creation.id) ? "בטל הצבעה" : "הצבע ליצירה"} placement="top">
//                       <IconButton
//                         onClick={(e) => handleVote(creation.id, e)}
//                         className="vote-button"
//                         disabled={!isChallengeActive}
//                       >
//                         <div className="vote-count">
//                           {hasVoted(creation.id) ? (
//                             <FaHeart className="heart-icon filled" />
//                           ) : (
//                             <FaRegHeart className="heart-icon outline" />
//                           )}
//                           <span>{creation.votes || 0}</span>
//                         </div>
//                       </IconButton>
//                     </Tooltip>

//                     {/* Creator section */}
//                     <div className="creator-section">
//                       <Typography className="creator-info">{creation.creatorName || "אנונימי"}</Typography>
//                       <div className="creator-avatar">
//                         {creation.creatorName ? creation.creatorName.charAt(0).toUpperCase() : "A"}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Date at the bottom */}
//                   {creation.createdAt && (
//                     <div className="creation-date">
//                       <FaCalendarAlt className="date-icon" />
//                       <span>{formatDate(creation.createdAt)}</span>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="no-creations">
//             <FaInfoCircle className="no-creations-icon" />
//             <p className="no-creations-text">אין יצירות עדיין לאתגר זה. היו הראשונים להעלות יצירה!</p>
//           </div>
//         )}
//       </div>

//       {/* Enhanced Modal */}
//       <Modal
//         open={!!selectedImage}
//         onClose={() => {
//           setSelectedImage(null)
//           setSelectedCreation(null)
//         }}
//         className="image-modal"
//         closeAfterTransition
//       >
//         <Fade in={!!selectedImage}>
//           <Box className="modal-content">
//             {selectedImage && (
//               <>
//                 <img
//                   src={selectedImage || "/placeholder.svg"}
//                   alt={selectedCreation?.title || "תצוגה מלאה"}
//                   className="modal-image"
//                 />

//                 {selectedCreation && (
//                   <div className="modal-info">
//                     {selectedCreation.title && (
//                       <Typography className="modal-title">{selectedCreation.title}</Typography>
//                     )}

//                     <Typography className="modal-creator">יוצר: {selectedCreation.creatorName || "אנונימי"}</Typography>

//                     {/* {selectedCreation.description && (
//                       <Typography className="modal-description">{selectedCreation.description}</Typography>
//                     )} */}
//                   </div>
//                 )}

//                 <IconButton
//                   className="modal-close-button"
//                   onClick={() => {
//                     setSelectedImage(null)
//                     setSelectedCreation(null)
//                   }}
//                 >
//                   <CloseIcon />
//                 </IconButton>
//               </>
//             )}
//           </Box>
//         </Fade>
//       </Modal>

//       <footer className="simple-footer">
//         <div className="footer-content">
//           <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   )
// }

// export default CreationCarousel

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
import AiReviewPanel from "./AiReviewPanel"
import { useAlert } from "../home/Alert"

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
  const {  showAlert } = useAlert();



  // const handleSuccess = (msg:string): void => {
  //   showAlert(msg, 'success', 3000);
  // };

  const handleError = (msg:string): void => {
    showAlert(msg, 'error', 4000);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        // Fetch challenge data
        console.log(challengeData);
        
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
      handleError("Voting has ended. You can no longer vote.")
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

        // Immediate update of `creations` so vote count increases by 1
        setCreations((prevCreations) =>
          prevCreations.map((creation) =>
            creation.id === creationId ? { ...creation, votes: (creation.votes || 0) + 1 } : creation,
          ),
        )

        // Add the creation we voted for to votedCreations
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
      handleError("There was an error voting. Please try again later.")
    }
  }

  const handleNewCreation = (newCreation: any) => {
    setCreations((prev) => [...prev, newCreation])
  }

  const handleImageClick = (creation: any) => {
    console.log("==================");
    console.log(creation.imageUrl);
    
    
    setSelectedImage(creation.imageUrl)
    setSelectedCreation(creation)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="challenge-loader">
          <div className="spinner-container">
            <FaSpinner className="spinner-icon" />
          </div>
          <span className="loading-text">Loading creations...</span>
        </div>
      </div>
    );
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
          <h2 className="creations-title">Creations for Challenge: {challengeTopic}</h2>
          <p className="creations-subtitle">
            {isChallengeActive
              ? "Vote for your favorite creations and upload your own"
              : "Voting for this challenge has ended. You can view the uploaded creations"}
          </p>
        </div>

        {creations.length > 0 ? (
          <div className="creation-grid" ref={gridRef}>
            {creations.map((creation, index) => (
              <Card
                key={creation.id}
                className="creation-card"
                // onClick={() => handleImageClick(creation)}
                style={{ 
                  "--card-index": index,
                  border: "1px solid #e0e0e0",
                  borderLeft: "none"
                } as React.CSSProperties}
              >
                <div className="image-container">
                  <CardMedia
                    component="img"
                    image={creation.imageUrl}
                    alt={creation.title || "Creation"}
                    className="creation-image"
                  />
                  <Tooltip title="View full size" placement="top">
                    <IconButton
                      className="expand-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageClick(creation)
                      }}
                      style={{
                        backgroundColor: "#2196f3",
                        color: "white"
                      }}
                    >
                      <FaExpand />
                    </IconButton>
                  </Tooltip>
                </div>

                <CardContent className="card-content">
                  {/* AI Review Panel */}
                  <AiReviewPanel
                    challengeTopic={challengeTopic}
                    challengeDescription={challengeDescription}
                    creationDescription={creation.description}
                    creationId={creation.id}
                    creationUrl={creation.imageUrl}
                  />

                  {/* Description first */}
                  {/* {creation.description && (
                    <div className="description-container">
                      <Typography className="description-label">Description:</Typography>
                      <Typography className="description-info">{creation.description}</Typography>
                    </div>
                  )} */}

                  {/* Bottom section with creator and votes */}
                  <div className="bottom-section">
                    {/* Vote section */}
                    <Tooltip title={hasVoted(creation.id) ? "Remove vote" : "Vote for creation"} placement="top">
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
                      <Typography className="creator-info">{creation.creatorName || "Anonymous"}</Typography>
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
          <div className="no-creations" style={{
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
            <FaInfoCircle className="no-creations-icon" style={{
              fontSize: '4rem',
              marginBottom: '20px',
              color: '#ccc'
            }} />
            <p className="no-creations-text" style={{
              fontSize: '1.2rem',
              margin: 0,
              fontWeight: '500'
            }}>No creations yet for this challenge. Be the first to upload a creation!</p>
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
                  alt={selectedCreation?.title || "Full view"}
                  className="modal-image"
                />

                {selectedCreation && (
                  <div className="modal-info">
                    {selectedCreation.title && (
                      <Typography className="modal-title">{selectedCreation.title}</Typography>
                    )}

                    <Typography className="modal-creator">Creator: {selectedCreation.creatorName || "Anonymous"}</Typography>

                    {/* {selectedCreation.description && (
                      <Typography className="modal-description">{selectedCreation.description}</Typography>
                    )} */}
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