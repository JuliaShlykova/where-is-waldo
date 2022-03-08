import { collection, getDocs, limit,  orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import fire from '../assets/fire.gif';
import img1 from '../assets/mini-images/1.jpg';
import img2 from '../assets/mini-images/2.jpg';
import img3 from '../assets/mini-images/3.jpg';

const levelNumbers = [1,2,3];
const levelNames = ['Hard', 'Medium', 'Easy'];
const imgs = [img1, img2, img3];

const LeaderBoard = () => {
  let location = useLocation();
  const imageNumber = location.state?location.state.imageNumber:1;
  const [users, setUsers] = useState([]);
  const [level, setLevel] = useState(imageNumber);

  useEffect(() => {
    const getUsers = async () => {
      let docs = []
      const q = query(collection(db, `users${level}`), orderBy('userTime'), limit(20));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        docs.push(doc.data());
      })
      setUsers(docs);
    }
    getUsers();    
  },[setUsers, level]);

  return (
    <div>
      <Link to='/'>Home</Link>
      <h1>LeaderBoard</h1>
      <div id="leaderboard-level-choices">
        {levelNumbers.map((v,i)=>{
          if(level===v) {
            return <div key={i} onClick={function(){setLevel(v)}} style={{width:"200px"}}>
            <img src={imgs[v-1]} alt={v} style={{maxWidth:"200px"}} />
            <span>{levelNames[v-1]}</span></div>
          } else {
            return <div key={i} onClick={function(){setLevel(v)}}>
            <img src={imgs[v-1]} alt={v}/>
            <span>{levelNames[v-1]}</span></div>
          }
        })}
      </div>
      <div id="wrapper-table">
        <table>
        <tbody>
          <tr>
            <th>NAME</th>
            <th>TIME (seconds)</th>
          </tr>
          {users.map((user,i)=>{
            if(i<3) {
              return(<tr key={i}><td><img src={fire} alt="fire"></img>{user.name}</td><td>{user.userTime.toFixed(2)}</td></tr>)
            } else {
              return (<tr key={i}><td style={{paddingLeft:'50px'}}>{user.name}</td><td>{user.userTime.toFixed(2)}</td></tr>)
            }
            })}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderBoard;