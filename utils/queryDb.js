const fs = require('fs')
const db = require('../db.json')

exports.writeDb = async () => {
  const string = JSON.stringify(db, null, '\t')
  await fs.writeFile('db.json', string, function (err) {
    if (err) return console.error(err)
    console.log('done')
  })
}

exports.connectionDb = async () => {
  if (!!db.tasks) {
    console.log('DB connection was successful')
  } else {
    const string = JSON.stringify({ tasks: [], users: [] }, null, '\t')
    await fs.writeFile('db.json', string, function (err) {
      if (err) return console.error(err)
      console.log('DB was created')
    })
  }
}
