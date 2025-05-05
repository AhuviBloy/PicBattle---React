// import ChatBotPanel from "./components/AI/ChatBotPanel ";
import { Outlet } from "react-router-dom";
import Header from "./components/home/Header";

const Layout = () => {
  return (
    <>
      <Header />
     
      {/* <GeminiPanel/> */}
      <main style={{ paddingTop: "50px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
