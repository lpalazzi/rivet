import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  activeProfile,
  activeProfileStatus,
  profileModalClosed,
} from "./profileSlice";
import { ProfileView } from "./ProfileView";
import { ProfileEdit } from "./ProfileEdit";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const profile = useSelector(activeProfile);
  const profileStatus = useSelector(activeProfileStatus);

  const handleCloseModal = () => {
    dispatch(profileModalClosed({}));
  };

  return (
    <Modal open={!!profile || profileStatus === 'creating'} onClose={handleCloseModal}>
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
          onClick={handleCloseModal}
        >
          <Close />
        </IconButton>
        {profileStatus === 'viewing' ? <ProfileView /> :  <ProfileEdit />}
      </Box>
    </Modal>
  );
};

export { ProfileModal };
