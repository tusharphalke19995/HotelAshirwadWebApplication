import React, { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const AddStandard = ({
  open,
  handleClose,
  handleInputChange,
  handleFormSubmit,
  handleImageChange,
  standardData,
  mode,
  roomsTypeData,
  handleCategoryChange,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (standardData.imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(standardData.imageFile);
    } else {
      setImagePreview(null);
    }
  }, [standardData.imageFile]);

  const isFormValid = useMemo(() => {
    return (
      standardData.roomNo &&
      standardData.occupancy &&
      standardData.bedType &&
      standardData.availability &&
      standardData.price &&
      standardData.amenities &&
      standardData.roomSize &&
      standardData.view &&
      standardData.description &&
      standardData.floor
    );
  }, [standardData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === "edit" ? "Edit Standard Room" : "Add New Standard Room"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="availability"
          label="Availability"
          fullWidth
          value={standardData.availability || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="view"
          label="View"
          fullWidth
          value={standardData.view || ""}
          onChange={handleInputChange}
          required
        />
        <TextareaAutosize
          aria-label="minimum height"
          name="bedType"
          minRows={3}
          placeholder="Enter Bed Type"
          style={{ width: "100%" }}
          value={standardData.bedType || ""}
          onChange={handleInputChange}
        />
        <TextareaAutosize
          aria-label="minimum height"
          name="amenities"
          minRows={3}
          placeholder="Enter Amenities"
          style={{ width: "100%" }}
          value={standardData.amenities || ""}
          onChange={handleInputChange}
        />
        <TextareaAutosize
          aria-label="minimum height"
          name="description"
          minRows={3}
          placeholder="Enter Description"
          style={{ width: "100%" }}
          value={standardData.description || ""}
          onChange={handleInputChange}
        />

        <Select
          value={standardData.roomType || ""}
          onChange={handleCategoryChange}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          {roomsTypeData.map((roomType) => (
            <MenuItem key={roomType.id} value={roomType.cname}>
              {roomType.cname}
            </MenuItem>
          ))}
        </Select>

        <TextField
          margin="dense"
          name="roomNo"
          label="Room No"
          fullWidth
          type="number"
          value={standardData.roomNo || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="occupancy"
          label="Occupancy"
          fullWidth
          type="number"
          value={standardData.occupancy || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          fullWidth
          type="number"
          value={standardData.price || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="roomSize"
          label="Room Size"
          fullWidth
          type="number"
          value={standardData.roomSize || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="floor"
          label="Floor"
          fullWidth
          type="number"
          value={standardData.floor || ""}
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
            {standardData.imageFile ? "Change Image" : "Upload Image"}
          </Button>
        </label>

        {mode === "edit" && standardData.image && !standardData.imageFile && (
          <Box sx={{ mt: 2 }}>
            <img
              src={`data:image/jpeg;base64,${standardData.image}`}
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

export default AddStandard;
