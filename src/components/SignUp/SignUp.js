import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupActions } from "./redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const { registering, success_message, failure_message } = useSelector(
    (state) => state.signup
  );
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    signupActions.register(data)(dispatch);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    setShowLoader(registering);
  }, [registering]);

  useEffect(() => {
    if (success_message) {
      let _message = { type: "success", content: success_message };
      setMessage(_message);
      setShowSnackbar(true);
      setTimeout(()=> {
        props.history.push("/meals");
      }
      ,2000)
    }
  }, [success_message]);

  useEffect(() => {
    if (failure_message) {
      let _message = { type: "error", content: failure_message };
      setMessage(_message);
      setShowSnackbar(true);
    }
  }, [failure_message]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    signupActions.resetMessage()(dispatch);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={showLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        key={"top right"}
        autoHideDuration={2000}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={message && message.type}>
          {message && message.content}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register("firstName", {
                  required: true,
                  maxLength: 20,
                })}
                error={errors.firstName ? true : false}
                helperText={
                  (errors.firstName &&
                    errors.firstName.type === "maxLength" && (
                      <span>Max length exceeded</span>
                    )) ||
                  (errors.firstName && errors.firstName.type === "required" && (
                    <span>This is required</span>
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                {...register("lastName", { required: true, maxLength: 20 })}
                error={errors.lastName ? true : false}
                helperText={
                  (errors.lastName && errors.lastName.type === "maxLength" && (
                    <span>Max length exceeded</span>
                  )) ||
                  (errors.lastName && errors.lastName.type === "required" && (
                    <span>This is required</span>
                  ))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                error={errors.email ? true : false}
                helperText={
                  errors.email && (
                    <span role="alert">{errors.email.message}</span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 5,
                    message: "Password should be atleast 5 characters long",
                  },
                })}
                error={errors.password ? true : false}
                helperText={
                  errors.password && (
                    <span role="alert">{errors.password.message}</span>
                  )
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" style={{cursor:'pointer'}} onClick={()=>props.history.push('/login')}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
