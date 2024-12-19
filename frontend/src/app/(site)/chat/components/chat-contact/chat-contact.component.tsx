import contactsMock from "../chat-box/chat-box.mock"
import Image from "next/image";

type Props = {
  profileImg: string
}

const ChatContact = ({ profileImg }: Props) => {
  return (
    <div className="w-2/3 flex p-3 gap-5">
      <div className="w-1/6">
        <Image src={profileImg} width={50} height={50} alt="" />
      </div>
      <div className="flex flex-col space-y-1 items-start w-4/6">
        <div>{ contactsMock[0].name }</div>
      </div>
    </div>
  )   
};

export default ChatContact
