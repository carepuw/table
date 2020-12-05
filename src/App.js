import React from 'react'
import { Link, Redirect, Route } from 'react-router-dom';

import TableContent from './components/TableContent';

import { Button, Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'
import './App.scss';

function App() {
  const [dataValue, setDataValue] = React.useState();

  const selectDataValue = (data) => {
    setDataValue(data);
  }

  return (
    <div className="App">
      <Route path="/" exact>
        <Container textAlign="center">
          <div className="choose_data__div"><span>Выберите объем базы данных</span></div>
          <Button 
            as={Link} 
            to="/1"
            onClick={() => selectDataValue('small')}
          >Small</Button>
          <Button 
            as={Link} 
            to="/1"
            onClick={() => selectDataValue('large')}
          >Large</Button>
        </Container>
      </Route>

      {
      (dataValue === undefined) && (window.location.pathname.slice() !== '/') 
      ? 
      <Redirect to="/" /> : ''
      }

      {dataValue && <TableContent search={false} dataValue={dataValue}/>}
    </div>
  );
}

export default App;
