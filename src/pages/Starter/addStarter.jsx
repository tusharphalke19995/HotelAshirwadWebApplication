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

const AddstarterName = ({
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
    return newCourse.starterName && newCourse.category && newCourse.price;
  }, [newCourse]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === "edit" ? "Edit Starter Name" : "Add New Starter Name"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="starterName"
          label="Starter Name"
          fullWidth
          value={newCourse.starterName || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          name="category"
          label="Category Name"
          fullWidth
          value={newCourse.category || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          fullWidth
          type="number"
          value={newCourse.price || ""}
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

export default AddstarterName;
