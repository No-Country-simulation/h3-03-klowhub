import { FC, ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TImage } from "@/types/global.types";

type Props = {
  name: string
  about: string
  profileImg: TImage
  children: ReactNode[]
}

const AuthorDetail: FC<Props> = ({ name, about, profileImg, children }) => {
  return (
    <Card className="p-3">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center space-x-2 px-2 border-b border-[#DFD1F3] pb-2">
            <Image
              src={profileImg.fileMetadata.url}
              alt={name}
              width={40}
              height={40}
              className="rounded-full mb-1 border-b-white"
            />
            <div className="space-y-2">
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-gray-400">{about}</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg space-y-2">
          { children }
        </div>
        <div className="w-full flex justify-end px-2">
          <Link href="#">
            <span className="text-[#D194E2] text-sm text-end">Visitar Perfil</span>
          </Link>
        </div>
      </CardContent> 
    </Card>
  );
};


export default AuthorDetail
