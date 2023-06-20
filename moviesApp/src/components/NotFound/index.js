import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="notFoundOuter">
        <h1 className="notFoundHead">Lost Your Way</h1>
        <p className="notFoundPara">
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>

        <Link to="/">
          <button type="button" className="goHomeBtn">
            Go to Home
          </button>
        </Link>
      </div>
    )
  }
}
export default NotFound
