import * as React from "react"
import Layout from '../components/layout'
import styled from "styled-components";

//Hard Coded Admin Username and Password
var uadmin = "Broken";
var padmin = "123";

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
position: absolute;
top:110px;
left:500px;
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

//Setting up an empty state to be filled with the User entered Username and Password
export default class IndexPage extends React.Component {
  state = {
    Username: "",
    Password: "",
  }
  
  //InputChange Function
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  
  //Submit Function
  handleSubmit = event => {
    event.preventDefault()
    //Compares the user entered Username and Password Strings and if they are equal sends a welcome alert
    if (uadmin.localeCompare(this.state.Username)==0 && padmin.localeCompare(this.state.Password)==0) {
    //alert(`Welcome ${this.state.Username} ${this.state.Password}!`)
    //Redirects to the admin home page
    window.location.replace("/admin/home")
    }
    //If they are not equal sends an Incorrect Login Alert
    else 
    alert('Incorrect Login')
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Layout>
          <p>Username:
          <input
            type="text"
            name="Username"
            value={this.state.Username}
            onChange={this.handleInputChange}
          />
          </p>
          <p>Password: 
          <input
            type="text"
            name="Password"
            value={this.state.Password}
            onChange={this.handleInputChange}
          />
          </p>
        </Layout>
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}