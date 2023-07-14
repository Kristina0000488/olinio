import React, { useState }  from 'react';
import {
    useAppSelector,
    useAppDispatch
 }                       from '../../store/hooks';
 import * as redux       from '../../store/slices';



const LoginPage: React.FC = () =>
{
    const [ values, setValues ] = useState<{ username: string, password: string }>({
        username: '',
        password: ''
    })

    const dispatch   = useAppDispatch();

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch( redux.loginUser( values ) )
    }

    return (
        <form onSubmit={ onSubmit } className="form">
            <input 
                type={ 'text' }
                required
                value={ values.username } 
                placeholder={ 'Username' }
                onChange={ (event: any) => {
                    setValues({ ...values, username: event.target.value });
                } } 
            />
            <input 
                type={ 'password' }
                required
                value={ values.password } 
                placeholder={ 'Password' }
                onChange={ (event: any) => {
                    setValues({ ...values, password: event.target.value });
                } } 
            />
            <button className="btn">Submit</button>
        </form>
    );
}

export default LoginPage;