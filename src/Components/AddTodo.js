import React, {useState} from 'react';
import PropTypes from 'prop-types';

/* useInputValue - custom Hook */
function useInputValue(defaultValue= ''){
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
        
    }
}

function AddTodo({ onCreate }){
    const input = useInputValue('')

    function submitHandler(event){
        event.preventDefault()

        if (input.value().trim()) {
            onCreate(input.value())
            input.clear()
          //  setValue('')
        }
    }
    return(
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}> {/*inline-  just another way to set styles*/}
        <input className='addTodoInput'{...input.bind} placeholder="  Type your next task here and click 'Add Todo' button!"/>  {/* spread operator inserts value and onChange to input*/}
            <button className="addTodoButton" type='submit'>Add Todo</button>
        
    </form>
    )
}


AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;