import Reac from 'react';
import { toNavigate } from '../routes/methods';


const IndexPage: React.FC = () =>
{
    return (
        <div className="indexContainer">            
            <button className="btn" onClick={ () => toNavigate('login') }>
                Login
            </button>
            <button className='btn' onClick={ () => toNavigate('register') }>
                Register
            </button>
        </div>
    );
}

export default IndexPage;