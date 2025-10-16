import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/",
    label: "Asosiy",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="22"
        viewBox="0 0 25 22"
        fill="none"
      >
        <path
          d="M9.66797 20.207V13.8984C9.66797 13.6771 9.73633 13.498 9.87305 13.3613C10.0098 13.2246 10.1921 13.1562 10.4199 13.1562H14.5898C14.8177 13.1562 14.9967 13.2246 15.127 13.3613C15.2637 13.498 15.332 13.6771 15.332 13.8984V20.207H9.66797ZM1.67969 11.1055C1.41927 11.1055 1.21419 11.0273 1.06445 10.8711C0.914714 10.7083 0.839844 10.526 0.839844 10.3242C0.839844 10.0703 0.94401 9.85872 1.15234 9.68945L11.3281 1.14453C11.6927 0.832031 12.0833 0.675781 12.5 0.675781C12.9167 0.675781 13.3073 0.832031 13.6719 1.14453L23.8477 9.68945C24.056 9.85872 24.1602 10.0703 24.1602 10.3242C24.1602 10.526 24.0853 10.7083 23.9355 10.8711C23.7923 11.0273 23.5872 11.1055 23.3203 11.1055C23.1836 11.1055 23.0566 11.0729 22.9395 11.0078C22.8288 10.9427 22.7246 10.8711 22.627 10.793L12.8418 2.58008C12.7376 2.48893 12.6237 2.44336 12.5 2.44336C12.3763 2.44336 12.2624 2.48893 12.1582 2.58008L2.38281 10.793C2.27865 10.8711 2.16797 10.9427 2.05078 11.0078C1.9401 11.0729 1.81641 11.1055 1.67969 11.1055ZM18.8574 5.91992V3.58594C18.8574 3.37109 18.9225 3.20182 19.0527 3.07812C19.1829 2.94792 19.3522 2.88281 19.5605 2.88281H20.6055C20.8203 2.88281 20.9896 2.94792 21.1133 3.07812C21.2435 3.20182 21.3086 3.37109 21.3086 3.58594V7.99023L18.8574 5.91992ZM5.89844 21.2129C5.20182 21.2129 4.6582 21.0241 4.26758 20.6465C3.88346 20.2754 3.69141 19.7448 3.69141 19.0547V8.23438L5.26367 7.17969V18.6641C5.26367 18.9831 5.34505 19.224 5.50781 19.3867C5.67708 19.556 5.91797 19.6406 6.23047 19.6406H18.7793C19.0918 19.6406 19.3294 19.556 19.4922 19.3867C19.6549 19.224 19.7363 18.9831 19.7363 18.6641V7.16992L21.3086 8.23438V19.0547C21.3086 19.7383 21.1165 20.2689 20.7324 20.6465C20.3483 21.0241 19.8079 21.2129 19.1113 21.2129H5.89844Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    to: "/brends",
    label: "Brendlar",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M5 10.5H7C9 10.5 10 9.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H5C3 2.5 2 3.5 2 5.5V7.5C2 9.5 3 10.5 5 10.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 10.5H19C21 10.5 22 9.5 22 7.5V5.5C22 3.5 21 2.5 19 2.5H17C15 2.5 14 3.5 14 5.5V7.5C14 9.5 15 10.5 17 10.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 22.5H19C21 22.5 22 21.5 22 19.5V17.5C22 15.5 21 14.5 19 14.5H17C15 14.5 14 15.5 14 17.5V19.5C14 21.5 15 22.5 17 22.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 22.5H7C9 22.5 10 21.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H5C3 14.5 2 15.5 2 17.5V19.5C2 21.5 3 22.5 5 22.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: "/markets",
    label: "Bozorlik",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M8.5 14.75C8.5 16.67 10.08 18.25 12 18.25C13.92 18.25 15.5 16.67 15.5 14.75"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.80994 2.5L5.18994 6.13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.1899 2.5L18.8099 6.13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 8.34961C2 6.49961 2.99 6.34961 4.22 6.34961H19.78C21.01 6.34961 22 6.49961 22 8.34961C22 10.4996 21.01 10.3496 19.78 10.3496H4.22C2.99 10.3496 2 10.4996 2 8.34961Z"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M3.5 10.5L4.91 19.14C5.23 21.08 6 22.5 8.86 22.5H14.89C18 22.5 18.46 21.14 18.82 19.26L20.5 10.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/histories",
    label: "Tarix",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M8.5 14.75C8.5 16.67 10.08 18.25 12 18.25C13.92 18.25 15.5 16.67 15.5 14.75"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.80994 2.5L5.18994 6.13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.1899 2.5L18.8099 6.13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 8.34961C2 6.49961 2.99 6.34961 4.22 6.34961H19.78C21.01 6.34961 22 6.49961 22 8.34961C22 10.4996 21.01 10.3496 19.78 10.3496H4.22C2.99 10.3496 2 10.4996 2 8.34961Z"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M3.5 10.5L4.91 19.14C5.23 21.08 6 22.5 8.86 22.5H14.89C18 22.5 18.46 21.14 18.82 19.26L20.5 10.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/menu",
    label: "Menu",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M5 10.5H7C9 10.5 10 9.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H5C3 2.5 2 3.5 2 5.5V7.5C2 9.5 3 10.5 5 10.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 10.5H19C21 10.5 22 9.5 22 7.5V5.5C22 3.5 21 2.5 19 2.5H17C15 2.5 14 3.5 14 5.5V7.5C14 9.5 15 10.5 17 10.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 22.5H19C21 22.5 22 21.5 22 19.5V17.5C22 15.5 21 14.5 19 14.5H17C15 14.5 14 15.5 14 17.5V19.5C14 21.5 15 22.5 17 22.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 22.5H7C9 22.5 10 21.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H5C3 14.5 2 15.5 2 17.5V19.5C2 21.5 3 22.5 5 22.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    to: "/notifications",
    label: "Xabarnoma",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M12 6.94043V10.2704"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M12.0199 2.5C8.3399 2.5 5.3599 5.48 5.3599 9.16V11.26C5.3599 11.94 5.0799 12.96 4.7299 13.54L3.4599 15.66C2.6799 16.97 3.2199 18.43 4.6599 18.91C9.4399 20.5 14.6099 20.5 19.3899 18.91C20.7399 18.46 21.3199 16.88 20.5899 15.66L19.3199 13.54C18.9699 12.96 18.6899 11.93 18.6899 11.26V9.16C18.6799 5.5 15.6799 2.5 12.0199 2.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M15.3299 19.3203C15.3299 21.1503 13.8299 22.6503 11.9999 22.6503C11.0899 22.6503 10.2499 22.2703 9.64992 21.6703C9.04992 21.0703 8.66992 20.2303 8.66992 19.3203"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
      </svg>
    ),
  },
];

const SideBar = () => {
  return (
    <aside className="p-4 flex flex-row md:flex-col gap-4 bg-white rounded-2xl">
      {links.map(({ to, label, icon, svg }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => {
            const customActive =
              (to === "/" &&
                (location.pathname === "/" ||
                  location.pathname.startsWith("/sections"))) ||
              isActive;
            return `px-[12px] md:px-[16px] py-[18px] rounded-[12px] font-[500] flex flex-col items-center  flex-1 md:flex-none text-[14px] md:text-[16px] min-w-0  transition-all duration-200 ${
              customActive
                ? "bg-[#06B2B6] text-white"
                : "bg-[#F9F9F9] text-[#4B4B4B] hover:bg-[#06B2B6] hover:text-white"
            }`;
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-inherit">{svg || icon}</span>
            <span>{label}</span>
          </div>
        </NavLink>
      ))}
    </aside>
  );
};

export default SideBar;
