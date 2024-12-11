import { LucideIcon, Circle } from 'lucide-react';


type Props = {
  header: string
  subheader?: string
  items: string[]
  ItemIcon?: LucideIcon
}

const List = ({ header, subheader, items, ItemIcon }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold">{ header }</h3>
      { subheader &&
        <h3>{ subheader }</h3>
      }
      <ul className="flex flex-col gap-1 text-sm tracking-wide">
        {
          items.map((i, idx) => (
            <li key={`list-item-${idx}`} className='flex gap-4'>
                {
                  ItemIcon ? <ItemIcon /> : <Circle fill='currentColor' size={6} className='mt-2' />
                }
              <span className='flex-1'>{i}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default List
