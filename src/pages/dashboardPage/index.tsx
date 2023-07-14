import React, { useEffect }  from 'react';
import {
    useAppSelector,
    useAppDispatch
 }                 from '../../store/hooks';
import * as redux  from '../../store/slices';
import * as types  from '../../types';




const DashboardPage: React.FC = () =>
{
    const users = useAppSelector(redux.selectUsers);

    const dispatch = useAppDispatch();

    useEffect( () => {
       dispatch( redux.getUsers() );
    }, [] );

    return (
        <div className="dashboardContainer">            
            { users && users.map( (user, id) => <div key={ id } className="block">
                {
                    Object.keys(user).map( (key, id) => <div key={ id } className="field">
                        {[ key ]}: <input                           
                            readOnly
                            value={ user[ key as keyof types.NewUser ] } 
                            type={ key === 'password' ? key : 'text' }
                        />
                    </div> )
                }
                <button className='btn' onClick={ () => dispatch( redux.removeUser( user.id ) ) }>
                    Remove
                </button>
            </div> ) }
        </div>
    );
}

export default DashboardPage;