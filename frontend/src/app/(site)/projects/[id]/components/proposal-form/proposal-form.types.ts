export type Proposal = {
  message: string
}

export type FullProposal = Proposal & {
  boardId?: string
  boardUrl?: string
  projectAuthorId: string
  applicantId: string
}
