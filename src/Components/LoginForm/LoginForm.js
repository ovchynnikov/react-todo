import React, { Component } from 'react';
import Input from '../Input/Input'
import '../../index.css'
import Axios from '../../axios/axios-todo';
import './LoginForm.css'

const REACT_APP_FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

function validateEmail(email) {
    const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexpEmail.test(String(email).toLowerCase());
}
/*  easy library to use -- is_js  with email func. Example: is.email(value) */

// https://console.firebase.google.com/   to get your API key //

    class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                label: 'Email',
                errorMessage: 'Incorrect email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                label: 'Password',
                errorMessage: 'Incorrect password. Enter at least 6 chars',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLegth: 6
                }
            }
        }
    }

    loginHandler = (email, password) => {
        
        const oldToken = localStorage.getItem('token')
        if (oldToken !== null | undefined){
            this.props.autoLogin()
        }
            return async () => {
                const authData = {
                    email,
                    password,
                    returnSecureToken: true
                }
                   let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_FIREBASE_KEY}`

                const response = await Axios.post(url, authData)

                const data = response.data

                if(data.idToken !== undefined && data.registered === true) {
                    this.props.onLogin()
                    localStorage.setItem('userEmail', data.email)                 
                }
                localStorage.setItem('token', data.idToken)
                window.location.reload();
            }
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation){
            return true
        } 

        let isValid = true
        if (validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email){
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLegth){
            isValid = value.length >= validation.minLegth && isValid
        }

        return isValid

    }

    onChangeHandler = (event, controlName) => {
        
        
        /*  below valiables using spread operator make copy of object to prevent mutation of original objects (state)*/
        const formControls = { ...this.state.formControls} 
        const control = { ...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        /* control variable has changed values, let's update local formControls */
        formControls[controlName] = control;

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }


    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            
            return(
                <Input 
                  key={controlName + index}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  label={control.label}
                  shouldValidate={!!control.validation}
                  errorMessage={control.errorMessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                />
                
            )

        })
    };


    render() {
        return (
            <div className='Auth'>
                <div>
                   <h2>Auth page</h2>

                   <form onSubmit={this.submitHandler} className="AuthForm">
                   
                   {this.renderInputs()}

                       <button className="loginButton" 
                       type='success' 
                       onClick={this.loginHandler(this.state.formControls.email.value, this.state.formControls.password.value)}
                       disabled={!this.state.isFormValid}
                       > 
                       Login
                       </button>
                   </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;
