
// import React, { useState } from 'react';
// import axios from 'axios';
// import { getUserDataFromToken } from '../../utils/authUtils';
// Removed duplicate import of useParams
// import { Description } from '@mui/icons-material';


// const FileUploader = ({ onUploadSuccess }: { onUploadSuccess: (data: any) => void }) => { 
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const { challengeId } = useParams();
  

//   // שליפת פרטי המשתמש מה-token
//   const { userId, name, email } = getUserDataFromToken();

//   // טיפול בשינוי קובץ
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   // פונקציה להעלאת הקובץ
//   const handleUpload = async () => {
//     if (!file) return;

//     console.log(file.name);
//     console.log(file.type);

//     try {
//       const token = sessionStorage.getItem('token');

//       if (!token) {
//         alert('משתמש לא מחובר');
//         return;
//       }

//       // שלב 1: קבלת Presigned URL מהשרת
//       const res = await axios.get('https://localhost:7143/api/creation/upload-url', {
//         params: {
//           fileName: file.name,
//           contentType: file.type,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`, // שליחת ה-token
//         },
//       });

//       const presignedUrl = res.data.url;
//       console.log('Presigned URL:', presignedUrl);
//       console.log('after get url');
      
  
//        // שלב 2: העלאת הקובץ ישירות ל-S3
//        await axios.put(presignedUrl, file, {
//         headers: {
//           'Content-Type': file.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });
//      console.log('finish put');
     

//       // שלב 3: שמירת הקובץ בדאטה בייס
//       const res2 = await axios.post(
//         `https://localhost:7143/api/creation`,
//         {
//           UserId: userId,
//           FileName: file.name,
//           FileType: file.type,
//           Description:"",
//           ChallengeId: challengeId, 
//           ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,          
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         }        
//       );
//       console.log('finish');

      
//       onUploadSuccess({
//         UserId: userId,
//         FileName: file.name,
//         FileType: file.type,
//         Description:"",
//         ChallengeId: challengeId, 
//         ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,          
//       });

//       alert('הקובץ הועלה בהצלחה!');
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       alert('שגיאה בהעלאת הקובץ, אנא נסה שנית.');
//     }
//   };

//   return (
//     <div style={{ paddingTop: '80px', textAlign: 'center' }}>
//       <input type="file" onChange={handleFileChange} />
//       <input type="text" placeholder='תאור התמונה'/>
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>מעלה: {progress}%</div>}
//     </div>
//   );
// };

// export default FileUploader;






// import React, { useState, useRef } from 'react';
// import { Upload, FileText, X, Image, Check } from 'lucide-react';

// const FileUploader = ({ onUploadSuccess }: { onUploadSuccess: (data: { fileName: string; fileType: string; description: string; imageUrl: string }) => void }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [fileDescription, setFileDescription] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Mock function to simulate upload - replace with your actual implementation
//   const simulateUpload = async () => {
//     if (!file) {
//       alert('נא לבחור קובץ');
//       return;
//     }

//     try {
//       setIsUploading(true);
      
//       // Simulate progress updates
//       const interval = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 95) {
//             clearInterval(interval);
//             return prev;
//           }
//           return prev + 5;
//         });
//       }, 100);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Completion
//       clearInterval(interval);
//       setProgress(100);
      
//       // Prepare mock file data to return
//       const fileData = {
//         fileName: file.name,
//         fileType: file.type,
//         description: fileDescription,
//         // In a real implementation, this would come from your server
//         imageUrl: URL.createObjectURL(file)
//       };
      
//       // Return data to parent component
//       onUploadSuccess(fileData);
      
//       // Reset and close modal
//       setTimeout(() => {
//         alert('הקובץ הועלה בהצלחה!');
//         closeModal();
//         setIsUploading(false);
//       }, 500);
      
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       alert('שגיאה בהעלאת הקובץ, אנא נסה שנית.');
//       setIsUploading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFile(null);
//     setFileDescription("");
//     setProgress(0);
//     setPreview(null);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       const selectedFile = files[0];
//       setFile(selectedFile);
      
