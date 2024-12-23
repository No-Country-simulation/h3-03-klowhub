import useStore from "@/contexts/store/use-store.hook";
import { useState, useEffect } from "react";
import { ChatCard } from "../../../chat.types";
import { BTUser } from "@/types/user.types";
import { BTChat } from "@/types/backend-responses.types";
import { defaultContact, lastMessageMock } from "../chat-box.mock";
import { removeHtmlTags } from "@/utils/str.utils";


const useLoadChats = () => {
  const [ chats, setChats ] = useState<ChatCard[]>([])
  const [ user, _, isLoading ] = useStore<BTUser>("user");
  
  useEffect(() => {
    if (isLoading) return;
    (async function () {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/${user.id}`);

        if (!res.ok) {
          const error = await res.json();
          setChats([]) 
          throw error
        };

        const userChats: BTChat[] = await res.json();
        const userContacts = userChats.map(chat => {
          // console.log('chat: ', chat);
          const contact = chat.membersDetails.find(m => m.id !== user.id);
          console.log('contact: ', contact);
          if (!contact) return defaultContact;

        console.log('chat.messages: ', chat.messages);
          const lastMessage = chat.messages[chat.messages.length - 1];
          // console.log('lastMessage: ', lastMessage);
          return {
            name: contact.name,
            profileImg: contact.profileImg,
            lastMessage: lastMessage ? { ...lastMessage, content: removeHtmlTags(lastMessage.content) } : lastMessageMock,
            id: chat.id
          }
        });
        setChats(userContacts)
      } catch (err) {
        console.error("error getting the chat messages: ", err)
      }
    })()
  }, [ isLoading, user ])

  return chats
};

export default useLoadChats
