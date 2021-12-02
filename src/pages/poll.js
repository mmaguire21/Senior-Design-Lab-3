import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Layout from '../components/layout'

export default class NameForm extends React.Component{
  


  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  

  handleChange(event) { this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert(this.state.value + ' has successfully signed up for the poll at selected time' );
    event.preventDefault();
  }

  handleCalendarChange = event => {
    const name = "startDate"
    this.setState({
      [name]: event,
    })
  }


  render() {
    return (
      <>
      <Layout pageTitle= "Poll Details">
        </Layout>
        <Calendar>
          onChange= {this.handleCalendarChange}
          onClickDay={this.state}
        </Calendar>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name/Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />   </label>
        <input type="submit" value="Submit" />
      </form>
        </>
    );
  }
}

