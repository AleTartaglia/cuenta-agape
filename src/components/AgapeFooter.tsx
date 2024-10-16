import { Typography } from "@mui/material";

const AgapeFooter = () => (
  <Typography
    gutterBottom
    color="#FFF"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      fontSize: "12px",
      flexDirection: "column",
      Direction: "column",
    }}
  >
    <span>Copyright &copy; Giordano Bruno Nº 38 </span>
    <span style={{ fontSize: "9px" }}>powered by Alejandro Tartaglia M∴M∴</span>
  </Typography>
);
export default AgapeFooter;
