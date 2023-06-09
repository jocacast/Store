import {signInWithGooglePopup,createUserDocumentFromAuth }from '../../utils/firebase/firebase.utils'
const SignIn = ()=> {
    const logInGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const {user} = response;
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }
    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logInGoogleUser}>Sign in with Google</button>
        </div>
        
    )
}

export default SignIn;