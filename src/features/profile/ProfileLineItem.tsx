import { Box, Stack } from "@mui/material";
import { Profile } from "./profileUtils";
import { spectrum } from "../../utils";

type ProfileLineItemArgs = {
  profile: Profile;
};

const ProfileLineItem = ({ profile }: ProfileLineItemArgs) => {
  const hasPhoto = !!profile.photo;

  return (
    <Stack direction={"row"} spacing={1}>
      {hasPhoto ? (
        <Box
          sx={{
            width: "5em",
            height: "5em",
            backgroundImage: `url("${profile.photo}")`,
            backgroundSize: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "5em",
            height: "5em",
            background: spectrum,
          }}
        ></Box>
      )}
      <Stack spacing={1} style={{ padding: ".5em" }}>
        <Box>
          <h3 style={{ margin: 0 }}>
            {profile.first_name} {profile.last_name}
          </h3>
        </Box>
        <Box>
          {profile.email} - {profile.phone}{" "}
        </Box>
      </Stack>
    </Stack>
  );
};

export { ProfileLineItem };
