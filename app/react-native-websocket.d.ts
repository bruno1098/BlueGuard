declare module 'react-native-websocket' {
    import { Component } from 'react';
    interface WebSocketProps {
      url: string;
      onOpen?: () => void;
      onMessage?: (event: { data: any }) => void;
      onError?: (error: any) => void;
      onClose?: () => void;
    }
    export default class WebSocket extends Component<WebSocketProps> {}
  }
  