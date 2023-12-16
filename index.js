const http = require("http");
const app = require("express")()
app.listen(9091,()=>console.log("Listening on http port 9091"))
app.get("/",(req,res)=>res.sendFile(__dirname+ "/index.html"))
const httpServer= http.createServer()
const webSocketServer = require("websocket").server

httpServer.listen(9090,()=>console.log('listeing on 9090'))

const wsServer = new webSocketServer({
    "httpServer": httpServer
})
//hashmap
const clients = {

}

wsServer.on("request",request=>{
    //connect
    const connection = request.accept(null,request.origin)
    connection.on("open",()=> console.log("opened!"))
    connection.on("close",()=> console.log("closed!"))
    connection.on("message",message=>{
        //I have received a message from the client 
        const result = JSON.parse(message.utf8Data);
        console.log(result);
    })
    //generate a new client id
    const clientId = guid();
    clients[clientId] = {
        connection
    }
    const payLoad = {
        "method": "connect",
        "clientId" : clientId
    }
    //send back the client connect
    connection.send(JSON.stringify(payLoad))


})



function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
 