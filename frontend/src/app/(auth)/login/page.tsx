'use client'
import useFetchData from '@/hooks/use-fetch-data.hook';
import { ServiceTypes } from '@/types/service-types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginPage = () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(customSubmit)} className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg space-y-8">

        <h2 className="text-3xl font-semibold text-center text-black mb-6">Inicio de Sesión</h2>

        <div className="relative">
          <input
            className={`border-2 ${!errors.email ? 'border-black' : 'border-[#FF0000]'} 
                    rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-white 
                    focus:outline-none text-lg text-black transition-all duration-300 ease-in-out`}
            type="email"
            placeholder="Correo Electrónico"
            autoComplete="off"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            })}
          />
          {errors.email?.type === 'pattern' && (
            <p className="absolute w-full text-[#FF0000] text-sm font-sans mt-1">
              No es un email válido
            </p>
          )}
          {errors.email?.type === 'required' && (
            <p className="absolute w-full text-[#FF0000] text-sm font-sans mt-1">
              Complete este campo
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`border-2 ${!errors.password ? 'border-black' : 'border-[#FF0000]'} 
                    rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-white 
                    focus:outline-none text-lg text-black transition-all duration-300 ease-in-out`}
            type="password"
            placeholder="Contraseña"
            {...register('password', {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          {errors.password?.type === 'pattern' && (
            <p className="absolute w-full text-[#FF0000] text-sm font-sans mt-1">
              Formato de Contraseña incorrecto
            </p>
          )}
          {errors.password?.type === 'required' && (
            <p className="absolute w-full text-[#FF0000] text-sm font-sans mt-1">
              Complete este campo
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#003366] text-white text-xl w-60 h-12 rounded-2xl block ml-auto mb-4 transition-all duration-300 ease-in-out 
             hover:bg-[#002244] disabled:opacity-60 disabled:cursor-not-allowed"
             disabled={loading}
        >
          {loading ? "Cargando..." : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
