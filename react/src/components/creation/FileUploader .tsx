
import React, { useState } from 'react';
import axios from 'axios';
import { getUserDataFromToken } from '../../utils/authUtils';
import { useParams } from 'react-router-dom';


const FileUploader = ({ onUploadSuccess }: { onUploadSuccess: (data: any) => void }) => { 
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { challengeId } = useParams();
  

  // שליפת פרטי המשתמש מה-token
  const { userId, name, email } = getUserDataFromToken();

  // טיפול בשינוי קובץ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // פונקציה להעלאת הקובץ
  const handleUpload = async () => {
    if (!file) return;

    console.log(file.name);
    console.log(file.type);

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        alert('לא נמצא token');
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
      console.log('Presigned URL:', presignedUrl);
      console.log('after get url');
      
  
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
     console.log('finish put');
     

      // שלב 3: שמירת הקובץ בדאטה בייס
      const res2 = await axios.post(
        `https://localhost:7143/api/creation`,
        {
          UserId: userId,
          FileName: file.name,
          FileType: file.type,
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
      console.log('finish');

      
      onUploadSuccess({
        UserId: userId,
        FileName: file.name,
        FileType: file.type,
        ChallengeId: challengeId, 
        ImageUrl: `https://ahuvi-new.s3.us-east-1.amazonaws.com/${file.name}`,          
      });

      alert('הקובץ הועלה בהצלחה!');
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      alert('שגיאה בהעלאת הקובץ, אנא נסה שנית.');
    }
  };

  return (
    <div style={{ paddingTop: '80px', textAlign: 'center' }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>העלה קובץ</button>
      {progress > 0 && <div>מעלה: {progress}%</div>}
    </div>
  );
};

export default FileUploader;








