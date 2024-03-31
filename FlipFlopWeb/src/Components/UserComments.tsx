"use client";

import { RoomProvider } from "/Users/adnankarim/Desktop/FlipFlop/FlipFlopWeb/liveblocks.config.ts";
import { Room } from "./Room";
import { ClientSideSuspense } from "@liveblocks/react";

function UserComments() {
  return (
    <RoomProvider id="my-room" initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => <Room />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default UserComments;