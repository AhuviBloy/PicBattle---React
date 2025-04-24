// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const CreationView = ({ fileName }: { fileName: string }) => {

//     const [imageUrl, setImageUrl] = useState(null);

//     useEffect(() => {
//         const fetchImageUrl = async () => {
//             try {
                        
//                 const response = await axios.get(`https://localhost:7143/api/Creation/image-url/${fileName}`, {});
        
//                 setImageUrl(response.data.imageUrl.imageUrl);  // הגדרת ה-URL לקבלת התמונה
//                 console.log({response});
                
                
        
//             } catch (error) {
//                 console.error('שגיאה בהבאת ה-URL:', error);
//             }
//         };
        
//         fetchImageUrl();

//     }, [fileName]); // מבצע את הקריאה כל פעם ששם הקובץ משתנה

//     return (
//         <div>
//             {imageUrl ? (
//                 <img src={imageUrl} alt="Uploaded Image" style={{ height:'100%',width: '80%', borderRadius: '8px' }} />
//             ) : (
//                 <p>טוען תמונה...</p>
//             )}
//         </div>
//     );
// };

// export default CreationView;