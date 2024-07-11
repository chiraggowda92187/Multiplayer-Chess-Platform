import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";




export class GameManager {
  private users: WebSocket[];

  private games: Game[];
  private pendingUser: WebSocket | null;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }

  addUser(socket: WebSocket) {
    
      this.users.push(socket)
      this.addHandler(socket)
    
    
  }

  private addHandler(socket : WebSocket){
    socket.on("message", (data)=>{
        const message = JSON.parse(data.toString())
        if(message.type===INIT_GAME){
            // initalize the game
            if(this.pendingUser){
                const newGame = new Game(this.pendingUser, socket)
                this.games.push(newGame);
                this.pendingUser = null
            }
            else{
                this.pendingUser = socket
            }
        }

        if(message.type === MOVE){
            const game = this.games.find((game)=>game.player1===socket || game.player2===socket)
            if(game){
              //if the game exists make a move
              game.makeMove(socket, message.payload)
            }
            else {
              return 
            }

        }

    })
  }

  removeUser(socket: WebSocket) {}

  private handleMessage() {}
}