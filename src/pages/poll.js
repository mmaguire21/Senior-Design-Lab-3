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
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <>
      <Layout pageTitle= "Poll Details">
        </Layout>
        <Calendar>
          onClick
        </Calendar>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name/Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="Submit" />
      </form>
        </>
    );
  }
}


  

/*const IndexPage = () => {
  return (
    <Layout pageTitle="Create a New Poll">
      <p>This is where we will put the poll details!

      </p>
    </Layout>
    
  )
}

export default IndexPage
*/