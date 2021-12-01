import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <><Layout pageTitle="Home Page">
      <p>Broken Engineers Doodle Poll</p>
      <label> Looking for your next poll look no further! </label>

      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
        //src = "https://www.dreamstime.com/stock-illustration-poll-icon-logo-illustration-group-pictogram-isolated-white-image92993577"
      />
  
      </Layout></>
  )
}


export default IndexPage
