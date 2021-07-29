// Register
import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { userRegisteredAction } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import { useHistory } from "react-router";
import notify from "../../../Services/Notify";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import jwtAxios from "../../../Services/jwtAxios";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DescriptionIcon from '@material-ui/icons/Description';

function Register(): JSX.Element {

    const [getCaptcha , setCaptcha] = useState<any>([]);

    useEffect(()=> {
        jwtAxios.get(globals.captchaUrl, {withCredentials: true})
        .then(response => setCaptcha(response.data))
        .catch(err => notify.error(err));
    },[]);
    
    
    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<UserModel>();
    
    // Submit:
    async function submit(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.registerUrl, user, {withCredentials: true});
            store.dispatch(userRegisteredAction(response.data));
            notify.success("You have been successfully registered.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Register MainComponents">

            <h2>Register <DescriptionIcon/></h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>First Name:</label>
                <input type="text" autoFocus {...register("firstName", {
                    required: { value: true, message: "Missing first name." },
                    minLength: { value: 2, message: "First name too short." }
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <label>Last Name:</label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "Missing last name." },
                    minLength: { value: 2, message: "Last name too short." }
                })} />
                <span>{formState.errors.lastName?.message}</span>

                <label>Username:</label>
                <input type="text" {...register("userName", {
                    required: { value: true, message: "Missing username." },
                    minLength: { value: 4, message: "Username too short." }
                })} />
                <span>{formState.errors.userName?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password." },
                    minLength: { value: 4, message: "password too short." }
                })} />
                <span>{formState.errors.password?.message}</span>
                
                <div>
                    <SVG src={`'${getCaptcha}'`} > </SVG>
                    <input type="text" {...register("captcha")} />    

                
                </div> 
                <button>Register</button>
                <NavLink to="/login"><PermIdentityIcon/> Already exist account? </NavLink>
            </form>

        </div>
    );
}

export default Register;