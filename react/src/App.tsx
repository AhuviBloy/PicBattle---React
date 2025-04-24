import {  RouterProvider } from "react-router-dom";
import { myRouter } from "./Router";
import "./index.css";




const App = () => {
  return (

      <RouterProvider router={myRouter} />  
      
  );
};

export default App;
