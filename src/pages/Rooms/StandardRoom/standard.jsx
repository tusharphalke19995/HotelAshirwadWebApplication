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
import toast from "react-hot-toast";
import classes from "./standard.module.scss";
import Divider from "@mui/material/Divider";
import AddStandard from "./addStandard.jsx";
import axiosInstanceToken from "../../../authentication/ApiClientToken.jsx";
import CustomizedSnackbars from "../../../components/Snackbar/index.jsx";

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
  {
    id: "roomType",
    numeric: true,
    disablePadding: false,
    label: "Room Type",
  },
  {
    id: "roomNo",
    numeric: true,
    disablePadding: false,
    label: "Room No",
  },
  {
    id: "occupancy",
    numeric: true,
    disablePadding: false,
    label: "Occupancy",
  },
  {
    id: "bedType",
    numeric: true,
    disablePadding: false,
    label: "BedType",
  },
  {
    id: "availability",
    numeric: true,
    disablePadding: false,
    label: "Availability",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "amenities",
    numeric: true,
    disablePadding: false,
    label: "Amenities",
  },
  {
    id: "roomSize",
    numeric: true,
    disablePadding: false,
    label: "Room Size",
  },
  {
    id: "view",
    numeric: true,
    disablePadding: false,
    label: "View",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "floor",
    numeric: true,
    disablePadding: false,
    label: "Floor",
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
        Manage Standard-Room
      </Typography>
      <Button
        variant="contained"
        className={classes.buttonAddStandard}
        onClick={onAddClick}
      >
        Add Standard-Room
      </Button>
    </Toolbar>
  );
}

const Standard = () => {
  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [standardList, setstandardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("amenities");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add"); // Mode: 'add' or 'edit'
  const [standardData, setstandardData] = useState({
    roomType: "",
    roomNo: "",
    occupancy: "",
    bedType: "",
    availability: "",
    price: "",
    amenities: "",
    roomSize: "",
    view: "",
    description: "",
    floor: "",
    imageFile: null,
  });
  const [refreshData, setRefreshData] = useState(false);

  /**
   * Closes the snackbar and resets its state.
   */
  const handleCloseSnackBar = () => {
    setSnackbarState({ open: false, message: "", severity: "" });
  };

  const handleAddStandard = () => {
    setMode("add");
    setOpen(true);
    setstandardData({
      roomType: "",
      roomNo: "",
      occupancy: "",
      bedType: "",
      availability: "",
      price: "",
      amenities: "",
      roomSize: "",
      view: "",
      description: "",
      floor: "",
      imageFile: null,
    });
  };

  const handleEditStandard = (data) => {
    setMode("edit");
    setstandardData(data);
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
          "rooms",
          new Blob(
            [
              JSON.stringify({
                id: standardData.id,
                roomType: standardData.roomType,
                roomNo: standardData.roomNo,
                occupancy: standardData.occupancy,
                bedType: standardData.bedType,
                availability: standardData.availability,
                price: standardData.price,
                amenities: standardData.amenities,
                roomSize: standardData.roomSize,
                view: standardData.view,
                description: standardData.description,
                floor: standardData.description,
              }),
            ],
            { type: "application/json" }
          )
        );

        if (standardData.imageFile instanceof File) {
          formData.append("image", standardData.imageFile);
        }

        const response = await axiosInstanceToken.put(
          `updateRooms/${standardData.id}`,
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
            message: "standardData Updated Successfully!",
            severity: "success",
          });
          setRefreshData((prev) => !prev); // Refresh the data
        } else {
          throw new Error("Failed to update breakfast data. Please try again.");
        }
      } else {
        console.log("standardData", standardData);
        const formData = new FormData();
        formData.append("roomType", standardData.roomType);
        formData.append("roomNo", standardData.roomNo);
        formData.append("occupancy", standardData.occupancy);
        formData.append("bedType", standardData.bedType);
        formData.append("availability", standardData.availability);
        formData.append("price", standardData.price);
        formData.append("amenities", standardData.amenities);
        formData.append("roomSize", standardData.roomSize);
        formData.append("view", standardData.view);
        formData.append("description", standardData.description);
        formData.append("floor", standardData.floor);

        if (standardData.imageFile instanceof File) {
          formData.append("image", standardData.imageFile);
        }

        const response = await axiosInstanceToken.post("addRooms", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setSnackbarState({
            open: true,
            message: "standardData Added Successfully!",
            severity: "success",
          });
          setRefreshData((prev) => !prev); // Refresh the data
        } else {
          throw new Error("Failed to add breakfast data. Please try again.");
        }
      }
    } catch (error) {
      toast.error(
        `Failed to ${
          mode === "add" ? "Add" : "Update"
        } breakfast data. Please try again.`
      );
      console.error("Error:", error);
    } finally {
      setstandardData({
        roomType: "",
        roomNo: "",
        occupancy: "",
        bedType: "",
        availability: "",
        price: "",
        amenities: "",
        roomSize: "",
        view: "",
        description: "",
        floor: "",
        imageFile: null,
      });
      setIsLoading(false);
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setstandardData({ ...standardData, [name]: value });
  };

  const handleImageChange = (e) => {
    setstandardData({ ...standardData, imageFile: e.target.files[0] });
  };

  const roomsTypeData = [
    { id: 1, cname: 'Deluxe' },
    { id: 2, cname: 'Suite' },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstanceToken.get("getRooms");
        const data = response.data || [];
        setstandardList(data);
      } catch (error) {
        toast.error("Failed to load standard room data.");
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [refreshData]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - standardList.length) : 0;

  const visibleRows = useMemo(() => {
    return stableSort(standardList, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [standardList, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onAddClick={handleAddStandard} />
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
              rowCount={standardList.length}
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
                    onClick={() => handleEditStandard(row)}
                  >
                    <TableCell className={classes.table__cell} padding="none">
                      <img
                        src={`data:image/jpeg;base64,${row.image}`}
                        alt="BreakFast Image"
                        className={classes.table__image}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.roomType || "Room Type"}
                    </TableCell>
                    <TableCell align="right">{row.roomNo ?? "N/A"}</TableCell>
                    <TableCell align="right">
                      {row.occupancy ?? "N/A"}
                    </TableCell>
                    <TableCell align="right">{row.bedType ?? "N/A"}</TableCell>
                    <TableCell align="right">
                      {row.availability ?? "N/A"}
                    </TableCell>
                    <TableCell align="right">{row.price ?? "N/A"}</TableCell>
                    <TableCell align="right">
                      {row.amenities ?? "N/A"}
                    </TableCell>
                    <TableCell align="right">{row.roomSize ?? "N/A"}</TableCell>
                    <TableCell align="right">{row.view ?? "N/A"}</TableCell>
                    <TableCell align="right">
                      {row.description ?? "N/A"}
                    </TableCell>
                    <TableCell align="right">{row.floor ?? "N/A"}</TableCell>
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
          count={standardList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <AddStandard
        open={open}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        roomsTypeData={roomsTypeData}
        handleImageChange={handleImageChange}
        standardData={standardData}
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
export default Standard;
