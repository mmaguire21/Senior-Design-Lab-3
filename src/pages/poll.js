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

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert(this.state.value + ' has successfully signed up for the poll at selected time' );
    event.preventDefault();
  }

  handleCalendarChange(event) {
    const name = "start"
    this.setState({
      [name]: event
    })
  }

  render() {
    return (
      <>
      <Layout pageTitle= "Poll Details">
        </Layout>
        <Calendar>
          onClick = {this.handleCalendarChange}
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

/*
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(from, to, subject, body) {
  sendgrid
    .send({ from, to, subject, text: body })
    .then(() => {
      console.log(`Email sent from ${from} to ${to}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

sendEmail(
  process.env.FROM_EMAIL,
  process.env.TO_EMAIL,
  "Email notification!",
  "This is an email notification!"
);

  */

