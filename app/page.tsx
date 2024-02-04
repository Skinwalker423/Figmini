import Image from "next/image";
import { Room } from "./Room";
import { CollaborativeApp } from "./CollaborativeApp";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <Room>
        <CollaborativeApp />
      </Room>
    </main>
  );
}
