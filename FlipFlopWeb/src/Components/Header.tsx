import flipFlopLogo from '../assets/flipFlopTransparent.png'
function Header ()
{
    return(
        <img src={flipFlopLogo} alt="Image" style={{ maxWidth: '10%', maxHeight: '10%', objectFit: 'contain' }} />
    )
}

export default Header;