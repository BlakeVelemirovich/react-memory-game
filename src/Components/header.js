import Scores from "./header/scores";
import AppName from "./header/name";
import myImage from './header/151.png'

function Header(props) {
    return (
        <div className="header">
            <AppName />
            <Scores score={props.score} highScore={props.highScore} />
        </div>
    );
}

export default Header;