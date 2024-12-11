import { CartComponent } from "./components/cart.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";

const page = () => {

    return (
        <main>
            <BreadCrumb/>
            <CartComponent />
        </main>
    );

};

export default page;