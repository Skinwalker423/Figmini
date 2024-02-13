"use client";

import Image from "next/image";
import { memo } from "react";

import { navElements } from "@/constants";
import { ActiveElement, NavbarProps } from "@/types/type";
import ShapesMenu from "./ShapesMenu";

import { ActiveUsers } from "./users/ActiveUsers";
import { NewThread } from "./comments/NewThread";
import { Button } from "./ui/button";

const Navbar = ({ activeElement }: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some(
        (val) => val?.value === activeElement?.value
      ));

  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
      <Image
        src='/assets/logo.svg'
        alt='FigPro Logo'
        width={58}
        height={20}
      />
      <ul className='flex flex-row justify-between gap-2 w-1/2 items-center'>
        {navElements.map((item: ActiveElement | any) => {
          return (
            <li key={item.name}>
              {Array.isArray(item.value) ? (
                <ShapesMenu
                  item={item}
                  activeElement={isActive}
                />
              ) : item.value === "comments" ? (
                <NewThread>{item.value}</NewThread>
              ) : (
                <Button>{item.value}</Button>
              )}
            </li>
          );
        })}
      </ul>
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) =>
    prevProps.activeElement === nextProps.activeElement
);
