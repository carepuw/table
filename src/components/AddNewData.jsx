import React from 'react'

import { Button, Form } from 'semantic-ui-react'

function AddNewData({addData}) {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const forms = [
    {fn: 'id', ln: 'Id'}, 
    {fn: 'firstName', ln: 'First Name'},
    {fn: 'lastName', ln: 'Last Name'},
    {fn: 'email', ln: 'Email'},
    {fn: 'phone', ln: 'Phone'},
    {fn: 'streetAddress', ln: 'Street Address'},
    {fn: 'city', ln: 'City'},
    {fn: 'state', ln: 'State'},
    {fn: 'zip', ln: 'Zip'},
    {fn: 'description', ln: 'Description'},
  ]
  const [inputsValue, setInputsValue] = React.useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    description: '',
  })

  const changeVisible = () => {
    setVisibleForm(!visibleForm);
  }

  const changeValues = (fn, e) => {
    const newObj = {...inputsValue};
    newObj[fn] = e;
    setInputsValue(newObj);
  }

  const createDataRow = () => {
    const masKeys = forms.map( (item) => {
      if (inputsValue[item.fn].trim() === '') {
        return 0
      } else {
        return 1
      }
    })
    if (!masKeys.includes(0)) {
      addData({...inputsValue});
    }
  }

  return (
    <div className="add_data">
      {
        visibleForm &&
        <div className="add_data__form">
          <Form>
            {
              forms.map ( (item, index) => 
                <Form.Field key={index}>
                  <label>{item.ln}</label>
                  <input 
                    placeholder={item.ln} 
                    onChange={(e) => changeValues(item.fn, e.target.value)} 
                  />
                </Form.Field>
              )
            }
            <Button type='submit' onClick={() => createDataRow()}>Отправить</Button>
          </Form>
        </div>
      }
      <div className="add_data__button">
        <Button onClick={() => changeVisible()}>
          {`${visibleForm ? 'Скрыть' : 'Добавить'}`}
        </Button>
      </div>
    </div>
  )
}

export default AddNewData;
