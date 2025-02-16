'use client';

import { LiveChatWidget } from "@livechat/widget-react";
const LiveChat = () => {
    return <LiveChatWidget license={process.env.NEXT_PUBLIC_LIVE_CHAT_LICENSE} />
};

export default LiveChat;
