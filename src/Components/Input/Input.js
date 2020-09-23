import React from 'react';
import './Input.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched

}


const Input = props => {
    const cls = ['Input']
    const htmlFor = `${Math.random()}`

    if (isInvalid(props)) {
        cls.push('invalid')
    }
 
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}> {props.label} </label>
            <input 
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange}
            />
        { isInvalid(props) ? <span>{props.errorMessage || 'Incorrect value'}</span> : null }
          
        </div>
    )
}

export default Input;