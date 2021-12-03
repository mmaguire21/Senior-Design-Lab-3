import * as React from 'react'
import Layout from '../components/layout'
import poll from './poll.jpg'


console.log(poll)

const IndexPage = () => {
  return (
    <>
    <html lang="en"></html>
    <Layout pageTitle="Home Page">
      <p>Broken Engineers Doodle Poll </p>
      <label> Looking for your next poll look no further! </label>

      <img width= "350" height = "350" src={poll} alt = "poll"></img>

      
      </Layout>
      </>
      )
}


export default IndexPage
