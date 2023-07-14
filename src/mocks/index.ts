import data from './dropdown_Test.json';

import * as types      from '../types';


export async function getSelectData()
{ 
    const values = await getPromise( JSON.parse( JSON.stringify(data) ) );

    return values;
}

let users: Array<types.User> = [];


export function addUser( newUser: types.NewUser ): Promise<types.ResponseStatusCode>
{ 
    const user = { 
        ...newUser,
        id: users.length + 1,
    };

    try {
      users.push( user );
      
      return getPromise(
        { 
          statusCode: 200, 
          message: 'Success' 
        }
      ); 
    } catch ( error ) {
      console.error( error );

      return getPromise( { 
        statusCode: 400, 
        message: 'Error' 
      }, 1000, true );    
    }
}

export function loginUser( name: string, password: string ): Promise<types.ResponseStatusCode>
{ 
    const user = users.find( user => user.username.toLowerCase() === name.toLowerCase() );

    if ( user && user.username === name && user.password === password )
    {
        return getPromise({ 
            statusCode: 200, 
            message: 'Success'
        });  
    }

    return getPromise( { 
        statusCode: 400, 
        message: 'User isn\'t valid' 
    }, 1000, true );    
}

export function getUsers() : Promise<types.User[]>
{
    return getPromise([ ...users ]);  
}

export function removeUser( id: number ) : Promise<types.ResponseStatusCode>
{ 
    try {
        users = [ ...users ].filter( user => {
            if ( user.id !== id ) return user;
        });
        
        return getPromise({ statusCode: 200, message: 'Success' });          
    } catch (error) {
        return getPromise( { statusCode: 400, message: 'Error' }, 1000, true ); 
    }   
}

function getPromise<T extends Object>( object: T, time: number = 1000, isError: boolean = false ) : Promise<T>
{
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if ( isError ) {
                reject( object );
            }
            resolve( object );            
        }, time );
    } );
}