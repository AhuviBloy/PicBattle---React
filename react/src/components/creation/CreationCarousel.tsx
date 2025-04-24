import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { creationStore } from "../../stores/creationStore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FileUploader from "./FileUploader ";
import './CreationCarousel.css';
import axios from "axios";
import { getUserDataFromToken } from "../../utils/authUtils";


const CreationCarousel = () => {
  const {challengeId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [creations, setCreations] = useState<any[]>([]);
  const [votedCreations, setVotedCreations] = useState<any[]>([]);
  const [userIp, setUserIp] = useState("");
  const  user = getUserDataFromToken();
  // let ip="";

  

  useEffect(() => {

    const fetchCreations = async () => {
      if (challengeId) {
        const data = await creationStore.fetchCreationsByChallengeId(challengeId);
        setCreations(data || []);
      }
    };
  
    const fetchIpAndVotes = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        const ip = response.data.ip;
        console.log(ip); 
        setUserIp(ip);
        
  
        let votedIds: any[] = [];
        if (sessionStorage.getItem("token")) {
          console.log("userId");
          console.log(user.userId);
          
          
          votedIds = await creationStore.getVotedCreationsByUser(user.userId);
        } else {
          console.log("ip");
          console.log(ip);
        
          votedIds = await creationStore.getVotedCreationsByIp(ip);
        }
  
        setVotedCreations(votedIds);
      } catch (error) {
        console.error("Error fetching IP or votes:", error);
      }
    };
  
    fetchCreations();
    fetchIpAndVotes();
  }, [challengeId, user.userId]);
  

  const hasVoted = (creationId:any) => {
    return votedCreations.some(vote => vote.creationId === creationId);
  };

  const handleVote = async (creationId: number) => {
    const alreadyVoted = hasVoted(creationId);
    // const rate = votedCreations.filter((votedId: any) => votedId.creationId === creationId);
    // if (rate.length === 0) {
      try {
        if (alreadyVoted) {
          // Remove vote
          await creationStore.vote(creationId, user.userId, Number(challengeId), userIp,-1);
          
          // Update local state to reflect vote removal
          setCreations(prevCreations =>
            prevCreations.map(creation =>
              creation.id === creationId ? { ...creation, votes: Math.max((creation.votes || 0) - 1, 0) } : creation
            )
          );
          
          setVotedCreations(prevVotes =>
            prevVotes.filter(vote => vote.creationId !== creationId)
          );
        } else {
          // Add vote
        await creationStore.vote(creationId, user.userId, Number(challengeId), userIp,1);
        
        // עדכון מיידי של `creations` כך שמספר ההצבעות יעלה ב-1
        setCreations((prevCreations) =>
          prevCreations.map((creation) =>
            creation.id === creationId ? { ...creation, votes: (creation.votes || 0) + 1 } : creation
          )
        );
  
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
        ]);
  
        console.log("Updated votedCreations:", votedCreations);
      }
      } catch (error) {
        console.error("Error voting:", error);
        alert("הייתה שגיאה בהצבעה. נסה שוב מאוחר יותר.");
      }
    // } else {
    //   alert("כבר הצבעת ליצירה זו!");
    // }
  };
  


  const handleNewCreation = (newCreation: any) => {
    setCreations((prev) => [...prev, newCreation]);
  };

  return (
    <>
      <FileUploader onUploadSuccess={handleNewCreation}  />
      <div className="p-6 bg-gray-50 rounded-xl shadow-md max-w-6xl mx-auto">
        {/* <div
          className="flex justify-center items-center flex-wrap gap-8"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "35px",
            margin: "6%",
            cursor: "pointer",
            justifyContent: "center",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        > */}
         <div className="creation-grid">
          {creations.map((creation) => (
            <Card
              key={creation.id}
              // className="w-full sm:w-80 mb-8 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300"
              // variant="outlined"
              // style={{
              //   backgroundColor: "#fff",
              //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              //   transform: "scale(1)",
              //   transition: "transform 0.2s ease-in-out",
              // }}
              // onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              // onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              className="creation-card"
            >
          <div className="image-container">

              <CardMedia
                component="img"
                height="350"
                image={creation.imageUrl}
                alt={creation.title}
                onClick={() => setSelectedImage(creation.imageUrl)}
                // style={{
                //   cursor: "pointer",
                //   objectFit: "cover",
                //   borderTopLeftRadius: "12px",
                //   borderTopRightRadius: "12px",
                // }}
                 className="creation-image"
              />

             <div className="image-overlay">
                  <div className="overlay-content">
                    {/* <Typography variant="h6" component="h3" className="overlay-title">
                      {creation.title}
                    </Typography> */}
                    <Typography variant="body2" className="overlay-creator">
                      מאת: {creation.creatorName || "אנונימי"}
                    </Typography>
                    <Typography variant="body2" className="overlay-description">
                      {creation.description || "אין תיאור"}
                    </Typography>
                  </div>
                </div>
              </div>
              <CardContent className="text-center py-4">
                <Typography variant="h6" component="h2" className="font-semibold text-lg text-gray-800">
                  {creation.title}
                </Typography>
                <div className="flex justify-center gap-2 mt-2">
                  <IconButton
                    onClick={() => handleVote(creation.id)}
                    // // disabled={votedCreations.has(creation.id)}
                    // className={`text-white px-4 py-2 rounded-xl shadow-lg transition duration-200 ${
                    //   votedCreations.find(r=>r.creationId==creation.id) ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                    // }`}
                    // // title={votedCreations.has(creation.id) ? "כבר הצבעת" : "הצבע ליצירה"}
                    className="vote-button"
                    title={hasVoted(creation.id) ? "בטל הצבעה" : "הצבע ליצירה"}
                  >
                    <div className="flex items-center gap-1">
                    {hasVoted(creation.id) ? (
                        <FaHeart className="heart-icon filled" />
                      ) : (
                        <FaRegHeart className="heart-icon outline" />
                      )}
                      <span>{creation.votes || 0}</span>
                    </div>
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="fixed z-50 inset-0">
          <div className="flex items-center justify-center min-h-screen bg-black/80">
            <img src={selectedImage || ""} alt="Full view" className="max-w-4xl max-h-[70vh] rounded-xl" onClick={() => setSelectedImage(null)} />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default CreationCarousel;











