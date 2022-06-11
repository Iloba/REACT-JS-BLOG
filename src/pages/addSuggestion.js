import React, { useState } from 'react';
import {Link,  useNavigate} from 'react-router-dom';
import styles from './styles/style.module.css';
import axios from 'axios';
import swal from 'sweetalert';
const AddSuggestion = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [suggestion, setSuggestion] = useState('');


    const nameInputHandler = (event) => {
        setName(event.target.value);

    }

    const deptInputHandler = (event) => {
        setDept(event.target.value);

    }

    const suggestionInputHandler = (event) => {
        setSuggestion(event.target.value);

    }

    //Form submission function should be an Asyn function
    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post('http://127.0.0.1:8000/api/suggestion', {
            name: name,
            dept: dept,
            suggestion: suggestion
        });

        if (response.data.status === 200) {
        
            swal({
                title: "Sucess!",
                text: response.data.message,
                icon: "success",
            });

            navigate('/');

            setName('');
            setDept('');
            setSuggestion('');

        } else {
            swal({
                title: "Error!",
                text: response.data.error,
                icon: "warning",
            });
        }

    }




    return (<div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-9'>
                <div className='card shadow-sm p-2 p-sm-3 p-md-5'>
                    <h2 className='text-center mb-3'>Add Suggestion
                    <Link to={'/'} className='btn btn-primary float-end'>Back</Link>
                    </h2>
                    <form onSubmit={formSubmissionHandler}>
                        <div className='form-group mb-3'>
                            <label for="name">Enter Name</label>
                            <input type="text" className={styles['form-control']} placeholder='Enter Name' onChange={nameInputHandler} value={name} />
                        </div>
                        <div className='form-group mb-3'>
                            <label for="name">Enter Department</label>
                            <input type="text" className={styles['form-control']} placeholder='Enter Department' onChange={deptInputHandler} value={dept} />
                        </div>
                        <div className='form-group mb-3'>
                            <label for="name">Enter Suggestion</label>
                            <textarea className={'form-control'} id="" cols="30" rows="10" placeholder='Enter Suggestion' onChange={suggestionInputHandler} value={suggestion}></textarea>
                        </div>
                        <div className='form-group mb-3'>
                            <button className='btn btn-success' type='submut'>Add Suggestion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default AddSuggestion;