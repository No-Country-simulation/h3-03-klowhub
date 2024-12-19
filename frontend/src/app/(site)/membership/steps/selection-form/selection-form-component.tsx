"use client"

import { Card, CardSection } from "@/components/ui/card";
import { Inter } from "next/font/google";
import { useReducer } from "react";
import Input from "@/components/input/input.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { SelectionData } from "@/types/membership.types";
import { SELECTION_DATA_INITIAL_STATE } from "./selection-form.consts";
import membershipFormReducer, { MEMBERSHIP_FORM_INITIAL_STATE } from "../../context/membership-form.reducer";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setSelectionData } from "../../context/membership-form.actions";
import MembershipCard from "@/components/membership-card/membership-card.component";
import Table from "./selection-form-table.component";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    display: "swap",
});

type Tiers = "starter" | "professional" | "expert"
const tiers = ["starter", "professional", "expert"];

const SelectionForm = () => {
    const [state, dispatch] = useReducer(membershipFormReducer, MEMBERSHIP_FORM_INITIAL_STATE);
    const {
        controlledCommonProps,
        handleSubmit,
        formState: { isDirty }
    } = useGenerateForm<SelectionData>(SELECTION_DATA_INITIAL_STATE, state.selectionData || SELECTION_DATA_INITIAL_STATE);
    return (
        <div className={`${inter.className} leading-4 flex flex-col gap-14`}>
            {/* Banner */}
            <div className="hidden lg:flex w-full h-[200px] bg-no-repeat bg-cover rounded-xl items-center justify-center"
                style={{
                    backgroundImage:
                        "url('/imgs/banner-klowhub-lg.webp')",
                }}>
                <div className="flex flex-col gap-1">
                    <span className="h-[71px] flex justify-center items-center font-semibold text-[54px]">KlowHub</span>
                    <span className="h-7 text-xl">Descubre, Aprende y Crea</span>
                </div>
            </div>
            <div className="hidden md:flex lg:hidden w-full h-[130px] bg-no-repeat bg-cover rounded-xl flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('/imgs/banner-klowhub-md.webp')",
                }}>
                <div className="flex flex-col gap-1">
                    <span className="h-[71px] flex justify-center items-center font-semibold text-3xl">KlowHub</span>
                    <span className="h-7 text-xs">Descubre, Aprende y Crea</span>
                </div>
            </div>
            <div className="md:hidden w-full h-[130px] bg-no-repeat bg-cover rounded-xl flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('/imgs/banner-klowhub-sm.webp')",
                }}>
                <div className="flex flex-col gap-1">
                    <span className="h-[71px] flex justify-center items-center font-semibold text-3xl">KlowHub</span>
                    <span className="h-7 text-xs">Descubre, Aprende y Crea</span>
                </div>
            </div>

            {/* Content */}
            <Card className="p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-14">
                    <span className="text-base font-bold">¡Bienvenido a la Comunidad de Vendedores!</span>
                    <p className="text-sm">Elige el plan que mejor se adapte a tus necesidades y comienza a monetizar tus creaciones. Desde el plan gratuito hasta las opciones premium, cada uno ofrece herramientas diseñadas para maximizar tu éxito como creador.</p>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-sm">Detalles del plan seleccionado</span>
                        <p className="text-sm">A continuación, encontrarás una descripción detallada de las características y beneficios del plan que has elegido.</p>
                    </div>
                </div>

                <CardSection className="lg:p-5 flex flex-col gap-3 md:hidden lg:flex">
                    <div className="flex sm:flex-row flex-col gap-5 sm:gap-3 justify-center sm:items-center h-[35px]">
                        <div className="flex sm:gap-3 justify-between items-center">
                            <span className="text-sm">Facturación mensual</span>
                            <button className="w-[60px] h-full rounded-full bg-primary-500 p-1 flex items-center justify-start">
                                <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
                            </button>

                        </div>
                        <span className="text-sm text-primary-300">Facturación anual (ahorra el 15%)</span>
                    </div>
                    <div className="flex items-center h-4 sm:h-2 translate-y-4 sm:translate-y-0">
                        <div className="w-full h-[1px] bg-white"></div>
                    </div>
                    <div className="py-5 lg:py-14 px-5 md:flex md:gap-5 overflow-x-auto whitespace-nowrap md:overflow-visible md:whitespace-normal"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#b95ed4 transparent",
                        }}>
                        <div className="flex gap-5">
                            {tiers.map((t, idx) => (
                                <Input
                                    key={`product-option-${idx}`}
                                    type="product-selector"
                                    name="tier"
                                    productId={t}
                                    productType={"application"}
                                    {...controlledCommonProps}
                                >
                                    <MembershipCard
                                        key={`membership-${idx}`}
                                        tier={t as Tiers}
                                    />
                                </Input>
                            ))}
                        </div>
                    </div>

                </CardSection>

                <div className="hidden lg:block ">
                    <Table />
                </div>
            </Card>
            <div className="hidden md:flex lg:hidden flex flex-col gap-14">
                <div className="flex-col gap-3">
                    <div className="flex flex-col gap-5 justify-center">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Facturación mensual</span>
                            <button className="w-[60px] h-full rounded-full bg-primary-500 p-1 flex items-center justify-start">
                                <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
                            </button>

                        </div>
                        <span className="text-sm text-primary-300">Facturación anual (ahorra el 15%)</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full h-[1px] bg-white"></div>
                    </div>

                </div>
                <div className="pb-5 md:flex md:gap-5 overflow-x-auto whitespace-nowrap"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#b95ed4 transparent",
                    }}>
                    <div className="flex gap-5">
                        {tiers.map((t, idx) => (
                            <Input
                                key={`product-option-${idx}`}
                                type="product-selector"
                                name="tier"
                                productId={t}
                                productType={"application"}
                                {...controlledCommonProps}
                            >
                                <MembershipCard
                                    key={`membership-${idx}`}
                                    tier={t as Tiers}
                                />
                            </Input>
                        ))}
                    </div>

                </div>

            </div>
            <div className="overflow-x-auto whitespace-nowrap" style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#b95ed4 transparent",
            }}>
                <div className="lg:hidden min-w-[1200px] pb-5">
                    <Table />
                </div>
            </div>
            <div className="absolute w-full bottom-0 -mb-16 lg:-mb-2 -ml-6 flex justify-end pt-5">
                <RouteBtn
                    setter={handleSubmit(data => dispatch(setSelectionData(data)))}
                    route="seller-info"
                    isDirty={isDirty}
                >
                    Continuar
                </RouteBtn>
            </div>
        </div>
    )
}

export default SelectionForm