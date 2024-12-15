"use client"

import chatMock from "./chat.mock.json"
import Image from "next/image";
import ContactCard from "../contact-card/contact-card.component";
import { useSearchParams } from "next/navigation";
import MessageBox from "../message-box/message-box.component";


const Chat = () => {
  const searchParams = useSearchParams();
  const currentUser = searchParams.get("user");

  const selectedUser = chatMock.contacts.find(u => u.id === currentUser);

  return (
    <div className="flex backdrop-blur-md bg-white/10 rounded-xl border-1 border-white h-screen">
      <div className="w-1/4">
        <div className="h-20 border-r-1">Mensajes</div>
        <div className="h-20 border-t-1">Buscador</div>
        <div>
          {
            chatMock.contacts.map((c, idx) => (
              <ContactCard key={`contact-${idx}`} { ...c } />
            ))
          }
        </div>
      </div>
      <div className="w-3/4 h-full">
        <div className="h-20 border-b-1">
          <div className="w-2/3 flex p-3 gap-5">
            <div className="w-1/6">
              <Image src={chatMock.contacts[0].profileImg.fileMetadata.url} width={50} height={50} alt="" />
            </div>
            <div className="flex flex-col space-y-1 items-start w-4/6">
              <div>{ chatMock.contacts[0].fullname }</div>
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
        <div className="flex h-full">
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col gap-5 p-5 bg-white text-black grow w-full">
              {
                selectedUser?.messages.map((m, idx) => (
                  <div
                    key={`message-${idx}`}
                    className="bg-gray-50 text-white p-3 rounded-md"
                  >
                    { m.text }
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
