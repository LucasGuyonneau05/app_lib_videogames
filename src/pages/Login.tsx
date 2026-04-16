import { useAuth } from '../stores/authStore';
import '../index.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';

function Login() {

    return (
        <>
            <div>
                <NavBar/>
                <LoginFields/>
            </div>
        </>
    )
}

function LoginFields ({}) {
    const { login, user } = useAuth();
    const [ emailValue, setEmailValue ] = useState("");
    const [ passValue, setPassValue ] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(emailValue, passValue);
        }
        catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col justify-center w-full mt-5 max-w-xs mx-auto">
            <label>Email:</label>
            <input className="pl-2 border border-slate-200 rounded-md" name="mail" type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)}/>
            <br/>
            <label>Password:</label>
            <input className="pl-2 border border-slate-200 rounded-md" name="pass" type="password" value={passValue} onChange={(e) => setPassValue(e.target.value)}/>
            
            <div className='flex items-start mt-5'>
                <button className="text-white bg-black box-border border border-transparent p-1 rounded-md" type='button' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;