import ProposalBoard from '@/components/proposal-board/proposal-board.component';
import React from 'react'

const ProposalsPage = () => {
    const boardIds = ["67642dad610fa954f12f9733"];
    return (
        <div className='w-full flex flex-col gap-14 pt-20'>
            {boardIds.map(boardId => <ProposalBoard key={boardId} boardId={boardId} />)}

        </div>
    )
}

export default ProposalsPage