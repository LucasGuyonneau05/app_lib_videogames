import { useParams } from "react-router-dom";
import { useAuth } from "../../../stores/authStore";
import { useGame } from "../../../stores/GameStore";
import { useEffect } from "react";
import heart from '../../../assets/heart.png'
import heart_filled from '../../../assets/heart_filled.png'


function LikeButton() {
  const { id } = useParams();
  const { user } = useAuth();
  const { gameLikes, fetchLikesByGameId, isLiked, isLikedByUser, likeGame, unlikeGame, resetIsLiked } = useGame();

  useEffect(() => {
    if (id) {
      fetchLikesByGameId(id);
      if (user) {
        isLikedByUser(id, user);
      }
      else {
        resetIsLiked();
      }
    }
  }, [id, user])

  const handleLikeGame = async () => {
    if (id && user) {
      if (isLiked == true) {
        await unlikeGame(id, user);
      }
      else {
        await likeGame(id, user);
      }

      await fetchLikesByGameId(id);
    }
  }

  if (!user) {
    return (
      <div className='flex items-start w-full mt-2 max-w-md mx-auto'>
        <input className="w-7 h-7" type='image' src={isLiked ? heart_filled : heart} onClick={handleLikeGame} disabled={true} />
        <p>{gameLikes}</p>
      </div>
    )
  }
  else {
    return (
      <div className='flex items-start w-full mt-2 max-w-md mx-auto'>
        <input className="w-7 h-7" type='image' src={isLiked ? heart_filled : heart} onClick={handleLikeGame} />
        <p>{gameLikes}</p>
      </div>
    )
  }

}

export default LikeButton;