import React, { Component } from 'react'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'
import firebase from 'firebase'

import firebaseApp from '../../fire'

class EventButton extends Component {
  constructor (props, context) {
    super(props, context)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.eventsRef = firebaseApp.database().ref('events')
  }

  onSubmit (e) {
    e.preventDefault()
    this.eventsRef.push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      increment: 1
    })
    window.alert('Great job!')
  }

  render () {
    return (
      <div className='eventButton' onClick={this.onSubmit}>I DID IT!</div>
    )
  }
}

reactMixin(EventButton.prototype, ReactFireMixin)
export default EventButton
