import React from 'react';
import Form from './form';
import * as types from '../../types';
import * as redux from '../../store/slices';
import {
   useAppSelector,
   useAppDispatch
}                 from '../../store/hooks';


const RegisterPage = () => {
    const selectData = useAppSelector(redux.selectSelectData);
    const dispatch   = useAppDispatch();

    const paramsForm: { 
        label: string;
        key: keyof types.NewUser;
        type: string;
        component: 'input' | 'select';
        required?: boolean;
        pattern?: RegExp;
        data?: Record<string, string>[];
    }[] = [ 
        { label: 'First Name', key: 'firstname', type: 'text', component: 'input', required: true },
        { label: 'Last Name', key: 'lastname', type: 'text', component: 'input', required: true },
        { label: 'Username', key: 'username', type: 'text', component: 'input', required: true },
        { label: 'Email', key: 'email', type: 'email', component: 'input', required: true, },
        { label: 'Password', key: 'password', type: 'password', component: 'input', required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/ },
        { label: 'Phone number', key: 'phonenumber', type: 'tel', component: 'input' },
        { label: 'Country', key: 'country', type: 'select', component: 'select', data: selectData },
    ]

    return (
        <>
            { selectData.length > 0 && <Form 
                paramsForm={ paramsForm } 
                handlerSubmit={ (values: types.NewUser ) => dispatch( redux.addNewUser( values ) ) } 
            /> }
        </>
    );
}

export default RegisterPage;
