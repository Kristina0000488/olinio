import history from './history';


export function toNavigate( param: string ) : void 
{  
    let pathname: string = `${ param }`;

    history.push( {   
        pathname
    } );
}

export function goBack() : void 
{
    history.back();
}

export function getLocation() : string 
{    
    return history.location.pathname;
}