//       // Create preview for images
//       if (selectedFile.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
        
//                   if (typeof reader.result === 'string') {
//                     setPreview(reader.result);
//                   }
//         };
//         reader.readAsDataURL(selectedFile);
//       } else {
//         setPreview(null);
//       }
//     }
//   };

//   const handleDragOver = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     if (e.dataTransfer.files?.[0]) {
//       const droppedFile = e.dataTransfer.files[0];
//       setFile(droppedFile);
      
//       // Create preview for images
//       if (droppedFile.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           if (typeof reader.result === 'string') {
//             setPreview(reader.result);
//           } else {
//             setPreview(null);
//           }
//         };
//         reader.readAsDataURL(droppedFile);
//       } else {
//         setPreview(null);
//       }
//     }
//   };

//   // if (droppedFile.type.startsWith('image/')) {
//   //   const reader = new FileReader();
//   //   reader.onloadend = () => {
//   //     const result = reader.result;
//   //     if (typeof result === 'string') {
//   //       setPreview(result);  // אם התוצאה היא string, מכניסים לסטייט
//   //     } else {
//   //       setPreview(null);  // אם התוצאה היא לא string, מכניסים null
//   //     }
//   //   };
//   //   reader.readAsDataURL(droppedFile);  // קורא את הקובץ כ־Data URL (string)
//   // } else {
//   //   setPreview(null);  // אם לא מדובר בתמונה, מניחים preview null
//   // }

//   const handleUpload = () => {
//     // Call your actual upload function here
//     simulateUpload();
//   };

//   const getFileIcon = () => {
//     if (!file) return <Upload size={40} className="text-blue-400" />;
    
//     if (file.type.startsWith('image/')) {
//       return <Image size={40} className="text-purple-500" />;
//     } else if (file.type.includes('pdf')) {
//       return <FileText size={40} className="text-red-500" />;
//     } else if (file.type.includes('doc') || file.type.includes('word')) {
//       return <FileText size={40} className="text-blue-500" />;
//     } else {
//       return <FileText size={40} className="text-gray-500" />;
//     }
//   };

//   return (
//     <>
//       {/* Sticky Upload Button */}
//       <button 
//         onClick={openModal}
//         className="fixed flex items-center justify-center shadow-lg bottom-20 right-8 z-50 text-white rounded-full p-4 transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 hover:rotate-3"
//         aria-label="העלאת קובץ"
//       >
//         <Upload size={24} />
//       </button>

//       {/* Modal Overlay with blur effect */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
//           {/* Modal Content */}
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden transform transition-all duration-300 scale-100" dir="rtl">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
//               <h3 className="text-xl font-semibold flex items-center">
//                 <Upload className="ml-2" size={22} />
//                 העלאת קובץ חדש
//               </h3>
//               <button 
//                 onClick={closeModal}
//                 className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-8">
//               {/* File Drop Area */}
//               <div 
//                 className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer transition-all duration-300 ${
//                   isDragging 
//                     ? 'border-indigo-500 bg-indigo-50' 
//                     : file 
//                       ? 'border-green-400 bg-green-50' 
//                       : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
//                 }`}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   accept="image/*,.pdf,.doc,.docx"
//                 />
                
//                 <div className="flex flex-col items-center">
//                   {preview ? (
//                     <div className="w-32 h-32 mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-inner">
//                       <img src={preview} alt="תצוגה מקדימה" className="max-w-full max-h-full object-contain" />
//                     </div>
//                   ) : (
//                     <div className="w-20 h-20 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
//                       {getFileIcon()}
//                     </div>
//                   )}
                  
