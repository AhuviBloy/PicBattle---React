import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "50px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
