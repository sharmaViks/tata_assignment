import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function MealsTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Calories</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data && props.data.map(meal => (
            <TableRow key={meal._id} style={{backgroundColor:meal.background_color}}>
              <TableCell component="th" scope="row">
                {meal.meal}
              </TableCell>
              <TableCell align="center">{meal.date}</TableCell>
              <TableCell align="center">{meal.calories}</TableCell>
              <TableCell align="center">
                <span style={{cursor:'pointer'}} onClick={()=>props.handleEdit(meal)}>
                  <EditIcon />
                </span>
                <span style={{paddingLeft:10,cursor:'pointer'}} onClick={()=>props.handleDelete(meal.meal_id)}>
                  <DeleteIcon />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
