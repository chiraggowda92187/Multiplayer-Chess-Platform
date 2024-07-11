import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/GamePage";






export const ChessBoard = ({
  board,
  socket,
  chess,
  setBoard
}: {
  board:
    | ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    | null
    | undefined;
  socket: WebSocket | null;
  chess: Chess | null;
  setBoard : any
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);
  return (
    <div>
      <div className="bg-slate-700">
        {board?.map((row, i) => {
          return (
            <div key={i} className="flex">
              {row.map((square, j) => {
                const divSquareNotation = (String.fromCharCode(97 + (j%8)) +""+ ( 8 - i)) as Square
                // console.log(divSquareNotation)
                return (
                  // <div key= {j} className={i%2==0?j%2==0?"bg-white-200 w-6":"bg-slate-900 w-6" : j%2==0?"bg-slate-900 w-6":"bg-white-200 w-6"}>{square? square.type : ""}</div>
                  <div
                    key={j}
                    className={`w-24 h-24 ${
                      (i + j) % 2 === 0 ? 'bg-slate-600' : 'bg-slate-900'
                    } flex justify-center`}
                    onClick={() => {
                      try {
                        if (!from) {
                          setFrom(divSquareNotation);
                        } else {
                          // console.log("Before setting to : ", divSquareNotation)
                          setTo(divSquareNotation);
                          // console.log("the set to is : ", to)
                          // if(to){
                          chess?.move({
                            from: from,
                            to: divSquareNotation,
                          });
                          setBoard(chess?.board());
                          // }
                          try {
                            socket?.send(
                              JSON.stringify({
                                type: MOVE,
                                payload: {
                                  from,
                                  to: divSquareNotation,
                                },
                              })
                            );
                          } catch (error: any) {
                            alert(
                              <div
                                className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert"
                              >
                                <svg
                                  className="flex-shrink-0 inline w-4 h-4 me-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                  <span className="font-medium">Danger alert!</span>{' '}
                                  {error.message}
                                </div>
                              </div>
                            );
                          }

                          setFrom(null);
                        }
                      } catch (error) {
                        
                      }
                      
                    }}
                  >
                    <div className="h-full flex flex-col justify-center">
                      {square?<img src={`/${square.color==="b" ? `${square.type}` : `${square.type.toUpperCase()}-W` }.png`} alt="" /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};