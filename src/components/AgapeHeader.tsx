import { Typography } from "@mui/material";

const AgapeHeader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px",
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      color="#FFF"
      sx={{ display: "flex", alignItems: "center", paddingTop: "10px" }}
    >
      Cuenta Ágape
      <img
        style={{ marginLeft: "5px" }}
        alt="agapeLogo"
        src={`${process.env.PUBLIC_URL}/agape.png`}
        width="52"
      />
    </Typography>
    <img
      style={{ marginLeft: "5px" }}
      alt="gb38"
      src={`${process.env.PUBLIC_URL}/gb38.png`}
      width="104px"
    />
  </div>
);

export default AgapeHeader;
