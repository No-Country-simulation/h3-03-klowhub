import { socket } from "@/socket/socket";
import { ChatMessage } from "@/app/(site)/chat/components/message-box/message-box.types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSocket = (loadedMessages?: ChatMessage[]): [ ChatMessage[], Dispatch<SetStateAction<ChatMessage[]>> ] => {
  const [ messages, setMessages ] = useState<ChatMessage[]>(loadedMessages || [])
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");


  useEffect(() => {
    if (loadedMessages) setMessages(loadedMessages);

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
      console.log('value: ', value);
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
  }, [ loadedMessages ]);

  return [ messages, setMessages ]
};

export default useSocket
