function Scores(props) {
    return (
        <div className="scores">
            <h4>{props.score}</h4>
            <h4>{props.highScore}</h4>
        </div>
    );
}

export default Scores;