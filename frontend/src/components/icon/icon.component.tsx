import { IconTypes } from "./icon.types";

type IconProps = {
  name: IconTypes;
  style?: string;
};

const Icon = ({ name, style }: IconProps) => {
  switch (name) {
    case "star": {
      return (
        <svg className={ style } width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#D9D9D9" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      );
    }
    case "rated-star": {
      return (
        <svg className={style} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#FBBC05" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      );
    }
    case "shopping-cart": {
      return (
        <svg className={style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" /><path d="M2.04999 2.05005H4.04999L6.70999 14.47C6.80757 14.9249 7.06066 15.3315 7.4257 15.6199C7.79074 15.9083 8.24489 16.0604 8.70999 16.05H18.49C18.9452 16.0493 19.3865 15.8933 19.741 15.6079C20.0956 15.3224 20.3421 14.9246 20.44 14.48L22.09 7.05005H5.11999" stroke="black" strokeLinecap="round" strokeLinejoin="round" /></svg>
      );
    }
    case "appsheet": {
      return (
        <svg className={ style } width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.6712 0.000854492H16.7136L13.9021 3.98675L12.2295 7.93707L16.7136 8.43531L21.3757 7.95486L24.8278 1.97601C25.326 1.1041 24.6854 0.000854492 23.6712 0.000854492Z" fill="#0060D9"/><path d="M0.182529 1.9938L3.08298 6.95839C3.43887 7.56339 4.07946 7.93707 4.79123 7.93707L12.2292 7.95486L16.7133 0.000854492H1.32136C0.307089 0.000854492 -0.333503 1.12189 0.182529 1.9938Z" fill="#4285F4"/><path d="M13.7058 21.3362C13.2076 22.2081 11.9442 22.2259 11.4282 21.354L8.54551 16.5139C8.18962 15.9089 8.17183 15.1438 8.52771 14.521L12.2467 7.93713L21.3751 7.95492L13.7058 21.3362Z" fill="#4285F4"/></svg>
      );
    }
    case "powerapps": {
      return (
        <svg className={style} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6771 23.9583C10.3818 23.9583 10.1006 23.8333 9.90264 23.6135L0.99847 13.7198C0.696387 13.3838 0.530762 12.9505 0.530762 12.4995C0.530762 12.0484 0.696908 11.6156 0.998991 11.2797L9.90264 1.38645C10.2979 0.946867 11.0563 0.946867 11.4516 1.38645L20.3563 11.2802C20.9813 11.975 20.9813 13.0245 20.3563 13.7193L11.4516 23.6135C11.2537 23.8333 10.9724 23.9583 10.6771 23.9583Z" fill="url(#paint0_linear_6_5134)" /><path opacity="0.05" d="M20.8228 12.5C20.8228 12.9375 20.6665 13.375 20.354 13.7188L12.3228 22.651L12.1457 22.8438L8.99463 19.3438C8.45817 18.7448 8.45817 17.849 8.99463 17.25L12.8332 12.9844C13.0832 12.7083 13.0832 12.2917 12.8332 12.0156L8.99463 7.75C8.45817 7.15104 8.45817 6.25521 8.99463 5.65625L12.1457 2.15625L12.3228 2.34896L20.354 11.2812C20.6665 11.625 20.8228 12.0625 20.8228 12.5Z" fill="black" /><path opacity="0.05" d="M20.8229 12.5C20.8229 12.9375 20.6667 13.375 20.3542 13.7188L12.3229 22.6511L9.1875 19.1667C8.73958 18.6719 8.73958 17.9219 9.1875 17.4271L13.026 13.1615C13.3646 12.7813 13.3646 12.2188 13.026 11.8386L9.1875 7.57296C8.73958 7.07817 8.73958 6.32817 9.1875 5.83337L12.3229 2.349L20.3542 11.2813C20.6667 11.625 20.8229 12.0625 20.8229 12.5Z" fill="black" /><path d="M14.3135 23.9583C14.0182 23.9583 13.7369 23.8333 13.539 23.6135L9.38066 18.9932C9.02389 18.5968 9.02441 17.9958 9.38066 17.5994L13.2197 13.3343C13.6479 12.8588 13.6479 12.1416 13.2197 11.6661L9.38066 7.401C9.02441 7.00465 9.02389 6.40361 9.38066 6.00725L13.539 1.38694C13.9343 0.947355 14.6926 0.947355 15.088 1.38694L23.9926 11.2807C24.6176 11.9755 24.6176 13.0244 23.9932 13.7198L15.0874 23.6135C14.89 23.8333 14.6088 23.9583 14.3135 23.9583Z" fill="url(#paint1_linear_6_5134)" /><path d="M19.7872 17.8766C19.4919 17.8766 19.2106 17.7516 19.0133 17.5318L15.582 13.7198C15.2794 13.3833 15.1132 12.9495 15.1138 12.4979C15.1138 12.0474 15.2804 11.6151 15.582 11.2797L19.0127 7.46824C19.4075 7.02865 20.1664 7.02865 20.5612 7.46824L23.9924 11.2802C24.6174 11.9761 24.6174 13.024 23.9929 13.7193L20.5612 17.5318C20.3643 17.7516 20.0825 17.8766 19.7872 17.8766Z" fill="url(#paint2_linear_6_5134)" /><defs><linearGradient id="paint0_linear_6_5134" x1="8.71774" y1="1.38489" x2="12.6396" y2="23.6281" gradientUnits="userSpaceOnUse"><stop offset="0.003" stopColor="#A33094" /><stop offset="0.998" stopColor="#6D246B" /></linearGradient><linearGradient id="paint1_linear_6_5134" x1="14.263" y1="1.0484" x2="18.1854" y2="23.2916" gradientUnits="userSpaceOnUse"><stop stopColor="#E288C5" /><stop offset="0.998" stopColor="#D76DBB" /></linearGradient><linearGradient id="paint2_linear_6_5134" x1="18.8679" y1="7.28334" x2="20.7096" y2="17.7302" gradientUnits="userSpaceOnUse"><stop offset="0.006" stopColor="#E9A0CB" /><stop offset="0.998" stopColor="#E48DC7" /></linearGradient></defs></svg>
      );
    }
    case "close": {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></svg>
      );
    }
    case "list-filter": {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21" stroke="#D194E2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 12H17" stroke="#D194E2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 18H14" stroke="#D194E2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      );
    }
    case "more-vertical": {
      return (
        <svg className={style} width="24" stroke="currentColor" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
      );
    }
    case "heart": {
      return (
        <svg className={style} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5837 15.1667C22.1978 13.585 23.8337 11.6892 23.8337 9.20833C23.8337 7.62809 23.2059 6.11256 22.0885 4.99516C20.9711 3.87775 19.4556 3.25 17.8753 3.25C15.9687 3.25 14.6253 3.79167 13.0003 5.41667C11.3753 3.79167 10.032 3.25 8.12533 3.25C6.54508 3.25 5.02955 3.87775 3.91215 4.99516C2.79474 6.11256 2.16699 7.62809 2.16699 9.20833C2.16699 11.7 3.79199 13.5958 5.41699 15.1667L13.0003 22.75L20.5837 15.1667Z" fill="white" fillOpacity="0.8" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
      );
    }
    case "proyector": {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.33301 5.83398L12.4997 8.33398L8.33301 10.834V5.83398Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" /><path d="M16.667 2.5H3.33366C2.41318 2.5 1.66699 3.24619 1.66699 4.16667V12.5C1.66699 13.4205 2.41318 14.1667 3.33366 14.1667H16.667C17.5875 14.1667 18.3337 13.4205 18.3337 12.5V4.16667C18.3337 3.24619 17.5875 2.5 16.667 2.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 14.166V17.4993" stroke="white" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.66699 17.5H13.3337" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )
    }
    case "user": {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_44_37698" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"><rect width="20" height="20" fill="#D9D9D9" /></mask><g mask="url(#mask0_44_37698)"><path d="M4.87533 14.2493C5.58366 13.7077 6.37533 13.2806 7.25033 12.9681C8.12533 12.6556 9.04199 12.4993 10.0003 12.4993C10.9587 12.4993 11.8753 12.6556 12.7503 12.9681C13.6253 13.2806 14.417 13.7077 15.1253 14.2493C15.6114 13.6799 15.9899 13.0341 16.2607 12.3118C16.5316 11.5896 16.667 10.8188 16.667 9.99935C16.667 8.15213 16.0177 6.57921 14.7191 5.2806C13.4205 3.98199 11.8475 3.33268 10.0003 3.33268C8.1531 3.33268 6.58019 3.98199 5.28158 5.2806C3.98296 6.57921 3.33366 8.15213 3.33366 9.99935C3.33366 10.8188 3.46908 11.5896 3.73991 12.3118C4.01074 13.0341 4.38921 13.6799 4.87533 14.2493ZM10.0003 10.8327C9.18088 10.8327 8.48991 10.5514 7.92741 9.98893C7.36491 9.42643 7.08366 8.73546 7.08366 7.91602C7.08366 7.09657 7.36491 6.4056 7.92741 5.8431C8.48991 5.2806 9.18088 4.99935 10.0003 4.99935C10.8198 4.99935 11.5107 5.2806 12.0732 5.8431C12.6357 6.4056 12.917 7.09657 12.917 7.91602C12.917 8.73546 12.6357 9.42643 12.0732 9.98893C11.5107 10.5514 10.8198 10.8327 10.0003 10.8327ZM10.0003 18.3327C8.84755 18.3327 7.76421 18.1139 6.75033 17.6764C5.73644 17.2389 4.85449 16.6452 4.10449 15.8952C3.35449 15.1452 2.76074 14.2632 2.32324 13.2493C1.88574 12.2355 1.66699 11.1521 1.66699 9.99935C1.66699 8.84657 1.88574 7.76324 2.32324 6.74935C2.76074 5.73546 3.35449 4.85352 4.10449 4.10352C4.85449 3.35352 5.73644 2.75977 6.75033 2.32227C7.76421 1.88477 8.84755 1.66602 10.0003 1.66602C11.1531 1.66602 12.2364 1.88477 13.2503 2.32227C14.2642 2.75977 15.1462 3.35352 15.8962 4.10352C16.6462 4.85352 17.2399 5.73546 17.6774 6.74935C18.1149 7.76324 18.3337 8.84657 18.3337 9.99935C18.3337 11.1521 18.1149 12.2355 17.6774 13.2493C17.2399 14.2632 16.6462 15.1452 15.8962 15.8952C15.1462 16.6452 14.2642 17.2389 13.2503 17.6764C12.2364 18.1139 11.1531 18.3327 10.0003 18.3327ZM10.0003 16.666C10.7364 16.666 11.4309 16.5584 12.0837 16.3431C12.7364 16.1278 13.3337 15.8188 13.8753 15.416C13.3337 15.0132 12.7364 14.7042 12.0837 14.4889C11.4309 14.2737 10.7364 14.166 10.0003 14.166C9.26421 14.166 8.56977 14.2737 7.91699 14.4889C7.26421 14.7042 6.66699 15.0132 6.12533 15.416C6.66699 15.8188 7.26421 16.1278 7.91699 16.3431C8.56977 16.5584 9.26421 16.666 10.0003 16.666ZM10.0003 9.16602C10.3614 9.16602 10.66 9.04796 10.8962 8.81185C11.1323 8.57574 11.2503 8.27713 11.2503 7.91602C11.2503 7.5549 11.1323 7.25629 10.8962 7.02018C10.66 6.78407 10.3614 6.66602 10.0003 6.66602C9.63921 6.66602 9.3406 6.78407 9.10449 7.02018C8.86838 7.25629 8.75033 7.5549 8.75033 7.91602C8.75033 8.27713 8.86838 8.57574 9.10449 8.81185C9.3406 9.04796 9.63921 9.16602 10.0003 9.16602Z" fill="white" /></g></svg>
      )
    }
    case "clock": {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_44_37703" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"><rect width="20" height="20" fill="#D9D9D9" /></mask><g mask="url(#mask0_44_37703)"><path d="M12.7503 13.916L13.917 12.7493L10.8337 9.66602V5.83268H9.16699V10.3327L12.7503 13.916ZM10.0003 18.3327C8.84755 18.3327 7.76421 18.1139 6.75033 17.6764C5.73644 17.2389 4.85449 16.6452 4.10449 15.8952C3.35449 15.1452 2.76074 14.2632 2.32324 13.2493C1.88574 12.2355 1.66699 11.1521 1.66699 9.99935C1.66699 8.84657 1.88574 7.76324 2.32324 6.74935C2.76074 5.73546 3.35449 4.85352 4.10449 4.10352C4.85449 3.35352 5.73644 2.75977 6.75033 2.32227C7.76421 1.88477 8.84755 1.66602 10.0003 1.66602C11.1531 1.66602 12.2364 1.88477 13.2503 2.32227C14.2642 2.75977 15.1462 3.35352 15.8962 4.10352C16.6462 4.85352 17.2399 5.73546 17.6774 6.74935C18.1149 7.76324 18.3337 8.84657 18.3337 9.99935C18.3337 11.1521 18.1149 12.2355 17.6774 13.2493C17.2399 14.2632 16.6462 15.1452 15.8962 15.8952C15.1462 16.6452 14.2642 17.2389 13.2503 17.6764C12.2364 18.1139 11.1531 18.3327 10.0003 18.3327ZM10.0003 16.666C11.8475 16.666 13.4205 16.0167 14.7191 14.7181C16.0177 13.4195 16.667 11.8466 16.667 9.99935C16.667 8.15213 16.0177 6.57921 14.7191 5.2806C13.4205 3.98199 11.8475 3.33268 10.0003 3.33268C8.1531 3.33268 6.58019 3.98199 5.28158 5.2806C3.98296 6.57921 3.33366 8.15213 3.33366 9.99935C3.33366 11.8466 3.98296 13.4195 5.28158 14.7181C6.58019 16.0167 8.1531 16.666 10.0003 16.666Z" fill="white" /></g></svg>
      )
    }
    case "arrow": {
      return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_44_37738" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24"><rect x="0.5" width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_44_37738)"><path d="M8.525 22L6.75 20.225L14.975 12L6.75 3.775L8.525 2L18.525 12L8.525 22Z" fill="#E8C9F1" /></g></svg>
      )
    }
    case "mail": {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_504_104861)"><path d="M14.3034 0.000488281H0.696738C0.677139 0.000488281 0.657861 0.00240197 0.638672 0.00464854L1.29191 0.629779C1.33031 0.650829 1.36775 0.677539 1.40329 0.711571L7.50012 6.54613L13.5968 0.711571C13.5968 0.711613 13.5969 0.711487 13.5968 0.711571L14.3373 0.0029428C14.326 0.00215233 14.3148 0.000488281 14.3034 0.000488281Z" fill="white"/><path d="M11.8597 4.28207L7.8114 8.15625C7.71735 8.24636 7.6086 8.29138 7.49997 8.29138C7.39131 8.29138 7.28262 8.24632 7.18852 8.15625L5.88349 6.90736C5.84446 6.88618 5.80652 6.85847 5.77043 6.82395L0 1.30157V14.0106C0 14.5569 0.311924 14.9999 0.69668 14.9999H14.3033C14.6881 14.9999 15 14.5569 15 14.0106V1.27686L11.8597 4.28207Z" fill="white"/></g><defs><clipPath id="clip0_504_104861"><rect width="15" height="15" fill="white" transform="translate(0 0.000488281)"/></clipPath></defs></svg>
      )
    }
    case "whatsapp": {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_504_104865)"><path d="M7.50187 0.000488281H7.49813C3.36281 0.000488281 0 3.36424 0 7.50049C0 9.14111 0.52875 10.6617 1.42781 11.8964L0.493125 14.6827L3.37594 13.7611C4.56187 14.5467 5.97656 15.0005 7.50187 15.0005C11.6371 15.0005 15 11.6358 15 7.50049C15 3.36518 11.6371 0.000488281 7.50187 0.000488281Z" fill="#4ACB67"/><path d="M11.8655 10.5918C11.6846 11.1027 10.9664 11.5265 10.3937 11.6502C10.0018 11.7336 9.48991 11.8002 7.76679 11.0859C5.56272 10.1727 4.14334 7.93301 4.03271 7.78774C3.92678 7.64239 3.14209 6.60178 3.14209 5.52553C3.14209 4.44928 3.68865 3.92521 3.90896 3.70021C4.0899 3.51553 4.38896 3.43115 4.67584 3.43115C4.76865 3.43115 4.85209 3.43584 4.92709 3.43959C5.1474 3.44896 5.25803 3.46209 5.40334 3.8099C5.58428 4.24584 6.0249 5.32209 6.0774 5.43271C6.13084 5.54334 6.18428 5.69334 6.10928 5.83865C6.03896 5.98865 5.97709 6.05522 5.86647 6.18272C5.75584 6.31022 5.65084 6.40771 5.54022 6.54459C5.43897 6.66365 5.32459 6.79115 5.45209 7.01147C5.57959 7.22709 6.02021 7.94614 6.66896 8.52364C7.50616 9.26899 8.18491 9.50711 8.42768 9.60836C8.60866 9.68336 8.82429 9.66551 8.95643 9.52489C9.12428 9.34399 9.33143 9.04399 9.54241 8.74864C9.69241 8.53676 9.88179 8.51051 10.0805 8.58551C10.283 8.65586 11.3546 9.18551 11.5749 9.29524C11.7952 9.40586 11.9405 9.45836 11.9939 9.55114C12.0464 9.64399 12.0464 10.0799 11.8655 10.5918Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_504_104865"><rect width="15" height="15" fill="white" transform="translate(0 0.000488281)"/></clipPath></defs></svg>
      )
    }
    case "linkedin": {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_504_104873)"><path d="M13.6431 0.000488281H1.35687C0.6075 0.000488281 0 0.607988 0 1.35736V13.6435C0 14.393 0.6075 15.0005 1.35687 15.0005H13.6431C14.3925 15.0005 15 14.393 15 13.6435V1.35736C15 0.607988 14.3925 0.000488281 13.6431 0.000488281ZM4.64164 12.9525C4.64164 13.1706 4.46485 13.3473 4.24677 13.3473H2.5659C2.34782 13.3473 2.17104 13.1706 2.17104 12.9525V5.90637C2.17104 5.68828 2.34782 5.5115 2.5659 5.5115H4.24677C4.46485 5.5115 4.64164 5.68828 4.64164 5.90637V12.9525ZM3.40633 4.8473C2.52444 4.8473 1.80951 4.13236 1.80951 3.25046C1.80951 2.36856 2.52444 1.65363 3.40633 1.65363C4.28823 1.65363 5.00317 2.36856 5.00317 3.25046C5.00317 4.13236 4.28827 4.8473 3.40633 4.8473ZM13.4258 12.9843C13.4258 13.1848 13.2632 13.3473 13.0627 13.3473H11.259C11.0586 13.3473 10.896 13.1848 10.896 12.9843V9.67928C10.896 9.18625 11.0406 7.51875 9.6075 7.51875C8.49592 7.51875 8.27045 8.66007 8.22513 9.17228V12.9843C8.22513 13.1848 8.06258 13.3473 7.86208 13.3473H6.11761C5.91711 13.3473 5.75455 13.1848 5.75455 12.9843V5.87456C5.75455 5.67406 5.91711 5.5115 6.11761 5.5115H7.86208C8.06258 5.5115 8.22513 5.67406 8.22513 5.87456V6.48928C8.63732 5.87071 9.24987 5.39326 10.5542 5.39326C13.4423 5.39326 13.4258 8.09157 13.4258 9.57412V12.9843Z" fill="#0077B7"/></g><defs><clipPath id="clip0_504_104873"><rect width="15" height="15" fill="white" transform="translate(0 0.000488281)"/></clipPath></defs></svg>
      )
    }
    case "greeter-check": {
      return (
        <svg width="89" height="89" viewBox="0 0 89 89" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_31_9756)"><circle cx="44.5" cy="44.5" r="44.5" fill="#1F2937"/><g filter="url(#filter0_b_31_9756)"><rect width="89" height="89" rx="44.5" fill="#313036" fillOpacity="0.3"/><rect width="89" height="89" rx="44.5" fill="url(#paint0_linear_31_9756)"/><rect x="1" y="1" width="87" height="87" rx="43.5" stroke="url(#paint1_linear_31_9756)" strokeWidth="2"/></g><ellipse cx="44.1329" cy="44.1455" rx="17.1923" ry="18.0752" fill="#D9D9D9"/><g filter="url(#filter1_d_31_9756)"><path d="M44.133 18C29.7246 18 18 29.7288 18 44.1425C18 58.5561 29.7246 70.291 44.133 70.291C58.5414 70.291 70.266 58.5622 70.266 44.1485C70.266 29.7349 58.5414 18 44.133 18ZM55.3932 39.1589L42.3237 53.2347C41.7326 53.8743 40.9244 54.2001 40.1102 54.2001C39.4106 54.2001 38.717 53.9587 38.1441 53.4761L31.1057 47.4427C29.8392 46.3567 29.6944 44.4562 30.78 43.1892C31.8656 41.9222 33.7654 41.7714 35.032 42.8634L39.869 47.0083L50.9663 35.0563C52.1002 33.8375 54.006 33.7651 55.2303 34.8994C56.4546 36.0337 56.521 37.9402 55.3932 39.1589Z" fill="url(#paint2_linear_31_9756)"/></g></g><defs><filter id="filter0_b_31_9756" x="-4" y="-4" width="97" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_31_9756"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_31_9756" result="shape"/></filter><filter id="filter1_d_31_9756" x="8" y="-4" width="84.266" height="84.291" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="6" dy="-6"/><feGaussianBlur stdDeviation="8"/><feColorMatrix type="matrix" values="0 0 0 0 0.698039 0 0 0 0 0.968627 0 0 0 0 0.388235 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_9756"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_9756" result="shape"/></filter><linearGradient id="paint0_linear_31_9756" x1="4.38115" y1="4.93986" x2="44.5" y2="46.28" gradientUnits="userSpaceOnUse"><stop stopColor="#B1B1B1" stopOpacity="0.32"/><stop offset="1" stopColor="#363567" stopOpacity="0.2"/></linearGradient><linearGradient id="paint1_linear_31_9756" x1="-18.7493" y1="-6.41195" x2="5.36297" y2="107.152" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.2"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient><linearGradient id="paint2_linear_31_9756" x1="70.266" y1="18" x2="33.3933" y2="61.1038" gradientUnits="userSpaceOnUse"><stop stopColor="#B2F763"/><stop offset="1" stopColor="#26AB3F"/></linearGradient><clipPath id="clip0_31_9756"><rect width="89" height="89" fill="white"/></clipPath></defs></svg>
      )
    }
    case "messenger": {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_504_104869)"><path d="M7.49929 0.00194678C3.44629 -0.077967 0.0925397 3.13606 0 7.18874C0.0105752 9.25174 0.924051 11.2066 2.49975 12.5382V14.688C2.49975 14.8605 2.63965 15.0005 2.81223 15.0005C2.87079 15.0005 2.92817 14.984 2.97783 14.953L4.71953 13.865C5.60691 14.2044 6.54921 14.3775 7.49929 14.3756C11.5522 14.4555 14.906 11.2414 14.9985 7.18877C14.906 3.13606 11.5522 -0.077967 7.49929 0.00194678Z" fill="#2196F3"/><path d="M12.438 5.12661C12.3451 5.00199 12.1746 4.9647 12.0381 5.03911L8.78846 6.81081L6.76677 5.07721C6.6428 4.97094 6.45789 4.97799 6.34244 5.09347L2.59281 8.84308C2.47115 8.96548 2.47174 9.16333 2.59415 9.28498C2.69203 9.38226 2.8421 9.40386 2.96341 9.33808L6.21308 7.56636L8.23661 9.30058C8.36058 9.40686 8.54553 9.39981 8.66096 9.28431L12.4106 5.53467C12.5199 5.42438 12.5316 5.25057 12.438 5.12661Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_504_104869"><rect width="15" height="15" fill="white" transform="translate(0 0.000488281)"/></clipPath></defs></svg>
      )
    }
  }
};

export default Icon;
