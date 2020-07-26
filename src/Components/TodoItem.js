import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../context'


// just variation how to style elements
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
        marginRight: '1rem' 
    }
}
 function TodoItem({ todo, index, onChange }){

     const { removeItem } = useContext(Context);  {/* in this empty {} we got value from App.js Context.Provider value={{ xxx }}  */}
     const classes = [];

     if(todo.completed){
         classes.push('done')
     }
    
    return (
        <li style={styles.li}>
            <span className={classes.join(' ')}> {/*we use join because className expects string, not an Array*/}
                <input 
                type="checkbox" 
                style={styles.input}
                checked={todo.completed} 
                onChange={() => onChange(todo.id)}/>
                <strong>{index + 1}</strong>
                &nbsp;{todo.title}
            </span>

            <button className="rm" onClick={removeItem.bind(null, todo.id)}>&times;</button>
        </li>
    )
}  

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;