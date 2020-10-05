import React, {forwardRef, useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// just variation how to style elements inside js
const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1%' 
    }
}
 const TodoItem = forwardRef(({ todo, index, onChange, priority }, ref) => {
/* in this empty {} we got value from App.js Context.Provider value={{ xxx }}  */
     const { removeItem, upPriority, downPriority } = useContext(Context);

     const classes = [];

     if(todo.completed){
         classes.push('done')
     }
    
    return (
         <li style={styles.li} ref={ref}>
            <button title="Up" className="sort-btn up-button" onClick={upPriority.bind(null, todo.id)}></button>
            <button title="Down" className="sort-btn down-button" onClick={downPriority.bind(null, todo.id)}></button>

            <span className={classes.join(' ')}> {/*we use join because className expects string, not an Array*/}
            
                <input 
                type="checkbox" 
                style={styles.input}
                checked={todo.completed} 
                onChange={() => onChange(todo.id)}/>
                {<i>[priority: {priority}]</i>}
                &nbsp;{todo.title}
            </span>
             <button className="rm-button-small" onClick={removeItem.bind(null, todo.id)} ><FontAwesomeIcon icon="trash"></FontAwesomeIcon></button>
             <button className="rm-button" onClick={removeItem.bind(null, todo.id)} >Remove  <span><FontAwesomeIcon icon="trash"></FontAwesomeIcon></span></button>
         </li>   
    )
})  

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;