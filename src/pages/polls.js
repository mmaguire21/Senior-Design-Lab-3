import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


// Configure Database
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, getDoc } from 'firebase/firestore/lite';
import {
  updateDoc,
  doc
 } from '@firebase/firestore/lite';


// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

  apiKey: "AIzaSyBqaR9GxYcVJ3CS-hkEL8rOPOkjNwCkkec",

  authDomain: "senior-design-lab-3-d6e2e.firebaseapp.com",

  databaseURL: "https://senior-design-lab-3-d6e2e-default-rtdb.firebaseio.com",

  projectId: "senior-design-lab-3-d6e2e",

  storageBucket: "senior-design-lab-3-d6e2e.appspot.com",

  messagingSenderId: "553614215112",

  appId: "1:553614215112:web:02bb2b356f8c05720322fd",

  measurementId: "G-4JNWPN5MW8"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var docLength;
var idList = [];
var data;

async function getPolls(db) {
  const pollsCol = collection(db, 'Polls');
  const pollSnapshot = await getDocs(pollsCol);
  const pollList = pollSnapshot.docs.map(doc => doc.data());
  idList = pollSnapshot.docs.map(doc => doc.id);
  docLength = idList.length;
  return pollSnapshot;
}

function RenderDocs(){
  getPolls(db).then((snapshot) => {
    data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data); 
    
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
  });
}

RenderDocs()




export default class Polls extends React.Component{
  state = {
    slots: [],
  }
  handleTimeSlots = event => {
    var slotArr = ["", ""];
    var slotsArr = [];
    var numSlots = data[2].timeSlots.length
    for(var i = 0; i < numSlots; i++){
      slotArr[0] = data[2].timeSlots[i].startTime;
      slotArr[1] = data[2].timeSlots[i].endTime;
      var arr = [slotArr[0], slotArr[1]]
      slotsArr.push(arr);
    }
    console.log(slotsArr)
    event.preventDefault()
    this.setState({
      slots: slotsArr,
    })
  }

  render(){
    return(
      <div>
        Hello World
        <RenderTimeSlots slotList={this.state.slots}/>
        <form onSubmit={this.handleTimeSlots}>
          <button type="submit">render</button>
        </form>
      </div>
    )
  }
}

function RenderTimeSlots({slotList}){
    
  return (
      <ul>
          {slotList.map(slot => (
              <li>
                  <nav>
                      {slot}
                      <text> </text>
                      
                  </nav>
              </li>
          ))}
      </ul>
  );
};