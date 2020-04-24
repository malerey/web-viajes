import React from 'react';
import styled from 'styled-components';


const DivCard =styled.div`
height: auto;
width: 60%;
justify-content: space-around;
margin: 20px;
border: 1px solid grey;
color: white;
border-radius:5px;
display:flex;
font-family: 'Roboto', helvetica, Arial, sans-serif;

.submit {
    background-color: #034f84;
    height: 30px;
    color:#fff;
   margin-left: 40px;

  }
span {
    font-weight: bold;
}
 .price {
     color:blue;
 }
  
`

// const Origen = styled.div`
// span {
    
// }
// `
const Card = ({ origin, destination, departureDate, returnDate, price }) => {
    // const formatterDolar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD'
    //   })
    //console.log(formatterDolar.format(value))
 
    return (
        <>
       
        <DivCard>
            <div>
                <h4>Origen: {origin}</h4>
                <p><span>Fecha de Salida: </span>{departureDate}</p>
                </div>
           
            <div>
                <h4>Destino: {destination}</h4>
                <p><span>Fecha de Regreso: </span>{returnDate}</p>
                </div>
            
            <div>
                <span><p className="price">Price: ${price}</p></span>
                <input className="submit" type="submit" value ="Seleccionar"/>
                </div>
            
        </DivCard>
       
        </>
    );
}
export default Card;