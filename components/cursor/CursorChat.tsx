import CursorSVG from "@/public/assets/CursorSVG";
import { CursorChatProps, CursorMode } from "@/types/type";

const CursorChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) => {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const message = e.target.value;
    updateMyPresence({ message });
    setCursorState({
      mode: CursorMode.Chat,
      message,
      previousMessage: null,
    });
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    console.log("enter", e.key);
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage:
          cursorState.mode === CursorMode.Chat
            ? cursorState.message
            : "",
        message: "",
      });
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  }

  return (
    <div
      className='absolute top-0 left-0'
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color='#000' />
          <div
            onKeyUp={(e) => {
              e.stopPropagation();
            }}
            className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]'
          >
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
            <input
              type='text'
              className='z-10 w-60 border-none outline-none bg-transparent text-white placeholder-blue-300 '
              autoFocus={true}
              placeholder={
                cursorState.previousMessage
                  ? ""
                  : "Type a message"
              }
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;
