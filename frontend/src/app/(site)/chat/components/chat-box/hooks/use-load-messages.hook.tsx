import { useEffect, useState } from "react";
import { ChatMessage } from "../../message-box/message-box.types";

const useLoadMessages = (chatId: string | null) => {
  const [ messages, setMessages ] = useState<ChatMessage[]>([])

  useEffect(() => {
    (async function () {
      try {
        if (!chatId) return;
        // const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/between-users`, {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/${chatId}/messages`);

        if (!res.ok) {
          const error = await res.json();
          setMessages([])
          throw error
        };

        const messagesData: ChatMessage[] = await res.json();

        setMessages(messagesData)
      } catch (err) {
        console.error("error getting the chat messages: ", err)
      }
    })()
  }, [chatId])

  return messages
};

export default useLoadMessages
