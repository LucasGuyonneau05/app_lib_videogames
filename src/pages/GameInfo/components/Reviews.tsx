import { useParams } from "react-router-dom";
import { useAuth } from "../../../stores/authStore";
import { useGame } from "../../../stores/GameStore";
import { useEffect } from "react";

function Reviews() {
  const { id } = useParams();
  const { user } = useAuth();
  const { reviewList, fetchReviewsByGameId } = useGame();

  useEffect(() => {
    if (id) {
      fetchReviewsByGameId(id, user);
    }
  }, [id, user])

  return (
    <div className='w-full'>
      {reviewList.length > 0 ? (
        reviewList.map((review) => {
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
            <div key={review.id} className='p-2 w-full mb-2 rounded-xs max-w-md border'>
              <div className='mb-8'>
                <p className='float-left'>{formattedDate}</p>
                <p className='float-right'>{review.score}/5</p>
              </div>
              <p className='clear-both break-words'>{review.message}</p>
            </div>
          );
        })
      ) : (
        <p>No reviews</p>
      )}
    </div>
  )
}

export default Reviews;