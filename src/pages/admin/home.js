import * as React from "react"
import Layout from "../../components/layout_home";
import styled from "styled-components";
import {Link} from 'gatsby'

import {initializeApp} from 'firebase/app';
import {collection, getDoc, getDocs, getFirestore} from 'firebase/firestore/lite';
import {doc, updateDoc} from "@firebase/firestore/lite";

// Twilio SMS stuff
/*
const accountSid = "b8e335ae3b9a71ee205cd6988e010480";
const authToken = "AC126246eddfec54db678be82f32de9820";
const client = require('twilio')(accountSid, authToken);
*/

// Database stuff
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

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
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

Button.defaultProps = {
    theme: "blue"
};

let data;
let length;
let idList;
let polls = [];

async function getPolls() {
    const pollCol = collection(db, 'Polls');
    const pollSnapshot = await getDocs(pollCol);
    idList = pollSnapshot.docs.map(doc => doc.id);
    length = idList.length;
    return pollSnapshot
}

/*function sendMessage() {
    client.messages
        .create({
            body: "This is a text from twilio biiiiitch!",
            from: "+13396746823",
            to: "+18157686694"
        })
        .then(message => console.log("Message Sent"/!*message.sid*!/)).catch(message => console.log(message));
}*/

function RenderDocs(){
    getPolls(db).then((snapshot) => {
        data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        //console.log(data[0].isPublished);

    });
}

RenderDocs();

function getData(){
    let i = 0;
    while (i < length) {
        polls[i] = data[i];
        i++;
    }
}

async function editPoll(id, value){
    const docRef = doc(db, 'Polls/' + id);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, "isPublished", value);
}

function RenderList({titleList}){
    function remind(id) {
        //sendMessage();
        let invitedUsers = [];
        let i = 0;
        while (i < length) {
            if (polls[i].id === id) {
                invitedUsers = polls[i].invitees;
                console.log(polls);
            }
            i++;
        }

        //TODO: Put text functionality here
        const url = "/poll?" + id   //This is the url for the specific poll
                                    //Update this URL when the website goes live
        let j = 0;
        while (j < invitedUsers.length) {
            // Send text to invitedUsers[i]
            j++;
        }

        alert("Members of the poll have been reminded. The Poll id is: " + id)
    }

    function publish(id) {
        let invitedUsers = [];
        let i = 0;
        let curVal = "false";
        while (i < length) {
            if (polls[i].id === id) {
                curVal = polls[i].isPublished;
                invitedUsers = polls[i].invitees;
                console.log(invitedUsers);
            }
            console.log(polls[i].title + " publish status: " + data[i].isPublished);
            i++;
        }
        if (curVal === "true") {
            editPoll(id, "false")
        } else {
            editPoll(id, "true")

            //TODO: Put text functionality here
            const url = "http://localhost:8000/poll?" + id   //This is the url for the specific poll
                                                             //Update this URL when the website goes live
            let i = 0;
            while (i < invitedUsers.length) {
                // Send text to invitedUsers[i]
                i++;
            }

        }
        alert("The poll has been published. The Poll id is: " + id)
    }

    function modify(id) {
        alert("You pressed Modify. The Poll id is: " + id)
        sessionStorage.setItem("id", id)
    }

    return (
        <ul>
            {titleList.map(poll => (
                <li>
                    <nav>
                        {poll.title}
                        <text> </text>
                        <Link to={"/admin/modify?" + poll.id}>
                            <button onClick={() => sessionStorage.setItem("id", poll.id)}>(modify)</button>
                        </Link>
                        <button onClick={() => remind(poll.id)}>(remind)</button>
                        <button onClick={() => publish(poll.id)}>(publish)</button>
                    </nav>
                </li>
            ))}
        </ul>
    );
}

export default class Home extends React.Component {
    state = {
        titleList: [],
        isPublishedList: []
    }

    renderListener = event => {
        getData();
        event.preventDefault()
        this.setState({
            titleList: polls,
        })
    }

    render() {

        return (

            <Layout pageTitle="Admin Home Page">
                <div>
                    <p>To get started, create a poll -->
                        <Link to="/admin/create">
                        <Button>Create A Poll</Button>
                        </Link>
                    </p>
                </div>
                <div>
                    <p>These are your polls!</p>

                    <RenderList titleList={this.state.titleList}/>

                    <Link to="/login">
                    <Button>Logout</Button>
                    </Link>

                    <Button onClick={this.renderListener}>Load Polls</Button>
                </div>
            </Layout>
        )
    }

}
