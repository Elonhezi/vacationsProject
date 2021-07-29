import { Add } from "@material-ui/icons";
import InsertChartIcon from '@material-ui/icons/InsertChart';
import { Component } from "react";
import VacationsModel from "../../../Models/VacationsModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import { History } from "history";
import "./VacationsList.css";
import jwtAxios from "../../../Services/jwtAxios";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import VacationCard from "../VacationCard/VacationCard";
import UserModel from "../../../Models/UserModel";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import notify from "../../../Services/Notify";
import { Fab } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { userLoggedOutAction } from "../../../Redux/AuthState";

interface VacationsListProps {
    history: History;
}

interface VacationsListState {
    vacations: VacationsModel[];
    user: UserModel;
    admin: number;
    isFollow: boolean;
}

class VacationsList extends Component<VacationsListProps, VacationsListState> {

    public constructor(props: VacationsListProps) {
        super(props);
        this.state = {
            vacations: [],
            user: store.getState().authState.user,
            admin: 0,
            isFollow: false,
        };
    }

    public async componentDidMount() {
        try {
            if(!store.getState().authState.user){
                this.props.history.push("/login");
                notify.error("You are not logged in!");
                return;
            }

            if(this.state.vacations.length === 0) {
                // http://localhost:3001/api/vacations
                const response = await jwtAxios.get<VacationsModel[]>(globals.vacationsUrl + `order-by/${store.getState().authState.user.uuid}`);
                this.setState({ vacations: response.data , admin: this.state.user.isAdmin});
                store.dispatch(vacationsDownloadedAction(response.data));
            }
            else {
                this.setState({ admin: this.state.user.isAdmin});
            }
            

            store.getState().authState.vacationsSocket.socket.on("added-vacation-from-server", newVacation => {
                const allVacations = [...this.state.vacations];
                allVacations.push(newVacation);
                this.setState({ vacations: allVacations });
            });

            store.getState().authState.vacationsSocket.socket.on("updated-vacation-from-server", updatedVacation => {
                const allVacations = [...this.state.vacations];
                const indexToUpdate = allVacations.findIndex(v => v.vacationId === updatedVacation.vacationId);
                allVacations[indexToUpdate] = updatedVacation;
                this.setState({ vacations: allVacations });
            });
            
            store.getState().authState.vacationsSocket.socket.on("deleted-vacation-from-server", deletedVacation => {
                const allVacations = [...this.state.vacations];
                const indexToDelete = allVacations.findIndex(v => v.vacationId === deletedVacation);
                allVacations.splice(indexToDelete, 1);
                this.setState({ vacations: allVacations });
            });
            
        
        
        } 
        catch (err) {
            notify.error(err);
            if(err.response.data === "Your login session has expired."){
                store.dispatch(userLoggedOutAction());
                this.props.history.push("/login");
            }
        }
    }

    public async componentWillUnmount() {
        this.setState = (state, callback)=>{
            return;
        };
    }
    
    public render(): JSX.Element {
        return (
            <div className="VacationsList MainComponents" >
                { this.state.vacations.length === 0 && <PleaseWait />}
                <div className="VacationNumAndAdd">
                    <p>{this.state.vacations.length} vacations are currently available</p>
                    {this.state.admin === 1 && <NavLink className="AddButton" to="/vacations/new/" ><Fab  size="small"  color="primary" aria-label="add" className="addButton"> <Add/></Fab> </NavLink> }
                    {this.state.admin === 1 && <NavLink to="/vacations-chart" ><Fab  size="small"  color="primary" aria-label="add" className="addButton"> <InsertChartIcon/></Fab> </NavLink> }
                </div>
                {this.state.vacations.map(v => <VacationCard vacation={v} admin={this.state.admin} key={v.vacationId}/>)}
            </div>
        );
    }
}


export default VacationsList;
