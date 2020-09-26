import React from 'react';
import './Modal.css'

export default class Modal extends React.Component {
    state = {
        isOpen: true
    }
    render(){
        return (
            <React.Fragment>
                {/*<button onClick={() => this.setState({ isOpen:true })}>Open Modal</button>*/}

                {this.state.isOpen && (<div className="modal">
                    <div className="modal-body">
                        <h1>Welcome to the day-planner app!</h1>
                        <h3>Make your to-do list and be productive!</h3>
                        <h4><strong>Note: </strong><i>You can refresh page, logout and close browser - Todo list will be safe</i></h4>
                        <button className="modalCloseButton" onClick={() => this.setState({ isOpen: false})}>Next</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}