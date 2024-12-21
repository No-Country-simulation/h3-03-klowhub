import { useEffect } from "react";
import { socket } from "./socket";

const useJoinChat = (chatId: string) => {
  useEffect(() => {
    socket.emit("joinChat", chatId)
  }, [chatId])
};

export default useJoinChat
