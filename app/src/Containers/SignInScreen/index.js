import React, { Component } from 'react'
import firebase from 'firebase'

import SignInForm from '../../Components/SignInForm'

class SignInScreen extends Component {
  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.props.history.push('/events')
      }
    })
  }

  render () {
    return (
      <div>
        <SignInForm />
      </div>
    )
  }
}

export default SignInScreen
