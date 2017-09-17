import React, { Component } from 'react'
import firebase from 'firebase'

import SignOutButton from '../../Components/SignInForm/SignOutButton'

class SignInForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.signIn = this.signIn.bind(this)
    this.state = {}
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({user})
    })
  }

  signIn () {
    let email = this.refs.email.value
    let password = this.refs.password.value
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/wrong-password') {
        window.alert('Wrong password.')
      } else {
        window.alert(errorMessage)
      }
    })
  }

  render () {
    return (
      <div>
        {!this.state.user &&
          <div>
            <input ref={'email'} type={'text'} placeholder={'email'} />
            <input ref={'password'} type={'password'} placeholder={'password'} />
            <button onClick={this.signIn}>Sign In</button>
          </div>
        }
        {this.state.user &&
          <SignOutButton />
        }
      </div>
    )
  }
}

export default SignInForm
