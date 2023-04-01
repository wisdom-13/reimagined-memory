import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";

const Lobby: React.FC = () => {
  return (
    <div>
      <TopNavigation title='title' />
      <BottomNavigation />
    </div>
  )
}

export default Lobby;