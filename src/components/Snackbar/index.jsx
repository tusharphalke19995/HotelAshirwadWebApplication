import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars(props) {
  const { open, message, severity } = props.snackbarState;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.onClose(event, reason);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity} // Explicitly type the severity prop
        variant="filled"
        sx={{ width: "100%", textTransform: "capitalize" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
