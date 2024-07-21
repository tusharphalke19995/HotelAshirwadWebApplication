import { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import classes from "./login.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CheckIN from "../../assets/corosel/1.jpg";
import Intro from "../../assets/corosel/2.jpg";
import Room from "../../assets/corosel/3.jpg";
import Nature from "../../assets/corosel/4.jpg";
import Bar from "../../assets/corosel/1.jpg";
import axiosInstance from "../../authentication/ApiClient";
import toast from "react-hot-toast";
import Loader from "../../components/Loading";

const Login = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleDragStart = (e) => e.preventDefault();
  const items = [
    <img
      src={CheckIN}
      height={430}
      onDragStart={handleDragStart}
      role="CheckIN"
    />,
    <img src={Intro} height={430} onDragStart={handleDragStart} role="Intro" />,
    <img src={Room} height={430} onDragStart={handleDragStart} role="Room" />,
    <img
      src={Nature}
      height={430}
      onDragStart={handleDragStart}
      role="Nature"
    />,
    <img src={Bar} height={430} onDragStart={handleDragStart} role="Bar" />,
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    } else if (id === "password") {
      setPassword(value);
    }
    setIsFormValid(name && password);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconStyle = {
    color: "var(--grey)",
  };

  async function handleSign(event) {
    event.preventDefault();
    let dataSignin = {
      name: name,
      password: password,
    };
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("sign-in", dataSignin);
      setResponseData(response.data);
      sessionStorage.setItem("access-token", response.data.token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      sessionStorage.setItem("expiration", expiration.toISOString());
      if (response.data != null) {
        toast.success("Sign In Successfully!");
        navigate("/layout");
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleRegister = () => navigate("/register");

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.logoContainer}></div>
          <div className={classes.leftContainer}>
          {isLoading && <Loader />}
            <span className={classes.loginTitle}>Sign In</span>
            <form onSubmit={handleSign}>
              <div className={classes.inputContainer}>
                <div className={classes.dflex}>
                  <span className={classes.label}>User Name</span>
                  <OutlinedInput
                    id="name"
                    value={name}
                    placeholder="Enter User Name"
                    onChange={handleInputChange}
                    classes={{
                      root: classes.inputField,
                    }}
                  />
                </div>
                <div className={classes.dflex}>
                  <span className={classes.label}>Password</span>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={handleInputChange}
                    classes={{
                      root: classes.inputField,
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={iconStyle} />
                          ) : (
                            <Visibility sx={iconStyle} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  disabled={!isFormValid}
                  classes={{ root: classes.loginBtn }}
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>

            <div className={classes.alreadyAccount}>
              <div>
                <span className={classes.label}>Don’t have an account?</span>
                <span
                  className={classes.registerTitle}
                  onClick={handleRegister}
                >
                  Register
                </span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.rightContainerParent}>
            <div className={classes.rightContainer}>
              <div className="alice-carousel">
                <AliceCarousel autoPlay items={items} />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
