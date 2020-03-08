import React from 'react'
import './checkBox.css'
import axios from 'axios'

export default class ModalCheckBox extends React.Component {

  state = {
    users: [],
    foundUsers: [],
    query: '',
    username: 'vic',
    display: 'block',

    usersDontSee: []
  }

  componentDidMount = () => {
    this.getUsersDontSee()
  }

  getUsers = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/company/${localStorage.getItem("company")}`)
      .then(result => {
        let users = result.data.data
        let {usersDontSee} = this.state

        console.log(usersDontSee)

        users = users.map(u => {
          if (usersDontSee.some(d => d === u._id)) {
            u["isChecked"] = false

          } else {
            u["isChecked"] = true
          }
          
          return u
        })

        this.setState({users})
      })
      .catch(e => console.log(e))
  }

  getUsersDontSee = () => {
    axios.get(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/collector/${this.props.id}`)
      .then(result => this.setState({usersDontSee: result.data.data.collectorsDontSee}))
      .then(() => this.getUsers())
      .catch(e => console.log(e))
  }
  

  updateUser = () => {
    const usersDontSee = this.state.users.filter(u => !u.isChecked).map(u => u._id)

    const json = {
      collectorsDontSee: usersDontSee
    }

    axios.put(`https://back-credits.herokuapp.com/api/${process.env.REACT_APP_SECURITY}/users/${this.props.id}`, json)
    .then( () => {
      this.props.close()
    })
    .catch( e => console.log(e))


  }

  onChangeInputSearch = e => {
    const query = e.target.value.toUpperCase()

    var foundUsers = this.state.users.filter(u => u.name.toUpperCase().includes(query))
    
    this.setState({foundUsers, query})
  }

  toggleCheck = (e) => {
    const id = e.target.name

    let {users} = this.state

    users = users.map(u => {
      if(u._id === id) {
        if (u.isChecked) {
          u.isChecked = false
        } else {
          u.isChecked = true
        }
      }
      
      return u
    })


    this.setState({users})
  }


  render() {
    const {close, something, state} = this.props
    const {foundUsers, query, users} = this.state


    return (
      <div className="bg-modal-check" >
  
        <div className="modal-content-check" >
          <div className="nav-modal-check" >{something}</div>
  
          <div className="close-confirm" onClick={() => close(state)} >+</div>
          <br />
          <br />
  
            <div>
              <input
                className="search" 
                type="text"
                // value={this.state.query}
                onChange={this.onChangeInputSearch} 
              />
            </div>
          <br />
  
          <div>
            {
              query === "" && 
              <form>
                {users.map(u => {
                return (
                  <div>
                    <input type="checkbox" checked={u.isChecked} name={u._id}
                    onChange={this.toggleCheck} /> {u.name}
                  </div>
                )} )}
              </form>
            }
            
            {
              query.length > 0 && 
              <form>
                {foundUsers.map(u => {
                return (
                  <div>
                    <input type="checkbox" checked={u.isChecked} name={u._id}
                    onChange={this.toggleCheck} /> {u.name}
                  </div>
                )} )}
              </form>
            }
            <button  className='button_confirm' type="button" onClick={this.updateUser} >Guardar</button>
          </div>
  
        </div>
  
        <div className="div_fixed_confirm" onClick={() => close(state)} ></div>
    </div>
    )
  }
  
}
