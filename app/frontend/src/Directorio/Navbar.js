import React , {Component} from 'react'
import { NavLink } from 'react-router-dom'
import '../CSS/App.css';

class Navbar extends Component{
  render() {
    return (
        <div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/secretarios">Secretarios</NavLink></li>
                <li><NavLink to="/concejales">Concejales</NavLink></li>
            </ul>
        </div>
    )
    
  }
}

export default Navbar;