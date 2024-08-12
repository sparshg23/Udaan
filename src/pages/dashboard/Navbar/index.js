import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';




const Navbar = () => {
return (
	<>
	<Nav>
        
		<Bars />
        <a style={alogo}  href='/' > <img style={logo} src='./logo.png' alt='logo' /></a>

		<NavMenu>
        
        <NavLink to='/utse' >
			About
		</NavLink>
		<NavLink to='/ca' >
			Why
		</NavLink>
		<NavLink to='/events' >
			Responsiblities
		</NavLink>
		<NavLink to='/team' >
			Perks
		</NavLink>
		<NavLink to='/sponsors' >
			
		</NavLink>
		<NavLink to='/gallary' >
			Gallary
		</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn  style={register}>
		<NavBtnLink to='/' onClick={()=>{ alert('Registration Will Open Soon'); }} >Register</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

const logo = {
    display: "inline-block",
    height : "100%",
    
    
  }


  

  const register = {
    paddingRight: '2rem'
  }

  const alogo = {
    paddingLeft: '3rem'
  }


export default Navbar;
