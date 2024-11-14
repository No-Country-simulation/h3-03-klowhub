import { IconTypes } from "./icon.types";

type IconProps = {
  name: IconTypes
  style?: string
}

const Icon = ({ name, style }: IconProps) => {
  switch (name) {
    case "star": {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#D9D9D9" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      )
    }
    case "rated-star": {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#FBBC05" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      )
    }
    case "shopping-cart": {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.04999 2.05005H4.04999L6.70999 14.47C6.80757 14.9249 7.06066 15.3315 7.4257 15.6199C7.79074 15.9083 8.24489 16.0604 8.70999 16.05H18.49C18.9452 16.0493 19.3865 15.8933 19.741 15.6079C20.0956 15.3224 20.3421 14.9246 20.44 14.48L22.09 7.05005H5.11999" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
      )
    }
    case "more-vertical": {
      return (
        <svg className={ style } width="24" stroke="currentColor" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
      )
    }
  }
};

export default Icon
