import React, { useState } from 'react';
import { useHistory, Route } from 'react-router-dom';
import CardContainer from './CardContainer';
import styled from 'styled-components'
import Form from './Form'





const Div = styled.div `
;
`







const Main = () => {
  
  
  return (
    <>
   
      
    <Div>
  
      <Route  exact path={`/`} component={Form}></Route>
      <Route  path={`/results/:buscado`} component={CardContainer}></Route>
               
    </Div>
   
      
    
    </>
  )
}
export default Main;