import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import Spotlight from './Spotlight';
import { Link } from 'react-router-dom';
import { RiMenu4Fill } from "react-icons/ri";


interface HeaderProps {
  userProfile: UserProfile;
  toggleFilters: () => void;
  updateMoodData: (data: any) => void;
  onNavClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, toggleFilters, updateMoodData, onNavClick }) => {
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const toggleSpotlight = () => {
    setIsSpotlightOpen(prevState => !prevState);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.tagName === 'INPUT') {
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      toggleSpotlight();
    } else if (event.key === 'Escape' && isSpotlightOpen) {
      setIsSpotlightOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const spotifyPlaylists = JSON.parse(localStorage.getItem('spotifyPlaylists') || '[]');
    if (spotifyPlaylists.length === 0) {
      setIsSpotlightOpen(true);
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, []);

  return (
    <>
      <Spotlight isOpen={isSpotlightOpen} toggleSpotlight={toggleSpotlight} updateMoodData={updateMoodData} locked={locked} setLocked={setLocked} />
      <div className='header'>
        <div className="logo">
          {
            isMobile && isLoggedIn &&
            <RiMenu4Fill onClick={onNavClick} />
          }
        <Link to="/">
        <svg width="100%" height="100%" viewBox="0 0 1367 835" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <use xlink:href="#_Image1" x="305" y="24" width="1061px" height="740px"/>
        <g transform="matrix(1.53803,0,0,1.53803,-89.2959,-294.8)">
        <text x="119.115px" y="686.243px" style="font-family:'ArchivoBlack-Regular', 'Archivo Black', sans-serif;font-size:144px;fill:white;">DJ<tspan x="323.443px 371.396px 473.49px 577.482px " y="686.243px 686.243px 686.243px 686.243px ">.ATL</tspan>5D</text>
        </g>
        <defs>
        <image id="_Image1" width="1061px" height="740px" xlink:href="data:image/png;base64,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rrjiiuoII+PQoUMbbePLk9xdmQUAGG3j9TEUjLd/n+RPqkMA7JBPJfm96hAAwGhTSsDOaZM8f9euXevVQQC20549e9aTPD9JrzoLADDalBKws772zGc+8/bqEADb6cYbb/xKkq9W5wAARp9SAnbYVVddNV+dAWA7Pe1pT+tUZwAAxoNSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlAAAAABKKCUAAACAEkoJAAAAoIRSAgAAACihlICdN18dAGCbGecAgAuilICdd3t1AIBt9uXqAADAeFBKwM77QnUAgG32+eoAAMB4UErAzvtKdQCAbfbV6gAAwHhQSsAOa5pmPcmx6hwA2+TYYJwDADgvpQTU+G/VAQC2yQeqAwAA40MpATVuqg4AsE1uqg4AAIwPpQQUaJrmSJLvVecA2GJ3Nk1zR3UIAGB8KCWgzvOrAwBssaurAwAA40UpAUWapvlQ3DYPmBx/1jTNH1eHAADGi1ICaj0rSa86BBfFXQV2ht/zeFlP8g+rQwAA40cpAYWaprkryauqc3Dher3evdUZpkGv17uvOgMX5VVN03y/OgQA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"/>
        </defs>
        </svg>

          </Link>
        </div>
        <div className="header-right">
          <button onClick={toggleSpotlight}>Create Playlists</button>
          {
            !isMobile &&
            <div 
              className="user-image"
              style={{ backgroundImage: `url(${userProfile.images[0]?.url})` }}>
            </div>
          }
          
        </div>
      </div>
    </>
  );
};

export default Header;
