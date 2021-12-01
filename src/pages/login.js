import * as React from "react"
import Layout from '../components/layout'

export default class IndexPage extends React.Component {
  state = {
    Username: "",
    Password: "",
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    alert(`Welcome ${this.state.Username} ${this.state.Password}!`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="Username"
            value={this.state.Username}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="Password"
            value={this.state.Password}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}