import '../../index.css'
import NavBar from '../../components/NavBar';
import Info from './components/Info';
import LikeButton from './components/LikeButton';
import Reviews from './components/Reviews';
import UserReview from './components/UserReview';

function GameInfo() {

  return (
    <>
      <div className="min-h-screen bg-lightgray">
        <NavBar />
        <div className="container mx-auto px-4 pb-10">
          <Info />
          <LikeButton />
          <div className='flex flex-col items-start w-full mt-2 mb-2 max-w-md mx-auto '>
            <UserReview />
            <p className='mb-3'>Reviews:</p>
            <Reviews />
          </div>
        </div>
      </div>
    </>
  )
}

export default GameInfo