import * as React from "react"
import Layout from "../../components/layout_home";
import styled from "styled-components";
import {Link} from 'gatsby'

import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore} from 'firebase/firestore/lite';

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

function remind() {
    alert("Members of the poll have been reminded")
}

function publish() {
    alert("The poll has been published")
}

var data;
var length;

async function getPolls() {
    const pollCol = collection(db, 'Polls');
    const pollSnapshot = await getDocs(pollCol);
    const idList = pollSnapshot.docs.map(doc => doc.id);
    length = idList.length;
    return pollSnapshot
}

let polls = [];

function RenderDocs(){
    getPolls(db).then((snapshot) => {
        data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(data);

    });
}

function getData(){
    let i = 0;
    while (i < length) {
        polls[i] = data[i];
        i++;
    }
}

RenderDocs();

function RenderList({titleList}){

    return (
        <ul>
            {titleList.map(poll => (
                <li>
                    <nav>
                        {poll.title}
                        <text> </text>
                        <Link to="/admin/modify">
                            <button>(modify)</button>
                        </Link>
                        <button onClick={remind}>(remind)</button>
                        <button onClick={publish}>(publish)</button>
                    </nav>
                </li>
            ))}
        </ul>
    );
};

export default class Home extends React.Component {
    state = {
        titleList: [],
        isPublishedList: [],
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
            <Link to="/admin/create">
            <Button>Create A Poll</Button>
            </Link>

            <p>Create Modify or Publish Polls on this Page</p>

            <RenderList titleList={this.state.titleList}/>

            <Link to="/login">
            <Button>Logout</Button>
            </Link>

            <Button onClick={this.renderListener}>Render</Button>
            </Layout>
        )
}

}
