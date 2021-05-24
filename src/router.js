import { Switch, Route } from 'react-router-dom'
import Table from '../src/components/table/index';
import Home from '../src/components/home';
import Login from '../src/components/login';
import Edit from '../src/components/edit';
import Logout from '../src/components/logout';
import Delete from '../src/components/delete';
import ChangeTaskStatus from '../src/components/changeTaskStatus';
import Signup from '../src/components/signup';

export default (props) => {
    return(
        <Switch>
            <Route exact path='/home' component={ Home }></Route>
            <Route exact path='/signup' component={ Signup }></Route>
            <Route exact path='/login' component={ () => <Login addAuthentication={props.addAuthentication}/> }></Route>
            <Route exact path='/task' component={ () => <Table authentication={props.authentication}/> }></Route>
            <Route exact path='/addTask' component={ (localProps) => <Edit {...localProps} authentication={props.authentication} addTask={true}/> }></Route>
            <Route exact path='/editTask/:id' component={ (localProps) => <Edit {...localProps} authentication={props.authentication}/> }></Route>
            <Route exact path='/changeTaskStatus/:id' component={ (localProps) => <ChangeTaskStatus {...localProps} authentication={props.authentication} />}></Route>
            <Route exact path='/deleteTask/:id' component={ (localProps) => <Delete {...localProps} authentication={props.authentication} />}></Route>
            <Route exact path='/logout' component={ () => <Logout addAuthentication={props.addAuthentication}/> }></Route>
        </Switch>
    )
}