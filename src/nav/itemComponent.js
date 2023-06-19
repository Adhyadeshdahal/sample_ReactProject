import React from 'react';
import ReactDOM from 'react-dom';
import "./app.css";
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

function Items({name}) {
    return (
        <NavLink to={name=="movies"?"/":name} className='item' style={{textDecoration: 'none'}}>
            {name}
        </NavLink> 
    
     );
}

export default Items;
