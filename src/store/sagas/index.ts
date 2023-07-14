import { takeLatest, call, put } from "redux-saga/effects";

import { PayloadAction }         from '@reduxjs/toolkit';

import * as reducer              from '../slices';
import * as mocks                from '../../mocks';
import { toNavigate }            from '../../routes/methods';
import * as types      from '../../types';



export function* handleGetSelectData() 
{      
    try {
      const response: Record<string, string>[] = yield call( mocks.getSelectData );

      if ( response ) 
      {     
        yield put( reducer.setSelectData( response ) );
      }
    } catch (e) {
      console.log(e);
    }
}

export function* handleAddUser( action: PayloadAction<types.NewUser> ) 
{ 
    try {  
      const response: types.ResponseStatusCode = yield call( mocks.addUser, action.payload );

      if ( response.statusCode === 200 ) {        
        yield alert( response.message );           
        yield toNavigate('/');       
      }
      
    } catch (e) {            
      console.log(e);
    }
}

export function* handleLoginUser(action: PayloadAction<{ username: string; password: string }>) 
{ 
    try {  
      const response: types.ResponseStatusCode = yield call( 
        mocks.loginUser, 
        action.payload.username, 
        action.payload.password 
      );

      if ( response.statusCode === 200 ) {
        yield toNavigate( '/dashboard' );
      } 
    } catch (e: any) {      
      yield alert( e.message); 
      console.log(e);
    }
}

export function* handleGetUsers() 
{
    try {  
      const response: types.User[] = yield call( mocks.getUsers );
      
      yield put( reducer.setUsers( response ) );

    } catch (e) {      
      console.log(e);
    }
}

export function* handleRemoveUser(action: PayloadAction<number>) 
{
    try {  
      const response: types.ResponseStatusCode = yield call( mocks.removeUser, action.payload );
      
      if ( response.statusCode === 200 ) {
        const response: types.User[] = yield call( mocks.getUsers );    

        yield put( reducer.setUsers( response ) );
      }
    } catch (e) {       
      console.log(e);
    }
}

export default function* watcherSaga() 
{ 
  yield takeLatest( reducer.getSelectData.type, handleGetSelectData );
  yield takeLatest( reducer.addNewUser.type, handleAddUser );
  yield takeLatest( reducer.loginUser.type, handleLoginUser );
  yield takeLatest( reducer.getUsers.type, handleGetUsers );
  yield takeLatest( reducer.removeUser.type, handleRemoveUser );
}
