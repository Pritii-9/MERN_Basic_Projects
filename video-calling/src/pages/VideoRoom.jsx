import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const VideoRoom = () => {
  const { roomID } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const appID = 528971881;
    const serverSecret = "6bc33bcb766448a3767e5e3d4bf0bd0d";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "priti"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: 'copy link',
          url: `http://localhost:5173/room/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCallGroupCall,
      },
    });
  }, [roomID]);

  return (
    <div>
      <div ref={containerRef} id="root" />
    </div>
  );
};

export default VideoRoom;
