import { useState } from 'react';
import secrets from '../secrets.json';
import { Auth } from 'aws-amplify';


const Home = () => {
    const [message,set_message] = useState('');

    const { username, password, code} = secrets;

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
        try {
        const res = await Auth.confirmSignUp(username,code);
        console.log(res);
        set_message(JSON.stringify(res));
        } catch(err) {
        console.log(err);
        set_message(JSON.stringify(err));
        }
    }

    const signIn = async () => {
        try {
        const res = await Auth.signIn(username,password);
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
            <p>{message}</p>
            <button onClick={signUp}>Sign Up</button>
            <button onClick={confirmSignUp}>Confirm Sign Up</button>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signOut}>Sign Out</button>
        </main>    
    );
}
 
export default Home;