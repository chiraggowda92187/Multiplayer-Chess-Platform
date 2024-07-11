import { WebSocket } from "ws";
import chess, { Chess } from "chess.js"
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";


export class Game{
    public player1 : WebSocket ;
    public player2 : WebSocket ;
    private board : Chess
    private startTime : Date
    private moveCount: number ;
    constructor(player1 : WebSocket, player2 : WebSocket){
        this.player1 = player1
        this.player2 = player2
        this.board = new Chess()
        this.startTime = new Date()

        this.moveCount = 0;

        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "white"
            }
        }))

        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "black"
            }
        }))
    }

    makeMove(socket : WebSocket, move : {
        from : string,
        to: string,
        // promotion? : string
    }){
        // add validation
        // make move
        
        if(this.moveCount%2 === 0 && socket===this.player2){
            return
        } 

        if(this.moveCount%2===1 && socket === this.player1){
            return
        }

        try {
            this.board.move(move)
            const currentBoardAfterMove : string[][] = [[]]
            this.board.board().forEach((row)=>{
                const currRow : string[] = []
                row.forEach((col)=>{
                    if(col?.type){
                        currRow.push(col.type)
                    }
                    else{
                        currRow.push(" ")
                    }
                })

                currentBoardAfterMove.push(currRow)
                
            })
            console.table(currentBoardAfterMove);
        } catch (error) {
            console.log(error)
            return 
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn()==="w" ? "Black wins" : "White wins"
                }
            }))
            this.player2.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    data : this.board.turn()==="w" ? "Black wins" : "White wins"
                }
            }))
        }

        if(this.moveCount%2===0){
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : {
                    data : move
                }
            }))
        }
        else{
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : {
                    data : move
                }
            }))
        }

        this.moveCount++;
    }

}