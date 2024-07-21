import { useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import classes from "./signup.module.scss";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const iconStyle = {
    color: 'var(--grey)'
};

const SignUp = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ username: '', password: '', first_name: '', last_name: '' });
    const [showPassword, setShowPassword] = useState(false);

    const { username, password, first_name, last_name } = credentials;



    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleCredentialsChange = (event) => {
        setCredentials(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleNavigateToLogin = () => {
        navigate('/');
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.logoContainer}>

                    </div>
                    <div className={classes.leftContainer}>
                        <span className={classes.registerTitle}>Register</span>
                        <span className={classes.registerDescription}>Create new account and join today.</span>

                        <div className={classes.inputContainer}>
                            <div className={classes.dflex}>
                                <span className={classes.label}>Email Address</span>
                                <OutlinedInput
                                    id="username"
                                    value={username}
                                    placeholder='Enter Valid Email Address'
                                    onChange={handleCredentialsChange}
                                    classes={{
                                        root: classes.inputField
                                    }}
                                />
                            </div>
                            <div className={classes.dflex}>
                                <span className={classes.label}>First Name</span>
                                <OutlinedInput
                                    id="first_name"
                                    value={first_name}
                                    placeholder='Enter First Name'
                                    onChange={handleCredentialsChange}
                                    classes={{
                                        root: classes.inputField
                                    }}
                                />
                            </div>
                            <div className={classes.dflex}>
                                <span className={classes.label}>Last Name</span>
                                <OutlinedInput
                                    id="last_name"
                                    value={last_name}
                                    placeholder='Enter Last Name'
                                    onChange={handleCredentialsChange}
                                    classes={{
                                        root: classes.inputField
                                    }}
                                />
                            </div>
                            <div className={classes.dflex}>
                                <span className={classes.label}>Password</span>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={handleCredentialsChange}
                                    classes={{
                                        root: classes.inputField
                                    }}
                                    endAdornment={<InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ?
                                                <VisibilityOff sx={iconStyle} /> :
                                                <Visibility sx={iconStyle} />}
                                        </IconButton></InputAdornment>}
                                />
                            </div>
                        </div>
                        <Button variant="contained" classes={{ root: classes.registerBtn }} onClick={handleNavigateToLogin}>Register</Button>
                        <div className={classes.alreadyAccount}>
                            <div>
                                <span className={classes.label}>Already have an account?</span>
                                <span className={classes.LoginTitle} onClick={handleNavigateToLogin}>Login</span>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.rightContainerParent}>
                        <div className={classes.rightContainer}>
                            <span className={classes.loginTitleRightCnt}>Welcome to our Platform</span>
                            <span className={classes.loginDescription}>Get Stared to join today</span>
                            <div className={classes.imageCnt}></div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default SignUp;
