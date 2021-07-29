import "./Footer.css";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer(): JSX.Element {
    return (
        <div className="Footer"> 
            <div> 
                <p>All Rights Reserved &copy; - Elon Hezi</p>
            </div>
            <div className="LinksIcons">

                <a target="@" href="https://github.com/Elonhezi"><GitHubIcon  /></a>
            </div>
            <div className="LinksIcons">
                <a target="@" href="https://www.linkedin.com/in/elon-hezi-80b952210"><LinkedInIcon/></a>
            </div>
        </div>
    );
}

export default Footer;





