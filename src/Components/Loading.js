import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Typography } from "@material-ui/core";

const Loading = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box>
        <CircularProgress color="primary" />
        <Typography>Loading...</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
