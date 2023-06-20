import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMessage: ''}

  userNameSet = e => {
    this.setState({username: e.target.value})
  }

  passwordSet = e => {
    this.setState({password: e.target.value})
  }

  submitLogin = async e => {
    e.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      //   const {jwt_token} = data

      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      Cookies.set('my_username', username, {expires: 30})
      Cookies.set('my_password', password, {expires: 30})
      this.setState({username: '', password: '', errorMessage: ''})

      const {history} = this.props
      history.replace('/')
    } else {
      const wrongCredentialData = await response.json()

      const errorMsg = wrongCredentialData.error_msg

      this.setState({errorMessage: errorMsg})
    }
  }

  render() {
    if (Cookies.get('jwt_token')) {
      return <Redirect to="/" />
    }
    const {username, password, errorMessage} = this.state
    return (
      <div className="loginPageBackgroundOuter">
        <img
          alt="login website logo"
          src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
          className="appLogo"
        />
        <div className="loginFormOuter">
          <div className="loginFormDiv">
            <h1 className="loginHeading">Login</h1>

            <form onSubmit={this.submitLogin} className="loginFormEl">
              <label className="loginUsernameLabelEl" htmlFor="usernameEl">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.userNameSet}
                id="usernameEl"
                type="text"
                className="loginUserNameInputEl"
              />
              <label className="loginPasswordLabelEl" htmlFor="passwordEl">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.passwordSet}
                id="passwordEl"
                type="password"
                className="loginPasswordInputEl"
              />
              <p className="loginErrorMessageEl">{errorMessage}</p>
              <button type="submit" className="loginBtnEl">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
