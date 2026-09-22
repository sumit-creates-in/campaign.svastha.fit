/** Yellow strip shown only in test mode (?test=1), so a test run is never mistaken for live. */
export const TestModeBar = ({ note }: { note: string }) => (
  <div className="sticky top-0 z-[60] w-full bg-yellow-300 px-4 py-2 text-center text-xs font-semibold text-yellow-950 shadow">
    TEST MODE · {note}
  </div>
);
