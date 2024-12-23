"use client"

import { Button } from "@/components/ui/button";
import { BTUser } from "@/types/user.types";
import useStore from "@/contexts/store/use-store.hook";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  route: string
  children: ReactNode
}

const PublishButton = ({ children, route }: Props) => {
  const [ user, _, isLoading ] = useStore<BTUser>("user");
  const router = useRouter();
  const pathname = usePathname();

  return !isLoading && (
    user.seller 
    ? (
      <Button onClick={() => router.push(route)}>{ children }</Button>
    ) : pathname.includes("/dashboard/projects") ? (
      user.email.includes("gmail") || user.email.includes("outlook") || user.email.includes("hotmail")
        ? <Button onClick={() => router.push("/membership?section=selection")}>Elige un plan para empezar a publicar</Button>
        : <Button disabled>Para publicar proyectos es necesario un correo real</Button>
    ) : (
        <Button onClick={() => router.push("/membership?section=selection")}>Elige un plan para empezar a publicar</Button>
      )
  )
 
};

export default PublishButton
