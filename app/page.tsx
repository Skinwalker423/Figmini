"use client";

import { fabric } from "fabric";

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import LeftSidebar from "@/components/LeftSidebar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import {
  handleCanvasMouseDown,
  handleResize,
  initializeFabric,
} from "@/lib/canvas";
import { ActiveElement } from "@/types/type";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(
    null
  );
  const selectedShapeRef = useRef<string | null>(
    "triangle"
  );

  const [activeElement, setActiveElement] =
    useState<ActiveElement>({
      name: "",
      value: "",
      icon: "",
    });

  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element);
    selectedShapeRef.current = element?.value || null;
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {};

  useEffect(() => {
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        canvas,
        isDrawing,
        options,
        selectedShapeRef,
        shapeRef,
      });
    });

    window.addEventListener("resize", () => {
      handleResize({ canvas: fabricRef.current });
    });
  }, []);

  return (
    <main className='h-screen overflow-hidden'>
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
        imageInputRef={imageInputRef}
        handleImageUpload={handleImageUpload}
      />
      <section className='flex h-full flex-row'>
        <LeftSidebar allShapes={[]} />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}
