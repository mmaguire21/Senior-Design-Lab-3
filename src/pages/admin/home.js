import * as React from "react"
import Layout from "../../components/layout";
import styled from "styled-components";
import { Link } from 'gatsby'


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
    alert("Members of the poll have been reminded");
}

function publish() {
    alert("The poll has been published")
}

const RenderList = props => {
    const animals = ["Dog", "Bird", "Cat", "Mouse", "Horse"];

    return (
        <ul>
            {animals.map(animal => (
                <li>
                    <nav>
                        {animal}
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

export default function Home() {
    return (
        <Layout pageTitle="Admin Home Page">
            <Link to="/admin/create">
                <Button>Create A Poll</Button>
            </Link>

            <p>Create Modify or Publish Polls on this Page</p>

            <RenderList/>

            <Link to="/login">
                <Button>Logout</Button>
            </Link>
        </Layout>
    )
}