import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import { activeProfile, editProfileSelected } from "./profileSlice";
import { spectrum } from "../../utils";

const ProfileView = () => {
  const profile = useSelector(activeProfile);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    if (profile) {
      dispatch(editProfileSelected({}));
    }
  };

  if (!profile) {
    return <p>No profile selected</p>;
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
            backgroundImage: profile.photo
              ? `url("${profile.photo}")`
              : undefined,
            background: !profile.photo ? spectrum : undefined,
          }}
        />
        <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          {profile.first_name} {profile.last_name}
        </p>
        <p>{profile.email}</p>
        <p>{profile.phone}</p>
        <p>
          {profile.address}
          <br />
          {profile.city}, {profile.state} {profile.zip}
        </p>
        <p>{profile.notes}</p>
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
