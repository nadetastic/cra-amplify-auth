import { useState } from 'react';
import secrets from '../secrets.json';
import { Auth } from 'aws-amplify';


const Home = () => {
    const [message,set_message] = useState('');

    const [USER_PENDING_SIGNIN,set_USER_PENDING_SIGNIN] = useState({});
    const [signInCode,set_signInCode] = useState('');

    const { username, password, code } = secrets;

    const signUp = async () => {
        try {
            const res = await Auth.signUp(username,password);
            console.log(res);
            set_message(JSON.stringify(res));
        } catch(err) {
            console.error(err);
            set_message(JSON.stringify(err));
        }
    }

    const confirmSignUp = async () => {
        console.log('user_pending',USER_PENDING_SIGNIN);
        try {
            const res = await Auth.confirmSignUp(username,code);
            console.log(res);
            set_message(JSON.stringify(res));
        } catch(err) {
            console.log(err);
            set_message(JSON.stringify(err));
        }
    }

    const sendAuthCodeAnswer = async () => {
        console.log('user_pending',USER_PENDING_SIGNIN)
        try {
            const res = await Auth.sendCustomChallengeAnswer(USER_PENDING_SIGNIN,signInCode);
            console.log(res);
            set_message(JSON.stringify(res));
            set_USER_PENDING_SIGNIN({});
        } catch(err) {
            console.log(err);
            set_message(JSON.stringify(err));
        }
    }

    const signIn = async () => {
        try {
            const res = await Auth.signIn(username,password);
            if(res.challengeName === 'CUSTOM_CHALLENGE'){
                set_USER_PENDING_SIGNIN(res);
            }
            console.log(res);
            set_message(JSON.stringify(res));
        } catch(err) {
            console.error(err);
            set_message(JSON.stringify(err));
        }
    }

    const signOut = async () => {
        try {
            await Auth.signOut();
            console.log('Signed Out');
            set_message('Signed Out');
        } catch(err) {
            console.error(err);
            set_message(JSON.stringify(err));
        }
    }
    return (
        <main>

            <div>
                <button onClick={signUp}>Sign Up</button><br/>
                <button onClick={confirmSignUp}>Confirm Sign Up</button>
            </div>
            <hr/>

            <div>
                <button onClick={signIn}>Sign In</button><br />
                {
                    USER_PENDING_SIGNIN.username && (
                        <>
                            <input placeholder="Verify Sign In" onChange={(e) => set_signInCode(e.target.value)}/><br />
                            {signInCode}<br />
                            <button onClick={sendAuthCodeAnswer}>Confirm Sign In</button>
                        </>
                    )
                }
                
                
            </div>
            <hr />
            <button onClick={signOut}>Sign Out</button>

            <p>{message}</p>
        </main>    
    );
}
 
export default Home;