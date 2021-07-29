import { FavoriteBorder, FavoriteSharp } from "@material-ui/icons";
import { Component } from "react";
import "./FollowersList.css";
import { Fab } from "@material-ui/core";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import FollowersModel from "../../../Models/FollowersModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import { History } from "history";
import store from "../../../Redux/Store";

interface FollowersListProps {
    uuid?: string;
	vacationId?: number;
    history?: History;
}

interface FollowersListState {
	isFollow: boolean;
}

class FollowersList extends Component<FollowersListProps, FollowersListState> {

    public constructor(props: FollowersListProps) {
        super(props);
        this.state = { isFollow: false };
    }

    public async componentDidMount() {
        this.handleFollow();
    }
    
    public async handleFollow() {
        try{
            // http://localhost:3001/api/followers:
            const response = await jwtAxios.get<FollowersModel>(globals.followersUrl+ this.props.uuid+ "/" +this.props.vacationId);
            const followList = response.data;
            if (followList){
                this.setState({ isFollow: true })
            }
        }   
        catch(err){
            notify.error(err);
            if(err.response.data === "Your login session has expired."){
                store.dispatch(userLoggedOutAction());
                this.props.history.push(globals.socketUrl);
            }
        } 
    }
    public followOnVacation = async ()=> {
        await jwtAxios.post(globals.followersUrl + this.props.uuid  + "/" + this.props.vacationId );
        notify.success("Following..") 
    }
    public unfollowOnVacation = async ()=>  {
        await jwtAxios.delete(globals.followersUrl + this.props.uuid + "/" + this.props.vacationId );
        notify.success("Unfollowing..")

    }
 
    public isFollowing = async()=> {
        await this.setState({ isFollow: !this.state.isFollow });
        if(this.state.isFollow){
            this.followOnVacation();
        }
        else{
            this.unfollowOnVacation();
            localStorage.clear();
        }
    }


    public render(): JSX.Element {
        return (
            <div className="FollowersList">
                <div onClick={this.isFollowing}>
                    {this.state.isFollow === false && <Fab size="small" color="primary" aria-label="followOn"  > {<FavoriteBorder/>}</Fab> }
                    {this.state.isFollow === true && <Fab size="small" color="primary" aria-label="followOff" > {<FavoriteSharp/>}</Fab> }
                </div>
            </div>
        );
    }
}

export default FollowersList;
