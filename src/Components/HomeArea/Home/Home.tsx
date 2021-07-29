import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import logoAirplaneImage from "../../../assets/images/destinationAir.gif";
import "./Home.css";


function Home(): JSX.Element {

  
    return (
        <div className="Home">
            <img src={logoAirplaneImage} alt="@" />
            <div className="ContainerCards">
                <Card className="CardBox Box">
                    <CardHeader className="CardHeaderBox" title="Project Description"/>
                    <CardContent>
                        <Typography paragraph>
                            This is a vacation site where the user is required to register/login to the site.<br/>
                            After verifying the user's account- a user may view and follow the available vacations.<br/>
                            The webmaster is authorized to perform actions on the site: add / edit / delete a vacation.<br/>
                            Admin can watch the number of followers of each vacation graphical. User can see changes made by the admin in real time.
                        </Typography>
                    </CardContent>
                </Card>
                
                <Card className="CardBox Box">
                    <CardHeader className="CardHeaderBox" title="Technologies:" />
                    <CardContent className="CardBodyBox">
                        <Typography paragraph>
                            - React <br/>
                            - Redux<br/>
                            - REST API<br/>
                            - NodeJS<br/>
                            - Socket.io <br/>
                            - MySQL<br/> 
                            - Material-UI<br/>
                            - Bootstrap<br/>
                            - VictoryCharts<br/>
                            - CSS<br/>                       
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="CardBox Box">
                    <CardHeader className="CardHeaderBox" title="About me" />
                    <CardContent>
                        <Typography paragraph>
                            <span><strong> Full Name - Elon Hezi </strong></span>
                            I'm 25 years old,<br/>
                            <strong>FullStack Developer.<br/></strong>
                            Undergraduate student in management information systems.<br/>
                            <br/>
                            <strong>Graduate of Professional Courses:</strong> Full Stack Development, QA.
                            <br/>
                            <br/>
                            I have served in the IDF for the past five years.<br/>
                            <br/>
                            <br/>
                            <strong>Technologies:<br/></strong>
                            HTML, CSS3, JAVASCRIPT, TYPESCRIPT, JQUERY, AJAX, REACT, ANGULAR, Node.js, MYSQL, PYTHON.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="CardBox Box">
                    <CardHeader className="CardHeaderBox" title="Contact Us:" />
                    <CardContent>
                        <Typography paragraph>
                            <span><strong> Email: </strong> elhezi119@gmail.com <br/></span>
                            <span>Attached at the bottom of the page are links to my LinkedIn / GitHub profile</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Home;
