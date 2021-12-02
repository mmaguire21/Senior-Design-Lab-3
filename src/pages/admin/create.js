import React from "react"
import Calendar from "react-calendar"
import DateTime from 'react-datetime'
import 'react-calendar/dist/Calendar.css';
import "react-datetime/css/react-datetime.css";

export default class Create extends React.Component {
  range = true;

  state = {
    title: "",
    location: "",
    notesComments: "",
    timeZone: "None",
    startDate: "",
    startTime: "0",
    endTime: "0",
    numBlocks: "",
    sessionTime: "", 
    restrictSlots: false,
    restrictNumParticipants: false,
    deadline: new Date(),
    invite: [],
    invitees: []
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
    alert(`${this.state.invite}`)
    var prev_arr = this.state.invitees
    prev_arr.push(this.state.invite)

    this.setState({
      invitees: prev_arr
    })
  }
  // handlePublish = event =>
  // handleSave = event =>
  // handleCancel = event =>


  






  render() {
    return (
        <div>
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
            Select your Time Zone:
            <select name="timeZone" timeZone={this.state.timeZone} onChange={this.handleInputChange}>   
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
        <br/>
        <br/>
        <Calendar 
            selectRange={this.range}
            onChange={this.handleCalendarChange}
        />
        <label>
            Start time:
            <select name="startTime" startTime={this.state.startTime} onChange={this.handleStartOrEndTimeChange}>   
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
            </label>
            <label>
            End time:
            <select name="endTime" endTime={this.state.endTime} onChange={this.handleStartOrEndTimeChange}>   
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
            </label>

            
            <label>
            Number of Blocks
            <input
                type="text"
                name="numBlocks"
                value={this.state.numBlocks}
                onChange={this.handleBlocksInputChange}
            />
            </label>
            <label>
            Length of Session
            <input
                type="text"
                name="sessionTime"
                value={this.state.sessionTime}
                onChange={this.handleBlocksInputChange}
            />
            </label>
            {/* restrict votes per slot */}
            <label>
              <input
                type="checkbox"
                name="restrictSlots"
                checked={this.state.restrictSlots}
                onChange={this.handleRestrictSlots}
              />
              Restrict votes per slot 
            </label>
            {/* restrict votes per participant */}
            <label>
              <input
                type="checkbox"
                name="restrictNumParticipants"
                checked={this.state.restrictNumParticipants}
                onChange={this.handleRestrictParticipants}
              />
              Restrict votes per participant
            </label>
                
        <br/>
        <RenderList emailList={this.state.invitees}/>

        <br/>
        <label>
          <br/>
          <h4>
            Invite
          </h4>
          <form onSubmit={this.handleInviteSubmit}>
            <label>
            <input
                type="text"
                name="invite"
                value={this.state.invite}
                onChange={this.handleInputChange}
            />
            </label>
            <button type="submit">Add Invite</button>
          </form>

         

          <br/>
          <br/>
          Deadline:
        </label>

        <DateTime 
          onChange={this.handleDeadlineChange}
        />

        <button type="submit">Publish</button>
        <button type="submit">Save</button>
        <button type="submit">Cancel</button>

      </div>
    )
  }
}

//Step 2
class CalendarComponent extends React.Component {
    render(){
        return (
        <div>
            

        </div>
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
                        <text> email</text>
                        
                    </nav>
                </li>
            ))}
        </ul>
    );
};
