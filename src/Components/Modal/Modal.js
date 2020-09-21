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
                        <button className="modalCloseButton" onClick={() => this.setState({ isOpen: false})}>Close</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}