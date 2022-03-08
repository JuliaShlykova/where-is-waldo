import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

export default function PromptBox({userTime, imageNumber=1}) {
  const [name, setName] = useState('');

  const submitForm = (e) => {
    if(name) {
      const collectionRef = collection(db, `users${imageNumber}`);

      async function addNewDoc () {
        console.log('userTime: ', userTime);
        const docData = {name, userTime};
        try {
          await addDoc(collectionRef, docData);
        } catch(e) {
          console.log(e);
        }
      }
      addNewDoc();
    } else {
      e.preventDefault();
      alert('Please, enter your name');
    }
  }
  const setUserName = (e) => {
    if (e.target.value.length>30) {
      alert('Please, no more than 30 characters');
    } else {
      setName(e.target.value);
    }
  }

  return (<div className="prompt-wrapper">
  <div id="prompt-box">
    <p>Congratulations! You have found everyone for { userTime } seconds!</p>
    <label htmlFor="userName">Your name: </label>
    <input type="text" value={name} onChange={setUserName} ></input>
    <div id="buttons-of-form">
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/leaderboard' state={{imageNumber}}>
        <button onClick={submitForm}>
          Submit
        </button>
      </Link>
    </div>

  </div>
  </div>)
}