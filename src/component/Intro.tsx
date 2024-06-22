import { useState, useEffect } from 'react';
import bg from '../assets/bg.png';
import { fetchUserProfile } from '../services/auth-service';
import { setLoggedInAction } from '../store/actions';
import './Intro.css';
import { FaHeadphones, FaSpotify } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface IntroProps {
  loggedIn?: boolean;
  sunCalcData?: any;
  weatherData?: any;
  handleLogin: () => void;
}

export const Intro: React.FC<IntroProps> = ({handleLogin}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const goToBrowse = () => {
    navigate('/browse');
  }

  useEffect(() => {
    const token = localStorage.getItem('spotifyToken');
    if (token) {
      fetchUserProfile(token, setLoggedInAction).then(user => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
    }
  }, []);

  return (
    <>
      <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.8)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
      className={isAuthenticated ? 'intro logged-in' : 'intro'}>
        <div>
          <svg className='logo' width="250px" viewBox="0 0 1367 835" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_220_60" maskUnits="userSpaceOnUse" x="0" y="0" width="1367" height="821">
            <path d="M1367 0H0V820.381H1367V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_220_60)">
            <path d="M817.965 272.39C830.335 272.39 840.375 280.644 840.375 293.026V334.298V416.843V458.116C840.375 468.433 830.335 478.752 817.965 478.752H795.554V437.479V313.663V272.39H817.965Z" fill="white"/>
            <path d="M817.965 478.753C830.335 478.753 840.375 468.434 840.375 458.117V416.844V375.572H795.554V437.48V478.753H817.965Z" fill="white"/>
            <path d="M549.035 272.39C536.658 272.39 526.625 280.644 526.625 293.026V334.298V416.843V458.116C526.625 468.433 536.658 478.752 549.035 478.752H571.446V437.479V313.663V272.39H549.035Z" fill="white"/>
            <path d="M459.393 189.845V233.181C446.252 237.308 436.982 247.627 436.982 262.072C436.982 278.582 452.033 293.027 470.598 293.027H471.999L526.625 379.698V323.981L498.612 278.58C502.236 274.453 504.214 268.263 504.214 262.072C504.214 247.627 494.945 237.308 481.804 233.181V189.845H459.393Z" fill="black"/>
            <path d="M571.446 251.754V293.026V458.116V499.388H593.857H605.063C623.627 499.388 638.679 484.943 638.679 468.434V427.162V416.843V375.571V334.298V323.981V282.709C638.679 264.135 623.627 251.754 605.063 251.754H593.857H571.446Z" fill="black"/>
            <path d="M571.446 499.389V458.117V375.572H638.679V416.844V427.163V468.434C638.679 484.944 623.627 499.389 605.063 499.389H593.857H571.446Z" fill="var(--dark-highlight)"/>
            <path d="M593.857 251.754H549.035V499.388H593.857V251.754Z" fill="white"/>
            <path d="M661.089 24.7542C572.822 22.6905 486.471 84.5997 445.385 177.462C437.197 208.417 478.845 222.86 488.105 193.97C523.198 121.743 591.864 76.3446 661.089 76.3446H705.91C775.138 76.3446 843.803 121.743 878.899 193.97C888.155 222.86 929.794 208.417 921.613 177.462C880.535 84.5997 794.187 22.6905 705.91 24.7542H661.089Z" fill="black"/>
            <path d="M795.554 251.754V293.026V458.116V499.388H773.144H761.937C743.382 499.388 728.321 484.943 728.321 468.434V427.162V416.843V375.571V334.298V323.981V282.709C728.321 264.135 743.382 251.754 761.937 251.754H773.144H795.554Z" fill="black"/>
            <path d="M795.554 499.389V458.117V375.572H728.321V416.844V427.163V468.434C728.321 484.944 743.382 499.389 761.937 499.389H773.144H795.554Z" fill="var(--dark-highlight)"/>
            <path d="M773.144 251.754H817.965V499.388H773.144V251.754Z" fill="white"/>
            <path d="M661.089 55.7095C575.836 55.7095 492.907 113.491 450.289 200.163C460.552 212.544 481.739 212.544 488.105 191.908C523.198 121.745 591.864 76.3457 661.089 76.3457H705.911C775.138 76.3457 843.804 121.745 878.899 191.908C885.263 212.544 906.442 212.544 916.706 200.163C874.103 113.491 791.161 55.7095 705.911 55.7095H661.089Z" fill="#282828"/>
            <path d="M549.035 478.753C536.658 478.753 526.625 468.434 526.625 458.117V416.844V375.572H571.446V437.48V478.753H549.035Z" fill="white"/>
            <path d="M593.857 375.572H549.035V499.389H593.857V375.572Z" fill="white"/>
            <path d="M817.965 375.572H773.143V499.389H817.965V375.572Z" fill="white"/>
            <path d="M907.607 189.845V233.181C920.74 237.308 930.018 247.627 930.018 262.072C930.018 278.582 914.957 293.027 896.402 293.027H895.012L840.375 379.698V323.981L868.388 278.58C864.758 274.453 862.786 268.263 862.786 262.072C862.786 247.627 872.064 237.308 885.196 233.181V189.845H907.607Z" fill="black"/>
            <path d="M481.804 262.072C481.804 264.808 480.623 267.433 478.522 269.368C476.42 271.303 473.57 272.39 470.598 272.39C467.627 272.39 464.776 271.303 462.675 269.368C460.574 267.433 459.393 264.808 459.393 262.072C459.393 259.335 460.574 256.711 462.675 254.776C464.776 252.841 467.627 251.754 470.598 251.754C473.57 251.754 476.42 252.841 478.522 254.776C480.623 256.711 481.804 259.335 481.804 262.072Z" fill="var(--primary)"/>
            <path d="M907.607 262.072C907.607 264.808 906.426 267.433 904.326 269.368C902.224 271.303 899.374 272.39 896.402 272.39C893.43 272.39 890.58 271.303 888.478 269.368C886.378 267.433 885.197 264.808 885.197 262.072C885.197 259.335 886.378 256.711 888.478 254.776C890.58 252.841 893.43 251.754 896.402 251.754C899.374 251.754 902.224 252.841 904.326 254.776C906.426 256.711 907.607 259.335 907.607 262.072Z" fill="var(--primary)"/>
            <path d="M12.7332 750.388V719.37C20.5145 725.068 28.4474 729.71 36.532 733.297C44.7176 736.779 51.5895 738.519 57.1476 738.519C62.9079 738.519 67.8597 737.042 72.003 734.088C76.1463 731.134 78.2179 727.6 78.2179 723.485C78.2179 719.265 76.8537 715.783 74.1252 713.04C71.4977 710.191 65.7375 706.13 56.8444 700.855C39.0584 690.515 27.3863 681.706 21.8283 674.426C16.3712 667.041 13.6427 659.023 13.6427 650.371C13.6427 639.189 17.786 630.062 26.0726 622.993C34.4604 615.925 45.2229 612.391 58.3603 612.391C72.003 612.391 85.9994 616.4 100.349 624.418V652.904C83.9782 642.565 70.5882 637.395 60.1793 637.395C54.8233 637.395 50.4779 638.609 47.143 641.035C43.9091 643.356 42.2922 646.468 42.2922 650.371C42.2922 653.747 43.7576 656.966 46.6883 660.025C49.72 663.085 54.9749 666.778 62.4532 671.103L72.3061 676.959C95.5492 690.674 107.17 705.866 107.17 722.535C107.17 734.457 102.674 744.269 93.6796 751.971C84.7867 759.566 73.3167 763.365 59.2698 763.365C50.9832 763.365 43.606 762.468 37.1384 760.675C30.6708 758.776 22.5356 755.347 12.7332 750.388ZM134.972 638.344L186.813 585.171V615.24H230.925V641.193H186.813V712.566C186.813 729.235 193.433 737.57 206.672 737.57C216.575 737.57 227.035 734.088 238.049 727.125V754.029C227.438 760.252 215.868 763.365 203.336 763.365C190.704 763.365 180.195 759.515 171.806 751.813C169.179 749.491 167.007 746.907 165.289 744.058C163.57 741.104 162.105 737.306 160.893 732.664C159.781 727.917 159.225 718.949 159.225 705.761V641.193H134.972V638.344ZM392.272 690.568H294.197C294.904 704.495 299.35 715.573 307.537 723.802C315.823 732.031 326.484 736.146 339.521 736.146C357.711 736.146 374.487 730.237 389.848 718.421V746.59C381.358 752.499 372.92 756.719 364.533 759.251C356.246 761.782 346.494 763.048 335.276 763.048C319.915 763.048 307.486 759.725 297.986 753.079C288.487 746.432 280.857 737.517 275.097 726.334C269.438 715.045 266.608 702.015 266.608 687.245C266.608 665.089 272.621 647.101 284.646 633.28C296.672 619.354 312.285 612.391 331.487 612.391C349.98 612.391 364.734 619.143 375.749 632.647C386.765 646.152 392.272 664.245 392.272 686.928V690.568ZM294.803 673.318H364.987C364.279 661.819 360.996 652.957 355.134 646.732C349.273 640.507 341.39 637.395 331.487 637.395C321.583 637.395 313.448 640.507 307.081 646.732C300.816 652.957 296.723 661.819 294.803 673.318ZM438.415 539.752H466.003V760.833H438.415V539.752ZM522.151 539.752H549.739V760.833H522.151V539.752ZM692.896 673.318V735.196C692.896 740.155 694.514 742.634 697.747 742.634C701.082 742.634 706.287 740.049 713.36 734.879V752.446C707.095 756.666 702.042 759.515 698.202 760.991C694.463 762.574 690.521 763.365 686.378 763.365C674.554 763.365 667.581 758.512 665.459 748.806C653.736 758.301 641.256 763.048 628.018 763.048C618.317 763.048 610.232 759.725 603.764 753.079C597.296 746.327 594.062 737.886 594.062 727.758C594.062 718.579 597.196 710.403 603.461 703.228C609.828 695.949 618.822 690.198 630.444 685.979L665.762 673.318V665.564C665.762 648.051 657.375 639.293 640.599 639.293C625.542 639.293 610.889 647.418 596.639 663.665V632.173C607.352 618.985 622.763 612.391 642.873 612.391C657.931 612.391 670.007 616.506 679.102 624.735C682.134 627.372 684.862 630.907 687.287 635.337C689.713 639.663 691.229 644.042 691.835 648.472C692.542 652.798 692.896 661.08 692.896 673.318ZM665.762 732.031V688.827L647.269 696.266C637.871 700.169 631.201 704.125 627.259 708.134C623.419 712.038 621.5 716.943 621.5 722.852C621.5 728.866 623.319 733.772 626.956 737.57C630.696 741.368 635.496 743.267 641.357 743.267C650.149 743.267 658.284 739.522 665.762 732.031ZM782.847 615.24V648.631L784.363 646.099C797.702 623.626 811.042 612.391 824.382 612.391C834.79 612.391 845.654 617.877 856.972 628.849L842.42 654.17C832.82 644.675 823.926 639.927 815.741 639.927C806.848 639.927 799.118 644.358 792.549 653.22C786.081 662.082 782.847 672.58 782.847 684.712V760.833H755.107V615.24H782.847ZM1006.19 655.12V760.833H978.452V679.807C978.452 663.665 976.38 652.429 972.237 646.099C968.095 639.663 960.869 636.446 950.561 636.446C944.801 636.446 939.495 637.817 934.644 640.56C929.895 643.303 924.438 648.156 918.273 655.12V760.833H890.685V615.24H918.273V634.388C932.32 619.723 946.064 612.391 959.505 612.391C977.19 612.391 990.883 621.147 1000.58 638.66C1015.34 620.936 1030.75 612.074 1046.82 612.074C1060.36 612.074 1071.48 617.244 1080.17 627.584C1088.95 637.923 1093.35 653.695 1093.35 674.901V760.833H1065.76V674.584C1065.76 662.452 1063.39 653.167 1058.64 646.732C1053.89 640.296 1047.07 637.079 1038.17 637.079C1026.76 637.079 1016.1 643.092 1006.19 655.12ZM1161.17 553.995C1165.72 553.995 1169.61 555.63 1172.85 558.901C1176.08 562.172 1177.7 566.181 1177.7 570.928C1177.7 575.57 1176.08 579.579 1172.85 582.956C1169.61 586.332 1165.72 588.019 1161.17 588.019C1156.93 588.019 1153.19 586.332 1149.96 582.956C1146.72 579.474 1145.1 575.464 1145.1 570.928C1145.1 566.498 1146.72 562.593 1149.96 559.217C1153.19 555.736 1156.93 553.995 1161.17 553.995ZM1147.53 615.24H1175.12V760.833H1147.53V615.24ZM1326.92 615.24H1362.24L1304.79 686.928L1366.33 760.833H1331.01L1287.2 708.61L1245.82 760.833H1211.1L1269.77 686.928L1211.1 615.24H1245.82L1287.2 665.248L1326.92 615.24Z" fill="white"/>
            </g>
          </svg>
        </div>
        <div>
        { isAuthenticated &&
        <>
        <h1 className='stellar'>Spotify Connected.</h1>
        <p>You're Stellar-ready. Launch the app below to start creating and playing.</p>
        </>
        }
          {!isAuthenticated &&
          <>
            <h1 className='stellar'>Finally, an AI that understands your eclectic music taste better than your friends.</h1>
            <p>Connect your Spotify account and start discovering personalized music mixes tailored just for you.</p>
            <div className='login-container'>
              <button className='spotify-login' onClick={handleLogin}><FaSpotify /> Connect with Spotify</button> 
            </div>
          </>
          }

          {isAuthenticated &&
          <div className='login-container'>
            <button className='get-started' onClick={goToBrowse}><FaHeadphones /> Launch App</button> 
          </div>
          }
        </div>
      </div> 
    </>
  );
}