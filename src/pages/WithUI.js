import { Authenticator } from "@aws-amplify/ui-react";

const WithUI = () => {
    return ( 
        <Authenticator>
            {({signOut,user}) => (
                <main>
                    <h1>Hello {user.username}</h1>
                    <button onClick={signOut}>Sign Out</button>
                </main>
            )}
        </Authenticator>
     );
}
 
export default WithUI;