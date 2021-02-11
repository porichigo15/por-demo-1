import { useEffect, useState } from 'react';
import liff from '@line/liff';
import logo from './logo.svg';
import './App.css';

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState();
  const [displayName, setDisplayName] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [userId, setUserId] = useState();

  const initLine = () => {
    liff.init({ liffId: '1655661573-l82jdqBN' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const style = {
    textAlign: "left",
    marginLeft: 50,
    wordBreak: "break-all",
    marginRight: 50
  }

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h1>React with LINE Login</h1>
          <hr></hr>
          <img src={pictureUrl} width="300px" height="300px"/>
          <p style={style}><b>id token: </b> {idToken}</p>
          <p style={style}><b>display name: </b> {displayName}</p>
          <p style={style}><b>status message: </b> {statusMessage}</p>
          <p style={style}><b>user id: </b> {userId}</p>

          <button onClick={() => logout()} style={{ width: "100%", height: 30, marginBottom: 20 }}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;
