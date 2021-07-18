import React, { useEffect,useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm();

  const [defaultValues,setDefaultValues] = useState(null);

  useEffect(()=>{
    let _defaultValues = {};
    reset();
    if(props.meal_to_edit){
      Object.assign(_defaultValues,props.meal_to_edit)
      reset({
        meal:"test"
      })
    }
    setDefaultValues(_defaultValues);
  },[props.meal_to_edit])

  const classes = useStyles();

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {props.addEditText + " " + "Meal"}
        </DialogTitle>
        <DialogContent>
          <form
            className={classes.form}
            onSubmit={handleSubmit(props.addEditMeal)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="meal"
                  variant="outlined"
                  fullWidth
                  id="meal"
                  label="Meal"
                  name="meal"
                  autoFocus
                  placeholder="Meal Name"
                  {...register("meal", {
                    required: true,
                    maxLength: 20,
                  })}
                  error={errors.meal ? true : false}
                  helperText={
                    (errors.meal && errors.meal.type === "maxLength" && (
                      <span>Max length exceeded</span>
                    )) ||
                    (errors.meal && errors.meal.type === "required" && (
                      <span>This is required</span>
                    ))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={defaultValues && defaultValues.date}
                  {...register("date", { required: true })}
                  error={errors.date ? true : false}
                  helperText={
                    errors.date &&
                    errors.date.type === "required" && (
                      <span>This is required</span>
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="calories"
                  label="Calories"
                  type="number"
                  autoComplete="calories"
                  placeholder="Calories"
                  {...register("calories", {
                    required: true,
                  })}
                  defaultValue={defaultValues && defaultValues.calories}
                  error={errors.calories ? true : false}
                  helperText={
                    errors.calories &&
                    errors.calories.type === "required" && (
                      <span>This is required</span>
                    )
                  }
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
