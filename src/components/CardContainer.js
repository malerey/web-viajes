import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import Card from './Card';
import styled from 'styled-components';



const Resultados = styled.div`
 display:flex;
flex-direction:column;
align-items:center;
`

const Msje = styled.h2`
height:300px;
color: red;
h2:hover{
        color:#d5e1df;
    }
`

const Volver = styled.button`
background-color: #512c62;
    box-shadow: 10px 10px 8px #888888;
        height: 30px;
        color:#fff;
       margin-left: 20px;
`

// Por que usamos props aca? Este componente no las recibe. 
const CardContainer = (props) => {
    // Traten de no dejar console log olvidados. 
    console.log(props)
    const [resultados, setResultados] = useState([])
    // por que declaramos error si no lo usamos? 
    const [error, setError] = useState(null);
    const history =useHistory()

    const getParams = useParams()


    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

    // datos para obtener el access token
    const item = {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_API_KEY,
        client_secret: process.env.REACT_APP_API_KEY_SECRET
    };


    // hacemos el fetch a la API para solicitar el nuevo access token
    useEffect(() => {
        fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: toUrlEncoded(item)
        })
            .then(res => res.json())
            .then(data => {
                fetch(`https://test.api.amadeus.com/v1/shopping/flight-destinations?${getParams.buscado}`, {
                    // el header es para enviarle ese token a la API
                    headers: {
                        'Authorization': `Bearer ${data.access_token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => setResultados(data))
                    .catch(err => setError(err))

            })

    }, [getParams.buscado])

    // declaramos e como parametro pero no lo usamos: mejor borrarlo. 
    const handleClick = e => {
        history.push("/")
    }


    return (
        <>
  
            <Resultados>
            <Volver onClick={handleClick}>Volver al Inicio</Volver>
                {resultados.data &&
                    resultados.data.map((element, i) => (
                        <Card
                            key={i}
                            origin={element.origin}
                            destination={element.destination}
                            departureDate={element.departureDate}
                            returnDate={element.returnDate}
                            price={element.price.total}
                        />
                    ))
                }
                {!resultados.data &&
                    <Msje>
                        <h2>No hay vuelos disponibles</h2>
                    </Msje>

                }
               

            </Resultados>

        </>
    )

}

export default CardContainer;

// No es bueno dejar comentarios sueltos en el codigo, a menos que cumplan una funcion para el lector
// (por ejemplo, aclarar que hace una funcion compleja)

// https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=MAD&oneWay=false&duration=10&nonStop=false

//https://test.api.amadeus.com/v1/shopping/
//flight-destinations?origin=MAD&departureDate=2020-05-20&oneWay=false&duration=10&nonStop=false&maxPrice=3000
