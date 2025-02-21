import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  currentProfile,
  isCreatingProfile,
  isEditingProfile,
  setActiveProfile,
} from "./profileSlice";
import { ProfileView } from "./ProfileView";
import { ProfileEdit } from "./ProfileEdit";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const activeProfile = useSelector(currentProfile);
  const isEditing = useSelector(isEditingProfile);
  const isCreating = useSelector(isCreatingProfile);

  const handleCloseModal = () => {
    dispatch(setActiveProfile(null));
  };

  return (
    <Modal open={!!activeProfile || isCreating} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          backgroundColor: "white",
          borderRadius: "4px",
          p: 4,
        }}
      >
        <IconButton
          sx={{ float: "right" }}
          onClick={() => {
            dispatch(setActiveProfile(null));
          }}
        >
          <Close />
        </IconButton>
        {isEditing || isCreating ? <ProfileEdit /> : <ProfileView />}
      </Box>
    </Modal>
  );
};

export { ProfileModal };
