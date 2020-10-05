import React from 'react';
import github from '../../images/github.png';
import Lnkdn from '../../images/Lnkdn.png';

let githubUrl = "https://github.com/ovchynnikov/react-todo";
let linkedInUrl = "https://www.linkedin.com/in/oleksii-ovchynnikov-159675129/"

export default function Footer(){
    return (
    <footer><a href={githubUrl}><img src={github} alt="GitHub"></img>GitHub</a>
        <a href={linkedInUrl}><img className="lnkdin" src={Lnkdn} alt="LinkedIn"></img>LinkedIn</a>
    </footer>
    )
}