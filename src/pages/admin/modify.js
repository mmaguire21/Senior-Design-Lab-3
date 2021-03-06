import React from "react"
import Calendar from "react-calendar"
import DateTime from 'react-datetime'
import styled from "styled-components";
import Layout from "../../components/layout_home";
import { Link } from 'gatsby'
import 'react-calendar/dist/Calendar.css';
import "react-datetime/css/react-datetime.css";


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, getDoc } from 'firebase/firestore/lite';
import {
  updateDoc,
  doc
 } from '@firebase/firestore/lite';


// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

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

const theme = {
  blue: {
      default: "#3f51b5",
      hover: "#283593"
  },
  pink: {
      default: "#c91751",
      hover: "#ad1457"
  }
};

const SubmitButton = styled.button`
background-color: ${(props) => theme[props.theme].default};
color: white;
position: bottom;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
margin: 10px 0;
cursor: pointer;
box-shadow: 0 2px 2px lightgray;
transition: ease background-color 250ms;

&:hover {
  background-color: ${(props) => theme[props.theme].hover};
}

&:disabled {
  cursor: default;
  opacity: 0.7;
}`;

SubmitButton.defaultProps = {
  theme: "blue"
};

const SaveButton = styled.button`
background-color: ${(props) => theme[props.theme].default};
color: white;
position: relative;
bottom:48px;
left:125px;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
margin: 10px 0;
cursor: pointer;
box-shadow: 0 2px 2px lightgray;
transition: ease background-color 250ms;

&:hover {
  background-color: ${(props) => theme[props.theme].hover};
}

&:disabled {
  cursor: default;
  opacity: 0.7;
}`;

SaveButton.defaultProps = {
  theme: "blue"
};

const CancelButton = styled.button`
background-color: ${(props) => theme[props.theme].default};
color: white;
position: relative;
bottom: 97px;
left: 225px;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
margin: 10px 0;
cursor: pointer;
box-shadow: 0 2px 2px lightgray;
transition: ease background-color 250ms;

&:hover {
  background-color: ${(props) => theme[props.theme].hover};
}

&:disabled {
  cursor: default;
  opacity: 0.7;
}`;

CancelButton.defaultProps = {
  theme: "blue"
};

