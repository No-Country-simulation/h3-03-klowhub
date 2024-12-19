import useGenerateForm from "@/hooks/use-generate-form.hook";
import { CHAT_MESSAGE_INITIAL_STATE } from "./message-box.consts";
import { ChatMessage } from "./message-box.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import useStore from "@/contexts/store/use-store.hook";
import { User } from "@/contexts/store/store.types";

import { socket } from "@/socket/socket";


const submitMessage = (userId: string, message: string) => {
  socket.emit("clientMessage", { userId: "7c52e3ff-22ba-4521-b6da-b5cd24d1c1f5", content: message, chatId: 1})
  // socket.emit("clientMessage", { userId, content: message, chatId: '1'})
};

const MessageBox = () => {
  const {
    controlledCommonProps, 
    handleSubmit,
  } = useGenerateForm<ChatMessage>(CHAT_MESSAGE_INITIAL_STATE, CHAT_MESSAGE_INITIAL_STATE);

  const [ userState ] = useStore<User>("user");

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(data => submitMessage(userState.id, data.content))}>
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
