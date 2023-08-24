import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthURL, playSpotifyPlaylist } from '../services/api-service';
import { AppState } from '../model/state';
import { setSpotifyPlaylistsAction } from '../model/actions';
import { FaPlay, FaSpotify } from 'react-icons/fa';
import { SpotifyPlayer } from '../component/SpotifyPlayer';

const Browse: React.FC = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state: AppState) => state.spotifyPlaylists);
  const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn);
  const accessToken = localStorage.getItem('spotifyToken');
  const [playlistPlayed, setPlaylistPlayed] = useState(false);

  const playPlaylist = (playlistURI: string) => {
    if (accessToken) {
      playSpotifyPlaylist(playlistURI, accessToken)
        .then(() => {
          console.log("Playing playlist:", playlistURI);
          setPlaylistPlayed(prev => !prev); // Toggle the state
        })
        .catch(error => {
          console.error("Error playing playlist:", error);
        });
    } else {
      console.error("Access token is not available.");
    }
  };
  

  useEffect(() => {
    // On component load, check localStorage
    const storedPlaylists = localStorage.getItem('spotifyPlaylists');
    if (storedPlaylists) {
      // If playlists exist in localStorage, dispatch them to Redux
      dispatch(setSpotifyPlaylistsAction(JSON.parse(storedPlaylists)));
    }
  }, [dispatch]);

  useEffect(() => {
    // When playlists change, update localStorage
    if (Array.isArray(playlists)) {
      localStorage.setItem('spotifyPlaylists', JSON.stringify(playlists));
    }
  }, [playlists]);

  useEffect(() => {
    console.log("Browse component mounted");
}, []);
  


  const handleLogin = () => {
    window.location.href = getAuthURL();
  }

  return (
    <div className='browse-grid'>
      {!isLoggedIn &&
      <div className="login">
         <button className='spotify-login' onClick={handleLogin}><FaSpotify /> Connect with Spotify</button> 
      </div> 
      }
      {isLoggedIn &&
      <div className="row four">
      {Array.isArray(playlists) && playlists.map((playlist: any) => (
        <div className="column" key={playlist.id}>
          <div 
            style={{
              width: '100%',
              paddingBottom: '100%',
              backgroundImage: `url(${playlist?.images?.[0]?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="controls">
            <button onClick={() => playPlaylist(playlist.uri)}>
              <FaPlay size={13} color='#202020' />
            </button>
            <h4>{playlist?.name}</h4>
          </div>
        </div>
      ))}
      </div>}
      {accessToken && isLoggedIn && <SpotifyPlayer accessToken={accessToken} playlistPlayed={playlistPlayed} />}
    </div>
  );
};

export default Browse;