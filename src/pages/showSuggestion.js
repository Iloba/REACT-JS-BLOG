import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingImg from '../img/64x64.gif';
import swal from 'sweetalert';
const ShowSuggestion = (props) => {

    //Get Id from Parameter
    const { id } = useParams();
    let navigate = useNavigate();

    //State Variables
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [Loading, setLoading] = useState(true);



    useEffect(() => {
        const suggestionId = id;
        return async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/suggestion/' + suggestionId);
            if (response.data.status === 200) {
                setName(response.data.suggestion.name);
                setDept(response.data.suggestion.dept);
                setSuggestion(response.data.suggestion.suggestion);
                setLoading(false);
            } else {

                navigate('/');
                swal({
                    title: "Error!",
                    text: response.data.error,
                    icon: "warning",
                });
               
            }
        }
    }, []);

    let showMarkup = '';
    if (Loading) {
        showMarkup =
            <div className='card p-2 p-sm-3 p-md-5'>
                <img className='d-block mx-auto ' src={LoadingImg} alt=""/>
            </div>;

    } else {

        showMarkup =  <div className='card p-2 p-sm-3 p-md-5'>
            <h1> <Link to={'/'} className="btn btn-primary float-end">Back</Link></h1>
            <h1 className=''>{name}<span className='text-success'> ({dept})</span></h1>

            <div className='mb-3'>
                {suggestion}
            </div>
            <div className='d-flex justify-content-center m-3'>
                <Link className='btn btn-primary m-3' to={'/'}>Edit</Link>
                <Link className='btn btn-danger m-3' to={'/'}>Delete</Link>
            </div>
        </div>
              
    }

return (

    <div className="container">
        <div className='row d-flex justify-content-center'>
            <div className='col-md-10'>
                {showMarkup}
            </div>
        </div>
    </div>
);
}

export default ShowSuggestion;