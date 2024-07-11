import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess, Color, PieceSymbol, Square } from "chess.js"

export const INIT_GAME = "initialize_game"
export const MOVE = "move"
export const GAME_OVER = "game_is_over"
export const server_coonected = "server_connected"


export const GamePage = ()=>{
    const socket = useSocket()
    const [chess, setChess] = useState<Chess | null>(new Chess())
    const [board, setBoard] = useState<({square: Square; type: PieceSymbol; color: Color;} | null )[][] | null | undefined>(chess?.board())
    useEffect(()=>{
        if(!socket){
            return 
        }
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            switch(message.type){
                case INIT_GAME : 
                    // alert(
                    //   <div
                    //     className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    //     role="alert"
                    //   >
                    //     {/* <svg
                    //       className="flex-shrink-0 inline w-4 h-4 me-3"
                    //       aria-hidden="true"
                    //       xmlns="http://www.w3.org/2000/svg"
                    //       fill="currentColor"
                    //       viewBox="0 0 20 20"
                    //     > */}
                    //       {/* <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" /> */}
                    //     {/* </svg> */}
                    //     <span className="sr-only">Info</span>
                    //     <div>
                    //       <span className="font-medium">Success alert!</span>
                    //        "You are : "{message.payload.color}
                    //     </div>
                    //   </div>
                    // );
                    
                    
                    setBoard(chess?.board())
                    console.log("Game initialized")
                    break;
                case MOVE : 
                    const move = message.payload.data
                    chess?.move(move)
                    setBoard(chess?.board())
                    console.log("Opponent made a move")
                    break;
                case GAME_OVER : 
                    console.log("Game over")
                    break;
                case server_coonected : 
                    console.log("Server Connected")
                    // socket.send(
                    //   JSON.stringify({
                    //     type: INIT_GAME,
                    //   })
                    // );
                    break;
                default : 
                    
                    console.log(message)
                    break;
            }
        }
    }, [socket])
    return (
      <div className="justify-center flex text-white pt-9">
        <div className="max-w-screen-xl w-full">
          <div className="grid grid-cols-6 gap-16 ">
            <div className="col-span-4  w-full flex justify-center">
              <ChessBoard socket = {socket} board={board} chess= {chess} setBoard={setBoard}/>
            </div>
            <div className="col-span-2 bg-slate-900 flex justify-center">
              <div>
                <Button onClick={() => {
                  socket?.send(JSON.stringify({
                    type : INIT_GAME,
                  }))
                }}>Start the Game</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}