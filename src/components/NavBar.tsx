import '../index.css'
import { useAuth } from '../stores/authStore';
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <>
            <div>
                <Bar />
            </div>
        </>
    )
}

function Bar({ }) {

    return (
        <div className='flex bg-purple-800 fixed w-full top-0'>
            <NavMain/>
            <NavAuth />
        </div>
    );
}

function NavAuth({ }) {
    const { user, logout } = useAuth();

    if (user == null) {
        return (
            <div className='flex w-50 justify-end m-3 mr-10'>
                <Link className="text-white" to={{ pathname: '/register' }}>Register</Link>
                <Link className="ml-5 text-white" to={{ pathname: '/login' }}>Login</Link>
            </div>
        );
    }
    else {
        return (
            <div className='flex w-full justify-end m-3 mr-10'>
                <button className="text-white" onClick={logout}>Logout</button>
            </div>
        );
    }
}

function NavMain({ }) {
    return (
        <div className='flex w-full justify-start m-3'>
            <Link className="ml-10 text-white" to={{pathname: '/'}}>Game Library</Link>
        </div>
    );
}
export default NavBar;