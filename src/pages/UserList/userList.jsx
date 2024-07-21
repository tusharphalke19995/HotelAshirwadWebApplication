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
import classes from "./userList.module.scss";
import CustomizedSnackbars from "../../components/Snackbar/index.jsx";
import Divider from '@mui/material/Divider';
import AddUser from "./AddUser.jsx";
import { Password } from "@mui/icons-material";

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
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "mobNo", numeric: false, disablePadding: true, label: "Mobile Number" },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "address",
      numeric: true,
      disablePadding: false,
      label: "Address",
    },
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
          Manage User
        </Typography>
        <Button
          variant="contained"
          className={classes.buttonAddUser}
          onClick={onAddClick}
        >
          Add User
        </Button>
      </Toolbar>
    );
  }

const UserList = () => {
    const [snackbarState, setSnackbarState] = React.useState({
      open: false,
      message: "",
      severity: "",
    });
    const [dssertList, setDssertList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("add"); // Mode: 'add' or 'edit'
    const [newCourse, setNewCourse] = useState({
      name: "",
      halfPrice: "",
      fullPrice: "",
      imageFile: null,
    });
    const [refreshData, setRefreshData] = useState(false);
  
    /**
     * Closes the snackbar and resets its state.
     */
    const handleCloseSnackBar = () => {
      setSnackbarState({ open: false, message: "", severity: "" });
    };
  
    const handleAddDssert = () => {
      setMode("add");
      setOpen(true);
      setNewCourse({ name: "", mobNo: "", email: "", address: "" });
    };
  
    const handleEditDssert = (data) => {
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
        
          let dataOfUser ={
            id: newCourse.id,
            name: newCourse.name,
            mobNo: newCourse.mobNo,
            email: newCourse.email,
            address:newCourse.address
          }
  
          const response = await axiosInstanceToken.put(
            `dataOfUser/${newCourse.id}`,
            dataOfUser
          );
  
          if (response.status === 200) {
            setSnackbarState({
              open: true,
              message: "Dssert Updated Successfully!",
              severity: "success",
            });
            setRefreshData((prev) => !prev); // Refresh the data
          } else {
            throw new Error("Failed to update breakfast data. Please try again.");
          }
        } else {
      
          let dataOfUser ={
            id: newCourse.id,
            name: newCourse.name,
            mobNo: newCourse.mobNo,
            email: newCourse.email,
            address:newCourse.address,
            password:newCourse.password
          }
  
          const response = await axiosInstanceToken.post(
            "sign-up",
            dataOfUser
          );
  
          if (response.status === 200) {
            setSnackbarState({
              open: true,
              message: "User Added Successfully!",
              severity: "success",
            });
            setRefreshData((prev) => !prev); // Refresh the data
          } else {
            throw new Error("Failed to add User data. Please try again.");
          }
        }
      } catch (error) {
        toast.error(
          `Failed to ${
            mode === "add" ? "Add" : "Update"
          } user data. Please try again.`
        );
        console.error("Error:", error);
      } finally {
        setNewCourse({
          name: "",
          mobNo: "",
          email: "",
          address: "",
          password:""
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
          const response = await axiosInstanceToken.get("getUserList");
          const data = response.data || [];
          setDssertList(data);
        } catch (error) {
          toast.error("Failed to load user list data.");
          console.error("Error fetching data:", error);
        }
        setIsLoading(false);
      };
      fetchData();
    }, [refreshData]);
  
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dssertList.length) : 0;
  
    const visibleRows = useMemo(() => {
      return stableSort(dssertList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }, [dssertList, order, orderBy, page, rowsPerPage]);
  
    return (
      <Box sx={{ width: "100%"}}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar onAddClick={handleAddDssert} />
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
                rowCount={dssertList.length}
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
                      onClick={() => handleEditDssert(row)}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name || "No Name"}
                      </TableCell>
                      <TableCell align="right">
                        {row.mobNo ?? "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.email ?? "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.address ?? "N/A"}
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
            count={dssertList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
  
        <AddUser
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
export default UserList;