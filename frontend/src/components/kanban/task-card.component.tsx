'use client'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowRight, CodeXml, FilePen, PencilLine, Trash, User } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import { TTask } from "@/types/kanban.types";
import { useKanban } from "@/app/(site)/kanban/context/kanbanContext";

type Props = {
    task: TTask;
    editable?: boolean;
};

const TaskCard = ({ task, editable = true }: Props) => {

    const {
        setIsEditTaskOpen,
        setTaskToEdit,
        setTasks
    } = useKanban();

    const deleteTask = (taskToDelete: TTask) => {
        setTasks((prevTasks: TTask[]) => prevTasks.filter((t) => t.id !== taskToDelete.id));
    };

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "TTask",
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-50 bg-[#0D1117] p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl border-2 border-primary-200 cursor-grab relative"

            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`w-full bg-[#353e4b] rounded-xl px-3.5 py-2 flex flex-col gap-3 cursor-grab`}
        >
            <div className="flex justify-between gap-5">
                <span className='text-sm font-semibold'>{task.name}</span>
                {editable &&
                    <button
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            deleteTask(task)

                        }}
                        className="hover:text-[#e74049] transition-colors h-full w-[31px] flex items-center justify-center"
                    >
                        <Trash className="h-[18px]" />
                    </button>
                }
            </div>
            {task.priority && <div className='h-[31px] w-fit border-1 border-[#C1D931] rounded-xl p-2.5 flex items-center gap-2'>
                <span className='h-[6px] w-[6px] rounded-full bg-[#C1D931]'></span>
                <span className='text-xs text-[#C1D931]'>Prioridad {task.priority}</span>
            </div>}

            {(task.startDate || task.endDate) && (
                <div className="flex items-center gap-2">
                    <span className="text-sm">{task.startDate || "DD/MM/YYYY"}</span>
                    <ArrowRight className="h-[18px]" />
                    <span className="text-sm">{task.endDate || "DD/MM/YYYY"}</span>
                </div>
            )}

            {
                task.assignedUser &&
                <div className='border-1 rounded p-1 flex items-center gap-2 w-fit'>
                    {task.assignedUser.avatarUrl ?
                        <Image
                            alt='user avatar'
                            src={task.assignedUser.avatarUrl}
                            width={16}
                            height={16}
                            className='rounded-full'
                        />
                        :
                        <User className="h-4 w-4 rounded-full" />
                    }
                    <span className='text-xs'>{task.assignedUser.fullname}</span>
                </div>
            }

            <div className='h-[31px] w-full flex justify-between items-center'>
                {task.sector && task.sector === "Desarrollo" &&

                    <div className='h-full flex justify-center items-center text-[#6BFBA4] text-xs rounded bg-[#6BFBA4]/15 pr-3'>
                        <CodeXml className='h-3' />
                        <span>Desarrollo</span>
                    </div>
                }
                {task.sector && task.sector === "Diseño" &&

                    <div className='h-full flex justify-center items-center text-[#A086DB] text-xs rounded bg-[#A086DB]/15 pr-3'>
                        <PencilLine className='h-3' />
                        <span>Diseño</span>
                    </div>
                }
                {!task.sector && <div></div>}
                {editable &&
                    <button
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            setTaskToEdit(task)
                            setIsEditTaskOpen(true)

                        }}
                        className="hover:text-primary-300 transition-colors h-full w-[31px] flex items-center justify-center"
                    >
                        <FilePen className="h-[18px]" />
                    </button>
                }
            </div>
        </div>
    );
};

export default TaskCard;
