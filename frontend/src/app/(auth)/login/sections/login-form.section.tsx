'use client'
import { Button } from '@/components/ui/button'
import useFetchData from '@/hooks/use-fetch-data.hook'
import { ServiceTypes } from '@/types/service-types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ServiceTypes["login"]>({ mode: "onTouched" });
    const [loading, setLoading] = useState(false);
    const { fetchData } = useFetchData();
    const router = useRouter();

    const customSubmit: SubmitHandler<ServiceTypes["login"]> = async (
        data: ServiceTypes["login"]
    ) => {
        setLoading(true);

        const { status, response } = await fetchData("login", data);

        if (status) {
            const accessToken = response.accesToken;

            localStorage.setItem("accessToken", accessToken);
            router.push("dashboard/courses");
        } else {
            setLoading(false)
            toast.error("Ha ocurrido un error.");
        }

    };

    return (
        <form onSubmit={handleSubmit(customSubmit)} className="flex flex-col">
            <div className="flex flex-col pb-5 gap-3 lg:w-[350px] w-full mx-auto text-gray-100">
                <input type="email"
                    placeholder="Correo Electrónico"
                    autoComplete="off"
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                    className="w-full h-[45px] p-3 rounded-lg" />
                {errors.email?.type === 'pattern' && (
                    <p className="w-full text-[#cd5c5c] font-semibold text-sm">
                        No es un email válido
                    </p>
                )}
                {errors.email?.type === 'required' && (
                    <p className="w-full text-[#cd5c5c] font-semibold text-sm">
                        Complete este campo
                    </p>
                )}
                <input type="password"
                    placeholder="Contraseña"
                    {...register('password', {
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                    className="w-full h-[45px] p-3 rounded-lg" />
                {errors.password?.type === 'pattern' && (
                    <p className="w-full text-[#cd5c5c] font-semibold text-sm">
                        La contraseña debe tener más de 8 caracteres, incluir una mayúscula, un número y un carácter especial.
                    </p>
                )}
                {errors.password?.type === 'required' && (
                    <p className="w-full text-[#cd5c5c] font-semibold text-sm">
                        Complete este campo
                    </p>
                )}

            </div>
            <div className="w-full p-4 flex flex-wrap gap-2 text-xs justify-center">
                <span>Al registrarte, aceptas nuestras</span>
                <Link
                    href={"#"}
                    className="text-[#BCA2FF] hover:text-[#e8c9f1] transition-colors"
                >
                    Condiciones de uso
                </Link>
                <span>y nuestra</span>
                <Link
                    href={"#"}
                    className="text-[#BCA2FF] hover:text-[#e8c9f1] transition-colors"
                >
                    Política de Privacidad
                </Link>
            </div>
            <div className="w-full flex justify-center pt-5">
                <Button disabled={loading ? true : false} type="submit" className="w-[250px] h-[45px]">{loading ? "Cargando..." : "Iniciar sesion"}</Button>
            </div>
        </form>
    )
}

export default LoginForm