"use client"

import contactsMock from "./chat.mock"
import Image from "next/image";
import ContactCard from "../contact-card/contact-card.component";
import { useSearchParams } from "next/navigation";
import MessageBox from "../message-box/message-box.component";
import { TImage } from "@/types/global.types";
import { useEffect, useState } from "react";
import { socket } from "@/socket/socket";
import parse from "html-react-parser"
import { reactParserOptions } from "@/utils/component.utils";


const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [ messages, setMessages ] = useState<string[]>([])
  
  const searchParams = useSearchParams();
  const currentUser = searchParams.get("user");

  const selectedUser = contactsMock.find(u => u.id === currentUser);

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

    function onChatMessageResponse (value: string) {
      console.log('asdaddasd');
      setMessages(prev => ([ ...prev, value ]))
    };

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatMessageResponse", onChatMessageResponse)

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chatMessageResponse", onChatMessageResponse)
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages])

  return (
    <div className="flex backdrop-blur-md bg-white/10 rounded-xl border-1 border-white h-screen">
      <div className="w-1/4">
        <div className="h-20 border-r-1">Mensajes</div>
        <div className="h-20 border-t-1">Buscador</div>
        <div>
          {
            contactsMock.map((c, idx) => (
              <ContactCard key={`contact-${idx}`} id={c.id} name={c.name} profileImg={c.profileImg as TImage} messages={c.messages} />
            ))
          }
        </div>
      </div>
      <div className="w-3/4 h-full">
        <div className="h-20 border-b-1">
          <div className="w-2/3 flex p-3 gap-5">
            <div className="w-1/6">
              <Image src={ contactsMock[0].profileImg.fileMetadata.url} width={50} height={50} alt="" />
            </div>
            <div className="flex flex-col space-y-1 items-start w-4/6">
              <div>{ contactsMock[0].name }</div>
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
        <div className="flex h-full">
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col gap-5 p-5 bg-white text-black grow w-full">
              {
                messages.map((m, idx) => (
                  <div
                    key={`message-${idx}`}
                    className="bg-gray-50 text-white p-3 rounded-md"
                  >
                    { parse(m, reactParserOptions) }
                  </div>
                ))
              }
            </div>
            <div className="grow-0">
              <MessageBox />
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  )   
};

export default Chat
