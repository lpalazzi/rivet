import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import {
  currentProfile,
  editError,
  isCreatingProfile,
  saveNewProfile,
  saveProfileUpdates,
  setActiveProfile,
} from "./profileSlice";
import { useState } from "react";
import { provinces, spectrum, states } from "../../utils";
import { AppDispatch } from "../../store";

const ProfileEdit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeProfile = useSelector(currentProfile);
  const isCreating = useSelector(isCreatingProfile);
  const error = useSelector(editError);

  const [profileEdits, setProfileEdits] = useState({
    first_name: activeProfile?.first_name || "",
    last_name: activeProfile?.last_name || "",
    phone: activeProfile?.phone || "",
    email: activeProfile?.email || "",
    address: activeProfile?.address || "",
    city: activeProfile?.city || "",
    state: activeProfile?.state || "",
    zip: activeProfile?.zip || "",
    photo: activeProfile?.photo || "",
    notes: activeProfile?.notes || "",
  });

  const handleSubmit = () => {
    if (!isCreating && activeProfile) {
      const updatedProfile = { ...profileEdits, id: activeProfile.id };
      dispatch(saveProfileUpdates(updatedProfile));
    } else if (isCreating) {
      dispatch(saveNewProfile(profileEdits));
    }
  };

  return (
    <Box
      sx={{
        width: "80vw",
        maxWidth: 500,
      }}
    >
      <h2
        style={{
          marginTop: 8,
          marginBottom: "1em",
        }}
      >
        Edit Profile
      </h2>

      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: "140px",
              aspectRatio: "1 / 1",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 1,
              marginBottom: 2,
              backgroundImage: profileEdits.photo
                ? `url("${profileEdits.photo}")`
                : undefined,
              background: !profileEdits.photo ? spectrum : undefined,
            }}
          />
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="first_name">Photo URL</InputLabel>
            <Input
              id="photo"
              value={profileEdits.photo}
              sx={{ width: "100%" }}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, photo: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="first_name">First Name</InputLabel>
            <Input
              id="first_name"
              value={profileEdits.first_name}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, first_name: e.target.value })
              }
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="last_name">Last Name</InputLabel>
            <Input
              id="last_name"
              value={profileEdits.last_name}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, last_name: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={profileEdits.email}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="phone">Phone Number</InputLabel>
            <Input
              id="phone"
              value={profileEdits.phone}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, phone: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="address">Address</InputLabel>
          <Input
            id="address"
            value={profileEdits.address}
            onChange={(e) =>
              setProfileEdits({ ...profileEdits, address: e.target.value })
            }
          />
        </FormControl>
        <Stack direction="row" spacing={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="city">City</InputLabel>
            <Input
              id="city"
              value={profileEdits.city}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, city: e.target.value })
              }
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="state">State/Province</InputLabel>
            <Select
              defaultValue=""
              id="state"
              label="State/Province"
              value={profileEdits.state}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, state: e.target.value })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader>United States</ListSubheader>
              {states.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {value} - {label}
                </MenuItem>
              ))}
              <ListSubheader>Canada</ListSubheader>
              {provinces.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {value} - {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="zip">Zip/Postal Code</InputLabel>
            <Input
              id="zip"
              value={profileEdits.zip}
              onChange={(e) =>
                setProfileEdits({ ...profileEdits, zip: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="notes">Notes</InputLabel>
          <Input
            id="notes"
            multiline
            value={profileEdits.notes}
            onChange={(e) =>
              setProfileEdits({ ...profileEdits, notes: e.target.value })
            }
          />
        </FormControl>
      </Stack>

      <Stack
        direction="row"
        justifyContent="stretch"
        spacing={2}
        sx={{ width: "100%", marginTop: 2 }}
      >
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={() => {
            dispatch(setActiveProfile(activeProfile?.id || null));
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Stack>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </Box>
  );
};

export { ProfileEdit };
