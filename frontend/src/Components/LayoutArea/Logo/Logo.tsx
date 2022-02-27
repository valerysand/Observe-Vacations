import "./Logo.css";
import logoImage from "../../../Assets/logo.png";

function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logoImage} alt="Logo" />
            <h1>Observe Vacations</h1>

        </div>
    );
}

export default Logo;