const InviteButton = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  position: relative;
  bottom:1px;
  left:20px;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0;
  cursor: pointer;
  box-shadow: 0 2px 2px lightgray;
  transition: ease background-color 250ms;

  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }`;

InviteButton.defaultProps = {
  theme: "blue"
};

var timeConverter = {
  "0": "12:00am",
  "15": "12:15am",
  "30": "12:30am",
  "45": "12:45am",
  "60": "1:00am",
  "75": "1:15am",
  "90": "1:30am",
  "105": "1:45am",
  "120": "2:00am",
  "135": "2:15am",
  "150": "2:30am",
  "165": "2:45am",
  "180": "3:00am",
  "195": "3:15am",
  "210": "3:30am",
  "225": "3:45am",
  "240": "4:00am",
  "255": "4:15am",
  "270": "4:30am",
  "285": "4:45am",
  "300": "5:00am",
  "315": "5:15am",
  "330": "5:30am",
  "345": "5:45am",
  "360": "6:00am",
  "375": "6:15am",
  "390": "6:30am",
  "405": "6:45am",
  "420": "7:00am",
  "435": "7:15am",
  "450": "7:30am",
  "465": "7:45am",
  "480": "8:00am",
  "495": "8:15am",
  "510": "8:30am",
  "525": "8:45am",
  "540": "9:00am",
  "555": "9:15am",
  "570": "9:30am",
  "585": "9:45am",
  "600": "10:00am",
  "615": "10:15am",
  "630": "10:30am",
  "645": "10:45am",
  "660": "11:00am",
  "675": "11:15am",
  "690": "11:30am",
  "705": "11:45am",
  "720": "12:00pm",
  "735": "12:15pm",
  "750": "12:30pm",
  "765": "12:45pm",
  "780": "1:00pm",
  "795": "1:15pm",
  "810": "1:30pm",
  "825": "1:45pm",
  "840": "2:00pm",
  "855": "2:15pm",
  "870": "2:30pm",
  "885": "2:45pm",
  "900": "3:00pm",
  "915": "3:15pm",
  "930": "3:30pm",
  "945": "3:45pm",
  "960": "4:00pm",
  "975": "4:15pm",
  "990": "4:30pm",
  "1005": "4:45pm",
  "1020": "5:00pm",
  "1035": "5:15pm",
  "1050": "5:30pm",
  "1065": "5:45pm",
  "1080": "6:00pm",
  "1095": "6:15pm",
  "1110": "6:30pm",
  "1125": "6:45pm",
  "1140": "7:00pm",
  "1155": "7:15pm",
  "1170": "7:30pm",
  "1185": "7:45pm",
  "1200": "8:00pm",
  "1215": "8:15pm",
  "1230": "8:30pm",
  "1245": "8:45pm",
  "1260": "9:00pm",
  "1275": "9:15pm",
  "1290": "9:30pm",
  "1305": "9:45pm",
  "1320": "10:00pm",
  "1335": "10:15pm",
  "1350": "10:30pm",
  "1365": "10:45pm",
  "1380": "11:00pm",
  "1395": "11:15pm",
  "1410": "11:30pm",
  "1425": "11:45pm",
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var docLength;
var idList = []; 

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'Polls');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  idList = citySnapshot.docs.map(doc => doc.id);
  docLength = idList.length;
  return citySnapshot;
}

async function editPoll(db, title, loc, notes, zone, startDate, startTime, endTime, numBlocks, sesh, restrictS, restrictP, deadline, invite, invitees, isPublished, id){
  const docRef = doc(db, 'Polls/'.concat(id));
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, "title", title);
  await updateDoc(docRef, "location", loc);
}

async function savePoll(db, title, loc, notes, zone, startDate, startTime, endTime, numBlocks, sesh, restrictS, restrictP, deadline, invite, invitees, isPublished) {
  var timeSlotArr = [];
  const diff = endTime - startTime;

  for(var i = 0; i < numBlocks; i++){
    timeSlotArr.push({
      emailList: [],
      startTime: timeConverter[(parseInt(startTime,10) + (parseInt(sesh,10)*i)).toString()],
      endTime: timeConverter[(parseInt(startTime,10) + parseInt(sesh,10) + (parseInt(sesh,10)*i)).toString()],
    })
  }
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
    timeSlots: timeSlotArr,
  });
}


var data;

function RenderDocs(){
  getCities(db).then((snapshot) => {
    data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data[0].title); 
    
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
  });
}

RenderDocs()

//console.log(data[0].title)

export default class Create extends React.Component {
  range = true;
  state = {
    title: "",
    location: "",
    notesComments: "",
    timeZone: "None",
    startDate: new Date,
    startTime: "0",
    endTime: "0",
    numBlocks: "",
    sessionTime: "", 
    restrictSlots: false,
    restrictNumParticipants: false,
    deadline: new Date(),
    invite: [],
    invitees: [],
    isPublished: false,
  }


    renderModify = event => {
    const docid = sessionStorage.getItem('id')
    var index = 0;
    event.preventDefault()
    var i = 0;
    while(i < docLength){
      if(data[i].id == docid){
        index = i;
      }
      i = i + 1;
    }
    console.log(data)
    this.setState({
      title: data[index].title,
      location: data[index].location,
      notesComments: data[index].notesComments,
      timeZone: data[index].timeZone,
      startDate: data[index].startDate,
      startTime: data[index].startTime,
      endTime: data[index].endTime,
      numBlocks: data[index].numBlocks,
      sessionTime: data[index].sessionTime, 
      restrictSlots: data[index].restrictSlots,
      restrictNumParticipants: data[index].restrictNumParticipants,
      deadline: data[index].deadline,
      invite: data[index].invite,
      invitees: data[index].invitees,
      isPublished: data[index].isPublished,
    })
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleDeadlineChange = event => {
    this.setState({
      deadline: event.toDate(),
    })
  }
  handleRestrictSlots = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    const prev = this.state.restrictSlots
    this.setState({
      [name]: !prev,
    })
  }
  handleRestrictParticipants = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    const prev = this.state.restrictNumParticipants
    this.setState({
      [name]: !prev,
    })
  }
  handleBlocksInputChange = event => {
    const difference = this.state.endTime - this.state.startTime

    const target = event.target
    const value = target.value
    const name = target.name
    if(name == "numBlocks"){
      const sessionsLength = difference / value
      if(sessionsLength < 5){
        alert(`The length of sessions must be 5 minutes or longer`)
      }
      else{
        this.setState({
          sessionTime: sessionsLength,
        })
        this.setState({
          [name]: value,
        })
      }
    }
    if(name == "sessionTime"){
      const calculatedNumBlocks = difference / value
      if(calculatedNumBlocks < 1){
        alert(`There must be at least one block`)
      }
      else{
        this.setState({
          numBlocks: Math.floor(calculatedNumBlocks),
        })
        this.setState({
          [name]: value,
        })
      } 
    }
  
  }
  handleStartOrEndTimeChange = event => {
    const index = event.target.selectedIndex
    const time = index*15
    this.setState({
      [event.target.name]: time,
    })
  }
  handleCalendarChange = event => {
    const name = "startDate"
    this.setState({
      [name]: event,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    alert(`deadline: ${this.state.deadline}`)
    alert(`Title: ${this.state.title} Location: ${this.state.location} Notes and Comments: ${this.state.notesComments} startTime: ${this.state.restrictNumParticipants}!`)
  }
  handleInviteSubmit = event => {
    event.preventDefault()
    var prev_arr = this.state.invitees
    prev_arr.push(this.state.invite)

    this.setState({
      invitees: prev_arr
    })
  }
  handlePublish = event => {
    event.preventDefault()
    this.setState({
      isPublished: true,
    })
    editPoll(db, this.state.title, this.state.location, this.state.notesComments, this.state.timeZone, this.state.startDate, this.state.startTime, this.state.endTime, this.state.numBlocks, this.state.sessionTime, this.state.restrictSlots, this.state.restrictNumParticipants, this.state.deadline, this.state.invite, this.state.invitees, true, sessionStorage.getItem('id') )
    alert(`Title: ${this.state.title}\n Location: ${this.state.location}\n Notes and Comments: ${this.state.notesComments}\n timeZone: ${this.state.timeZone}\n startDate: ${this.state.startDate}\n startTime: ${this.state.startTime}\n endTime: ${this.state.endTime}\n numBlocks: ${this.state.numBlocks}\n sessionTime: ${this.state.sessionTime}\n restrictSlots: ${this.state.restrictSlots}\n restrictNumParticipants: ${this.state.restrictNumParticipants}\n deadline: ${this.state.deadline}\n invite: ${this.state.invite}\n invitees: ${this.state.invitees}\n isPublished: ${true}\n `)
    
  }
  handleSave = event => {
    event.preventDefault()
    editPoll(db, this.state.title, this.state.location, this.state.notesComments, this.state.timeZone, this.state.startDate, this.state.startTime, this.state.endTime, this.state.numBlocks, this.state.sessionTime, this.state.restrictSlots, this.state.restrictNumParticipants, this.state.deadline, this.state.invite, this.state.invitees, this.state.isPublished, sessionStorage.getItem('id') )
    alert(`Title: ${this.state.title}\n Location: ${this.state.location}\n Notes and Comments: ${this.state.notesComments}\n timeZone: ${this.state.timeZone}\n startDate: ${this.state.startDate}\n startTime: ${this.state.startTime}\n endTime: ${this.state.endTime}\n numBlocks: ${this.state.numBlocks}\n sessionTime: ${this.state.sessionTime}\n restrictSlots: ${this.state.restrictSlots}\n restrictNumParticipants: ${this.state.restrictNumParticipants}\n deadline: ${this.state.deadline}\n invite: ${this.state.invite}\n invitees: ${this.state.invitees}\n isPublished: ${this.state.isPublished}\n `)
  }
  // handleCancel = event =>



  render() {
    return (
      <Layout>
        <div>
        <p><u><b>Step 1: Poll Information</b></u></p>
        <p>
        <label>
        Title:  
        <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
        />
        </label>
        <label>
            Location:  
        <input
            type="text"
            name="location"
            Placeholder="Location"
            value={this.state.location}
            onChange={this.handleInputChange}
        />
        </label>
        </p>
        <p>
        <label>
        Notes and Comments:  
        <input
            type="text"
            name="notesComments"
            Placeholder="Notes and Comments"
            value={this.state.notesComments}
            onChange={this.handleInputChange}
        />
        </label>
        </p>
        <label>
        Select your Time Zone:
        <RenderTimeZones timeZoneState={this.state.timeZone} handleInputChange={this.handleInputChange}/>
        </label>
        <p><u><b>Step 2: Date and Times</b></u></p>
        <Calendar 
            selectRange={this.range}
            onChange={this.handleCalendarChange}
        />
        <br></br>
        <label>
          Start time:
          <RenderStartTime startTimeState={this.state.startTime} handleTimeChange={this.handleStartOrEndTimeChange}/>
        </label>
        <label>
          End time:
          <RenderEndTime endTimeState ={this.state.endTime} handleTimeChange={this.handleStartOrEndTimeChange} />
        </label>

            
            <label>
           <p>Number of Blocks:
            <input
                type="text"
                name="numBlocks"
                Placeholder="Number of Sessions"
                value={this.state.numBlocks}
                onChange={this.handleBlocksInputChange}
            />
            </p>
            </label>
            <label>
              <p>
            Length of Session:
            <input
                type="text"
                name="sessionTime"
                Placeholder="Length of each Session"
                value={this.state.sessionTime}
                onChange={this.handleBlocksInputChange}
            />
            </p>
            </label>
            {/* restrict votes per slot */}
            <label>
              <p>
              <input
                type="checkbox"
                name="restrictSlots"
                checked={this.state.restrictSlots}
                onChange={this.handleRestrictSlots}
              />
              Restrict votes per slot 
              </p>
            </label>
          
            {/* restrict votes per participant */}
            <label>
              <p>
              <input
                type="checkbox"
                name="restrictNumParticipants"
                checked={this.state.restrictNumParticipants}
                onChange={this.handleRestrictParticipants}
              />
              Restrict votes per participant
              </p>
            </label>
        <label>
        <p><u><b>Step 3: Invite Participants</b></u></p>
            Invite:
          <form onSubmit={this.handleInviteSubmit}>
            <label>
            <input
                type="text"
                name="invite"
                Placeholder="Phone Number"
                value={this.state.invite}
                onChange={this.handleInputChange}
            />
            </label>
            <InviteButton type="submit">Add Invite</InviteButton>
          </form>
            <RenderList emailList={this.state.invitees}/>
          <p><u><b>Step 4: Set a Deadline</b></u></p>
          Deadline:
        </label>

        <DateTime 
          onChange={this.handleDeadlineChange}
        />
        
        <form onSubmit={this.handlePublish}>
          <SubmitButton type="submit">Publish</SubmitButton>
        </form>
        
        <form onSubmit={this.handleSave}>
          <SaveButton type="submit">Save</SaveButton>
        </form>
        <Link to="/admin/home">
          <CancelButton type="submit">Back</CancelButton>
        </Link>
        

        <form onSubmit={this.renderModify}>
          <button type="submit">render</button>
        </form>

      </div>
      </Layout>
    )
  }
}


  function RenderList({emailList}){
    
    return (
        <ul>
            {emailList.map(poll => (
                <li>
                    <nav>
                        {poll}
                        <text> </text>
                        
                    </nav>
                </li>
            ))}
        </ul>
    );
}

function RenderTimeZones({timeZoneState, handleInputChange}){
  return (
    <select name={timeZoneState} timeZone={timeZoneState} onChange={handleInputChange}>   
            <option timeZone="Select Time Zone">Select Time Zone</option>         
            <option timeZone="Eastern Standard Time">Eastern Standard Time</option>
            <option timeZone="Central Standard Time">Central Standard Time</option>
            <option timeZone="Mountain Standard Time">Mountain Standard Time</option>
            <option timeZone="Pacific Standard Time">Pacific Standard Time</option>
            <option timeZone="Alaska Standard Time">Alaska Standard Time</option>
            <option timeZone="Hawaii-Aleutian Standard Time">Hawaii-Aleutian Standard Time</option>
      </select>
  );
}

function RenderStartTime({startTimeState, handleTimeChange}){
  return(
    <select name="startTime" startTime={startTimeState} onChange={handleTimeChange}>   
      <option startTime="0">12:00am</option>
      <option startTime="15">12:15am</option>
      <option startTime="30">12:30am</option>
      <option startTime="45">12:45am</option>
      <option startTime="60">1:00am</option>
      <option startTime="75">1:15am</option>
      <option startTime="90">1:30am</option>
      <option startTime="105">1:45am</option>
      <option startTime="120">2:00am</option>
      <option startTime="135">2:15am</option>
      <option startTime="150">2:30am</option>
      <option startTime="165">2:45am</option>
      <option startTime="180">3:00am</option>
      <option startTime="195">3:15am</option>
      <option startTime="210">3:30am</option>
      <option startTime="225">3:45am</option>
      <option startTime="240">4:00am</option>
      <option startTime="255">4:15am</option>
      <option startTime="270">4:30am</option>
      <option startTime="285">4:45am</option>
      <option startTime="300">5:00am</option>
      <option startTime="315">5:15am</option>
      <option startTime="330">5:30am</option>
      <option startTime="345">5:45am</option>
      <option startTime="360">6:00am</option>
      <option startTime="375">6:15am</option>
      <option startTime="390">6:30am</option>
      <option startTime="405">6:45am</option>
      <option startTime="420">7:00am</option>
      <option startTime="435">7:15am</option>
      <option startTime="450">7:30am</option>
      <option startTime="465">7:45am</option>
      <option startTime="480">8:00am</option>
      <option startTime="495">8:15am</option>
      <option startTime="510">8:30am</option>
      <option startTime="525">8:45am</option>
      <option startTime="540">9:00am</option>
      <option startTime="555">9:15am</option>
      <option startTime="570">9:30am</option>
      <option startTime="585">9:45am</option>
      <option startTime="600">10:00am</option>
      <option startTime="615">10:15am</option>
      <option startTime="630">10:30am</option>
      <option startTime="645">10:45am</option>
      <option startTime="660">11:00am</option>
      <option startTime="675">11:15am</option>
      <option startTime="690">11:30am</option>
      <option startTime="705">11:45am</option>
      <option startTime="720">12:00pm</option>
      <option startTime="735">12:15pm</option>
      <option startTime="750">12:30pm</option>
      <option startTime="765">12:45pm</option>
      <option startTime="780">1:00pm</option>
      <option startTime="795">1:15pm</option>
      <option startTime="810">1:30pm</option>
      <option startTime="825">1:45pm</option>
      <option startTime="840">2:00pm</option>
      <option startTime="855">2:15pm</option>
      <option startTime="870">2:30pm</option>
      <option startTime="885">2:45pm</option>
      <option startTime="900">3:00pm</option>
      <option startTime="915">3:15pm</option>
      <option startTime="930">3:30pm</option>
      <option startTime="945">3:45pm</option>
      <option startTime="960">4:00pm</option>
      <option startTime="975">4:15pm</option>
      <option startTime="990">4:30pm</option>
      <option startTime="1005">4:45pm</option>
      <option startTime="1020">5:00pm</option>
      <option startTime="1035">5:15pm</option>
      <option startTime="1050">5:30pm</option>
      <option startTime="1065">5:45pm</option>
      <option startTime="1080">6:00pm</option>
      <option startTime="1095">6:15pm</option>
      <option startTime="1110">6:30pm</option>
      <option startTime="1125">6:45pm</option>
      <option startTime="1140">7:00pm</option>
      <option startTime="1155">7:15pm</option>
      <option startTime="1170">7:30pm</option>
      <option startTime="1185">7:45pm</option>
      <option startTime="1200">8:00pm</option>
      <option startTime="1215">8:15pm</option>
      <option startTime="1230">8:30pm</option>
      <option startTime="1245">8:45pm</option>
      <option startTime="1260">9:00pm</option>
      <option startTime="1275">9:15pm</option>
      <option startTime="1290">9:30pm</option>
      <option startTime="1305">9:45pm</option>
      <option startTime="1320">10:00pm</option>
      <option startTime="1335">10:15pm</option>
      <option startTime="1350">10:30pm</option>
      <option startTime="1365">10:45pm</option>
      <option startTime="1380">11:00pm</option>
      <option startTime="1395">11:15pm</option>
      <option startTime="1410">11:30pm</option>
      <option startTime="1425">11:45pm</option>
    </select>
  );
}

function RenderEndTime({endTimeState, handleTimeChange}){
  return (
    <select name="endTime" endTime={endTimeState} onChange={handleTimeChange}>   
      <option endTime="0">12:00am</option>
      <option endTime="15">12:15am</option>
      <option endTime="30">12:30am</option>
      <option endTime="45">12:45am</option>
      <option endTime="60">1:00am</option>
      <option endTime="75">1:15am</option>
      <option endTime="90">1:30am</option>
      <option endTime="105">1:45am</option>
      <option endTime="120">2:00am</option>
      <option endTime="135">2:15am</option>
      <option endTime="150">2:30am</option>
      <option endTime="165">2:45am</option>
      <option endTime="180">3:00am</option>
      <option endTime="195">3:15am</option>
      <option endTime="210">3:30am</option>
      <option endTime="225">3:45am</option>
      <option endTime="240">4:00am</option>
      <option endTime="255">4:15am</option>
      <option endTime="270">4:30am</option>
      <option endTime="285">4:45am</option>
      <option endTime="300">5:00am</option>
      <option endTime="315">5:15am</option>
      <option endTime="330">5:30am</option>
      <option endTime="345">5:45am</option>
      <option endTime="360">6:00am</option>
      <option endTime="375">6:15am</option>
      <option endTime="390">6:30am</option>
      <option endTime="405">6:45am</option>
      <option endTime="420">7:00am</option>
      <option endTime="435">7:15am</option>
      <option endTime="450">7:30am</option>
      <option endTime="465">7:45am</option>
      <option endTime="480">8:00am</option>
      <option endTime="495">8:15am</option>
      <option endTime="510">8:30am</option>
      <option endTime="525">8:45am</option>
      <option endTime="540">9:00am</option>
      <option endTime="555">9:15am</option>
      <option endTime="570">9:30am</option>
      <option endTime="585">9:45am</option>
      <option endTime="600">10:00am</option>
      <option endTime="615">10:15am</option>
      <option endTime="630">10:30am</option>
      <option endTime="645">10:45am</option>
      <option endTime="660">11:00am</option>
      <option endTime="675">11:15am</option>
      <option endTime="690">11:30am</option>
      <option endTime="705">11:45am</option>
      <option endTime="720">12:00pm</option>
      <option endTime="735">12:15pm</option>
      <option endTime="750">12:30pm</option>
      <option endTime="765">12:45pm</option>
      <option endTime="780">1:00pm</option>
      <option endTime="795">1:15pm</option>
      <option endTime="810">1:30pm</option>
      <option endTime="825">1:45pm</option>
      <option endTime="840">2:00pm</option>
      <option endTime="855">2:15pm</option>
      <option endTime="870">2:30pm</option>
      <option endTime="885">2:45pm</option>
      <option endTime="900">3:00pm</option>
      <option endTime="915">3:15pm</option>
      <option endTime="930">3:30pm</option>
      <option endTime="945">3:45pm</option>
      <option endTime="960">4:00pm</option>
      <option endTime="975">4:15pm</option>
      <option endTime="990">4:30pm</option>
      <option endTime="1005">4:45pm</option>
      <option endTime="1020">5:00pm</option>
      <option endTime="1035">5:15pm</option>
      <option endTime="1050">5:30pm</option>
      <option endTime="1065">5:45pm</option>
      <option endTime="1080">6:00pm</option>
      <option endTime="1095">6:15pm</option>
      <option endTime="1110">6:30pm</option>
      <option endTime="1125">6:45pm</option>
      <option endTime="1140">7:00pm</option>
      <option endTime="1155">7:15pm</option>
      <option endTime="1170">7:30pm</option>
      <option endTime="1185">7:45pm</option>
      <option endTime="1200">8:00pm</option>
      <option endTime="1215">8:15pm</option>
      <option endTime="1230">8:30pm</option>
      <option endTime="1245">8:45pm</option>
      <option endTime="1260">9:00pm</option>
      <option endTime="1275">9:15pm</option>
      <option endTime="1290">9:30pm</option>
      <option endTime="1305">9:45pm</option>
      <option endTime="1320">10:00pm</option>
      <option endTime="1335">10:15pm</option>
      <option endTime="1350">10:30pm</option>
      <option endTime="1365">10:45pm</option>
      <option endTime="1380">11:00pm</option>
      <option endTime="1395">11:15pm</option>
      <option endTime="1410">11:30pm</option>
      <option endTime="1425">11:45pm</option>
    </select>
  );
}

