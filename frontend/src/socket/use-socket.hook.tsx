import { socket } from "@/socket/socket";
import { ChatMessage } from "@/app/(site)/chat/components/message-box/message-box.types";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [ messages, setMessages ] = useState<ChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onServerResponse (value: ChatMessage) {
      setMessages(prev => ([ ...prev, value ]))
    };

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("serverResponse", onServerResponse)

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("serverResponse", onServerResponse)
    };
  }, []);

  return messages
};

export default useSocket
