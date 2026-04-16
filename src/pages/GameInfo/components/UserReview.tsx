import { useParams } from "react-router-dom";
import { useAuth } from "../../../stores/authStore";
import { useGame } from "../../../stores/GameStore";
import { useEffect } from "react";
import MakeReview from "./MakeReview";

function UserReview({ }) {
  const { id } = useParams();
  const { user } = useAuth();
  const { userReviews, fetchUserReview, deleteReview } = useGame();

  useEffect(() => {
    if (id && user) {
      fetchUserReview(id, user);
    }
  }, [id])

  const handleDeleteReview = async (idGame: string) => {

    if (user) {
      try {
        await deleteReview(idGame, user);
        await fetchUserReview(idGame, user);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  const handleSendUserReview = async () => {
    try {
      if (id && user) {
        await fetchUserReview(id, user);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  if (user) {
    return (
      <div className='w-full'>
        {userReviews.length > 0 ? (
          userReviews.map((review) => {
            const date = review.date?.seconds
              ? new Date(review.date.seconds * 1000)
              : null;

            const formattedDate = date
              ? date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              : "Date inconnue";

            return (
              <div key={review.id} className='mb-4'>
                <p className='mb-2'>Your review:</p>
                <div className='p-2 w-full rounded-xs max-w-md border'>
                  <div className='mb-8'>
                    <p className='float-left'>{formattedDate}</p>
                    <p className='float-right'>{review.score}/5</p>
                  </div>
                  <p className='clear-both break-words'>{review.message}</p>
                </div>
                <button className="text-white bg-black box-border border border-transparent pl-1 pr-1 mt-2 rounded-md" onClick={() => handleDeleteReview(review.game)}>Delete</button>
              </div>
            );
          })
        ) : (
          <div className='mb-4'>
            <MakeReview onReviewAdded={handleSendUserReview} />
          </div>
        )}
      </div>
    );
  }
  else {
    return (
      <div className='mb-10'>
        <p>Please login to make a review.</p>
      </div>
    );
  }


}

export default UserReview;