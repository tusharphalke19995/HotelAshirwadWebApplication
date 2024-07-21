import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Button, CircularProgress } from "@mui/material";
import axiosInstanceToken from "../../authentication/ApiClientToken";
import toast from "react-hot-toast";
import classes from "./starter.module.scss";
import CustomizedSnackbars from "../../components/Snackbar/index.jsx";
import Divider from '@mui/material/Divider';
import AddstarterName from "./addStarter.jsx";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: "imageUrl", numeric: false, disablePadding: true, label: "Image" },
    { id: "starterName", numeric: false, disablePadding: true, label: "Starter Name" },
    {
        id:"category", numeric:false, disablePadding:true, label:"Category Name"
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    }
  ];
  
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
  
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead className={classes.tableContainer}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      
    );
  }
  
  function EnhancedTableToolbar({ onAddClick }) {
    return (
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Manage Starter
        </Typography>
        <Button
          variant="contained"
          className={classes.buttonAddBreakFast}
          onClick={onAddClick}
        >
          Add Starter
        </Button>
      </Toolbar>
    );
  }
  
  const Starter = () => {
    const [snackbarState, setSnackbarState] = React.useState({
      open: false,
      message: "",
      severity: "",
    });
    const [starterList, setStarterList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("starterName");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("add"); // Mode: 'add' or 'edit'
    const [newCourse, setNewCourse] = useState({
      starterName: "",
      category:"",
      price: "",
      imageFile: null,
    });
    const [refreshData, setRefreshData] = useState(false);
  
    /**
     * Closes the snackbar and resets its state.
     */
    const handleCloseSnackBar = () => {
      setSnackbarState({ open: false, message: "", severity: "" });
    };
  
    const handleAddBreakFast = () => {
      setMode("add");
      setOpen(true);
      setNewCourse({ starterName: "",category:"", price: "", imageFile: null });
    };
  
    const handleEditBreakFast = (data) => {
      setMode("edit");
      setNewCourse(data);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleFormSubmit = async () => {
      setIsLoading(true);
      try {
        if (mode === "edit") {
          const formData = new FormData();
          formData.append(
            "starter",
            new Blob(
              [
                JSON.stringify({
                  id: newCourse.id,
                  starterName: newCourse.starterName,
                  category:newCourse.category,
                  price: newCourse.price
                }),
              ],
              { type: "application/json" }
            )
          );
  
          if (newCourse.imageFile instanceof File) {
            formData.append("image", newCourse.imageFile);
          }
  
          const response = await axiosInstanceToken.put(
            `updateStarter/${newCourse.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          if (response.status === 200) {
            setSnackbarState({
              open: true,
              message: "Starter Updated Successfully!",
              severity: "success",
            });
            setRefreshData((prev) => !prev); // Refresh the data
          } else {
            throw new Error("Failed to update Starter data. Please try again.");
          }
        } else {
          const formData = new FormData();
          formData.append("starterName", newCourse.starterName);
          formData.append("category", newCourse.category);
          formData.append("price", newCourse.price);
         
  
          if (newCourse.imageFile instanceof File) {
            formData.append("image", newCourse.imageFile);
          }
  
          const response = await axiosInstanceToken.post(
            "addStarter",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          if (response.status === 200) {
            setSnackbarState({
              open: true,
              message: "Starter Added Successfully!",
              severity: "success",
            });
            setRefreshData((prev) => !prev); // Refresh the data
          } else {
            throw new Error("Failed to add Starter data. Please try again.");
          }
        }
      } catch (error) {
        toast.error(
          `Failed to ${
            mode === "add" ? "Add" : "Update"
          } Starter data. Please try again.`
        );
        console.error("Error:", error);
      } finally {
        setNewCourse({
          starterName :"",
          category: "",
          price: "",
          imageFile: null,
        });
        setIsLoading(false);
        handleClose();
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCourse({ ...newCourse, [name]: value });
    };
  
    const handleImageChange = (e) => {
      setNewCourse({ ...newCourse, imageFile: e.target.files[0] });
    };
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axiosInstanceToken.get("getStarterList");
          const data = response.data || [];
          setStarterList(data);
        } catch (error) {
          toast.error("Failed to load starter data.");
          console.error("Error fetching data:", error);
        }
        setIsLoading(false);
      };
      fetchData();
    }, [refreshData]);
  
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - starterList.length) : 0;
  
    const visibleRows = useMemo(() => {
      return stableSort(starterList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }, [starterList, order, orderBy, page, rowsPerPage]);
  
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar onAddClick={handleAddBreakFast} />
          <Divider />
          <TableContainer className={classes.tableData}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={starterList.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={row.id ?? index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleEditBreakFast(row)}
                    >
                      <TableCell className={classes.table__cell} padding="none">
                        <img
                          src={`data:image/jpeg;base64,${row.image}`}
                          alt="Starter Image"
                          className={classes.table__image}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.starterName || "No Name"}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.category || "No Name"}
                      </TableCell>
                      <TableCell align="right">
                        {row.price ?? "N/A"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={starterList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
  
        <AddstarterName
          open={open}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleImageChange={handleImageChange}
          newCourse={newCourse}
          mode={mode}
        />
  
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <CustomizedSnackbars
          snackbarState={snackbarState}
          onClose={handleCloseSnackBar}
        />
      </Box>
    );
  };

export default Starter;