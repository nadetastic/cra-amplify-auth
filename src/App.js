import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css"



import Home from './pages/Home';
import WithUI from './pages/WithUI';


Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH',
  mandatorySignIn: true
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ui" element={<WithUI />} />
        </Routes>
       
      </header>
    </div>
  );
}

export default App;
