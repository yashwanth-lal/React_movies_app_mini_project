import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'
import './index.css'

class ProtectedRoute extends Component {
  render() {
    // const {exact, path, component} = this.props

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return <Route {...this.props} />
  }
}
export default ProtectedRoute
