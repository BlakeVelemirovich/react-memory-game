function Scores(props) {
    return (
        <div className="scores">
            <h4 className="score">Current Score: {props.score}</h4>
            <h4 className="high-score">High Score: {props.highScore}</h4>
        </div>
    );
}

export default Scores;