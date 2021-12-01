import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/*
function MyApp() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calendar
        onClick={onChange}
        value={value}
        defaultView = {"month"}
        onClickDay 
      />
    </div>
  );
  */

export default class NameForm extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <><form onSubmit={this.handleSubmit}>
        <label>
          Name/Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="Submit" />
      </form><Calendar>
          onClick
        
        </Calendar></>
    );
  }
}


  

  

/*class Calendar extends React.Component {
  render() {
    <div>
      <Calendar
        onClick={onChange}
        value={value}
        defaultView = {"month"}
        onClickDay 
      />
    </div>
  }
}
*/
