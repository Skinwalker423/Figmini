import {
  useMyPresence,
  useOthers,
} from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback } from "react";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] =
    useMyPresence() as any;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      const x =
        event.clientX -
        event.currentTarget.getBoundingClientRect().x;
      const y =
        event.clientY -
        event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    },
    [cursor]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const x =
        event.clientX -
        event.currentTarget.getBoundingClientRect().x;
      const y =
        event.clientY -
        event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    },
    [cursor]
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      updateMyPresence({ cursor: null, message: null });
    },
    []
  );

  return (
    <div
      className='h-[100vh] w-full flex justify-center items-center text-center'
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      <h1 className='text-2xl text-white'>Figmini</h1>;
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
