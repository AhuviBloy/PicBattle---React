// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FileList = () => {
//   const [files, setFiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         // שליחת בקשה לשרת לקבלת הקבצים עם ה-URL של כל קובץ
//         const response = await axios.get('https://localhost:7143/api/Creation');
//         setFiles(response.data); // הנחה שהתשובה היא רשימה של יצירות עם URLs
//       } catch (err) {
//         setError('שגיאה בהבאת הקבצים');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   if (loading) {
//     return <div>טוען קבצים...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h3>רשימת קבצים</h3>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>
//             <a href={file.ImageUrl} target="_blank" rel="noopener noreferrer">
//               {file.FileName}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;
