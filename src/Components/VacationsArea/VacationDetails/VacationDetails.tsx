import { Fab } from "@material-ui/core";
import {Delete ,Edit, Undo } from "@material-ui/icons";
import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";

import "./VacationDetails.css";


// interface containing the route parameters.
// The exact route params in the Routing must be here as string variables:
interface RouteParams {
    id: string;
}

// Our props interface must extends the following:
interface VacationDetailsProps extends RouteComponentProps<RouteParams> { } 


interface VacationDetailsState {
    vacations: VacationsModel[];
    id: number;	
    admin: number
}

class VacationDetails extends Component<VacationDetailsProps, VacationDetailsState> {

    public constructor(props: VacationDetailsProps) {
        super(props);
        this.state = { vacations: [] ,id: 0 , admin: 0};
    }


    public deleteVacation = async () =>  {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await jwtAxios.delete(globals.vacationsUrl + this.state.id);
            notify.success(`Vacation has beeb deleted!`);
            this.props.history.push("/vacations");
        }
        catch (err) {
            notify.error("Error" + err);
        }
    } 
    
    public async componentDidMount() {
        try {
            const vacationId = +this.props.match.params.id;
            const response = await jwtAxios.get<VacationsModel[]>(globals.vacationsUrl + vacationId);
            this.setState({ vacations: response.data , id: vacationId , admin: store.getState().authState.user.isAdmin });
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
            <div className="VacationDetails MainComponents">
                    { this.state.vacations.length === 0 && <PleaseWait />}
                    {this.state.vacations.map(v => 
                        <div key={v.vacationId}>
                            <div className="BoxIcons">
                                <NavLink to="/vacations"><Fab><Undo/></Fab></NavLink>
                                {this.state.admin === 1 && <NavLink to={`/vacations/edit/${v.vacationId}`}><Fab size="small" color="primary" aria-label="Edit" ><Edit/> </Fab> </NavLink>}
                                {this.state.admin === 1 && <div>
                                    <Fab  size="small"  color="primary" aria-label="delete" className="deleteButton" onClick={()=>this.deleteVacation()}>
                                        <Delete/>  
                                    </Fab>   
                                </div>}
                            </div>
                            <h2>{v.destination}</h2>
                            <div>
                                <label>From: </label>
                                <span>{v.startDate}</span>
                                <br/>
                                <label>Until: </label>
                                <span>{v.endDate}</span>
                                <br/>
                                <label>Price: </label>
                                <span>{v.price} $</span>
                                <p>{v.description}</p>
                                <img alt="#" src={globals.vacationsUrl + "images/" + v.img} />
                            </div>
                        </div>
                    )}                  
            </div>
        );
    }
}

export default VacationDetails;
