import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import homeimg from "../assets/icons/home.svg";
import homemobimg from "../assets/icons/home-mob.svg";
import homeactiveimg from "../assets/icons/home-active.svg";
import brendimg from "../assets/icons/menu.svg";
import brendmobimg from "../assets/icons/menu-mob.svg";
import brendactiveimg from "../assets/icons/menu-active.svg";
import historyimg from "../assets/icons/history.svg";
import historymobimg from "../assets/icons/history-mob.svg";
import historyactiveimg from "../assets/icons/history-active.svg";
import notimg from "../assets/icons/not.svg";
import notmobimg from "../assets/icons/not-active.svg";
import notactiveimg from "../assets/icons/not-active.svg";
import marketimg from "../assets/icons/market.svg";
import marketmobimg from "../assets/icons/market-mob.svg";
import marketactiveimg from "../assets/icons/market-active.svg";

const SideBar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    {
      to: "/",
      label: t("sidebar.home"),
      svg: homeimg,
      svgMob: homemobimg,
      svgActive: homeactiveimg,
    },
    {
      to: "/brends",
      label: t("sidebar.brands"),
      svg: brendimg,
      svgMob: brendmobimg,
      svgActive: brendactiveimg,
    },
    {
      to: "/markets",
      label: t("sidebar.markets"),
      svg: marketimg,
      svgMob: marketmobimg,
      svgActive: marketactiveimg,
    },
    {
      to: "/histories",
      label: t("sidebar.histories"),
      svg: historyimg,
      svgMob: historymobimg,
      svgActive: historyactiveimg,
    },
    {
      to: "/menu",
      label: t("sidebar.menu"),
      svg: brendimg,
      svgMob: brendmobimg,
      svgActive: brendactiveimg,
    },
    {
      to: "/notifications",
      label: t("sidebar.notifications"),
      svg: notimg,
      svgMob: notmobimg,
      svgActive: notactiveimg,
    },
  ];

  return (
    <aside className="p-0 sm:p-4 flex flex-row md:flex-col gap-0 sm:gap-4 bg-white rounded-2xl">
      {links.map(({ to, label, svg, svgActive, svgMob }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => {
            const customActive =
              (to === "/" &&
                (location.pathname === "/" ||
                  location.pathname.startsWith("/sections"))) ||
              isActive;

            return `group px-[8px] sm:px-[12px] md:px-[16px] py-[18px] rounded-[12px] font-[500] flex flex-col items-center flex-1 md:flex-none text-[16px] sm:text-[14px] md:text-[16px] min-w-0 transition-all duration-200 ${
              customActive
                ? "sm:bg-[#06B2B6] text-[#06B2B6] sm:text-white"
                : "sm:bg-[#F9F9F9] text-[#4B4B4B] hover:md:bg-[#06B2B6] hover:md:text-white"
            } ${to === "/notifications" ? "hidden md:block" : ""}`;
          }}
        >
          {({ isActive }) => {
            const isHovered =
              location.pathname === to ||
              (to === "/" &&
                (location.pathname === "/" ||
                  location.pathname.startsWith("/sections")));
            return (
              <div className="flex flex-col items-center ">
                <img
                  src={isActive || isHovered ? svgActive : svg}
                  alt={label}
                  className="hidden md:inline group-hover:hidden w-[24px] h-[24px]"
                />
                <img
                  src={isActive || isHovered ? svgMob : svg}
                  alt={label}
                  className="block md:hidden group-hover:md:hidden w-[24px] h-[24px]"
                />
                <img
                  src={svgActive}
                  alt={label}
                  className="hidden group-hover:md:block w-[24px] h-[24px]"
                />
                <span>{label}</span>
              </div>
            );
          }}
        </NavLink>
      ))}
    </aside>
  );
};

export default SideBar;
