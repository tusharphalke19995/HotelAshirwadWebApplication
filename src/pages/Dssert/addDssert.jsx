import React, { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const AddDssert = ({
  open,
  handleClose,
  handleInputChange,
  handleFormSubmit,
  handleImageChange,
  newCourse,
  mode,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (newCourse.imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(newCourse.imageFile);
    } else {
      setImagePreview(null);
    }
  }, [newCourse.imageFile]);

  const isFormValid = useMemo(() => {
    return newCourse.name && newCourse.halfPrice && newCourse.fullPrice;
  }, [newCourse]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === "edit" ? "Edit Dssert" : "Add New Dssert"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Dssert Name"
          fullWidth
          value={newCourse.name || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="halfPrice"
          label="Half Price"
          fullWidth
          type="number"
          value={newCourse.halfPrice || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="fullPrice"
          label="Full Price"
          fullWidth
          type="number"
          value={newCourse.fullPrice || ""}
          onChange={handleInputChange}
          required
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" sx={{ mt: 2 }}>
            {newCourse.imageFile ? "Change Image" : "Upload Image"}
          </Button>
        </label>

        {mode === "edit" && newCourse.image && !newCourse.imageFile && (
          <Box sx={{ mt: 2 }}>
            <img
              src={`data:image/jpeg;base64,${newCourse.image}`}
              alt="Current Image"
              style={{ maxWidth: "100%" }}
            />
          </Box>
        )}

        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <img
              src={imagePreview}
              alt="New Image Preview"
              style={{ maxWidth: "100%" }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          color="primary"
          disabled={!isFormValid}
        >
          {mode === "edit" ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDssert;
