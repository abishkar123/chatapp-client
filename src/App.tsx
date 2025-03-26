import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Chat from "./chatpage/chat";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      {!joined ? (
        <>
          <TextField
            label="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            onClick={() => setJoined(true)}
            disabled={!username}
            variant="contained"
            sx={{ ml: 1 }}
          >
            Join
          </Button>
        </>
      ) : (
        <Chat username={username} />
      )}
    </Box>
  );
};

export default App;
