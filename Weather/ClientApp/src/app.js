const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const CONNECTION_URL = "mongodb+srv://admin:h786(!93k5@userinfo-ws0g6.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "users";

var cors = require('cors');
var app = Express();

app.use (cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("user");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


//add user
app.post("/user", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});


//get all users
app.get("/users", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


//get user by db-assigned id(_id)
app.get("/user/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//get user by name
app.get("/user/:name", (request, response) => {
    collection.findOne({ "name": request.params.name }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//delete user by name
app.delete("/user/:id", (request, response) => {
    collection.remove({ "id": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//update user by _id
app.post("/user/:id", (request, response) => {
    collection.updateOne({ "_id": new ObjectId(request.params.id) }, {$set: request.body}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

