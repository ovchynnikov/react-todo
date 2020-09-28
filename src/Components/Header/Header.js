import React from 'react';
import userImage from '../../images/userImage.svg'
import './Header.css';

export default function Header(){
    let userEmail = localStorage.getItem('userEmail').split('@')[0]
    let userEmailEdited = userEmail.charAt(0).toUpperCase() + userEmail.slice(1)
    return (<>
        <header className='titleHeader'><h1><span>Just</span>  do it already</h1><p>Hello, {userEmailEdited}!</p><img className="userImage" src={userImage} alt="user Pic"/></header>
    
        </>
    )
}