import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import EventsScreen from './Containers/EventsScreen'
import HomeScreen from './Containers/HomeScreen'
import SignInForm from './Components/SignInForm'
import SignInScreen from './Containers/SignInScreen'

import './App.css'

const App = () => (
  <Router>
    <div className='page'>
      <div className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/events'>Events</Link>
        <SignInForm />
      </div>
      <div className='content'>
        <Route exact path='/' component={HomeScreen} />
        <Route path='/events' component={EventsScreen} />
        <Route path='/signin' component={SignInScreen} />
      </div>
    </div>
  </Router>
)

export default App
