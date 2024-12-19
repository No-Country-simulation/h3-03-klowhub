import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { ArrowUpRight, ListFilter, Plus, SquareCheckBig } from "lucide-react";
import { TColumn, TTask } from "@/types/kanban.types";
import TaskCard from "./task-card.component";

type Props = {
    column: TColumn
    createTask: (columnId: string) => void;
    tasks: TTask[];
    index: number;
    editable?: boolean;
}

const ColumnContainer = ({ column, createTask, tasks, index, editable = true }: Props) => {

    const { setNodeRef } = useDroppable({
        id: column.id,
        data: { type: "TColumn" },
    });

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks]
    )

    return (
        <div ref={setNodeRef} className="w-full h-fit rounded-md flex flex-col gap-2">
            {/* Column Title */}
            <div className={`w-full bg-[#353e4b] rounded-xl px-3.5 h-[60px] flex ${index === 1 || index === 2 || index === 3 ? "justify-between" : "gap-5"} items-center`}>
                <div
                    className={`h-[31px] w-fit rounded-xl p-2.5 flex items-center gap-2 ${index === 1
                        ? 'bg-[#C1D931]/15'
                        : index === 2
                            ? 'bg-[#14B8A6]/15'
                            : index === 3
                                ? 'bg-[#4DE853]/15'
                                : ''
                        }`}
                >
                    {index >= 1 && index <= 3 && (
                        <>
                            <span
                                className={`h-[6px] w-[6px] rounded-full ${index === 1
                                    ? 'bg-[#C1D931]'
                                    : index === 2
                                        ? 'bg-[#14B8A6]'
                                        : 'bg-[#4DE853]'
                                    }`}
                            ></span>
                            <span
                                className={`text-sm ${index === 1
                                    ? 'text-[#C1D931]'
                                    : index === 2
                                        ? 'text-[#14B8A6]'
                                        : 'text-[#4DE853]'
                                    }`}
                            >
                                {column.name}
                            </span>
                        </>
                    )}
                    {index < 1 || index > 3 ? (
                        <span className="text-sm font-semibold">{column.name}</span>
                    ) : null}
                </div>
                {editable && index < 1 || index > 3 ? (
                    <div className="w-[1.5px] h-[18px] bg-white"></div>
                ) : null}
                {editable && <div className="flex items-center gap-1">
                    <button className="hover:text-primary-300 transition-colors">
                        <ListFilter className="h-[18px]" />
                    </button>
                    <button className="hover:text-primary-300 transition-colors">
                        <SquareCheckBig className="h-[18px]" />
                    </button>
                    <button className="hover:text-primary-300 transition-colors">
                        <ArrowUpRight className="h-[18px]" />
                    </button>
                </div>}
            </div>
            {/* Column Container */}
            <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) =>
                        <TaskCard key={task.id} task={task} editable={editable} />
                    )}
                </SortableContext>
            </div>

            {/* Column Footer */}
            {editable &&
                <button className="bg-transparent h-[44px] flex items-center justify-center gap-3 hover:text-primary-300 transition-colors"
                    onClick={() => createTask(column.id)}>
                    <span>Agregar nuevo</span>
                    <Plus className="h-6" />
                </button>}
        </div>
    )
}

export default ColumnContainer