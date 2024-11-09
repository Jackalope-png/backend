const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express;
const PORT = 3001;
app.use(express.json());
const client = new MongoClient(
    "mongodb+srv://herofussion107:MJ3kuo8GESGTUlJT@learningcluster.9inaz.mongodb.net/?retryWrites=true&w=majority&appName=learningcluster"
)
let db;
const connectToDb = () =>{
    try{
        client.connect();
        client.db("sample_mflix");
        console.log("connected")
    } catch (error){
        console.log(error, "failed to connectToDb")
    }
};
connectToDb();
app.get("/users", async (req, res) => {
 const users = await db.collection("users").find().toArray();
 res.status(200).send(users);
});
app.get("/theathers", async (req, res) => {
    const theathers = await db.collection("theathers").find().toArray();
    res.status(200).send(users);
   });
app.post("/users", async (req, res) => {
try{
    const user = req.body;
    console.log(user)
    const response = await db.collection("users").insertOne(user);
    res.send(response)
} catch (error){
    res.send("catch", error)
}
   });
 app.put("/users", async (req, res) => {
    try{
     await db.collection("users").updateOne(
        { _id: ObjectId("example")},
        {
        
        }
     ) 
        res.send("done")
    } catch (error){
    res.send("failure")
    }
 }
app.listen(PORT)

