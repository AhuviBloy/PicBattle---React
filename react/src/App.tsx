import { RouterProvider } from "react-router-dom";
import { myRouter } from "./Router";
import "./index.css";
// import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    // <SnackbarProvider
    //   maxSnack={3}
    //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //   autoHideDuration={3000}
    // >
      <RouterProvider router={myRouter} />
    // </SnackbarProvider>
  );
};

export default App;
