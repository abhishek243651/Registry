// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";
// import { FaHome, FaUser, FaCog, FaUsers } from "react-icons/fa";
// import Footer from "../components/Footer";
// import { sidebarItems } from "../utils/sidebar";

// const Dashboard = () => {
//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       <Sidebar items={sidebarItems} />
//       <div className="flex-grow-1 d-flex flex-column w-100">
//         <main className="flex-grow-1">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { sidebarItems } from "../utils/sidebar";

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar items={sidebarItems} />
      <div className="flex-grow-1 d-flex flex-column w-100">
        <Navbar />
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
