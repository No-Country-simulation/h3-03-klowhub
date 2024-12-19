import MembershipCtxProvider from "./context/membership-form.context";
import { getQueryParams } from "@/utils/route.utils";
import SellerForm from "./steps/seller-form/seller-form.component";
import SelectionForm from "./steps/selection-form/selection-form-component";

const MembershipPage = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className={`flex flex-col gap-5 relative mb-28 mt-14`}>

        <div className="w-full">
          <MembershipCtxProvider>
            {section === "selection" && <SelectionForm />}
            {section === "seller-info" && <SellerForm />}
          </MembershipCtxProvider>
        </div>
      </main>
    </>
  )
};

export default MembershipPage
