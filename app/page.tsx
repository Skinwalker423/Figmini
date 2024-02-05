"use client";

import Live from "@/components/Live";

export default function Home() {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center text-center'>
      <h1 className='text-2xl text-white'>Figmini</h1>;
      <Live />
    </div>
  );
}
