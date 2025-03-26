import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const ws = new WebSocket("ws://localhost:8000");


export default function Chat({ username }: { username: string }) {
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  
    axios.get("http://localhost:8000/messages").then(({ data }) => setMessages(data.reverse()));

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(msg)
      setMessages((prev) => [...prev, msg]);
    };
  }, []);

  const sendMessage = () => {
    if (!message) return;
    ws.send(JSON.stringify({ username, message }));
    setMessage("");
  };

  return (
    <Box
      sx={{
        width: "500px",
        mx: "auto",
        mt: 4,
        p: 2,
        border: "1px solid gray",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: 3, 
        display: "flex",
        flexDirection: "column",
        height: "500px", 
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Chat Room
      </Typography>


      <Box
        ref={chatBoxRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          p: 1,
          border: "1px solid gray",
          borderRadius: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <Typography key={idx} sx={{ mb: 1 }}>
            <b>{msg.username}:</b> {msg.message}
          </Typography>
        ))}
      </Box>

      {/* Input field and send button */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          sx={{
            mb: 1, // margin-bottom to separate from the button
            backgroundColor: "#fff",
            borderRadius: 1,
          }}
        />
        <Button
          fullWidth
          sx={{ mt: 1, backgroundColor: "#007bff", color: "#fff", "&:hover": { backgroundColor: "#0056b3" } }}
          onClick={sendMessage}
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
