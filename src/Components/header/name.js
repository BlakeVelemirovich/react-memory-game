import myImage from './151.png'

function AppName () {
    return(
        <div className='app-name'>
            <p>Pokemon Memory Game</p>
            <img src={myImage} />
        </div>
    );
}

export default AppName;