import '../index.css'
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useGame } from '../stores/GameStore';

function GameList() {

    return (
        <>
            <div>
                <NavBar />
                <List />
            </div>
        </>
    )
}

function List({ }) {
    const { gameList, fetchAllGames } = useGame();

    fetchAllGames();

    return (
        <div className="w-full max-w-screen-xl px-4">
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 m-5 gap-y-5'>
                {gameList.map(game => (
                    <div key={game.id} className="flex justify-center">
                        <Link className="inline-block" to={{ pathname: `/games/${game.id}` }} >
                            <img key={game.id} className='w-48 h-50 object-fill' src={game.img} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameList
