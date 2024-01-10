const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb') //code from npm mongodb page to require mongodb library
const { isEmptyPayload, isInvalidEmail } = require('./validator')

//const DB_USER = (process.env.DB_USER)
//const DB_PASS = (process.env.DB_PASS)
const { DB_USER, DB_PASS, DEV } = process.env

//if (DEV) {
  //  const url = "mongodb://127.0.0.1:27017"
//} else {
 //   const url = `mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017?authSource=company_db`
//}
const dbAddress = '127.0.0.1:27017'
const url = DEV ? `mongodb://${dbAddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=company_db`
//must test this, it's not working today.

const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'

app.use(bodyParser.json())
app.use("/", express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req, res)  {

    // logic to connect to mongodb
    await client.connect()
    console.log('Connected successfully to server')

    //initiates or get the DB and collection
    const db = client.db(dbName)   //creates a new db with the name of the value of dbName if it doesnt' exist yet
    const collection = db.collection(collName)

    // get data from database
    const result = await collection.findOne({id: 1})
    console.log(result)
    client.close()

    response = {}

    if (result !== null) {  //if result is null, send back empty object, this way db doesn't crash
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
         }
    }
    res.send(response)

})


app.post('/update-profile', async function (req, res){
    const payload = req.body
    console.log(payload)


    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.send({error: "invalid payload. Couldn't update user profile data"})
        //client.close()
    } else {
        //connect to mongodb database
        await client.connect()
        console.log('Connected successfully to databse server')

        //initiates or get the DB and collection
        const db = client.db(dbName)   //creates a new db with the name of the value of dbName if it doesnt' exist yet
        const collection = db.collection(collName)


        //save payload data to the database
        payload['id'] = 1
        const updatedValues = { $set: payload }
        await collection.updateOne({id: 1}, updatedValues, {upsert: true})
        client.close()

        res.send({info: "user profile data updated successfully"})

    }
})
const server = app.listen(3000, function () {
    console.log("app listening on port 3000")//tells the app to listen on port 3000
})

module.exports = {
    app,
    server
}
