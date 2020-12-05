import React from 'react'

import { Table } from 'semantic-ui-react'

function LoadingRows() {
  const loads = [
    {},{},{},{},{},{},{},{},{},{},
    {},{},{},{},{},{},{},{},{},{},
    {},{},{},{},{},{},{},{},{},{},
    {},{},{},{},{},{},{},{},{},{},
    {},{},{},{},{},{},{},{},{},{}
  ];

  return (
    <React.Fragment>
      {loads.map( (_, index) => 
        <Table.Row key={index} className="table_row">
          <Table.Cell>Loading..</Table.Cell>
          <Table.Cell>Loading..</Table.Cell>
          <Table.Cell>Loading..</Table.Cell>
          <Table.Cell>Loading..</Table.Cell>
          <Table.Cell>Loading..</Table.Cell>
          <Table.Cell>Loading..</Table.Cell>
          <Table.Cell className="table_cell__description">Loading...</Table.Cell>
        </Table.Row>
      )}
    </React.Fragment>
  )
}

export default LoadingRows
