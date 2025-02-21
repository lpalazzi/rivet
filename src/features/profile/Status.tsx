import { Box } from "@mui/material";
import { countProfiles, activeProfile } from "./profileSlice";
import { useSelector } from "react-redux";

const Status = () => {
  const count = useSelector(countProfiles)
  const current = useSelector(activeProfile);


  return (
    <Box sx={{fontSize: '12px', color: '#888', marginTop: '1em'}}>
      Listing { count } profile(s). Selected profile id: {current?.id ? current.id : 'none'}
    </Box>
  )
}

export { Status }