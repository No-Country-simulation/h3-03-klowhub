'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useStore from '@/contexts/store/use-store.hook'
import { TLoginData } from '@/types/service-types'
import services from '@/services'

const LoginForm = () => {
    const [user, setUser] = useStore("user");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginData>({ mode: "onTouched" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const customSubmit: SubmitHandler<TLoginData> = async (
        data: TLoginData
    ) => {
        setLoading(true);

        try {
            const { status, response } = await services.login(data);

            if (status) {
                setUser({ ...user, ...response.user, jwtToken: response.accesToken });
                router.push("dashboard");
            } else {
                setLoading(false);
                toast.error("Ha ocurrido un error.");
            }
        } catch (error) {
            setLoading(false);
            toast.error("No se pudo conectar con el servidor. Vuelve a intentarlo más tarde o contacta con soporte.");
        }
    };

    return (
        <form onSubmit={handleSubmit(customSubmit)} className="flex flex-col">
            <div className="flex flex-col pb-5 gap-3 lg:w-[350px] w-full mx-auto text-gray-100">
                <div className='relative'>
                    <input type="email"
                        placeholder="Correo Electrónico"
                        autoComplete="off"
                        {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                        })}
                        className="w-full h-[45px] p-3 rounded-lg" />
                    {errors.email?.type === 'pattern' && (
                        <div className="z-10 lg:right-6 right-4 top-12 absolute w-full text-[#ffffff] font-semibold text-sm bg-card p-3.5 rounded-md flex gap-5">
                            <div className="absolute -top-2 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card"></div>
                            <p>No es un email válido</p>
                        </div>
                    )}
                    {errors.email?.type === 'required' && (
                        <div className="z-10 lg:right-6 right-4 top-12 absolute w-full text-[#ffffff] font-semibold text-sm bg-card p-3.5 rounded-md flex gap-5">
                            <div className="absolute -top-2 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card"></div>
                            <p>Complete este campo</p>
                        </div>
                    )}
                </div>
                <div className='relative'>
                    <input type="password"
                        placeholder="Contraseña"
                        {...register('password', {
                            required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        })}
                        className="w-full h-[45px] p-3 rounded-lg" />
                    {errors.password?.type === 'pattern' && (
                        <div className="z-10 lg:right-6 right-4 top-12 absolute w-full text-[#ffffff] font-semibold text-sm bg-card p-3.5 rounded-md flex gap-5">
                            <div className="absolute -top-2 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card"></div>
                            <p>La contraseña debe tener más de 8 caracteres, incluir una mayúscula, un número y un carácter especial.</p>
                        </div>
                    )}
                    {errors.password?.type === 'required' && (
                        <div className="z-10 lg:right-6 right-4 top-12 absolute w-full text-[#ffffff] font-semibold text-sm bg-card p-3.5 rounded-md flex gap-5">
                            <div className="absolute -top-2 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card"></div>
                            <p>Complete este campo</p>
                        </div>
                    )}
                </div>
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
