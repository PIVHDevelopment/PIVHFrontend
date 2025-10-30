import React, { useEffect, useState } from "react";
import Index from "../Index";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";

function Chat() {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));

  const [chatUsers, setChatUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openUserDialog, setOpenUserDialog] = useState(false);

  useEffect(() => {
    fetchChatUsers();
  }, []);

  const fetchChatUsers = async () => {
    try {
      const res = await Index.DataService.get(`${Index.Api.GET_CHAT_USERS}/${userData._id}`);
      if (res?.data?.status === 200) setChatUsers(res.data.data);
      else Index.toasterError(res?.data?.message);
    } catch (err) {
      Index.toasterError(t("somethingWentWrong"));
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await Index.DataService.get(Index.Api.GET_ALL_USER);
      const status = res?.data?.status;
      const users = res?.data?.data || [];

      const normalizeId = (u) => {
        const rawId =
          typeof u._id === "object" ? u._id?.$oid || u._id?.toString?.() : u._id;
        return { ...u, _id: rawId };
      };

      if (status === 200 || status === 201) {
        const filtered = users.map(normalizeId).filter((u) => u._id !== userData._id);
        setUserList(filtered);
        setFilteredUsers(filtered); 
        setOpenUserDialog(true);
        return;
      }

      Index.toasterError(res?.data?.message || t("failedToLoadUsers"));
    } catch (err) {
      Index.toasterError(t("failedToLoadUsers"));
    }
  };

  // search only inside popup
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = userList.filter(
      (u) =>
        (u.userName && u.userName.toLowerCase().includes(value)) ||
        (u.name && u.name.toLowerCase().includes(value))
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button className="back-btn" onClick={() => navigate("/home")}>
            <img src={Index.back} alt="Back" />
          </button>
        </Index.Box>
        <div className="app-icon">
          <img src={Index.logo} alt="logo" className="logo-header" />
        </div>
        {/* Add Chat Button (opens popup with search) */}
        <button
          className="icon-btn"
          onClick={fetchAllUsers}
          type="button"
          style={{
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
          }}
          aria-label="Add Chat"
        >
          <img src={Index.Plusadd} alt="Add Chat" />
        </button>
      </header>

      {/* CHAT LIST */}
      <Box sx={{ mt: 2, px: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {t("Chat List")}
        </Typography>
        <Box sx={{ maxWidth: 640, mx: "auto", width: "100%" }}>
          {chatUsers.length === 0 ? (
            <Typography sx={{ mt: 3, textAlign: "center" }}>
              {t("No chats yet")}
            </Typography>
          ) : (
            <List
              sx={{
                mt: 1,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              {chatUsers.map((user, idx) => (
                <React.Fragment key={user._id}>
                  <ListItemButton
                    onClick={() =>
                      navigate(`/user-chat/${user._id}`, {
                        state: { recieverId: user._id },
                      })
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={user.profilePic || Index.defaultAvatar}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ color: "black" }}
                      primary={user.userName || user.name || t("Unknown User")}
                    />
                  </ListItemButton>
                  {idx < chatUsers.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Box>

      {/* Add Chat User Dialog (with search inside) */}
      <Dialog
        open={openUserDialog}
        onClose={() => setOpenUserDialog(false)}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "#6ec6f0",
            boxShadow: 4,
            maxWidth: "480px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {t("Select User to Chat")}
        </DialogTitle>

        {/* Search Bar inside Dialog */}
        <Box sx={{ px: 2, pb: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search user..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#1976d2" },
              },
            }}
          />
        </Box>

        <Box sx={{ px: 0, pb: 2 }}>
          <List
            sx={{
              mt: 1,
              px: 0,
              bgcolor: "transparent",
              borderRadius: 2,
              boxShadow: 0,
              overflow: "hidden",
              width: "100%",
            }}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, idx) => (
                <React.Fragment key={u._id}>
                  <ListItemButton
                    onClick={() =>
                      navigate(`/user-chat/${u._id}`, {
                        state: { recieverId: u._id },
                      })
                    }
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: 2,
                      mx: 2,
                      mb: 1,
                      alignItems: "center",
                      boxShadow: 1,
                      "&:hover": { bgcolor: "#F3F3F7" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={u.profilePic || Index.defaultAvatar}
                        sx={{
                          width: 54,
                          height: 54,
                          marginRight: 2,
                          border: "2px solid #eee",
                          bgcolor: "#E9ECEF",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={u.userName || u.name || t("Unknown User")}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        color: "#24272F",
                      }}
                    />
                  </ListItemButton>
                  {idx < filteredUsers.length - 1 && (
                    <Divider component="li" sx={{ mx: 3 }} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography
                sx={{ textAlign: "center", py: 2, color: "white" }}
              >
                {t("No users found")}
              </Typography>
            )}
          </List>
        </Box>
      </Dialog>
    </div>
  );
}

export default Chat;
