"use client"

import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { ContactCard as TContactCard } from "../../chat.types";
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const selectContact = (contactId: string, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("contact", contactId);

  router.push(`?${params.toString()}`);
};

const ContactCard = ({ id, name, profileImg, messages }: TContactCard) => {
  const searchParams = useSearchParams();
  const currentUser = searchParams.get("contact");
  const router = useRouter();

  return (
    <div className={`
      flex p-3 gap-5 border-t-1
      ${ currentUser === id ? "bg-white text-black" : "" }
      cursor-pointer
    `}
      onClick={() => selectContact(id, searchParams, router)}
    >
      <div className="w-1/6">
        <Image src={profileImg.fileMetadata.url} width={50} height={50} alt="" />
      </div>
      <div className="flex flex-col space-y-1 items-start w-4/6">
        <div>{ name }</div>
        { messages &&
          <div>{ messages[0].content }</div>
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
