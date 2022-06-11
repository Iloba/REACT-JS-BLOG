import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LoadingImg from '../img/64x64.gif';
import { Link } from 'react-router-dom'
const Suggestion = () => {
    const [AllSuggestions, SetSuggestions] = useState([]);
    const [Loading, setLoading] = useState(true);

    //Get all data as soon as component is mounted using UseEffect
    useEffect(() => {
        return async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/suggestion');
            if (response.data.status === 200) {
                SetSuggestions(response.data.suggestions);
                setLoading(false);
            }
        }
    }, []);
    let SuggestionMarkup = '';
    if (Loading) {
        SuggestionMarkup = <div className='col-md-12 d-flex justify-content-center'>
            <img src={LoadingImg} alt="Loading" />
        </div>
    } else {
        SuggestionMarkup = AllSuggestions.map((suggestion) => {
            return (
                <div className='col-md-3' key={suggestion.id}>
                    <Link to={`suggestion/${suggestion.id}`} className='nav-link'>
                        <div className='card shadow-sm mb-2 p-2 p-sm-3 p-md-4 text-center'>
                            {suggestion.name}
                        </div>
                    </Link>
                </div>

            );
        })

    }

    return (<div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-9'>
                <div className='card shadow-sm p-2 p-sm-3 p-md-5'>
                    <div className='mb-4'>
                        <h1> All Students suggestion <Link to={'add-suggestion'} className='btn btn-primary float-end'>Add Suggestion</Link></h1>

                    </div>
                    <div className='container'>
                        <div className='row'>
                            {SuggestionMarkup}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>);
}

export default Suggestion;