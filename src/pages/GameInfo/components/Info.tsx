import { useParams } from "react-router-dom";
import { useGame } from "../../../stores/GameStore";
import { useEffect } from "react";


function Info() {
  const { id } = useParams();
  const { game, fetchGameById } = useGame();

  useEffect(() => {
    if (id) {
      fetchGameById(id);
    }
  }, [id]);

  if (!game || game.id != id) {
    return <div className="flex flex-col items-center justify-center w-full mt-5 max-w-md mx-auto">Loading...</div>;
  }

  const timestampInSeconds = game.date.seconds;
  const date = timestampInSeconds ? new Date(timestampInSeconds * 1000) : null;
  const formattedDate = date ? date.toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) : "Unknown";

  let genreList = game.genre.join(", ");

  return (
    <div key={game.id}>
      <div className="flex flex-col items-center justify-center w-full mt-5 max-w-md mx-auto">
        <img className="w-48 h-50" src={game.img} />
      </div>
      <div className="flex flex-col items-start justify-center w-full mt-5 max-w-md mx-auto">
        <p><b>Name:</b> {game.title}</p>
        <p className='w-50'><b>Description:</b> {game.desc}</p>
        <p><b>Publisher:</b> {game.publisher}</p>
        <p><b>Release date:</b> {formattedDate}</p>
        <p><b>Genres:</b> {genreList}</p>
      </div>
    </div>

  );
}

export default Info;