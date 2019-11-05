import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';


function App() {

  // State Principal
  // ciudad = State, guardarCiudad = SetState
  // pais = State, guardarPais = SetState
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {

    // Prevenir la ejecución la primera vez
    if(ciudad === '') {
      return;
    }

    const consultarAPI = async () => {
    
      const appID = 'e31fb18e7603a6e7f2a08d0a1a5599ac';
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
  
      // Consultar API
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
  
    }

    consultarAPI();

  }, [ ciudad, pais ])

  const datosConsulta = (datos) => {

    // Validar que ambos campos esten
    if(datos.ciudad === '' || datos.pais === '') {

      // Un error
      guardarError(true);
      return;

    } 

    // Ciudad y país existen, agregarlo al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);

  }


  // Cargar un componente condicionalmente
  let componente;
  if (error) {
    // Hay un error muestralo
    componente = <Error mensaje= "Ambos campos son obligatorios." />
  } else if (resultado.cod === "404") {
    
    componente = <Error mensaje= "La ciudad no existe en el registro." />

  } else {
    // Mostrar el Clima
    componente = <Clima 
                    resultado={resultado}
                  />;
  }


  return (

    <div className="App">
      <Header 
        titulo= 'Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta= {datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
