"use client"

import { Button } from "@/components/ui/button";
import { User } from "@/contexts/store/store.types";
import useStore from "@/contexts/store/use-store.hook";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  route: string
  children: ReactNode
}

const PublishButton = ({ children, route }: Props) => {
  const [ user ] = useStore<User>("user");
  const router = useRouter();

  // @ts-ignore: Unreachable code error
  return user.sellerData || user.seller ? (
    <Button onClick={() => router.push(route)}>{ children }</Button>
  ) :<Button onClick={() => router.push("/membership?section=selection")}>Elige un plan para empezar a publicar</Button>
 
};

export default PublishButton
