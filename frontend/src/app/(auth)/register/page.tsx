import Icon from "@/components/icon/icon.component"
import Link from "next/link"
import RegisterForm from "./sections/register-form.section"

const RegisterPage = () => {
    return (
        <div className="pb-[100px] mt-14 lg:mt-[100px] flex flex-col gap-14 w-full md:w-[500px] lg:w-[400px] px-5 md:px-0">
            <h3 className="font-bold text-3xl mx-auto flex lg:hidden">KlowHub</h3>
            <div className="flex flex-col gap-6 text-sm">
                <p className="text-xs lg:text-base lg:font-bold leading-5">Explora, aprende, enseña y conecta. <br />Crea tu cuenta en KlowHub y accede a un mundo de posibilidades.</p>
                <RegisterForm />
                <div className="w-full flex flex-col gap-4">
                    <span className="font-bold text-center">O continuar con</span>
                    <div className="flex gap-5 mx-auto">
                        <Link
                            href={"https://github.com/"}
                            className="hover:scale-110 transition-transform duration-300"
                        >
                            <Icon name="github" />
                        </Link>
                        <Link
                            href={"https://facebook.com/"}
                            className="hover:scale-110 transition-transform duration-300"
                        >
                            <Icon name="facebook" />
                        </Link>
                        <Link
                            href={"https://google.com/"}
                            className="hover:scale-110 transition-transform duration-300"
                        >
                            <Icon name="google" />
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="subscribe"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded-lg focus:ring-purple-500"
                    />
                    <label
                        htmlFor="subscribe font-bold"
                    >
                        Quiero recibir novedades y consejos de la plataforma
                    </label>
                </div>
                <div className="flex gap-5 justify-center">
                    <span>¿Ya tienes cuenta?</span>
                    <Link href={"login"} className="text-[#7CB4FF] hover:text-primary-100 transition-colors">Iniciar Sesión</Link>
                </div>
            </div >
        </div>
    )
}

export default RegisterPage