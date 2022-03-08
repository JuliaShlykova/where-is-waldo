import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";


const RoutesSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesSwitch