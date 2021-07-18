import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddEditMeal(props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [props.meal_to_edit]);

  const classes = useStyles();

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {props.addEditText + " " + "Meal"}
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit(props.addEditMeal)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="meal"
                  control={control}
                  defaultValue={props.meal_to_edit && props.meal_to_edit.meal}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Meal"
                      variant="outlined"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="meal"
                    />
                  )}
                  rules={{ required: "This is required" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={props.meal_to_edit && props.meal_to_edit.date}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Date"
                      variant="outlined"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  rules={{ required: "This is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="calories"
                  control={control}
                  defaultValue={
                    props.meal_to_edit && props.meal_to_edit.calories
                  }
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Calories"
                      fullWidth
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="number"
                    />
                  )}
                  rules={{ required: "This is required" }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.addEditText}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ marginLeft: 20 }}
              onClick={props.closeDialog}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
