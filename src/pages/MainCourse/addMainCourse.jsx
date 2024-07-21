import React, { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import classes from "../Dashboard/dashboard.module.scss"; // Import your SCSS file

const categoryData = [
  {
    id: 0,
    cname: "Veg",
  },
  {
    id: 1,
    cname: "Non-Veg",
  },
];

const AddMainCourse = ({
  open,
  handleClose,
  handleInputChange,
  handleFormSubmit,
  handleImageChange,
  newCourse,
  mode,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryinfo, setCategoryinfo] = useState(categoryData[0].cname);

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
    // Initialize newCourse.category with an empty string if not defined
    if (newCourse.category === undefined) {
      handleInputChange({
        target: {
          name: "category",
          value: "",
        },
      });
    }
  }, [newCourse.imageFile, newCourse.category, handleInputChange]);

  const handleCategoryChange = (e) => {
    handleInputChange({
      target: {
        name: 'category',
        value: e.target.value,
      },
    });
  };

  const isFormValid = useMemo(() => {
    return (
      newCourse.crName &&
      newCourse.category &&
      newCourse.halfPrice &&
      newCourse.fullPrice
    );
  }, [newCourse]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === "edit" ? "Edit Main Course" : "Add New Main Course"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="crName"
          label="Main Course Name"
          fullWidth
          value={newCourse.crName || ""}
          onChange={handleInputChange}
          required
        />

        <Select
          value={newCourse.category || ""}
          onChange={handleCategoryChange}
          fullWidth
          sx={{
            mt: 2,
            mb: 2,
          }}
          className={classes.dashboardSelect}
        >
          {categoryData.map((cateData) => (
            <MenuItem key={cateData.id} value={cateData.cname}>
              {cateData.cname}
            </MenuItem>
          ))}
        </Select>

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

export default AddMainCourse;
