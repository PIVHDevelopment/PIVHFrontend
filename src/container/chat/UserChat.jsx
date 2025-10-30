import React, { useEffect, useState, useRef } from "react";
import Index from "../Index";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function UserChat() {
  const { recieverId: recieverParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const recieverId = location.state?.recieverId || recieverParam;

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  const getIdString = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val?._id || val?.$oid || "";
    return String(val);
  };

  useEffect(() => {
    if (!recieverId) return;
    fetchMessages();
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(fetchMessages, 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [recieverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_CHAT_MESSAGES}/${getIdString(
          userData?._id
        )}/${recieverId}`
      );
      if (res?.data?.status === 200) setMessages(res.data.data || []);
    } catch (err) {
      // ignore polling errors
    }
  };

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || !recieverId) return;
    setSending(true);
    try {
      const res = await Index.DataService.post(Index.Api.ADD_CHAT, {
        senderId: getIdString(userData?._id),
        recieverId,
        message: trimmed,
      });
      if (res?.data?.status === 200) {
        setMessages((prev) => [...prev, res.data.data]);
        setMessage("");
        fetchMessages();
      } else {
        Index.toasterError(res?.data?.message || "Failed to send message");
      }
    } catch (err) {
      Index.toasterError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-container">
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button className="back-btn" onClick={() => navigate("/chat")}>
            <img src={Index.back} alt="Back" />
          </button>
        </Index.Box>
        <div className="app-icon">
          <img src={Index.logo} alt="logo" className="logo-header" />
        </div>
        <div className="header-right" />
      </header>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 140px)",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
          Chat
        </Typography>

        <Box className="chat-window" sx={{ flex: 1, overflowY: "auto", px: 2 }}>
          <Box className="chat-messages" sx={{ py: 1 }}>
            {messages.map((m) => {
              const mid = m._id || `${m.senderId}-${m.createdAt}-${m.message}`;
              const msgSenderId = getIdString(m.senderId);
              const isMe = msgSenderId === getIdString(userData?._id);
              return (
                <Box
                  key={mid}
                  sx={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      background: isMe ? "#1976d2" : "#f1f1f1",
                      color: isMe ? "white" : "black",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      wordWrap: "break-word",
                    }}
                  >
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {m.message}
                    </Typography>

                    {/* Optional: show username above received messages */}
                    {!isMe && (
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#555",
                          mb: 0.3,
                        }}
                      >
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}

            <div ref={messagesEndRef} />
          </Box>
        </Box>

        <Box
          className="chat-input"
          sx={{ display: "flex", gap: 1, p: 2, pt: 1 }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={sending}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={sending || !message.trim()}
          >
            {sending ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default UserChat;
