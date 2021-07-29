import "./Logo.css";
import logoImage from "../../../assets/images/logo.png";
import { Component } from "react";


class Logo extends Component {
    public render(): JSX.Element {
        return (
            <div className="Logo">
                <img src={logoImage} alt="…"/>
            </div>
        );
    }
}

export default Logo;
