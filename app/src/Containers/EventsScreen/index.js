import React, { Component } from 'react'
import firebase from 'firebase'

import EventsList from '../../Components/EventsList'

class EventsScreen extends Component {
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
      <div className='events'>
        {this.state.currentUser &&
          <EventsList />
        }
      </div>
    )
  }
}

export default EventsScreen
