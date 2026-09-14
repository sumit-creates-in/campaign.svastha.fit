import { useEffect, useMemo, useState } from "react";
import { detectPlatform, openChat } from "@/lib/chat";
import { InstagramGlyph, MessengerGlyph } from "./ChatGlyphs";

interface Props {
  /** Hide while a modal is open so it doesn't sit on top of the form. */
  hidden?: boolean;
}

export const ChatButton = ({ hidden }: Props) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const platform = useMemo(detectPlatform, []);

  // Only appear once the visitor is half way down the page — by then they are
  // reading properly, and the button isn't competing with the hero CTA.
  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setShow(false);
        return;
      }
      setShow(window.scrollY / scrollable >= 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = async () => {
    const didCopy = await openChat(platform);
    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

  if (hidden || !show) return null;

  const isFacebook = platform === "facebook";

  return (
    <div className="fixed bottom-24 right-4 z-30 flex flex-col items-end gap-2 md:bottom-6">
      {copied && (
        <div className="max-w-[210px] rounded-xl bg-gray-900 px-3 py-2 text-[11px] leading-snug text-white shadow-xl">
          Message copied — just paste it in the chat.
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        aria-label="Chat with us"
        className={`no-heartbeat flex items-center gap-2 rounded-full py-2.5 pl-3 pr-4 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105 ${
          isFacebook
            ? "bg-gradient-to-r from-[#0084FF] to-[#0064E0]"
            : "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
        }`}
      >
        {isFacebook ? (
          <MessengerGlyph className="h-6 w-6" />
        ) : (
          <InstagramGlyph className="h-6 w-6" />
        )}
        <span>Chat with us</span>
      </button>
    </div>
  );
};
