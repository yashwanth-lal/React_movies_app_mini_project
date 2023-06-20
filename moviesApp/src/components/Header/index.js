import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import MailPage from '../MailPage/index'
import './index.css'

class Header extends Component {
  state = {hidden: false}

  toggleNavItems = () => {
    this.setState(prevState => ({
      hidden: !prevState.hidden,
    }))
  }

  render() {
    const {hidden} = this.state
    return (
      <>
        <div className="headerOuterDivDesktop">
          <div className="logoLinkDiv">
            <Link style={{textDecoration: 'none'}} to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
                className="appLogoHeader"
              />
            </Link>
            <ul className="header1Ul">
              <Link style={{textDecoration: 'none'}} to="/">
                <li className="headerHomePara">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/popular">
                <li className="headerPopularPara">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="accountSearchDiv">
            <Link to="/search">
              <button
                testid="searchButton"
                type="button"
                className="searchIconBtn"
              >
                <HiOutlineSearch className="searchIcon" />
              </button>
            </Link>
            <Link to="/account">
              <img
                alt="profile"
                className="avatarImg"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686304849/moviesAppMiniProjectCCBP/Avatar_v8weae.png"
              />
            </Link>
            <MailPage />
          </div>
        </div>
        {/* below is mobile view */}
        <div className="headerOuterDivMobile">
          <div className="headerLogoLinkDivMobile">
            <Link style={{textDecoration: 'none'}} to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
                className="appLogoHeaderMobile"
              />
            </Link>
            <div className="searchIconAndHam">
              <Link to="/search">
                <button
                  testid="searchButton"
                  type="button"
                  className="searchIconButtonMobile"
                >
                  <HiOutlineSearch className="searchIconMobile" />
                </button>
              </Link>
              <img
                alt="navIcon"
                src="https://res.cloudinary.com/yash9676/image/upload/v1687001605/moviesAppMiniProjectCCBP/add-to-queue_1_n6qfom.png"
                className="navIconMobile"
                onClick={this.toggleNavItems}
              />
            </div>
          </div>
          {hidden && (
            <ul className="header1UlMobile">
              <Link style={{textDecoration: 'none', color: 'white'}} to="/">
                <li className="headerHomeParaMobile">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/popular">
                <li className="headerPopularParaMobile">Popular</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/account">
                <li className="headerPopularParaMobile">Account</li>
              </Link>
              <img
                className="closeCircleMobile"
                src="https://res.cloudinary.com/yash9676/image/upload/v1687002932/moviesAppMiniProjectCCBP/Shape_rpt4nh.png"
                alt="close icon"
                onClick={this.toggleNavItems}
              />
            </ul>
          )}
        </div>
      </>
    )
  }
}
export default Header
