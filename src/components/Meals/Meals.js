import React, { useEffect, useState } from "react";
import MealsTable from "./MealsTable";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddEditMeal from "./AddEditMeals";
import { mealActions } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Meals(props) {
  const classes = useStyles();
  const [openAddEditMeal, setOpenAddEditMeal] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState("");
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [meals, setMeals] = useState([]);
  const [meal_data, setMealData] = useState(null);

  const {
    start_updating_meal,
    start_getting_meals,
    start_deleting_meal,
    all_meals,
    success_message,
    failure_message,
  } = useSelector((state) => state.meals);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleEdit = (meal) => {
    console.log("handleEdit", meal);
    setOpenAddEditMeal(true);
    setAddOrEdit("Edit");
    setMealData(meal);
  };

  const handleDelete = (meal_id) => {
    console.log("handleDelete", meal_id);
    mealActions.deleteMeal(meal_id)(dispatch);
  };

  const handleAdd = () => {
    console.log("handleAdd");
    setOpenAddEditMeal(true);
    setAddOrEdit("Add");
    setMealData(null);
  };

  const handleCloseAddEditDialog = () => {
    setOpenAddEditMeal(false);
  };

  const updateMeal = (meal) => {
    if (meal_data) {
      meal["meal_id"] = meal_data["meal_id"];
    }
    mealActions.updateMeal(meal)(dispatch);
  };

  useEffect(() => {
    setShowLoader(start_updating_meal);
  }, [start_updating_meal]);

  useEffect(() => {
    setShowLoader(start_getting_meals);
  }, [start_getting_meals]);

  useEffect(() => {
    setShowLoader(start_deleting_meal);
  }, [start_deleting_meal]);

  useEffect(() => {
    if (success_message) {
      let _message = { type: "success", content: success_message };
      setMessage(_message);
      setShowSnackbar(true);
      if (openAddEditMeal) {
        handleCloseAddEditDialog();
      }
      mealActions.getMeals()(dispatch);
    }
  }, [success_message]);

  useEffect(() => {
    if (failure_message) {
      let _message = { type: "error", content: failure_message };
      setMessage(_message);
      setShowSnackbar(true);
    }
  }, [failure_message]);

  useEffect(() => {
    mealActions.getMeals()(dispatch);
  }, []);

  const processMeal = (meals) => {
    function groupBy(key, arr) {
      const map = new Map();
      arr.forEach((t) => {
        if (!map.has(t[key])) {
          map.set(t[key], []);
        }
        map.get(t[key]).push(t);
      });
      return map;
    }
    const total_calories_data = Array.from(groupBy("date", meals).entries()).map(
      ([date, objs]) => ({
        date: date,
        calories: objs.reduce((acc, cur) => acc + Number(cur.calories), 0),
      })
    );
    total_calories_data.map((meal_data) => {
      meals.map((meal, index) => {
        if (meal.date === meal_data.date) {
          if (meal_data.calories < 2000) {
            meals[index]["background_color"] = "#99ffd6";
          } else {
            meals[index]["background_color"] = "#ff8080";
          }
        }
      });
    });
    return meals;
  };

  useEffect(() => {
    if (all_meals) {
      let meals = processMeal(all_meals);
      setMeals(meals);
    }
  }, [all_meals]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    mealActions.resetMessage()(dispatch);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={showLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        key={"top right"}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={message && message.type}>
          {message && message.content}
        </Alert>
      </Snackbar>
      <Box style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Meal
        </Button>
      </Box>
      <MealsTable
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        data={meals}
      />
      <AddEditMeal
        open={openAddEditMeal}
        addEditText={addOrEdit}
        closeDialog={handleCloseAddEditDialog}
        addEditMeal={updateMeal}
        meal_to_edit={meal_data}
      />
    </div>
  );
}
