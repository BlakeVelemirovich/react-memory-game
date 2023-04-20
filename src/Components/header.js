import Scores from "./scores";

function Header(props) {
    return (
        <div className="header">
            <h1>Pokemon Memory Game</h1>
            <Scores score={props.score} highScore={props.highScore} />
        </div>
    );
}

export default Header;