import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import clienteAxios from './config/axios';

import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

function App() {

  const [citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect( () => {
    if (consultar) {
        const consultarApi = () => {
            clienteAxios.get('/pacientes')
              .then( respuesta => {
                guardarCitas(respuesta.data);

                guardarConsultar(false);
              })
              .catch( error => {
                console.log(error);
              });
            }

        consultarApi();
      }
  }, [consultar]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={() => <Pacientes citas={citas} /> } />
        <Route exact path='/cita/:id' 
          render={ (props) => {
            const cita = citas.filter( cita => cita._id === props.match.params.id );

            return (<Cita cita={cita[0]} guardarConsultar={guardarConsultar} />)
          }}
        />
        <Route exact path='/nueva' component={ () => <NuevaCita guardarConsultar={guardarConsultar} /> } />
      </Switch>
    </Router>
  );
}

export default App;
