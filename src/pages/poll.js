import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Layout from '../components/layout'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, getDoc } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore";

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


// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'Polls');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return citySnapshot;
}

async function savePoll(db, title, loc, notes, zone, startDate, startTime, endTime, numBlocks, sesh, restrictS, restrictP, deadline, invite, invitees, isPublished) {
  const docRef = await addDoc(collection(db, "Polls"), {
    title: title,
    location: loc,
    notesComments: notes,
    timeZone: zone,
    startDate: startDate,
    startTime: startTime,
    endTime: endTime,
    numBlocks: numBlocks,
    sessionTime: sesh, 
    restrictSlots: restrictS,
    restrictNumParticipants: restrictP,
    deadline: deadline,
    invite: invite,
    invitees: invitees,
    isPublished: isPublished,
  });
}


//getCities(db).then((response) => console.log(response[0].title));

var data;

function RenderDocs(){
  getCities(db).then((snapshot) => {
    data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data); 

    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
  });
}


RenderDocs(); 





export default class NameForm extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  handleChange(event) { this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert(this.state.value + ' has successfully signed up for the poll at selected time' );
    event.preventDefault();
  }

  handleCalendarChange = event => {
    const name = "startDate"
    this.setState({
      [name]: event,
    })
  }
  
  render() {
    return (
      <>
      
      <Layout pageTitle= "Poll Details">
        </Layout>
        <Calendar>
          onChange= {this.handleCalendarChange}
          onClickDay={this.state}
        </Calendar>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name/Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />   </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={this.renderModify}>
          <button type="submit">render</button>
        </form>
        </>
    );
  }
}

