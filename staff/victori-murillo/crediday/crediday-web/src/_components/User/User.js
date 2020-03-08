import React from 'react'
import './user.css'
import axios from 'axios'
import transformWords from '../../_utils/transformWords'

export default class User extends React.Component {

  state = {
    name: ''
  }

  onChangeInputName = e => this.setState({name: transformWords(e.target.value)})

  onSubmitForm = e => {
    e.preventDefault()
    const json = {
      name: this.state.name, 
      password: 'crediday',
      company: localStorage.getItem("company")
    }

    axios.post(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/auth/signup`, json)
      .then( () => {
        this.props.history.push('/list/users')
      })
      .catch( e => console.log(e, 'wrong'))
  }

  onClickCancel = () => this.setState({name: ''})

  render() {
    return (
    <form className="form_flex" onSubmit={this.onSubmitForm} >
      <span>Nombre Completo</span>

      <input 
        className="input_register" 
        type="text"
        onChange={this.onChangeInputName} 
        name="name"
        value={this.state.name}
        autoComplete="off"
      />

      <div className="container_buttons">
        
        <div className="buttons">
          <button className="button" id="save" type="submit" value="save">Registrar</button>

          <button
            onClick={this.onClickCancel}
            className="button mobile" id="cancel" value="save">Cancel</button>
        </div>
        
      </div>
      
    </form>
    )
  }
}


