"use client"

import RouteBtn from "@/components/route-btn/route-btn.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Button } from "@/components/ui/button";
import { BTSeller } from "@/types/backend-responses.types";
import useStore from "@/contexts/store/use-store.hook";
import { User } from "@/contexts/store/store.types";

const tempSubmit = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_URL}/${userId}/becomeseller`, {
    method: "post",
    body: JSON.stringify({ "type": "desarrollador-de-apps" }),
    headers: {
      "Content-type": "application/json"
    }
  });   
  const sellerData: BTSeller = await res.json();

  return sellerData
};

const SellerForm = () => {
  const [ user, setUser ] = useStore<User>("user");

  return (
    <div className="bg-card p-6 flex gap-5">
      <div className="flex gap-5">
        WIP
      </div>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-end pt-5">
        <RouteBtn
          // setter={handleSubmit(data => dispatch(setSelectionData(data)))}
          route="selection"
          // isDirty={isDirty}
        >
          Regresar
        </RouteBtn>
        <Button
          type="button"
          className="flex-1 md:grow-0"
          onClick={async () => {
            try {
              const sellerData = await tempSubmit(user.id)
              setUser({ ...user, sellerData })
            } catch (err) {
              console.error("there was an error trying to set the membership of user to seller: ", err)
            }
          }}
        >
          Confirmar plan
        </Button>
      </div>
    </div>
  )   
};

export default SellerForm