//                   {file ? (
//                     <div className="flex items-center text-green-600 font-medium">
//                       <Check size={16} className="ml-1" />
//                       <span>הקובץ מוכן להעלאה</span>
//                     </div>
//                   ) : (
//                     <>
//                       <p className="text-gray-600 mb-2 font-medium">גרור קובץ לכאן או</p>
//                       <button className="text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors rounded-lg px-4 py-2 font-medium" type="button">
//                         בחר קובץ
//                       </button>
//                     </>
//                   )}
                  
//                   {file && (
//                     <div className="mt-3 p-2 bg-gray-100 rounded-lg text-gray-800 text-sm max-w-full overflow-hidden truncate">
//                       {file.name}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Description Input */}
//               <div className="mb-6">
//                 <label htmlFor="description" className="block text-gray-700 mb-2 font-medium text-right">
//                   תיאור הקובץ
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     id="description"
//                     className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none shadow-sm transition-all duration-200"
//                     rows={3}
//                     placeholder="הוסף תיאור לקובץ שלך..."
//                     value={fileDescription}
//                     onChange={(e) => setFileDescription(e.target.value)}
//                   />
//                   <FileText size={18} className="absolute top-4 left-4 text-gray-400" />
//                 </div>
//               </div>

//               {/* Progress Bar (shows only when uploading) */}
//               {progress > 0 && (
//                 <div className="mb-6">
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
//                       style={{ width: `${progress}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-xs font-medium text-gray-500">
//                       {progress < 100 ? 'מעלה...' : 'הסתיים!'}
//                     </span>
//                     <span className="text-xs font-medium text-blue-600">{`${progress}%`}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Upload Button */}
//               <button
//                 onClick={handleUpload}
//                 disabled={!file || isUploading}
//                 className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-all duration-300 ${
//                   !file || isUploading
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
//                 }`}
//               >
//                 <Upload className="ml-2" size={18} />
//                 {isUploading ? 'מעלה...' : 'העלה קובץ'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FileUploader;













// import React, { useState } from 'react';
// import axios from 'axios';
// import { getUserDataFromToken } from '../../utils/authUtils';
// import { useParams } from 'react-router-dom';
// import { Modal, Box, Button, TextField, CircularProgress } from '@mui/material';
// import { CloudUpload } from '@mui/icons-material';

// const FileUploader = ({ onUploadSuccess }: { onUploadSuccess: (data: any) => void }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [openModal, setOpenModal] = useState(false);
//   const [description, setDescription] = useState('');
//   const { challengeId } = useParams();

//   // שליפת פרטי המשתמש מה-token
//   const { userId, name, email } = getUserDataFromToken();

//   // טיפול בשינוי קובץ
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   // פונקציה להעלאת הקובץ
//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       const token = sessionStorage.getItem('token');

//       if (!token) {
//         alert('משתמש לא מחובר');
//         return;
//       }

//       // שלב 1: קבלת Presigned URL מהשרת
//       const res = await axios.get('https://localhost:7143/api/creation/upload-url', {
//         params: {
//           fileName: file.name,
//           contentType: file.type,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`, // שליחת ה-token
//         },
//       });

//       const presignedUrl = res.data.url;
      
//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axios.put(presignedUrl, file, {
//         headers: {
//           'Content-Type': file.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       // שלב 3: שמירת הקובץ בדאטה בייס
//       const res2 = await axios.post(
//         `https://localhost:7143/api/creation`,
//         {
//           UserId: userId,
//           FileName: file.name,
//           FileType: file.type,
//           Description: description,
//           ChallengeId: challengeId,
//           ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );

//       onUploadSuccess({
//         UserId: userId,
//         FileName: file.name,
//         FileType: file.type,
//         Description: description,
//         ChallengeId: challengeId,
//         ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,
//       });

//       alert('הקובץ הועלה בהצלחה!');
//       setOpenModal(false); // סגירת המודל לאחר העלאה
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       alert('שגיאה בהעלאת הקובץ, אנא נסה שנית.');
//     }
//   };

//   return (
//     <>
//       {/* כפתור סטיקי בפינת העמוד */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setOpenModal(true)}
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           borderRadius: '50%',
//           padding: '10px 20px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         }}
//       >
//         <CloudUpload />
//       </Button>

