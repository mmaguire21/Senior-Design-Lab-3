import React from "react"
export default class Create extends React.Component {
  state = {
    title: "",
    location: "",
    notesComments: "",
    timeZone: "coconut",
    startTime: "",
    endTime: "",
    numBlocks: "",
    sessionTime: "", 
    restrictSlots: "",
    restrictNumParticipants: "",
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleChange(event) {    
      this.setState({[event.target.name]: event.target.value});  
  }
  handleSubmit = event => {
    event.preventDefault()
    alert(`Title: ${this.state.title} Location: ${this.state.location} Notes and Comments: ${this.state.notesComments}!`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Notes and Comments
          <input
            type="text"
            name="notesComments"
            value={this.state.notesComments}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Time Zone
          <input
            type="text"
            name="timeZone"
            value={this.state.timeZone}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Select your Time Zone:
          <select timeZone={this.state.timeZone} onChange={this.handleInputChange}>   
            <option timeZone="none">Select Time Zone</option>         
            <option timeZone="EST">Eastern Standard Time</option>
            <option timeZone="CST">Central Standard Time</option>
            <option timeZone="MST">Mountain Standard Time</option>
            <option timeZone="PST">Pacific Standard Time</option>
            <option timeZone="AST">Alaska Standard Time</option>
            <option timeZone="HAST">Hawaii-Aleutian Standard Time</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}