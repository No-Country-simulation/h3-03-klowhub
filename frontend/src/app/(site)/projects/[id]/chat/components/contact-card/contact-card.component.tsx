"use client"

import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { ContactCard as TContactCard } from "../../chat.types";
import { useSearchParams } from "next/navigation";

const ContactCard = ({ id, fullname, profileImg, messages }: TContactCard) => {
  const searchParams = useSearchParams();
  const currentUser = searchParams.get("user");

  return (
    <div className={`
      flex p-3 gap-5 border-t-1
      ${ currentUser === id ? "bg-white text-black" : "" }
    `}>
      <div className="w-1/6">
        <Image src={profileImg.fileMetadata.url} width={50} height={50} alt="" />
      </div>
      <div className="flex flex-col space-y-1 items-start w-4/6">
        <div>{ fullname }</div>
        { messages &&
          <div>{ messages[0].text }</div>
        }
      </div>
      <div className="flex gap-3 w-1/6">
        <CheckCheck />
        1M
      </div>
    </div>
  )   
};

export default ContactCard
