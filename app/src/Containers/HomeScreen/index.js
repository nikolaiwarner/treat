import React, { Component } from 'react'
import firebase from 'firebase'

import EventButton from '../../Components/EventButton'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((currentUser) => {
      this.setState({currentUser})
    })
  }

  render () {
    return (
      <div className='home'>
        {this.state.currentUser &&
          <EventButton />
        }
        {!this.state.currentUser &&
          <div>TREAT</div>
        }
      </div>
    )
  }
}

export default HomeScreen
