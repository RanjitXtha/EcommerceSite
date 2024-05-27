import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        }catch(err){
            console.log(err);
        }
        
    }

    return(
        <div>
        <h1>Login pages</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Send</button>
        </form>
        </div>
    )
}

export default Login;



