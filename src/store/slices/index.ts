import { 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';

import * as types from '../../types';
import { RootState } from '../store';


interface SliceState 
{ 
  isLoading    : boolean,
  selectData: Record<string, string>[];
  users: types.User[];
};


const initialState: SliceState = 
{
  isLoading: false,
  users: [],
  selectData: [],
}


export const indexSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    getSelectData(state: SliceState) 
    {  
     state.isLoading = !state.isLoading;       
    },
    setSelectData(state: SliceState, action: PayloadAction<Record<string, string>[]>) 
    {  
      state.selectData = action.payload;
      state.isLoading  = false;
    },
    addNewUser(state: SliceState, action: PayloadAction<types.NewUser>) 
    {
      state.isLoading = !state.isLoading;
    },
    setUsers(state: SliceState, action: PayloadAction<types.User[]>) 
    {  
      state.isLoading = false;
      state.users = action.payload;      
    },
    getUsers(state: SliceState) 
    {  
     state.isLoading = !state.isLoading;       
    },
    removeUser(state: SliceState, action: PayloadAction<number>) 
    {  
      state.isLoading = !state.isLoading;
    },
    loginUser(state: SliceState, action: PayloadAction<{ username: string; password: string }>) 
    {  
      state.isLoading = !state.isLoading;
    },
  },
})

export const { 
  getSelectData,
  setSelectData,
  addNewUser,
  setUsers,
  getUsers,
  removeUser,
  loginUser
} = indexSlice.actions;

export const selectSelectData = (state: RootState) => state.main.selectData;
export const selectUsers = (state: RootState) => state.main.users;

export default indexSlice.reducer;
