import React from 'react'
import { useDispatch } from 'react-redux';

import { clearData } from '../redux/actions/tableData'

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

function DataHeader({ setIsItSearch }) {
  const dispatch = useDispatch();

  const [inputsValue, setInputsValue] = React.useState('');
  const [visibleSearch, setVisibleSearch] = React.useState(false);
  const [choosenSearch, setChoosenSearch] = React.useState({ text: 'Id', value: 'id' },);
  const options = [
    { text: 'Id', value: 'id' },
    { text: 'First Name', value: 'firstName' },
    { text: 'Last Name', value: 'lastName' },
    { text: 'Email', value: 'email' },
    { text: 'Phone', value: 'phone'},
    { text: 'Address', value: 'address'},
    { text: 'Description', value: 'description'},
  ]

  const handleChange = (e) => setInputsValue(e.target.value);

  const changeVisibleSearch = () => {
    setVisibleSearch(!visibleSearch);
    setIsItSearch(false);
  }

  const changeChoosenSearch = (e) => {
    setChoosenSearch(options[e]);
  }

  const searchData = () => {
    if (inputsValue.trim() !== '') {
      setIsItSearch({choosenSearch,inputsValue});
      dispatch(clearData());
    } else {
      alert('Empty search')
    }
  }

  const setSearchFalse = () => {
    setIsItSearch(false);
    dispatch(clearData());
  }

  return (
    <div className="data_header">
      <div className="data_header__containers" >
        <div>
          <Button as={Link} to="/" onClick={() => setSearchFalse()}>На главную</Button>
        </div>
      </div>
      <div className="data_header__containers">
        {visibleSearch &&
          <div className="inputs">
            <select 
              onChange={(e) => changeChoosenSearch(e.target.options.selectedIndex)}
              className="search"
            >
              {options.map ( (item,index) => 
                <option 
                  key={index} 
                  value={item.value}
                >{item.text}</option>
              )}
            </select>
            <input 
              placeholder={`Введите ${choosenSearch.text}`}
              onChange={handleChange} 
              value={inputsValue} 
              className="search"
            ></input>
            <Button as={Link} to="/1" onClick={() => searchData()}>Поиск</Button>
          </div>
        }
        <div>
          <Button onClick={() => changeVisibleSearch()}>{visibleSearch ? 'Отмена' : 'Найти'}</Button>
        </div>
      </div>
    </div>
  )
}

export default DataHeader
