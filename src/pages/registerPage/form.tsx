import React, { useEffect, useState } from 'react';

import * as types from '../../types';


type Props = {
    paramsForm: {
        label: string;
        key: string;
        type: string;
        component: 'input' | 'select';
        required?: boolean;
        pattern?: RegExp;
        data?: Record<string, string>[];
    }[];
    handlerSubmit: ( state: types.NewUser ) => void;
}

const Form = (props: Props) => {
    const [ state, setState ] = useState<types.NewUser>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phonenumber: '',
        country: '',
    });
    const [ isCorrect, setIsCorrect ] = useState<boolean>(false);

    const { paramsForm, handlerSubmit } = props;

    useEffect( () => {
        if (paramsForm) {
            const found = paramsForm.find( value => value.key === 'country' );

            if (!!found && found.data) {
               setState({ ...state, country: found.data[ 0 ].code });
            }
        }
    }, [] )

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handlerSubmit(state);
    }

    function createHandler<T>(key: string, pattern?: RegExp) {
        return (event: React.ChangeEvent<T> & { target: { value?: string } }) => {
            if ( pattern ) {
                const result = pattern.test( event.target?.value || '');
                const input = document.getElementById( key );
        
                if (!result) {
                    input!.className = 'error';

                    setIsCorrect( false );
                } else {
                    input!.className = '';

                    setIsCorrect( true );
                }
            }
            setState({ ...state, [ key ]: event.target.value });
        };
    };

    const builderForm = () => {
        const elemsForm: React.ReactElement[] = [];

        if (paramsForm) {
            paramsForm.forEach( ({ label, key, type, component, required, pattern, data }, id ) => {
                if ( component === 'input' ) {
                    elemsForm.push( 
                        <input 
                            key={ id }
                            type={ type }
                            id={ key }
                            required={ required }
                            value={ state[ key as keyof types.NewUser ] } 
                            placeholder={ label }
                            onChange={ createHandler( key, pattern ) } 
                        />
                    )
                } else if ( component === 'select' && data ) {
                    elemsForm.push(
                        <div key={ id }>
                            <select 
                                id={ key } 
                                value={ state[ key as keyof types.NewUser ] }
                                defaultValue={ 0 } 
                                onChange={ createHandler( key ) } 
                            >
                                { data.map((value, id) => <option key={ id } value={ value.code }>
                                    { value.name }
                                </option>) }
                            </select>
                        </div>
                    )
                } else {
                    return;
                }
            } )
        } 

        return elemsForm;
    }


    return (
        <form onSubmit={ onSubmit } className="form">
            { paramsForm && builderForm( ) }
            <button disabled={!isCorrect} className="btn">Submit</button>
        </form>
    )
}

export default Form;