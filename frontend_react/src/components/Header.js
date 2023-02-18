import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { tokens } from "../theme";

const Header = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0",fontFamily:"Nunito" }}
      >
        {title}
      </Typography>
    
    </Box>
  );
};

export default Header;