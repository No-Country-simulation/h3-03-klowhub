"use client"

import Input from "@/components/input/input.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Proposal } from "./proposal-form.types";
import { PROPOSAL_FORM_INITIAL_STATE } from "./proposal.consts";
import Image from "next/image";
import Link from "next/link";

const submitProposal = (data: Proposal) => {
  console.log('data: ', data);   
};

const ProposalForm = () => {
  const {
    controlledCommonProps,
    handleSubmit
  } = useGenerateForm<Proposal>(PROPOSAL_FORM_INITIAL_STATE, PROPOSAL_FORM_INITIAL_STATE);

  return (
    <form className="flex gap-10" onSubmit={handleSubmit(data => submitProposal(data))} id="proposal-form">
      <Input
        name="message"
        type="richtext"
        label="Envía tu propuesta al cliente"
        placeholder="Detalla aquí tu propuesta"
        className="flex w-full lg:w-3/4"
        { ...controlledCommonProps }
      />
      <div className="w-1/4 rounded-xl overflow-hidden hidden lg:block">
        <div className="h-28" style={{ position: "relative" }}>
          <Image
            src="/imgs/proposal-form-advice.webp"
            alt="Sugerencia para enviar una propuesta"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="flex flex-col gap-3 bg-gray-100 p-4 text-sm">
          <span>Aprendé a enviar propuestas efectivas con nuestros consejos. Descubrí cómo destacarte y aumentar tus oportunidades.</span>
          <Link href="#" scroll={false} className="text-center text-primary-300">Ver consejos</Link>
        </div>
      </div>
    </form>
  )   
};

export default ProposalForm
