import flipFlopLogo from '../assets/flipFlopTransparent.png'
import { Link } from 'react-router-dom'; 
function Header ()
{
    return(
        <Link to="/">
            <img src={flipFlopLogo} alt="Image" style={{ maxWidth: '50%', maxHeight: '10%', objectFit: 'contain', paddingLeft:20 }} />
        </Link>
    )
}

export default Header;