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
  activeProfile,
  activeProfileStatus,
  profileFormError,
  editProfileSubmitted,
  createProfileSubmitted,
  profileFormCancelled
} from "./profileSlice";
import { useState } from "react";
import { provinces, spectrum, states } from "../../utils";
import { AppDispatch } from "../../store";

const ProfileEdit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(activeProfile);
  const profileStatus = useSelector(activeProfileStatus);
  const error = useSelector(profileFormError);

  const [profileEdits, setProfileEdits] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    zip: profile?.zip || "",
    photo: profile?.photo || "",
    notes: profile?.notes || "",
  });

  const handleSubmit = () => {
    if (profile && profileStatus === 'editing') {
      dispatch(editProfileSubmitted({ ...profileEdits, id: profile.id }));
    } else if (profileStatus === 'creating') {
      dispatch(createProfileSubmitted(profileEdits));
    }
  };

  const handleCancel = () => {
    dispatch(profileFormCancelled({}));
  }

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
          onClick={handleCancel}
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
