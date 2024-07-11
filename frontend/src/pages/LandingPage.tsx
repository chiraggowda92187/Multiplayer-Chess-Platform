import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";









export const LandingPage = ()=>{
  const navigate = useNavigate()
    return (
      <div className="flex justify-center">
        <div className="pt-9 max-w-screen-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                src="Chessboard-landing-page.jpeg"
                alt=""
                className="max-w-lg"
              />
            </div>
            <div className="flex justify-center">
              <div>
                <div className="text-white text-4xl font-bold">
                  Play the chess on the world's number 3 platform
                </div>
                <div className="flex justify-center">
                  <Button                    
                    onClick={()=>{
                      navigate("/game")
                    }}
                  >
                    <div className="flex">
                      <img
                        src="play-chess-button-icon.png"
                        alt=""
                        className="max-w-9"
                      />
                      <div className="flex flex-col justify-center max-h-full">
                        <div className="text-xl font-bold">
                          <h1 className="font-xl">Play Chess</h1>
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}