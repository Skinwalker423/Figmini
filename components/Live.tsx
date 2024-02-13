"use client";

import {
  useMyPresence,
  useOthers,
  useEventListener,
  useBroadcastEvent,
} from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback, useEffect, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import {
  CursorMode,
  CursorState,
  Reaction,
  ReactionEvent,
} from "@/types/type";
import useInterval from "@/hooks/useInterval";
import ReactionSelector from "./reaction/ReactionSelector";
import FlyingReaction from "./reaction/FlyingReaction";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
};

const Live = ({ canvasRef }: Props) => {
  const others = useOthers();
  const broadcast = useBroadcastEvent();
  const [{ cursor }, updateMyPresence] =
    useMyPresence() as any;
  const [cursorState, setCursorState] =
    useState<CursorState>({
      mode: CursorMode.Hidden,
    });
  const [reactions, setReactions] = useState<Reaction[]>(
    []
  );

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter(
        (reaction) => reaction.timestamp > Date.now() - 4000
      )
    );
  }, 1000);
  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 100);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      if (
        cursor == null ||
        cursorState.mode !== CursorMode.ReactionSelector
      ) {
        const x =
          event.clientX -
          event.currentTarget.getBoundingClientRect().x;
        const y =
          event.clientY -
          event.currentTarget.getBoundingClientRect().y;
        updateMyPresence({ cursor: { x, y } });
      }
    },
    []
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
      setCursorState((state) =>
        state.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      setCursorState({ mode: CursorMode.Hidden });
      updateMyPresence({ cursor: null, message: null });
    },
    []
  );
  const handleOnPointerUp = useCallback(
    (event: React.PointerEvent) => {
      setCursorState((state) =>
        state.mode === CursorMode.Reaction
          ? { ...state, isPressed: false }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({
          mode: CursorMode.Hidden,
        });
      } else if (e.key === "e") {
        setCursorState({
          mode: CursorMode.ReactionSelector,
        });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence, cursorState.mode]);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  const setReactionsOptimized = useCallback(
    (reaction: string) => {
      setCursorState({
        mode: CursorMode.Reaction,
        reaction,
        isPressed: false,
      });
    },
    []
  );

  return (
    <div
      id='canvas'
      className='h-[100vh] w-full flex justify-center items-center text-center'
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handleOnPointerUp}
    >
      <h1 className='text-2xl text-white'>Figmini</h1>;
      <canvas ref={canvasRef}></canvas>
      {reactions.map((reaction) => {
        return (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        );
      })}
      {cursor && (
        <>
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
          {cursorState.mode ===
            CursorMode.ReactionSelector && (
            <ReactionSelector
              setReaction={setReactionsOptimized}
            />
          )}
        </>
      )}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
