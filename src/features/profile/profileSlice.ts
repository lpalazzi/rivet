import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile, ProfileState, makeFakeUserList } from "./profileUtils";
import { RootState } from "../../store";
import { isArray } from "lodash";

const initialState = {
  profiles: [],
  inFocus: null,
  isEditing: false,
  isCreating: false,
  editError: null,
} as ProfileState;

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

export const saveProfileUpdates = createAsyncThunk(
  "profiles/saveProfileUpdates",
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

export const saveNewProfile = createAsyncThunk(
  "profiles/saveNewProfile",
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
    setActiveProfile: (state, action) => {
      const id = action.payload;
      const found = state.profiles.find((item) => item.id == id);
      return {
        ...state,
        inFocus: found || null,
        isEditing: false,
        isCreating: false,
      };
    },
    editActiveProfile: (state, action) => {
      return {
        ...state,
        isEditing: state.inFocus ? true : false,
      };
    },
    createNewProfile: (state, action) => {
      return {
        ...state,
        isCreating: true,
        inFocus: null,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload,
      };
    });
    builder.addCase(saveProfileUpdates.fulfilled, (state, action) => {
      if (!action.payload.id) {
        return {
          ...state,
          editError: `Profile update failed: ${JSON.stringify(action.payload)}`,
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
        inFocus: action.payload,
        isEditing: false,
      };
    });
    builder.addCase(saveNewProfile.fulfilled, (state, action) => {
      if (!action.payload.id) {
        return {
          ...state,
          editError: `Profile creation failed: ${JSON.stringify(
            action.payload
          )}`,
        };
      }
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        inFocus: action.payload,
        isCreating: false,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveProfile, editActiveProfile, createNewProfile } =
  profileSlice.actions;
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) =>
  state.profile.profiles.length as number;
export const currentProfile = (state: RootState) => state.profile.inFocus;
export const isEditingProfile = (state: RootState) => state.profile.isEditing;
export const isCreatingProfile = (state: RootState) => state.profile.isCreating;
export const editError = (state: RootState) => state.profile.editError;

export default profileSlice.reducer;
