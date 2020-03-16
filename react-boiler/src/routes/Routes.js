import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Register from '../components/Auth/Register/Register';
import Login from '../components/Auth/Login/Login';
import TimeSheet from '../components/main/TimeSheet/TimeSheet';
import LeaveManagement from '../components/main/LeaveManagement/LeaveManagement';
import Payslip from '../components/main/Payslip/Payslip';
import Feedback from '../components/main/Feedback/Feedback';
import ProjectAllocation from '../components/main/ProjectAllocation/ProjectAllocation';
import NotFound from '../components/Layout/NotFound/NotFound';
import EmployeeDetails from '../components/main/Employee-Details/EmployeeDetails';

const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/time-sheet' component={TimeSheet} />
        <Route exact path='/leave-management' component={LeaveManagement} />
        <Route exact path='/payslip' component={Payslip} />
        <Route exact path='/feedback' component={Feedback} />
        <Route exact path='/project' component={ProjectAllocation} />
        <Route exact path='/employee' component={EmployeeDetails} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
