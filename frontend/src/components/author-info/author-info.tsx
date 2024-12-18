import Image from "next/image";
import Link from "next/link";
import { BTUser } from "@/types/user.types";

type Props = {
  data: BTUser
}

const AuthorInfo: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-x-3">
      <div className="flex flex-col items-center gap-2 w-24 h-24">
        <Image
          src={data.profileImg.fileMetadata.url}
          alt={data.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <Link href="/mentor" className="text-xs">Ver Perfil</Link>
      </div>
      <div className="space-y-2 md:space-y-0">
        <p className="font-semibold text-center md:text-left">{data.name}</p>
        <p className="text-sm text-gray-400">{data.seller?.about}</p>
      </div>
    </div>
  )
};

export default AuthorInfo
