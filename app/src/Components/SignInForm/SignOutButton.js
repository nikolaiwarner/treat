import React, { Component } from 'react'
import firebase from 'firebase'

class SignOutButton extends Component {
  signOut () {
    firebase.auth().signOut()
  }

  render () {
    return (
      <a href='/signin' onClick={this.signOut}>Sign Out</a>
    )
  }
}

export default SignOutButton
