import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeService from './Services';
import axios from 'axios';
//import { Link } from 'react-router-dom';
//import { render } from 'react-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// export default function SimpleTable() {
class SimpleTable extends Component{
//   const classes = useStyles();

constructor(props) {
    super(props);
    this.employeeService = new EmployeeService();
    this.state = {
        employees: []
    }
    this.deleteEmployee = this.deleteEmployee.bind(this);
}

componentDidMount = () => {
    this.getEmployeeList();
}

// To get all the employees
getEmployeeList() {
    axios.get('http://localhost:4000/employees')
        .then((response) => {
            console.log(response);
            this.setState({
                employees: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

// To delete any employee
deleteEmployee(empid) {
    this.employeeService.deleteEmployee(empid);
    this.getEmployeeList();
}

render() {
    const { employees } = this.state;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                
        employees && employees.map((employee, i) => {
            //   {rows.map(row => (
            //     <TableRow key={row.name}>
            //       <TableCell component="th" scope="row">
            //         {row.name}
            //       </TableCell>
            <TableRow key={i}>
                  <TableCell align="right">{employee.firstname}</TableCell>
                  <TableCell align="right">{employee.lastname}</TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.phone}</TableCell>
                </TableRow>
          })
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}
export default SimpleTable;