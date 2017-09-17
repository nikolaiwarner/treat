const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// const rp = require('request-promise')
// const promisePool = require('es6-promise-pool')
// const PromisePool = promisePool.PromisePool
const secureCompare = require('secure-compare')
const moment = require('moment')
// const nodemailer = require('nodemailer')
//
// const gmailEmail = encodeURIComponent(functions.config().gmail.email)
// const gmailPassword = encodeURIComponent(functions.config().gmail.password)
// const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`)

exports.dailyCheck = functions.https.onRequest((req, res) => {
  // Exit if the keys don't match
  const key = req.query.key
  if (!secureCompare(key, functions.config().cron.key)) {
    console.log('The key provided in the request does not match the key set in the environment. Check that', key,
        'matches the cron.key attribute in `firebase env:get`')
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
        'cron.key environment variable.')
    return
  }

  // Add an entry to the log so we know if the dailyCheck ran
  let logRef = admin.database().ref('log')
  logRef.push({
    createdAt: admin.database.ServerValue.TIMESTAMP,
    type: 'dailyCheck',
    data: {
      success: true
    }
  })

  let eventsRef = admin.database().ref(`events`)
  return eventsRef.limitToLast(1).once('value', (snapshot) => {
    let items = []
    snapshot.forEach((childSnapshot) => {
      let item = childSnapshot.val()
      item.key = childSnapshot.key
      items.push(item)
    })
    let event = items[0]
    let successfulAfterTime = moment().subtract(1, 'day')
    let success = false
    // Success if event was recorded today
    if (moment(event.createdAt).isAfter(successfulAfterTime)) {
      success = true
    }
    // Fail if last event was a fail
    if (event.increment < 0) {
      success = false
    }
    if (success) {
      res.status(200).send('great job!')
    } else {
      let increment = -1
      return eventsRef.push({
        createdAt: admin.database.ServerValue.TIMESTAMP,
        increment
      }).then((pushSnapshot) => {
        res.status(200).send('TOO LATE! ' + increment)
      })
    }
  })
})

// function sendWelcomeEmail (email, displayName) {
//   const user = event.data
//
//   //  const email = user.email;
//   //  const displayName = user.displayName;
//
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email
//   }
//
//   // The user subscribed to the newsletter.
//   mailOptions.subject = `Welcome to ${APP_NAME}!`
//   mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`
//   return mailTransport.sendMail(mailOptions).then(() => {
//     console.log('New welcome email sent to:', email)
//   })
// }

// exports.countEvents = functions.database.ref('/users/{uid}/goals/{goalId}/events').onWrite(event => {
//   const collectionRef = event.data.ref.parent
//   const countRef = collectionRef.parent.child('score')
//
//   // Return the promise from countRef.transaction() so our function
//   // waits for this async event to complete before it exits.
//   return countRef.transaction(current => {
//     if (event.data.exists() && !event.data.previous.exists()) {
//       return (current || 0) + 1
//     } else if (!event.data.exists() && event.data.previous.exists()) {
//       return (current || 0) - 1
//     }
//   }).then(() => {
//     console.log('Counter updated.')
//   })
// })
