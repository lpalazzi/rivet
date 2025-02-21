import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileLineItem } from "./ProfileLineItem";
import { profileList, setActiveProfile } from "./profileSlice";

const ProfileList = () => {
  const profiles = useSelector(profileList);
  const dispatch = useDispatch();

  function trySetProfile(data: number) {
    dispatch(setActiveProfile(data));
  }

  return (
    <Stack spacing={1} sx={{ textAlign: "left" }}>
      {profiles.length > 0 &&
        profiles.map((profile) => (
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .1)",
              cursor: "pointer",
            }}
            key={profile.id}
            onClick={() => trySetProfile(profile.id)}
          >
            <ProfileLineItem profile={profile} />
          </Box>
        ))}
    </Stack>
  );
};

export { ProfileList };
