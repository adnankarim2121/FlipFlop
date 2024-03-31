import { useThreads } from "/Users/adnankarim/Desktop/FlipFlop/FlipFlopWeb/liveblocks.config.ts";
import { Composer, Thread } from "@liveblocks/react-comments";
import Header from "./Header";

function Room() {
  const { threads } = useThreads();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
      <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
        <Header/>
      </div>
    </div>
  );
}

export default Room;
