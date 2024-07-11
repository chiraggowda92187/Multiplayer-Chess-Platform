import { useEffect, useState } from "react"



export const useSocket = ()=>{
    const [socket, setSocket] = useState<WebSocket|null>(null)
    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:9090/")
        setSocket(socket)
    }, [])
    return socket
}