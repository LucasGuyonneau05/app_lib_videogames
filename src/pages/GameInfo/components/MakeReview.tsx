import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../stores/authStore";
import { useGame } from "../../../stores/GameStore";

interface MakeReviewProps {
  onReviewAdded: () => void
}

function MakeReview({ onReviewAdded }: MakeReviewProps) {
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewScore, setReviewScore] = useState(0);
  const { id } = useParams();
  const { user } = useAuth();
  const { createReview } = useGame();

  const handleSendReview = async () => {
    if (reviewDesc != "" && user && id) {
      await createReview(id, reviewDesc, reviewScore, user);
      if (onReviewAdded) {
        onReviewAdded();
      }
    }
  }

  return (
    <div>
      <p>You don't have a review made for this game yet, do you want to make one ?</p>
      <div className='p-2 w-full rounded-xs max-w-md'>
        <textarea className='p-2 w-full rounded-xs max-w-md' onChange={(e) => setReviewDesc(e.target.value)}></textarea>
        <label>Score: </label>
        <input className="w-10 pl-1" type='number' defaultValue={0} min="0" max="5" onChange={(e) => setReviewScore((parseInt(e.target.value)))}></input>
        <br />
        <button className='text-white bg-black box-border border border-transparent pl-1 pr-1 mt-2 rounded-md' onClick={handleSendReview}>Send</button>
      </div>
    </div>
  );
}

export default MakeReview;