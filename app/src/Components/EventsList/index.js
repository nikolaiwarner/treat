import React, { Component } from 'react'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'
import Moment from 'react-moment'

import firebaseApp from '../../fire'

class EventsList extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    this.eventsRef = firebaseApp.database().ref('events')
    this.bindAsArray(this.eventsRef, 'events')
    //orderByValue
  }

  componentDidUpdate () {
    console.log(this.state.events)
  }

  score () {
    let score = 0
    this.state.events.forEach((event) => {
      score = score + event.increment
    })
    return score
  }

  render () {
    return (
      <div className='eventsTable'>
        <div className='scoreContainer'>
          Score: {this.score()}
        </div>
        {this.state.events.map((event) => {
          return (
            <div className='eventsTableRow' key={event['.key']}>
              <div>
                {event.increment > 0 ? 'YES' : 'NO' }
              </div>
              <Moment format={'LLLL'}>{event.createdAt}</Moment>
            </div>
          )
        })}
      </div>
    )
  }
}

reactMixin(EventsList.prototype, ReactFireMixin)

export default EventsList
