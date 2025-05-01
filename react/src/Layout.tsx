import ChatBotPanel from "./components/AI/ChatBotPanel ";
import { Outlet } from "react-router-dom";
import Header from "./components/home/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <ChatBotPanel 
                challengeTopic="תחרות תמונות יצירתיות"
                challengeDescription="האתגר הוא ליצור תמונה בהשראת נושא מסוים"
            />
      {/* <GeminiPanel/> */}
      <main style={{ paddingTop: "50px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
