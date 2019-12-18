let ws = new WebSocket("ws://localhost:8081");

ws.onmessage = message => console.log(message);