//       {/* מודל */}
//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="file-upload-modal"
//         aria-describedby="upload-file-and-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             padding: 3,
//             borderRadius: 2,
//           }}
//         >
//           <h2 id="file-upload-modal" style={{ textAlign: 'center' }}>העלאת קובץ</h2>

//           {/* תיבת גרירה */}
//           <div
//             style={{
//               border: '2px dashed #ccc',
//               borderRadius: '8px',
//               padding: '20px',
//               marginBottom: '20px',
//               textAlign: 'center',
//               cursor: 'pointer',
//               backgroundColor: '#f9f9f9',
//             }}
//             onClick={() => document.getElementById('file-input')?.click()}
//           >
//             <input
//               id="file-input"
//               type="file"
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//             {file ? (
//               <p>בחרת את הקובץ: {file.name}</p>
//             ) : (
//               <p>גרור קובץ לכאן או לחץ לבחירה</p>
//             )}
//           </div>

//           {/* שדה תאור */}
//           <TextField
//             label="תאור התמונה"
//             variant="outlined"
//             fullWidth
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={{ marginBottom: '20px' }}
//           />

//           {/* כפתור העלאה */}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleUpload}
//             disabled={progress > 0 && progress < 100}
//           >
//             {progress > 0 && progress < 100 ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               'העלה קובץ'
//             )}
//           </Button>

//           {/* הצגת אחוז ההעלאה */}
//           {progress > 0 && progress < 100 && (
//             <div style={{ marginTop: '10px', textAlign: 'center' }}>
//               מעלה: {progress}%
//             </div>
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default FileUploader;




import React, { useState, useRef } from 'react';
import axios from 'axios';
import { getUserDataFromToken } from '../../utils/authUtils';
import { useParams } from 'react-router-dom';
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
  Zoom
} from '@mui/material';
import { 
  CloudUpload, 
  Close as CloseIcon, 
  // Image as ImageIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
  FilePresent,
  // Lightbulb as LightbulbIcon,
} from '@mui/icons-material';

