import myImage from './151.png'

function AppName () {
    return(
        <div className='app-name'>
            <img src={myImage} />
            <p>Pokemon Memory Game</p>
        </div>
    );
}

export default AppName;