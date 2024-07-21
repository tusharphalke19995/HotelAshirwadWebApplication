import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classes from "./table.module.scss";
import { Chip, Paper } from "@mui/material";
import { subRows } from "./constants";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const chipStyles = {
  fontSize: "12px",
  color: "var(--white)",
};

const indicatorStyle = {
  fontSize: "20px",
  color: "var(--light-black)",
};

const columns = [
  { id: "drag", label: "", minWidth: 5 },
  { id: "materialNumber", label: "Material No", minWidth: 70 },
  { id: "materialName", label: "Material Name", minWidth: 100 },
  { id: "orders", label: "Order No", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 60 },
  { id: "dueDate", label: "Due Date", minWidth: 100 },
  { id: "hours", label: "Hours Needed", minWidth: 100 },
  { id: "productionStartDate", label: "Production Start Date", minWidth: 130 },
  { id: "productionEndDate", label: "Production End Date", minWidth: 130 },
  { id: "rmStatus", label: "Rm & Intermediate Status", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
];

function CustomRowComponent(props) {
  const { row, index } = props;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen((prevState) => !prevState);

  const icon = open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

  return (
    <>
      <Draggable key={row.id} draggableId={String(row.id)} index={index}>
        {(provider) => (
          <TableRow
            ref={provider.innerRef}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            className={{ root: classes.customTableRow }}
          >
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              <DragIndicatorIcon sx={indicatorStyle} />
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              {row.materialNumber}
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              {row.materialName}
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              <div className={classes.customValue} onClick={handleClick}>
                {`${row.ordersQuantity} Orders`}
                {icon}
              </div>
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              <div className={classes.customValue} onClick={handleClick}>
                {`${row.quantity}`}
                {icon}
              </div>
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              <div className={classes.customValue} onClick={handleClick}>
                {row.dueDate ? `${moment(row.dueDate).format("L")}` : "-"}
                {icon}
              </div>
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              <div className={classes.customValue} onClick={handleClick}>
                {`${row.hours.toFixed(2)} Hours`}
                {icon}
              </div>
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              {row.productionStartDate
                ? moment(row.productionStartDate).format("l LT")
                : "-"}
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              {row.productionEndDate
                ? moment(row.productionEndDate).format("l LT")
                : "-"}
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              {row.rmStatus ? (
                <Chip label={row.rmStatus} color="success" sx={chipStyles} />
              ) : '-'}
            </TableCell>
            <TableCell classes={{ root: classes.customTableRowTitle }}>
              {row.status ? (
                <Chip label={row.status} color="warning" sx={chipStyles} />
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        )}
      </Draggable>
      {open &&
        row?.orders?.map((subRow) => {
          return (
            <TableRow key={subRow.id}>
              <TableCell
                classes={{ root: classes.customTableRowTitle }}
              ></TableCell>
              <TableCell
                classes={{ root: classes.customTableRowTitle }}
              ></TableCell>
              <TableCell
                classes={{ root: classes.customTableRowTitle }}
              ></TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {subRow.sales_doc ? `${subRow.sales_doc}` : ""}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {" "}
                {subRow.net_weight ? `${subRow.net_weight.toFixed(2)}` : ""}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {subRow.delivery_date
                  ? moment(subRow.delivery_date).format("L")
                  : ""}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {subRow.hours_needed
                  ? `${subRow.hours_needed.toFixed(2)} Hours`
                  : ""}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {moment(subRow.prod_start_date).format("l LT")}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {moment(subRow.prod_end_date).format("l LT")}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {subRow.rmStatus && (
                  <Chip
                    label={subRow.rmStatus}
                    color="success"
                    sx={chipStyles}
                  />
                )}
              </TableCell>
              <TableCell classes={{ root: classes.customTableRowTitle }}>
                {subRow.status && (
                  <Chip label={subRow.status} color="warning" sx={chipStyles} />
                )}
              </TableCell>
            </TableRow>
          );
        })}
    </>
  );
}

function EmptyComponent(props) {
  const { classes } = props;
  return (
    <TableRow>
      <TableCell colSpan={12} classes={{ root: classes.customTableCellEmpty }}>
        Couldn't find any data. Please select Plant and then Asset to load data.
      </TableCell>
    </TableRow>
  );
}

export default function CollapsibleTable(props) {
  const { rows, rowsCategoryB, rowsCategoryC, rowsCategoryD } = props;
  const [maxHeight, setMaxHeight] = React.useState("100vh");

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Do nothing if dropped outside the list
    if (!destination) return;

    // A helper function to clone the items array based on the droppableId
    const getItemsList = (droppableId) => {
      switch (droppableId) {
        case "droppable-1":
          return Array.from(rows);
        case "droppable-2":
          return Array.from(rowsCategoryB);
        case "droppable-3":
          return Array.from(rowsCategoryC);
        case "droppable-4":
          return Array.from(rowsCategoryD);
        default:
          return [];
      }
    };

    // Another helper function to update the state based on the droppableId
    const updateItemsList = (droppableId, items) => {
      props.updateItemsList(droppableId, items);
    };

    const sourceItems = getItemsList(source.droppableId);
    let destinationItems = sourceItems;

    if (source.droppableId !== destination.droppableId) {
      destinationItems = getItemsList(destination.droppableId);
    }

    // Move the item from source to destination
    const [movedItem] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, movedItem);

    // Update the states
    updateItemsList(source.droppableId, sourceItems);
    if (source.droppableId !== destination.droppableId) {
      updateItemsList(destination.droppableId, destinationItems);
    }
  };

  React.useEffect(() => {
    const tablePageHead = document.getElementById("tablePageHead");
    if (tablePageHead) {
      const tablePageHeadHeight = tablePageHead.offsetHeight;
      setMaxHeight(`calc(100vh - ${tablePageHeadHeight + 34}px)`);
    }
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
      <TableContainer
        classes={{ root: classes.customTableContainer }}
        sx={{ maxHeight }}
      >
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                  classes={{ root: classes.customTableHeadTitle }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            {rows.length ? (
              <>
                <Droppable droppableId="droppable-1">
                  {(provider) => (
                    <TableBody
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                    >
                      {rows.map((row, index) => (
                        <CustomRowComponent row={row} index={index} />
                      ))}
                      {provider.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </>
            ) : (
              <EmptyComponent classes={classes} />
            )}

            {/* <TableRow>
              <TableCell
                colSpan={12}
                classes={{ root: classes.customTableCellFooter }}
              >
                Change Over C6: 40 minutes
              </TableCell>
            </TableRow>

            {rowsCategoryB.length ? (
              <>
                <Droppable droppableId="droppable-2">
                  {(provider) => (
                    <TableBody
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                    >
                      {rowsCategoryB.map((row, index) => (
                        <CustomRowComponent row={row} index={index} />
                      ))}
                      {provider.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </>
            ) : (
              <EmptyComponent classes={classes} />
            )}

            <TableRow>
              <TableCell
                colSpan={12}
                classes={{ root: classes.customTableCellFooter }}
              >
                Change Over C1: 55 minutes
              </TableCell>
            </TableRow>

            {rowsCategoryC.length ? (
              <>
                <Droppable droppableId="droppable-3">
                  {(provider) => (
                    <TableBody
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                    >
                      {rowsCategoryC.map((row, index) => (
                        <CustomRowComponent row={row} index={index} />
                      ))}
                      {provider.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </>
            ) : (
              <EmptyComponent classes={classes} />
            )}

            <TableRow>
              <TableCell
                colSpan={12}
                classes={{ root: classes.customTableCellFooter }}
              >
                Change Over C2: 09 hours
              </TableCell>
            </TableRow>

            {rowsCategoryD.length ? (
              <>
                <Droppable droppableId="droppable-4">
                  {(provider) => (
                    <TableBody
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                    >
                      {rowsCategoryD.map((row, index) => (
                        <CustomRowComponent row={row} index={index} />
                      ))}
                      {provider.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </>
            ) : (
              <EmptyComponent classes={classes} />
            )} */}
          </DragDropContext>
        </Table>
      </TableContainer>
    </Paper>
  );
}
