import { Redirect, Route, Switch } from "react-router";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Page404 from "../../SharedArea/Page404/Page404";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacations from "../../VacationsArea/EditVacations/EditVacations";
import Home from "../../HomeArea/Home/Home";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsChart from "../../VacationsArea/VacationsChart/VacationsChart";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/vacations" component={VacationsList} exact />
                <Route path="/vacations/details/:id" component={VacationDetails} exact />
                <Route path="/vacations/new" component={AddVacation} exact />
                <Route path="/vacations-chart" component={VacationsChart} exact />
                <Route path="/vacations/edit/:id" component={EditVacations} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/logout" component={Logout} exact />
                <Redirect from="/" to="/home" exact />
                <Route component={Page404} /> {/* Last Route */}
            </Switch>
        </div>
    );
}

export default Routing;
