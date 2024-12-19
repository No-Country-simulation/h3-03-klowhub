import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Expand, IndentIncrease, LayoutList, User, X } from "lucide-react";
import React, { useEffect } from "react";
import { TTask } from "@/types/kanban.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useKanban } from "@/components/kanban/context/use-kanban-context.hook";

const EditTaskModal = () => {
    const {
        setIsEditTaskOpen,
        setTaskToEdit,
        taskToEdit,
        setTasks
    } = useKanban();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TTask>({
        mode: "onTouched",
        defaultValues: taskToEdit || {},
    });

    useEffect(() => {
        if (taskToEdit) {
            Object.keys(taskToEdit).forEach((key) => {
                setValue(key as keyof TTask, taskToEdit[key as keyof TTask]);
            });
        }
    }, [taskToEdit, setValue]);

    const customSubmit: SubmitHandler<TTask> = async (data: TTask) => {
        const filteredData: Partial<TTask> = Object.entries(data).reduce((acc, [key, value]) => {
            if (key === "assignedUser" && typeof value === "object" && value?.fullname === "") {
                acc[key as keyof TTask] = undefined as any;
                return acc;
            }

            if (value !== "") {
                acc[key as keyof TTask] = value as any;
            } else {
                acc[key as keyof TTask] = value as any;
            }

            return acc;
        }, {} as Partial<TTask>);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskToEdit?.id
                    ? {
                        ...task,
                        ...filteredData,
                    }
                    : task
            )
        );

        handleCloseEditTask();
    };

    const handleCloseEditTask = () => {
        setTaskToEdit(null);
        setIsEditTaskOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-10">
            <Card className="w-[817px] p-5 flex flex-col justify-between overflow-y-auto">
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-between h-[72px] p-5">
                        <button className="bg-transparent hover:text-primary-300 transition-colors">
                            <Expand />
                        </button>
                        <button
                            className="bg-transparent hover:text-primary-300 transition-colors"
                            onClick={handleCloseEditTask}
                        >
                            <X />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(customSubmit)} className="w-full flex flex-col gap-8 px-5">
                        <div className="flex gap-10 items-center">
                            <span className="text-sm">Título de la actividad</span>
                            <input
                                type="text"
                                className="bg-transparent p-1 border-1 border-white rounded text-sm"
                                {...register("name", { required: "El título es obligatorio" })}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>
                        <div className="flex gap-10 items-center px-4">
                            <div className="flex gap-2">
                                <IndentIncrease className="h-[18px] flex items-center" />
                                <span className="text-sm">Campo de trabajo</span>
                            </div>
                            <select
                                className="text-sm px-4 py-2 border border-white rounded-md shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                {...register("sector")}
                            >
                                <option value="" className="text-black"></option>
                                <option value="Desarrollo" className="text-black">Desarrollo</option>
                                <option value="Diseño" className="text-black">Diseño</option>
                            </select>
                        </div>
                        <div className="flex gap-10 items-center px-4">
                            <div className="flex gap-2">
                                <Calendar className="h-[18px] flex items-center" />
                                <span className="text-sm">Fecha de inicio</span>
                            </div>
                            <input
                                type="date"
                                className="bg-transparent p-1 border-1 border-white rounded text-sm"
                                {...register("startDate")}
                            />
                        </div>
                        <div className="flex gap-10 items-center px-4">
                            <div className="flex gap-2">
                                <Calendar className="h-[18px] flex items-center" />
                                <span className="text-sm">Fecha de finalización</span>
                            </div>
                            <input
                                type="date"
                                className="bg-transparent p-1 border-1 border-white rounded text-sm"
                                {...register("endDate")}
                            />
                        </div>
                        <div className="flex gap-10 items-center px-4">
                            <div className="flex gap-2">
                                <LayoutList className="h-[18px] flex items-center" />
                                <span className="text-sm">Prioridad</span>
                            </div>
                            <select
                                className="text-sm px-4 py-2 border border-white rounded-md shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                {...register("priority")}
                            >
                                <option value="" className="text-black"></option>
                                <option value="ALTA" className="text-black">ALTA</option>
                                <option value="MEDIA" className="text-black">MEDIA</option>
                                <option value="BAJA" className="text-black">BAJA</option>
                            </select>
                        </div>
                        <div className="flex gap-10 items-center px-4">
                            <div className="flex gap-2">
                                <User className="h-[18px] flex items-center" />
                                <span className="text-sm">Persona asignada</span>
                            </div>
                            <select
                                className="text-sm px-4 py-2 border border-white rounded-md shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                {...register("assignedUser.fullname")}
                            >
                                <option value="" className="text-black"></option>
                                <option value="Martín Kun" className="text-black">Martín Kun</option>
                                <option value="John Doe" className="text-black">John Doe</option>
                            </select>
                        </div>
                        <textarea
                            className="text-sm text-black p-2 min-h-[100px] focus:outline-none rounded"
                            placeholder="Descripción"
                            {...register("desc")}
                        ></textarea>
                        <div className="w-full flex justify-end">
                            <Button type="submit">Guardar cambios</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditTaskModal;
