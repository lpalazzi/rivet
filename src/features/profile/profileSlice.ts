import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile, ProfileState, makeFakeUserList } from "./profileUtils";
import { RootState } from "../../store";
import { isArray } from "lodash";

const initialState: ProfileState = {
  profiles: [],
  activeProfile: null,
  activeProfileStatus: null,
  profileFormError: null,
};

function returnFakeProfiles() {
  return makeFakeUserList();
}

async function returnNetworkProfiles() {
  const profiles = await fetch(
    "https://codechallenge.rivet.work/api/v1/profiles",
    {
      headers: {
        token: process.env.REACT_APP_API_TOKEN || "",
      },
    }
  ).then((response) => response.json());

  if (isArray(profiles)) {
    return profiles as Profile[];
  }
  return [profiles];
}

export const fetchProfiles = createAsyncThunk("profiles/fetchProfiles", () => {
  // return returnFakeProfiles();
  return returnNetworkProfiles();
});

export const editProfileSubmitted = createAsyncThunk(
  "profiles/updateProfileSubmitted",
  async (profile: Profile) => {
    return fetch(
      `https://codechallenge.rivet.work/api/v1/profile/${profile.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: process.env.REACT_APP_API_TOKEN || "",
        },
        body: JSON.stringify(profile),
      }
    ).then((response) => response.json());
  }
);

export const createProfileSubmitted = createAsyncThunk(
  "profiles/createProfileSubmitted",
  async (profile: Omit<Profile, "id">) => {
    return fetch(`https://codechallenge.rivet.work/api/v1/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: process.env.REACT_APP_API_TOKEN || "",
      },
      body: JSON.stringify(profile),
    }).then((response) => response.json());
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    profileSelected: (state, action) => {
      const id = action.payload;
      const found = state.profiles.find((item) => item.id == id);
      return {
        ...state,
        activeProfile: found || null,
        activeProfileStatus: 'viewing',
        profileFormError: null
      };
    },
    editProfileSelected: (state, action) => {
      return {
        ...state,
        activeProfileStatus: 'editing',
        profileFormError: null,
      }
    },
    createProfileSelected: (state, action) => {
      return {
        ...state,
        activeProfile: null,
        activeProfileStatus: 'creating',
        profileFormError: null,
      }
    },
    profileFormCancelled: (state, action) => {
      return {
        ...state,
        activeProfileStatus: state.activeProfile ? 'viewing' : null,
        profileFormError: null
      }
    },
    profileModalClosed: (state, action) => {
      return {
        ...state,
        activeProfile: null,
        activeProfileStatus: null,
        profileFormError: null
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload,
      };
    });
    builder.addCase(editProfileSubmitted.fulfilled, (state, action) => {
      if (!action.payload.id) {
        return {
          ...state,
          profileFormError: `Profile update failed: ${JSON.stringify(action.payload)}`,
        };
      }
      return {
        ...state,
        profiles: state.profiles.map((profile) => {
          if (profile.id === action.payload.id) {
            return action.payload;
          }
          return profile;
        }),
        activeProfile: action.payload,
        activeProfileStatus: 'viewing',
        profileFormError: null
      };
    });
    builder.addCase(createProfileSubmitted.fulfilled, (state, action) => {
      if (!action.payload.id) {
        return {
          ...state,
          profileFormError: `Profile creation failed: ${JSON.stringify(
            action.payload
          )}`,
        };
      }
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        activeProfile: action.payload,
        activeProfileStatus: 'viewing',
        profileFormError: null
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { profileSelected, editProfileSelected, createProfileSelected, profileModalClosed, profileFormCancelled } =
  profileSlice.actions;
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) =>
  state.profile.profiles.length as number;
export const activeProfile = (state: RootState) => state.profile.activeProfile;
export const activeProfileStatus = (state: RootState) => state.profile.activeProfileStatus;
export const profileFormError = (state: RootState) => state.profile.profileFormError;

export default profileSlice.reducer;
