import { Box } from "@mui/material";
import Logo from "./Logo";

const LogoText = ({ color = 'currentcolor', size = 44 }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: size, fontFamily: 'logoFont', fontWeight: 400, fontSize: size, letterSpacing: -2, color }}>
      BU <Logo fill={color} style={{ flexShrink: 0, marginBottom: size / 11 }} /> UY
    </Box>
  );
};

export default LogoText;
