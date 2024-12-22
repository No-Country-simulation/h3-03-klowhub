"use client"

import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { ChatCard as TChatCard } from "../../chat.types";
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useJoinChat from "@/socket/use-join-chat.hook";

const selectChat = (
  chatId: string, 
  searchParams: ReadonlyURLSearchParams, 
  router: AppRouterInstance
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("chatId", chatId);

  router.push(`?${params.toString()}`);
};

const ChatCard = ({ id, name, profileImg, lastMessage }: TChatCard) => {
  const searchParams = useSearchParams();
  const currentChat = searchParams.get("chatId");
  const router = useRouter();

  useJoinChat(id)

  return (
    <div className={`
      flex p-3 gap-5 border-t-1
      ${ currentChat === id ? "bg-white text-black" : "" }
      cursor-pointer
    `}
      onClick={() => selectChat(id, searchParams, router)}
    >
      <div className="w-1/6">
        <Image src={profileImg.fileMetadata.url} width={50} height={50} alt="" />
      </div>
      <div className="flex flex-col space-y-1 items-start w-4/6">
        <div>{ name }</div>
          <div>{ lastMessage?.content }</div>
      </div>
      <div className="flex gap-3 w-1/6">
        <CheckCheck />
        1M
      </div>
    </div>
  )   
};

export default ChatCard
