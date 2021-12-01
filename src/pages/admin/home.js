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

function clickMe() {
    alert("You clicked me!");
}

export default function Home() {
    return (
        <Layout pageTitle="Admin Home Page">
            <Link to="/admin/create">
                <Button>Create A Poll</Button>
            </Link>
            <p>Create Modify or Publish Polls on this Page</p>
        </Layout>
    )
}