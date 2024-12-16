import SelectionForm from "./steps/selection-form/selection-form.component";
import MembershipCtxProvider from "./context/membership-form.context";
import { getQueryParams } from "@/utils/route.utils";
import SellerForm from "./steps/seller-form/seller-form.component";

const MembershipPage = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className={`flex flex-col gap-5 relative mb-28`}>
        <div className={`
          bg-card p-6
          flex rounded-lg
          lg:gap-10
          xl:gap-20
          2xl:gap-40
        `}>
          <div className={`
            w-full
          `}>
            <MembershipCtxProvider>
              { section === "selection" && <SelectionForm /> }
              { section === "seller-info" && <SellerForm /> }
            </MembershipCtxProvider>
          </div>
        </div>
      </main>
    </>
  )
};

export default MembershipPage
