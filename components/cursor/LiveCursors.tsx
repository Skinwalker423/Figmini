import { LiveCursorProps } from "@/types/type";
import Cursor from "./Cursor";
import { COLORS } from "@/constants";

const LiveCursors = ({ others }: LiveCursorProps) => {
  return others.map(({ presence, connectionId }) => {
    if (!presence?.cursor) return null;
    return (
      <Cursor
        color={COLORS[Number(connectionId) % COLORS.length]}
        key={connectionId}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence?.message}
      />
    );
  });
};

export default LiveCursors;
