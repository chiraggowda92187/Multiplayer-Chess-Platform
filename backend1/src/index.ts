import { WebSocket,WebSocketServer } from "ws";
import { GameManager } from "./GameManager";




const webSocketServer = new WebSocketServer({port : 9090})

const gameManager = new GameManager()

webSocketServer.on("connection", (ws)=>{

    ws.on("error", (err)=>{
        console.log("Error : ", err)
    })
    gameManager.addUser(ws)


    ws.send(JSON.stringify({
        type : "server_connected"
    }))
})