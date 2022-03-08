import { useEffect } from 'react';
import { Link } from "react-router-dom";
import waldo from "./assets/characters/Waldo.jpg";

const levelNumbers = [1,2,3];
const levelNames = ['Hard', 'Medium', 'Easy'];

const createPathLevel = (number) => {
  return {
    pathname: "/game",
    state: {
      imageNumber: number
    }
  }
}

const pathLevels = levelNumbers.map(n => createPathLevel(n));

function Menu() {

  useEffect(()=>{
  },[])

  return (
    <div className="App">
    <a href="https://github.com/JuliaShlykova" id="home-waldo-link"><img src={waldo} alt="waldo" id="home-waldo-img" /></a>
    <div id="home-header">
      <span className="blue-part">WHERE'S </span><span className="red-part">WALDO?</span>
    </div>
    <nav>
      {pathLevels.map((v,i)=>{
            return <Link to={v.pathname} state={v.state} key={i}><div>{levelNames[v.state.imageNumber-1]}</div></Link>
        })}
      <Link to="/leaderboard">LeaderBoard</Link>
    </nav>
    </div>
    
  );
}

export default Menu;
