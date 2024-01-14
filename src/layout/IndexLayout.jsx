import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function IndexLayout() {
  return (
    <>
      <Header />
      <div className="main-container" id="main">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default IndexLayout;
