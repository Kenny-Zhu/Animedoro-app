import React from 'react'

function Header(props) {
  return (
    <div className="headerContainer">
            <nav className="navbar">
                <ul className="navbar-links">
                    <li className="studyButton" onClick={() =>  {
                        props.setIsActive(false);
                        props.setStudying(true);}}>Study</li>
                    <li className="breakButton" onClick={() =>  {
                        //props.setIsActive(true);
                        props.setStudying(false);}}>Break</li>
                </ul>
            </nav>
    </div>
  )
}

export default Header