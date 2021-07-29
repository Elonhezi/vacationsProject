import "./PleaseWait.css";
import loadingImage from "../../../assets/images/loadingAirplane.gif";

function PleaseWait(): JSX.Element {
    return (
        <div className="PleaseWait">
			<img alt="#" src={loadingImage} />
        </div>
    );
}

export default PleaseWait;
