import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from "react";
import store from "../../../Redux/Store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    
    useEffect(() => {
        refreshConnecting();
    });    

    // connect the socket of the user, every refresh page while the user is still connected: 
    const refreshConnecting = () => {
        const  refresh = window.performance.navigation.type;
        const isUserConnect = store.getState().authState.user;
        if (refresh && isUserConnect) {
            store.getState().authState.vacationsSocket.connect();
        }
    }

    return (
        <div className="Header">
            <Container  fluid="md">
                <Row>
                    <Col xs={1} md={2} lg={2}><Logo/></Col>
                    <Col xs={11} md={6} lg={6}><h1>Dream vacations</h1></Col>
                    <Col xs={12} md={4} lg={4}><AuthMenu/></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
