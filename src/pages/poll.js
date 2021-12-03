import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Layout from '../components/layout'
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, addDoc, getDoc} from 'firebase/firestore/lite';
import {doc, setDoc} from "firebase/firestore";
import styled from "styled-components";


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

var data;
var length;
let urlID = window.location.search.substring(1);

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'Polls');
    const citySnapshot = await getDocs(citiesCol);
    const idList = citySnapshot.docs.map(doc => doc.id);
    length = idList.length;
    return citySnapshot;
}


function RenderDocs() {
    getCities(db).then((snapshot) => {
        data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(data);
    });
}


let polls = [];

function getData() {
    let i = 0;
    while (i < length) {
        polls[i] = data[i];
        i++;
    }
}

let deadline;
let endTime;
let invitees;
let location;
let notesComments;
let restrictNumParticipants;
let restrictSlots;
let sessionTime;
let startDate;
let startTime;
let timeSlots;
let timeZone;
let title;

let slotVote = false;

function RenderList({variable}) {
    let i = 0;
    while (i < length) {
        if (polls[i].id === urlID) {
            deadline = polls[i].deadline.seconds
            endTime = polls[i].endTime
            invitees = polls[i].invitees
            location = polls[i].location
            notesComments = polls[i].notesComments
            restrictNumParticipants = polls[i].restrictNumParticipants
            restrictSlots = polls[i].restrictSlots
            sessionTime = polls[i].sessionTime
            startDate = polls[i].startDate
            startTime = polls[i].startTime
            timeSlots = polls[i].timeSlots
            timeZone = polls[i].timeZone
            title = polls[i].title
        }
        i++;
    }

    return (
        <ul>
            <li>
                Title: "{title}"
            </li>
            <li>
                Location: {location}
            </li>
            <li>
                Notes & Comments: {notesComments}
            </li>
            <li>
                Session Time: {sessionTime} minutes
            </li>
            <li>
                Time Zone: {timeZone}
            </li>
            <li>
                Deadline: {deadline}
            </li>
            <li>
                Poll ID: {urlID}
            </li>
        </ul>
    )

}

function handleVote() {
    slotVote = !slotVote;
    console.log(slotVote)
}


RenderDocs();

export default class NameForm extends React.Component {
    state = {
        variable: [],
        slots: [],
        slotVote: "",
    }

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert(this.state.value + ' has successfully signed up for the' + this.data.title + ' poll at selected time');
        event.preventDefault();
    }

    handleCalendarChange = event => {
        const name = "startDate"
        this.setState({
            [name]: event,
        })
    }

    renderListener = event => {
        getData();
        console.log(polls);
        event.preventDefault()

        //parse time slots
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
            variable: polls,
            slots: slotsArr,
        })
    }

    render() {
        return (
            <div>
                <Layout pageTitle="Poll Details">
                </Layout>

                <Calendar>
                    onChange= {this.handleCalendarChange}
                    onClickDay={this.state}
                </Calendar>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Identifier:
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            Placeholder="Name/Email"
                        /></label>

                    <input type="submit" value="Submit"/>

                </form>

                <RenderList variable={this.state.variable}/>

                
                <RenderTimeSlots slotList={this.state.slots}/>

                <form onSubmit={this.renderListener}>
                    <button type="submit">Get Created Poll</button>
                </form>
            </div>
        )
    }
}

function RenderTimeSlots({slotList}){
    if(typeof(slotList) == "undefined"){
        slotList = [["TimeSlots: ", ""]];
    }
    return (
        <ul>
          {slotList.map(slot => ( 
              <li>
                  <nav>
                      
                      <text> </text>
                      <label>
                        <p>
                            <input
                                type="checkbox"
                                name="slotVote"
                                checked={slotVote}
                                onChange={handleVote}
                            />
                            {slot[0]} - {slot[1]} 
                        </p>
                    </label>
                  </nav>
              </li>
          ))}
      </ul>
    );
  };
