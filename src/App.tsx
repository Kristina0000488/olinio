import React, { useEffect } from 'react';
import { Router }       from './routes';


import {
  useAppDispatch
}                       from './store/hooks';
import * as redux       from './store/slices';
import './App.css'; 


function App() {
  const dispatch = useAppDispatch();

  useEffect( () => {
      dispatch( redux.getSelectData() );
  }, [] );

  return (
      <div className="app">
        <Router />
      </div>   
  );
}

export default App;
