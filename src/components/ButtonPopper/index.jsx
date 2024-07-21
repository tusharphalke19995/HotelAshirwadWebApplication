import * as React from "react";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import classes from "./buttonPopper.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ClickAwayListener, List, ListItem } from "@mui/material";

export default function PopperPopupState(props) {
  const {
    options = [],
    label = "Choose option",
    handleSelect = () => {},
    selectedOptionProp = {},
  } = props;
  const [selectedOption, setSelectedOption] = React.useState(label);

  const handleOptionClick = (option, popupState) => {
    setSelectedOption(option);
    popupState.close();
    handleSelect(option);
  };

  React.useEffect(() => {
    setSelectedOption(selectedOptionProp);
  }, [selectedOption]);

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            {...bindToggle(popupState)}
            classes={{ root: classes.customButton }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectedOption?.name || label}
          </Button>
          <Popper
            {...bindPopper(popupState)}
            transition
            placement="bottom-start"
            sx={{
              zIndex: 2,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ minWidth: "162px" }}>
                  <ClickAwayListener onClickAway={() => popupState.close()}>
                    <List
                      component="nav"
                      aria-label="options"
                      style={{
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                      }}
                    >
                      {options.map((option) => (
                        <ListItem
                          button
                          id={option.id}
                          key={option.id}
                          onClick={() => handleOptionClick(option, popupState)}
                          sx={{ fontSize: "14px" }}
                        >
                          {option.name || ""}
                        </ListItem>
                      ))}
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
