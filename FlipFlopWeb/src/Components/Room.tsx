"use client";

import { useThreads } from "/Users/adnankarim/Desktop/FlipFlop/FlipFlopWeb/liveblocks.config.ts";
import { Composer, Thread } from "@liveblocks/react-comments";

export function Room() {
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
}