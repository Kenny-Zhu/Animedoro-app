
import { signInWithGoogle, signOutWithGoogle } from "../Firebase"
function Title(props) {

    const handleSignIn = async () => {
        await signInWithGoogle();
        props.setIsSignedIn(true);
      };
    
    const handleSignOut = async () => {
        await signOutWithGoogle();
        props.setIsSignedIn(false);
    }
    return (
        <div className="titleContainer">
        <header className="TitleW">
            <h1 className="Headerski">Animedoro</h1>
             <button onClick={handleSignIn}>Sign In With Google</button>
             <button onClick={handleSignOut}>Sign Out</button>
            <h1>{localStorage.getItem("name")}</h1>
            <h1>{localStorage.getItem("email")}</h1>
            <img src = {localStorage.getItem("pfp")} />
        </header>
        </div>
    )
}

export default Title