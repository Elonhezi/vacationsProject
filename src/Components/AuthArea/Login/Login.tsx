// Login

import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import store from "../../../Redux/Store";
import { userLoggedInAction } from "../../../Redux/AuthState";
import globals from "../../../Services/Globals";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/Notify";
import { NavLink } from "react-router-dom";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

function Login(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    // Submit:
    async function submit(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.loginUrl, credentials);
            store.dispatch(userLoggedInAction(response.data));
            notify.success("Logged-in successfully.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login MainComponents">
            <h2> Log in <PermIdentityIcon/></h2>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" autoFocus placeholder="Min length - 4 characters" {...register("userName", {
                        required: { value: true, message: "Missing username." },
                        minLength: { value: 4, message: "Username too short." }
                    })} />
                    <br />
                    <span>{formState.errors.userName?.message}</span>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Min length - 4 characters"{...register("password", {
                        required: { value: true, message: "Missing password." },
                        minLength: { value: 4, message: "password too short." }
                    })} />
                    <br />
                    <span>{formState.errors.password?.message}</span>
                </div>
                <button>Log in</button>
                <NavLink to="/register">New Account </NavLink>

            </form>
        </div>
    );
}

export default Login;