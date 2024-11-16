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
        <svg className={ style } width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#FBBC05" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      );
    }
    case "shopping-cart": {
      return (
        <svg className={ style } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.04999 2.05005H4.04999L6.70999 14.47C6.80757 14.9249 7.06066 15.3315 7.4257 15.6199C7.79074 15.9083 8.24489 16.0604 8.70999 16.05H18.49C18.9452 16.0493 19.3865 15.8933 19.741 15.6079C20.0956 15.3224 20.3421 14.9246 20.44 14.48L22.09 7.05005H5.11999" stroke="black" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    }
    case "app-sheet": {
      return (
        <svg className={ style } width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.6712 0.000854492H16.7136L13.9021 3.98675L12.2295 7.93707L16.7136 8.43531L21.3757 7.95486L24.8278 1.97601C25.326 1.1041 24.6854 0.000854492 23.6712 0.000854492Z" fill="#0060D9"/><path d="M0.182529 1.9938L3.08298 6.95839C3.43887 7.56339 4.07946 7.93707 4.79123 7.93707L12.2292 7.95486L16.7133 0.000854492H1.32136C0.307089 0.000854492 -0.333503 1.12189 0.182529 1.9938Z" fill="#4285F4"/><path d="M13.7058 21.3362C13.2076 22.2081 11.9442 22.2259 11.4282 21.354L8.54551 16.5139C8.18962 15.9089 8.17183 15.1438 8.52771 14.521L12.2467 7.93713L21.3751 7.95492L13.7058 21.3362Z" fill="#4285F4"/></svg>
      );
    }
    case "power-apps": {
      return (
        <svg className={ style } width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6771 23.9583C10.3818 23.9583 10.1006 23.8333 9.90264 23.6135L0.99847 13.7198C0.696387 13.3838 0.530762 12.9505 0.530762 12.4995C0.530762 12.0484 0.696908 11.6156 0.998991 11.2797L9.90264 1.38645C10.2979 0.946867 11.0563 0.946867 11.4516 1.38645L20.3563 11.2802C20.9813 11.975 20.9813 13.0245 20.3563 13.7193L11.4516 23.6135C11.2537 23.8333 10.9724 23.9583 10.6771 23.9583Z" fill="url(#paint0_linear_6_5134)"/><path opacity="0.05" d="M20.8228 12.5C20.8228 12.9375 20.6665 13.375 20.354 13.7188L12.3228 22.651L12.1457 22.8438L8.99463 19.3438C8.45817 18.7448 8.45817 17.849 8.99463 17.25L12.8332 12.9844C13.0832 12.7083 13.0832 12.2917 12.8332 12.0156L8.99463 7.75C8.45817 7.15104 8.45817 6.25521 8.99463 5.65625L12.1457 2.15625L12.3228 2.34896L20.354 11.2812C20.6665 11.625 20.8228 12.0625 20.8228 12.5Z" fill="black"/><path opacity="0.05" d="M20.8229 12.5C20.8229 12.9375 20.6667 13.375 20.3542 13.7188L12.3229 22.6511L9.1875 19.1667C8.73958 18.6719 8.73958 17.9219 9.1875 17.4271L13.026 13.1615C13.3646 12.7813 13.3646 12.2188 13.026 11.8386L9.1875 7.57296C8.73958 7.07817 8.73958 6.32817 9.1875 5.83337L12.3229 2.349L20.3542 11.2813C20.6667 11.625 20.8229 12.0625 20.8229 12.5Z" fill="black"/><path d="M14.3135 23.9583C14.0182 23.9583 13.7369 23.8333 13.539 23.6135L9.38066 18.9932C9.02389 18.5968 9.02441 17.9958 9.38066 17.5994L13.2197 13.3343C13.6479 12.8588 13.6479 12.1416 13.2197 11.6661L9.38066 7.401C9.02441 7.00465 9.02389 6.40361 9.38066 6.00725L13.539 1.38694C13.9343 0.947355 14.6926 0.947355 15.088 1.38694L23.9926 11.2807C24.6176 11.9755 24.6176 13.0244 23.9932 13.7198L15.0874 23.6135C14.89 23.8333 14.6088 23.9583 14.3135 23.9583Z" fill="url(#paint1_linear_6_5134)"/><path d="M19.7872 17.8766C19.4919 17.8766 19.2106 17.7516 19.0133 17.5318L15.582 13.7198C15.2794 13.3833 15.1132 12.9495 15.1138 12.4979C15.1138 12.0474 15.2804 11.6151 15.582 11.2797L19.0127 7.46824C19.4075 7.02865 20.1664 7.02865 20.5612 7.46824L23.9924 11.2802C24.6174 11.9761 24.6174 13.024 23.9929 13.7193L20.5612 17.5318C20.3643 17.7516 20.0825 17.8766 19.7872 17.8766Z" fill="url(#paint2_linear_6_5134)"/><defs><linearGradient id="paint0_linear_6_5134" x1="8.71774" y1="1.38489" x2="12.6396" y2="23.6281" gradientUnits="userSpaceOnUse"><stop offset="0.003" stopColor="#A33094"/><stop offset="0.998" stopColor="#6D246B"/></linearGradient><linearGradient id="paint1_linear_6_5134" x1="14.263" y1="1.0484" x2="18.1854" y2="23.2916" gradientUnits="userSpaceOnUse"><stop stopColor="#E288C5"/><stop offset="0.998" stopColor="#D76DBB"/></linearGradient><linearGradient id="paint2_linear_6_5134" x1="18.8679" y1="7.28334" x2="20.7096" y2="17.7302" gradientUnits="userSpaceOnUse"><stop offset="0.006" stopColor="#E9A0CB"/><stop offset="0.998" stopColor="#E48DC7"/></linearGradient></defs></svg>
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
        <svg className={style} width="24" stroke="currentColor" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    }
  }
};

export default Icon;
