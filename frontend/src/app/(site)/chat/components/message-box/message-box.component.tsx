"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CHAT_MESSAGE_INITIAL_STATE } from "./message-box.consts";
import { ChatMessage } from "./message-box.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";

import { socket } from "@/socket/socket";
import { useSearchParams } from "next/navigation";


const submitMessage = (userId: string, chatId: string, message: string) => {
  socket.emit("clientMessage", { userId, content: message, chatId })
};

const MessageBox = () => {
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const {
    controlledCommonProps, 
    handleSubmit,
    reset,
    watch,
  } = useGenerateForm<ChatMessage>(CHAT_MESSAGE_INITIAL_STATE, CHAT_MESSAGE_INITIAL_STATE);

  const messageField = watch("content")

  useEffect(() => {
   if (!isSafeToReset) return;

   reset(CHAT_MESSAGE_INITIAL_STATE);
  }, [reset, isSafeToReset])

  useEffect(() => {
    setIsSafeToReset(false)
  }, [messageField])

  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [ userState ] = useStore<BTUser>("user");

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(data => {
        if (!chatId) return;
        submitMessage(userState.id, chatId, data.content)
        setIsSafeToReset(true)
      })}>
        <Input 
          name="content" type="richtext" 
          placeholder="Escribí aquí"
          className="gap-0"
          { ...controlledCommonProps } 
        />
        <Button className="absolute bottom-0 right-0 mr-2 mb-2 rounded-lg">
          <Send />
        </Button>
      </form>
    </div>
  )   
};

export default MessageBox
