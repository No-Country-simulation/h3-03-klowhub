"use client";

import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import MentorDetailDesktop from "@/components/mentor-detail/mentor-detail-desktop.component";
import MentorDetailMobileTablet from "@/components/mentor-detail/mentor-detail-mobtab.component";
import React, { Suspense, useState, useEffect } from "react";

const MentorDetailPage = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 1200);
      };

      handleResize();

      const timer = setTimeout(() => {
        setIsReady(true);
      }, 500);

      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full">
      <div className="px-6 md:px-5 mx-auto mb-[48px]">
        <BreadCrumb />
      </div>
      {isDesktop ? <MentorDetailDesktop /> : <MentorDetailMobileTablet />}
    </main>
  );
};

export default MentorDetailPage;
