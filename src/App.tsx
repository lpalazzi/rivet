import { useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ProfileList } from "./features/profile/ProfileList";
import { Status } from "./features/profile/Status";
import { ProfileModal } from "./features/profile/ProfileModal";
import { createNewProfile } from "./features/profile/profileSlice";

function App() {
  const dispatch = useDispatch();

  function handleClickAdd() {
    dispatch(createNewProfile({}));
  }

  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: "center" }}>
        <Box>
          <Box
            sx={{
              boxSizing: "border-box",
              width: "32em",
              padding: ".5em",
              margin: "0 auto",
              maxWidth: "100%",
              position: "absolute",
              left: 0,
              right: 0,
            }}
          >
            <IconButton
              sx={{ float: "right" }}
              onClick={() => handleClickAdd()}
            >
              <Add />
            </IconButton>
          </Box>
          <h1>Welcome to Rivet</h1>
        </Box>
        <Box
          sx={{
            width: "32em",
            boxSizing: "border-box",
            padding: ".5em",
            margin: "0 auto",
            maxWidth: "100%",
          }}
        >
          <ProfileList></ProfileList>
        </Box>
        <ProfileModal />
        <Status></Status>
      </header>
    </div>
  );
}

export default App;
