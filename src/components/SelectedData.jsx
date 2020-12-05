import React from 'react'

import { Card } from 'semantic-ui-react'

function SelectedData({ selectedData }) {
  return (
    <React.Fragment>
      {selectedData &&
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">{`${selectedData.firstName} ${selectedData.lastName}`}</Card.Header>
            <Card.Description>
              Описание: <b>{selectedData.description}</b>
            </Card.Description>
            <Card.Description>
              Адрес проживания: <b>{selectedData.address.streetAddress}</b>
            </Card.Description>
            <Card.Description>
              Город: <b>{selectedData.address.city}</b>
            </Card.Description>
            <Card.Description>
              Провинция/штат: <b>{selectedData.address.state}</b>
            </Card.Description>
            <Card.Description>
              Индекс: <b>{selectedData.address.zip}</b>
            </Card.Description>
          </Card.Content>
        </Card>
      }
    </React.Fragment>
  )
}

export default SelectedData
