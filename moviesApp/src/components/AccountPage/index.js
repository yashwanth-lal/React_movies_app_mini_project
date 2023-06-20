import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Footer from '../Footer'
import './index.css'

class AccountPage extends Component {
  logoutFunc = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('my_username')
    Cookies.remove('my_password')
    const {history} = this.props
    history.replace('/login')
  }

  //   getStringLength = str => {
  //     let count = 0
  //     for (let i = 0; str[i] !== undefined; i += 1) {
  //       count += 1
  //     }
  //     return count
  //   }

  render() {
    const username = Cookies.get('my_username')
    const password = Cookies.get('my_password')
    console.log(typeof password)
    return (
      <div className="accountPageOuter">
        <Header />
        <div className="overAll">
          <div className="accountDetailsDiv">
            <h1 className="accountHeading">Account</h1>
            <hr className="horLine" />
            <div className="memberShipDiv">
              <p className="memberShipPara">Member ship</p>
              <div className="memberShipDetailsDiv">
                <p className="memberShipUserPara">{username}@gmail.com</p>
                <p className="memberShipPassword">
                  Password : {'*'.repeat(password.length)}
                </p>
              </div>
            </div>
            <hr className="horLine" />
            <div className="planDetailsDiv">
              <p className="planDetailsPara">Plan details</p>
              <div className="planDetailsDiv2">
                <p className="premiumPara">Premium</p>
                <p className="ultraHdPara">Ultra HD</p>
              </div>
            </div>
            <hr className="horLine" />
            <div className="btnDiv">
              <button
                onClick={this.logoutFunc}
                type="button"
                className="logoutBtn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default AccountPage
