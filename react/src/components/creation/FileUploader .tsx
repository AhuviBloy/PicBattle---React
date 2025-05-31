import React, { useState, useRef } from "react";
import axios from "axios";
import { getUserDataFromToken } from "../../utils/authUtils";
import { useParams } from "react-router-dom";
import {
  Modal,
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  LinearProgress,
  Paper,
  IconButton,
  Fade,
  Backdrop,
  Tooltip,
  Fab,
  Zoom,
} from "@mui/material";
import {
  CloudUpload,
  Close as CloseIcon,
  // Image as ImageIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
  FilePresent,
  // Lightbulb as LightbulbIcon
} from "@mui/icons-material";
import { AlertContainer, useAlert } from "../home/Alert";

const FileUploader = ({
  onUploadSuccess,
}: {
  onUploadSuccess: (data: {
    UserId: string;
    FileName: string;
    FileType: string;
    Description: string;
    ChallengeId: string | undefined;
    ImageUrl: string;
  }) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { challengeId } = useParams();
  const isUserLoggedIn = sessionStorage.getItem("token") ? true : false;
  const apiUrl = import.meta.env.VITE_API_URL;
  const { alerts, showAlert, removeAlert } = useAlert();
  const { userId } = getUserDataFromToken();



  // שליפת פרטי המשתמש מה-token


  const handleSuccess = (msg:string): void => {
    showAlert(msg, 'success', 3000);
  };

  const handleError = (msg:string): void => {
    showAlert(msg, 'error', 4000);
  };

  // const handleInfo = (msg:string): void => {
  //   showAlert(msg, 'info', 3000);
  // };

  // טיפול בשינוי קובץ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      setFile(selectedFile);

      // יצירת תצוגה מקדימה לתמונות
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setPreview(reader.result);
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  // טיפול בגרירת קבצים
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: any[]; }; }) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   if (e.dataTransfer.files?.[0]) {
  //     const droppedFile = e.dataTransfer.files[0];
  //     setFile(droppedFile);

  //     // יצירת תצוגה מקדימה לתמונות
  //     if (droppedFile.type.startsWith('image/')) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreview(reader.result);
  //       };
  //       reader.readAsDataURL(droppedFile);
  //     } else {
  //       setPreview(null);
  //     }
  //   }
  // };

  // פונקציה להעלאת הקובץ
  const handleUpload = async () => {
    if (!description.trim()) {
      return;
    }

    if (!file) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        handleError("משתמש לא מחובר");
        return;
      }

      // שלב 1: קבלת Presigned URL מהשרת
      const res = await axios.get(`${apiUrl}/api/creation/upload-url`, {
        params: {
          fileName: file.name,
          contentType: file.type,
        },
        headers: {
          Authorization: `Bearer ${token}`, // שליחת ה-token
        },
      });

      const presignedUrl = res.data.url;

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      // שלב 3: שמירת הקובץ בדאטה בייס
      const res2 = await axios.post(
        `${apiUrl}/api/creation`,
        {
          UserId: userId ?? "",
          FileName: file.name,
          FileType: file.type,
          Description: description,
          ChallengeId: challengeId,
          ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res2.data; // אם יש צורך בתגובה מהשרת

      onUploadSuccess({
        UserId: userId ?? "",
        FileName: file.name,
        FileType: file.type,
        Description: description,
        ChallengeId: challengeId,
        ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,
      });

      handleSuccess("הקובץ הועלה בהצלחה!");
      resetForm();
    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
      handleError("שגיאה בהעלאת הקובץ, אנא נסה שנית.");
    }
  };

  const resetForm = () => {
    setOpenModal(false);
    setFile(null);
    setDescription("");
    setProgress(0);
    setPreview(null);
  };

  // הצגת אייקון בהתאם לסוג הקובץ
  const renderFileIcon = () => {
    if (!file)
      return <CloudUpload style={{ fontSize: 60, color: "#8A4FFF" }} />;

    if (preview) {
      return null; // לא מציג אייקון כשיש תמונת תצוגה מקדימה
    } else if (file.type.includes("pdf")) {
      return <DescriptionIcon style={{ fontSize: 60, color: "#FF725E" }} />;
    } else if (file.type.includes("doc") || file.type.includes("word")) {
      return <FilePresent style={{ fontSize: 60, color: "#4F9DFF" }} />;
    } else {
      return <FilePresent style={{ fontSize: 60, color: "#8A4FFF" }} />;
    }
  };

  return (
    <>

      <AlertContainer alerts={alerts} removeAlert={removeAlert} />
      {/* כפתור סטיקי מעוצב */}
      {/* <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        style={{
          position: 'fixed',
          bottom: '150px',
          right: '30px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          minWidth: 'unset',
          background: 'linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)',
          boxShadow: '0 4px 12px rgba(138, 79, 255, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
        }}
        sx={{
          '&:hover': {
            background: 'linear-gradient(135deg, #7A3FEF 0%, #3FB1EF 100%)',
            transform: 'scale(1.05) rotate(5deg)',
            boxShadow: '0 6px 16px rgba(138, 79, 255, 0.6)',
          }
        }}
      >
        <CloudUpload />
      </Button> */}

      <Tooltip
        title=" העלה יצירה "
        placement="left"
        TransitionComponent={Zoom}
        arrow
      >
        {/* <span> */}
          <Fab
            onClick={() => {
              if (isUserLoggedIn) {
                setOpenModal(true);
              } else {
                showAlert("יש להתחבר כדי להעלות יצירה");
              }
            }}
            aria-label="chat"
            // disabled={!isUserLoggedIn}
            sx={{
              position: "fixed",
              right: 30,
              bottom: 150, // Positioned above the upload button
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
            <CloudUpload />
          </Fab>
        {/* </span> */}
      </Tooltip>

      {/* מודל מעוצב */}
      <Modal
        open={openModal}
        onClose={resetForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backdropFilter: "blur(3px)" },
        }}
        aria-labelledby="file-upload-modal"
        aria-describedby="upload-file-and-description"
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "500px", md: "550px" }, // מודל רספונסיבי יותר
              bgcolor: "background.paper",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              padding: 0,
              borderRadius: 3,
              overflow: "hidden",
              direction: "rtl",
            }}
          >
            {/* כותרת מעוצבת */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CloudUpload /> העלאת קובץ
              </Typography>
              <IconButton
                onClick={resetForm}
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ padding: "24px 32px" }}>
              {/* אזור לגרירת קבצים */}
              <Paper
                component="div"
                elevation={0}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                // onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: "2px dashed",
                  borderColor: isDragging
                    ? "#8A4FFF"
                    : file
                    ? "#4FC1FF"
                    : "#E0E0E0",
                  borderRadius: 2,
                  padding: 3,
                  marginBottom: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: isDragging
                    ? "rgba(138, 79, 255, 0.05)"
                    : file
                    ? "rgba(79, 193, 255, 0.05)"
                    : "#F9F9FF",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#8A4FFF",
                    backgroundColor: "rgba(138, 79, 255, 0.05)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "180px",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {preview ? (
                  <Box
                    sx={{
                      width: "150px",
                      height: "150px",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      mb: 2,
                    }}
                  >
                    <img
                      src={preview}
                      alt="תצוגה מקדימה"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ) : (
                  renderFileIcon()
                )}

                {file ? (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#8A4FFF",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <CheckIcon fontSize="small" /> הקובץ מוכן להעלאה
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {file.name}
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, mb: 1, color: "#666" }}
                    >
                      גרור קובץ לכאן או לחץ לבחירה
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 1,
                        borderColor: "#8A4FFF",
                        color: "#8A4FFF",
                        "&:hover": {
                          borderColor: "#7A3FEF",
                          backgroundColor: "rgba(138, 79, 255, 0.08)",
                        },
                      }}
                    >
                      בחר קובץ
                    </Button>
                  </>
                )}
              </Paper>

              {/* שדה תיאור */}
              <TextField
                label=" תן תיאור ליצירה..."
                required
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#8A4FFF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8A4FFF",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#8A4FFF",
                  },
                }}
              />

              {/* מד התקדמות */}
              {progress > 0 && (
                <Box sx={{ width: "100%", mb: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(79, 193, 255, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        background:
                          "linear-gradient(90deg, #8A4FFF 0%, #4FC1FF 100%)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {progress < 100 ? "מעלה..." : "הושלם!"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="medium"
                    >
                      {`${Math.round(progress)}%`}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* כפתור העלאה */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleUpload}
                disabled={
                  !file ||
                  !description.trim() ||
                  (progress > 0 && progress < 100)
                }
                sx={{
                  py: 1.5,
                  background:
                    "linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)",
                  borderRadius: 2,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #7A3FEF 0%, #3FB1EF 100%)",
                    boxShadow: "0 4px 12px rgba(138, 79, 255, 0.3)",
                  },
                  "&.Mui-disabled": {
                    background: "#E0E0E0",
                    color: "#A0A0A0",
                  },
                }}
                startIcon={
                  progress > 0 && progress < 100 ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CloudUpload />
                  )
                }
              >
                {progress > 0 && progress < 100 ? "מעלה..." : "העלה קובץ"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default FileUploader;
