import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function IndexLayout() {
  return (
    <>
      <Header />
      <div className="overflow-y-auto flex-fill w-100" id="main">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default IndexLayout;
