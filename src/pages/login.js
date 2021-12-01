import * as React from "react"
import Layout from '../components/layout'
import { Link } from 'gatsby'

//Hard Coded Admin Username and Password
var uadmin = "Matthieu";
var padmin = "Stogsdill";

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
        <button type="submit">Submit</button>
      </form>
    )
  }
}