'use client'

import { useState } from 'react';
import { Bell, Rocket, ShoppingCart, Backpack, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavItem } from './NavItem';
import Image from 'next/image';
import Link from 'next/link';
import useStore from '@/contexts/store/use-store.hook';
import { User } from '@/contexts/store/store.types';
import { buttonVariants } from '@/components/ui/button';

export const NavBar = () => {
  // const [user, _, isLoading] = useStore<User>("user");
  // console.log('user: ', user);
  // console.log('isLoading: ', isLoading);

  const [activeSection, setActiveSection] = useState('home')
  const [activeIcon, setActiveIcon] = useState('Explorador')

  return (
    <nav className="bg-[#1F202699] backdrop-blur-[15px] text-[#D194E2] h-[63px] flex items-center justify-between px-4 w-full">
      <div className='w-[1400px] mx-auto inline-flex justify-between'>
        <div className="flex items-center space-x-4">
          <div className="flex justify-center items-center">
            <Image
              src="/temp/imgs/klowhub.png"
              width={50}
              height={50}
              alt="logo"
            />
          </div>
          <div className="flex bg-[#FFFFFF33] rounded-md py-1.5 px-2 text-white">
            <Link
              href="/"
              className={`cursor-pointer rounded-md px-2 text-sm ${activeSection === 'home' ? 'bg-purple-600 rounded-md' : ''}`}
              onClick={() => setActiveSection('home')}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`cursor-pointer rounded-md px-2 text-sm ${activeSection === 'plataforma' ? 'bg-purple-600 rounded-md' : ''}`}
              onClick={() => setActiveSection('plataforma')}
            >
              Plataforma
            </Link>
          </div>
          <div className="hidden xl:flex space-x-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/courses">Curso y lecciones</Link>
            <Link href="/applications">Appstore</Link>
            <Link href="/projects">Proyectos</Link>
              <Link href="/membership?section=selection">Planes</Link>
          </div>
        </div>


        <div className="flex items-center space-x-4">
          <div className='text-white hidden md:block'>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          </div>
          <span className="text-sm text-white hidden sm:inline">{activeIcon}</span>
          <div className="flex bg-[#702486] rounded-full px-2 py-1">
            <span
              className={`cursor-pointer rounded-full px-1.5 py-1 ${activeIcon === 'Explorador' ? 'bg-white' : ''}`}
              onClick={() => setActiveIcon('Explorador')}
            >
              <Backpack className="h-4 w-4" />
            </span>
            <span
              className={`cursor-pointer rounded-full px-1.5 py-1 ${activeIcon === 'Estudiante' ? 'bg-white' : ''}`}
              onClick={() => setActiveIcon('Estudiante')}
            >
              <Rocket className="h-4 w-4" />
            </span>
          </div>
              <>
                <Link href="/login" className={`${buttonVariants({ variant: "outline" })} border-primary-300 rounded-xl`}>Ingresar</Link>
                <Link href="/register">Registrarse</Link>
              </>
        </div>
      </div>
    </nav>
  );

};
