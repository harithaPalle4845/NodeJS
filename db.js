const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'tuni'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const saveUser = (user) => {
  const collection = db.collection('user')
  return collection.insertOne(user)
}
const loginUser = (userName) => {
  console.log("Userame"+userName);
 const collection = db.collection('user')
  return collection.find({ userName: userName}).toArray()

}
const getUser = (userName) => {
  console.log("Userame"+userName);
 const collection = db.collection('user')
  return collection.find({ userName: userName}).toArray()

}

module.exports = { init, saveUser,loginUser,getUser }