const FileUploader = ({ onUploadSuccess }: { onUploadSuccess: (data: { UserId: string; FileName: string; FileType: string; Description: string; ChallengeId: string | undefined; ImageUrl: string }) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { challengeId } = useParams();

  // שליפת פרטי המשתמש מה-token
  const { userId, name, email } = getUserDataFromToken();

  // טיפול בשינוי קובץ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      setFile(selectedFile);
      
      // יצירת תצוגה מקדימה לתמונות
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            if (typeof reader.result === 'string') {
              setPreview(reader.result);
            }
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  // טיפול בגרירת קבצים
  const handleDragOver = (e:any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: any[]; }; }) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      
      // יצירת תצוגה מקדימה לתמונות
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setPreview(null);
      }
    }
  };

  // פונקציה להעלאת הקובץ
  const handleUpload = async () => {
    if (!file) return;

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        alert('משתמש לא מחובר');
        return;
      }

      // שלב 1: קבלת Presigned URL מהשרת
      const res = await axios.get('https://localhost:7143/api/creation/upload-url', {
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
          'Content-Type': file.type,
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
        `https://localhost:7143/api/creation`,
        {
          UserId: userId ?? '',
          FileName: file.name,
          FileType: file.type,
          Description: description,
          ChallengeId: challengeId,
          ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      onUploadSuccess({
        UserId: userId ?? '',
        FileName: file.name,
        FileType: file.type,
        Description: description,
        ChallengeId: challengeId,
        ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,
      });

      alert('הקובץ הועלה בהצלחה!');
      resetForm();
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      alert('שגיאה בהעלאת הקובץ, אנא נסה שנית.');
    }
  };

  const resetForm = () => {
    setOpenModal(false);
    setFile(null);
    setDescription('');
    setProgress(0);
    setPreview(null);
  };

  // הצגת אייקון בהתאם לסוג הקובץ
  const renderFileIcon = () => {
    if (!file) return <CloudUpload style={{ fontSize: 60, color: '#8A4FFF' }} />;
    
    if (preview) {
      return null; // לא מציג אייקון כשיש תמונת תצוגה מקדימה
    } else if (file.type.includes('pdf')) {
      return <DescriptionIcon style={{ fontSize: 60, color: '#FF725E' }} />;
    } else if (file.type.includes('doc') || file.type.includes('word')) {
      return <FilePresent style={{ fontSize: 60, color: '#4F9DFF' }} />;
    } else {
      return <FilePresent style={{ fontSize: 60, color: '#8A4FFF' }} />;
    }
  };

  return (
    <>
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
        <Fab
          onClick={() => setOpenModal(true)}
          aria-label="chat"
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
      </Tooltip>

      {/* מודל מעוצב */}
      <Modal
        open={openModal}
        onClose={resetForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backdropFilter: 'blur(3px)' }
        }}
        aria-labelledby="file-upload-modal"
        aria-describedby="upload-file-and-description"
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '500px', md: '550px' }, // מודל רספונסיבי יותר
              bgcolor: 'background.paper',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              padding: 0,
              borderRadius: 3,
              overflow: 'hidden',
              direction: 'rtl',
            }}
          >
            {/* כותרת מעוצבת */}
            <Box sx={{ 
              background: 'linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6" component="h2" sx={{ 
                color: 'white', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <CloudUpload /> העלאת קובץ
              </Typography>
              <IconButton 
                onClick={resetForm} 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ padding: '24px 32px' }}>
              {/* אזור לגרירת קבצים */}
              <Paper
                elevation={0}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragging ? '#8A4FFF' : file ? '#4FC1FF' : '#E0E0E0',
                  borderRadius: 2,
                  padding: 3,
                  marginBottom: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragging ? 'rgba(138, 79, 255, 0.05)' : file ? 'rgba(79, 193, 255, 0.05)' : '#F9F9FF',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#8A4FFF',
                    backgroundColor: 'rgba(138, 79, 255, 0.05)'
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '180px'
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                {preview ? (
                  <Box sx={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    mb: 2
                  }}>
                    <img 
                      src={preview} 
                      alt="תצוגה מקדימה" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </Box>
                ) : renderFileIcon()}

                {file ? (
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ 
                      color: '#8A4FFF', 
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <CheckIcon fontSize="small" /> הקובץ מוכן להעלאה
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {file.name}
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ mt: 1, mb: 1, color: '#666' }}>
                      גרור קובץ לכאן או לחץ לבחירה
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ 
                        mt: 1,
                        borderColor: '#8A4FFF',
                        color: '#8A4FFF',
                        '&:hover': {
                          borderColor: '#7A3FEF',
                          backgroundColor: 'rgba(138, 79, 255, 0.08)',
                        }
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
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#8A4FFF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8A4FFF',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#8A4FFF',
                  },
                }}
              />

              {/* מד התקדמות */}
              {progress > 0 && (
                <Box sx={{ width: '100%', mb: 3 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(79, 193, 255, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #8A4FFF 0%, #4FC1FF 100%)',
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {progress < 100 ? 'מעלה...' : 'הושלם!'}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="medium">
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
                disabled={!file || (progress > 0 && progress < 100)}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #8A4FFF 0%, #4FC1FF 100%)',
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7A3FEF 0%, #3FB1EF 100%)',
                    boxShadow: '0 4px 12px rgba(138, 79, 255, 0.3)',
                  },
                  '&.Mui-disabled': {
                    background: '#E0E0E0',
                    color: '#A0A0A0'
                  }
                }}
                startIcon={progress > 0 && progress < 100 ? <CircularProgress size={20} color="inherit" /> : <CloudUpload />}
              >
                {progress > 0 && progress < 100 ? 'מעלה...' : 'העלה קובץ'}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default FileUploader;