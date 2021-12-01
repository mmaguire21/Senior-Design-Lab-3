import * as React from "react"
import Layout from '../components/layout'

export default class IndexPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }
  render() {
    return (
      <form>
        <label>
          First name
          <input type="text" name="firstName" />
        </label>
        <label>
          Last name
          <input type="text" name="lastName" />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
