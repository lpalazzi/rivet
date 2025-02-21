import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import { currentProfile, editActiveProfile } from "./profileSlice";
import { spectrum } from "../../utils";

const ProfileView = () => {
  const activeProfile = useSelector(currentProfile);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    if (activeProfile) {
      dispatch(editActiveProfile({}));
    }
  };

  if (!activeProfile) {
    return <p>No active selected</p>;
  }

  return (
    <Box
      sx={{
        width: "80vw",
        maxWidth: 300,
      }}
    >
      <h2
        style={{
          marginTop: 8,
          marginBottom: "1em",
        }}
      >
        Profile
      </h2>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "200px",
            aspectRatio: "1 / 1",

            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "100%",
            marginBottom: 2,
            backgroundImage: activeProfile.photo
              ? `url("${activeProfile.photo}")`
              : undefined,
            background: !activeProfile.photo ? spectrum : undefined,
          }}
        />
        <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          {activeProfile.first_name} {activeProfile.last_name}
        </p>
        <p>{activeProfile.email}</p>
        <p>{activeProfile.phone}</p>
        <p>
          {activeProfile.address}
          <br />
          {activeProfile.city}, {activeProfile.state} {activeProfile.zip}
        </p>
        <p>{activeProfile.notes}</p>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            variant="outlined"
            onClick={handleEditProfile}
            sx={{
              width: "100%",
              marginTop: "2em",
            }}
          >
            Edit profile
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export { ProfileView };
