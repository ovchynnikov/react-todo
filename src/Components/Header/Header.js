import React from 'react';
import userImage from '../../images/userImage.svg'
import './Header.css';

export default function Header(){
        // localStorage.setItem('userEmail', 'user@gmail.com')
        if(localStorage.getItem('userEmail') !== null){
            let userEmail = localStorage.getItem('userEmail').split('@')[0]
            let userEmailEdited = userEmail.charAt(0).toUpperCase() + userEmail.slice(1)
            return (<>
                <header className='titleHeader'><h1><span>Just</span>  do it already</h1>
                    <div>
                     
                     <img className="userImage" src={userImage} alt="user Pic"/>
                     <p>Hello, {userEmailEdited}!</p>  
                    </div>
                </header>
                </>
            )
        } else {
            return (
            <header className='titleHeader'><h1><span>Just</span>  do it already</h1>
              <div>
                <img className="userImage" src={userImage} alt="user Pic"/>
                <p>Hello, user!</p> 
              </div>
            </header>
        )
    }
    
    
}