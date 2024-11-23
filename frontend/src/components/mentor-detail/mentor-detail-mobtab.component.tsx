"use client";
import { Inter } from "next/font/google";
import TabSwitch from "../tab-switch/tab-switch.component";
import { Card, CardContent, CardSection } from "../ui/card";
import Image from "next/image";
import Icon from "../icon/icon.component";
import DatePicker from "../date-picker/date-picker.component";
import TimePicker from "../time-picker/time-picker.component";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getSlug } from "@/utils/str.utils";
import Rating from "../rating/rating.component";
import { IconTypes } from "../icon/icon.types";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700"],
  display: "swap",
});

const MentorDetailMobileTablet = () => {
  const tabViewMap = new Map<string, JSX.Element>();
  tabViewMap.set("Perfil", <ProfileSection />);
  tabViewMap.set("Agenda", <ScheduleSection />);
  tabViewMap.set("Reseñas", <ReviewsSection />);

  return (
    <div className={`${inter.className} w-full px-0 450px:px-5 sm:px-12`}>
      <Card className="w-full overflow-hidden flex-col justify-center relative p-1.5 sm:p-5 tracking-wide">
        <CardContent className="w-full p-1.5 sm:p-5 flex flex-col gap-1.5 sm:gap-5">
          <div className="flex flex-col h-[247px] items-center justify-between">
            <Image
              priority
              alt="some description"
              src={
                "https://res.cloudinary.com/dpp28f2ek/image/upload/v1731614213/Image_1_yhifgc.png"
              }
              width={175}
              height={175}
              className="w-[175px] h-[175px] rounded-full object-cover"
            />
            <span className="p-2.5 text-xl font-bold">Martin Fernandez</span>
          </div>
          <TabSwitch tabViewMap={tabViewMap} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorDetailMobileTablet;

const ProfileSection = () => {
  return (
    <CardSection className="w-full p-3 rounded flex flex-col gap-2">
      <div className="flex flex-col gap-5">
        <span className="w-[256px] text-base font-bold">Sobre mi</span>
        <p className="text-sm font-[300] leading-6">
          Con más de 8 años de experiencia en el desarrollo de aplicaciones
          no-code, Juan Pérez se ha convertido en un referente en el uso de
          AppSheet, la plataforma de desarrollo de aplicaciones de Google. Su
          pasión por la tecnología y su enfoque en la simplificación de procesos
          empresariales lo han llevado a ayudar a cientos de empresas a
          transformar sus operaciones mediante aplicaciones personalizadas, sin
          necesidad de código.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <span className="w-[256px] text-base font-bold">
          Experiencia laboral
        </span>
        <p className="text-sm font-[300] leading-6">
          Con más de 8 años de experiencia en el desarrollo de aplicaciones
          no-code, Juan Pérez se ha convertido en un referente en el uso de
          AppSheet, la plataforma de desarrollo de aplicaciones de Google. Su
          pasión por la tecnología y su enfoque en la simplificación de procesos
          empresariales lo han llevado a ayudar a cientos de empresas a
          transformar sus operaciones mediante aplicaciones personalizadas, sin
          necesidad de código.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <span className="w-[256px] text-base font-bold">
          Formacion academica
        </span>
        <p className="text-sm font-[300] leading-6">
          Con más de 8 años de experiencia en el desarrollo de aplicaciones
          no-code, Juan Pérez se ha convertido en un referente en el uso de
          AppSheet, la plataforma de desarrollo de aplicaciones de Google. Su
          pasión por la tecnología y su enfoque en la simplificación de procesos
          empresariales lo han llevado a ayudar a cientos de empresas a
          transformar sus operaciones mediante aplicaciones personalizadas, sin
          necesidad de código.
        </p>
      </div>
      <span className="w-[256px] text-base font-bold">
        Pagina web / Portfolio
      </span>
      <a href="#" className="text-sm font-[300] leading-6">
        www.miportfolio.com
      </a>
    </CardSection>
  );
};

const ScheduleSection = () => {
  return (
    <CardContent className="flex flex-col gap-5">
      <span className="text-base font-bold">Agenda tu proxima reunion</span>

      <CardSection className="w-full p-3 flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex gap-1.5">
            <Icon name="user" />
            <span className="text-sm font-semibold">Martin Fernandez</span>
          </div>
          <div className="flex gap-1.5">
            <Icon name="clock" />
            <span className="text-sm font-semibold">30 Minutos</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm font-[300]">
            Conectate con tu mentor para revisar avances, despejar dudas o
            trazar nuevos objetivos.
          </p>
          <p className="text-sm font-[300]">
            Elegí el día y la hora que mejor se ajuste a tu agenda y asegurá tu
            espacio para la sesión.
          </p>
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-8 lg:flex-row lg:gap-12">
          <DatePicker />
          <div className="flex flex-col gap-6 pr-2">
            <span className="text-sm font-semibold">
              Por favor seleccione un horario
            </span>
            <TimePicker className="p-6 w-fit gap-x-4 gap-y-4 border-none" />
          </div>
        </div>
      </CardSection>
      <div className="flex justify-center lg:justify-end gap-4">
        <Button
          variant="outline"
          className="w-[140px] bg-transparent border border-primary-200 h-[40px] text-primary-200"
        >
          Cancelar
        </Button>
        <Button className="w-[140px]">Agendar</Button>
      </div>
    </CardContent>
  );
};

const ReviewsSection = () => {
  return (
    <CardContent className="flex flex-col gap-5">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        <div className="w-full flex flex-col gap-3 p-3">
          <div className="flex items-center w-[132px] gap-1.5">
            <span className="text-base font-bold text-primary-100">Perfil</span>
            <span className="bg-pro-badge-gradient w-[45px] h-[27px] flex justify-center items-center text-xs font-[100] rounded-lg">
              PRO
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1.5 items-center h-[40px]">
              <span className="text-primary-200 font-bold text-xl">25</span>
              <span className="text-sm font-semibold">Cursos publicados</span>
            </div>
            <div className="flex gap-1.5 items-center h-[40px]">
              <span className="text-primary-200 font-bold text-xl">3</span>
              <span className="text-sm font-semibold">
                Aplicaciones creadas
              </span>
            </div>
            <div className="flex gap-1.5 items-center h-[40px]">
              <span className="text-primary-200 font-bold text-xl">75</span>
              <span className="text-sm font-semibold">Suscriptores</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <CardSection className="p-3 flex flex-col gap-5 h-fit flex flex-col gap-6">
            <div className="flex gap-1.5">
              <Icon name="clock" />
              <span className="text-sm font-semibold">
                30 Minutos gratuitos
              </span>
            </div>
            <div className="flex gap-1.5">
              <Icon name="clock" />
              <span className="text-sm font-semibold">6USD x Hora</span>
            </div>
          </CardSection>
          <Badge
            icon={
              <Icon name={getSlug("PowerApps") as IconTypes}
              />
            }
            className="bg-gray-100 text-white w-full flex justify-center"
          >
            Power Apps
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col min-h-[104px] gap-5">
            <span className="text-base font-bold p-2.5">Background</span>
            <div className="flex justify-between flex-wrap">
              <span className="text-sm font-semibold h-10 flex items-center p-1.5">
                Expertise
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#ADC6F6] text-[#0252CA] text-sm h-[40px]">
                  Diseño
                </Badge>
                <Badge className="bg-[#F3C8FF] text-[#702486] text-sm h-[40px]">
                  Appsheet
                </Badge>
                <Badge className="bg-[#E8B88D] text-[#CA6100] text-sm h-[40px]">
                  Producto
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-h-[104px] gap-5">
            <div className="flex justify-between flex-wrap">
              <span className="text-sm font-semibold h-10 flex items-center p-1.5">
                Disciplinas
              </span>
              <div className="flex gap-4">
                <Badge className="bg-transparent text-white text-sm h-[40px] border-white">
                  UX
                </Badge>
                <Badge className="bg-transparent text-white text-sm h-[40px] border-white">
                  No Code
                </Badge>
              </div>
            </div>
            <div className="flex justify-between flex-wrap">
              <span className="text-sm font-semibold h-10 flex items-center p-1.5">
                Idiomas
              </span>
              <div className="flex gap-4">
                <Badge className="bg-transparent text-white text-sm h-[40px] border-white">
                  Español
                </Badge>
                <Badge className="bg-transparent text-white text-sm h-[40px] border-white">
                  Portugues
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <span className="text-base font-bold p-2.5">
            Comentarios y valoraciones
          </span>
          <div className="flex flex-col py-4 gap-2.5 border-b-1">
            <div className="flex gap-2.5 items-center">
              <Rating rating={5} ratingCount={5} showDetails={false} />
              <span className="text-sm font-semibold">Maria Lopez</span>
            </div>
            <p className="text-sm font-[400] leading-6">
              Este curso superó mis expectativas. Sebastián explica todo de
              manera clara y sencilla, lo que me permitió crear mi primera
              aplicación en tiempo récord.
            </p>
          </div>
          <div className="flex flex-col py-4 gap-2.5 border-b-1">
            <div className="flex gap-2.5 items-center">
              <Rating rating={5} ratingCount={5} showDetails={false} />
              <span className="text-sm font-semibold">Marta Torres</span>
            </div>
            <p className="text-sm font-[400] leading-6">
              Nunca pensé que podría desarrollar una aplicación sin programar.
              Gracias a Sebastián, ahora puedo automatizar varias tareas en mi
              trabajo. ¡Muy recomendado!
            </p>
          </div>
          <div className="flex flex-col py-4 gap-2.5 border-b-1">
            <div className="flex gap-2.5 items-center">
              <Rating rating={5} ratingCount={5} showDetails={false} />
              <span className="text-sm font-semibold">Rodrigo Baez</span>
            </div>
            <p className="text-sm font-[400] leading-6">
              El enfoque práctico de Sebastián es perfecto para aprender. Su
              experiencia se nota en cada lección y las herramientas que
              proporciona son súper útiles.
            </p>
          </div>
          <div className="flex flex-col py-4 gap-2.5 border-b-1">
            <div className="flex gap-2.5 items-center">
              <Rating rating={5} ratingCount={5} showDetails={false} />
              <span className="text-sm font-semibold">Mario Perez</span>
            </div>
            <p className="text-sm font-[400] leading-6">
              Excelente curso para quienes quieren iniciarse en el mundo
              no-code. Sebastián sabe cómo transmitir sus conocimientos de
              manera efectiva y accesible.
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  );
};
