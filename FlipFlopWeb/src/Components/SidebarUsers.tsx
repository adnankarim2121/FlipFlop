import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Header from './Header';
import { googleLogout } from '@react-oauth/google';
import { GoGear } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbFlipFlops } from "react-icons/tb";
function SidebarUsers()
{
    return(
<div>
<div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
<Header/>
<Sidebar collapsed={true}>
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
        backgroundColor:'white'
      },
    }}
  >
    <MenuItem icon={<TbFlipFlops/>} component={<Link to="/homePage" />} title="Communities"> Communities</MenuItem>
    <MenuItem icon={<GoGear />} disabled={true} component={<Link to="/todo" />} title="Settings"> Settings</MenuItem>
    <MenuItem icon={<RiLogoutCircleLine />} component={<Link to="/" />} onClick={() => googleLogout()} title="Logout">  Logout</MenuItem>
  </Menu>
</Sidebar>
</div>
</div>
    );
}

export default SidebarUsers
