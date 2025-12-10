import React, { useState } from "react";
import "./Home.css";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { Feed } from "../../Components/Feed/Feed";
// In Home component we are destructuring the sideBar
const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      {/* we are passing the sidebar state using props
      here we are accessing the sidebar state in the SideBar
      component 
      2.Mounting Feed component*/}
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category} />
      </div>
    </>
  );
};

export default Home;
