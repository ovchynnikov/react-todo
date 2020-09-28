import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
    state = {
        isOpen: true
    }

   
    render(){
        let userEmail = localStorage.getItem('userEmail').split('@')[0]
        let userEmailEdited = userEmail.charAt(0).toUpperCase() + userEmail.slice(1)
        
        return (
            <React.Fragment>
                {/*<button onClick={() => this.setState({ isOpen:true })}>Open Modal</button>*/}
                {this.state.isOpen && (<div className="modal">
                    <div className="modal-body">
                        <h1>Welcome to the day-planner app, {userEmailEdited} :)</h1>
                        <h3>Make to-do list and do it already!</h3>
                        <h4><strong>Note: </strong><i>You can refresh page, logout and close the browser - Todo list will be safe</i></h4>
                        <h5><i>Todo list stores in your browser. So no one could see it</i></h5>

                        <button className="modalCloseButton" onClick={() => this.setState({ isOpen: false})}>Next</button>
                    </div>
                </div>)}
            </React.Fragment>
            
        )
    }
}