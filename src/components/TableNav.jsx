import React from 'react'
import { Link } from 'react-router-dom'

import { Table, Menu, Icon } from 'semantic-ui-react'

function TableNav({ changePage, maxPages, currentPage }) {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='7'>
          <Menu floated='right' pagination>
            <Menu.Item 
              as={Link} 
              disabled={(currentPage === 1) ? true : false} 
              onClick={() => {changePage(false)}} 
              to={`/${(currentPage === 1) ? 1 : (currentPage - 1)}`} 
              icon
            >
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item>
              {`${currentPage} / ${maxPages}`}
            </Menu.Item>
            <Menu.Item 
              as={Link}
              disabled={currentPage === maxPages ? true : false} 
              onClick={() => changePage(true)}
              to={`/${currentPage === maxPages ? maxPages : (currentPage + 1)}`}  
              icon
            >
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

export default TableNav
