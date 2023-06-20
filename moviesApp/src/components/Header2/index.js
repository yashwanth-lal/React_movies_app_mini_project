import {Component} from 'react'
import {Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import MailPage from '../MailPage/index'

import './index.css'

class Header2 extends Component {
  state = {text: '', hiddenHeader2: false}

  toggleNavItemsHeader2 = () => {
    this.setState(prevState => ({
      hiddenHeader2: !prevState.hiddenHeader2,
    }))
  }

  inputChange = e => {
    this.setState({text: e.target.value})
  }

  func = () => {
    const {sampleFunc} = this.props
    const {text} = this.state
    sampleFunc(text)
  }

  render() {
    const {text, hiddenHeader2} = this.state
    return (
      <>
        <div className="_headerOuterDiv">
          <div className="_logoLinkDiv">
            <Link style={{textDecoration: 'none'}} to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
                className="_appLogoHeader"
              />
            </Link>
            <ul className="header2Ul">
              <Link style={{textDecoration: 'none'}} to="/">
                <li className="_headerHomePara">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/popular">
                <li className="_headerPopularPara">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="_accountSearchDiv">
            <div className="_inputSearchIconDiv">
              <input
                value={text}
                onChange={this.inputChange}
                type="search"
                className="inputEl"
              />
              <button
                testid="searchButton"
                onClick={this.func}
                type="button"
                className="searchBtn"
              >
                <HiOutlineSearch className="_searchIcon" />
              </button>
            </div>
            <Link style={{marginLeft: '30px'}} to="/account">
              <img
                alt="profile"
                className="_avatarImg"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686304849/moviesAppMiniProjectCCBP/Avatar_v8weae.png"
              />
            </Link>
            <MailPage />
          </div>
        </div>
        {/* below is mobile view */}

        <div className="_headerOuterDivMobile">
          <div className="_headerLogoLinkDivMobile">
            <Link style={{textDecoration: 'none'}} to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
                className="_appLogoHeaderMobile"
              />
            </Link>
            <div className="_searchIconAndHamMobile">
              <div className="_inputSearchIconDivMobile">
                <input
                  value={text}
                  onChange={this.inputChange}
                  type="search"
                  className="_inputElMobile"
                />
                <button
                  testid="searchButton"
                  onClick={this.func}
                  type="button"
                  className="_searchBtnMobile"
                >
                  <HiOutlineSearch className="_searchIconMobile" />
                </button>
              </div>
              <img
                alt="navIcon"
                src="https://res.cloudinary.com/yash9676/image/upload/v1687001605/moviesAppMiniProjectCCBP/add-to-queue_1_n6qfom.png"
                className="_navIconMobile"
                onClick={this.toggleNavItemsHeader2}
              />
            </div>
          </div>
          {hiddenHeader2 && (
            <ul className="_header1UlMobile">
              <Link style={{textDecoration: 'none', color: 'white'}} to="/">
                <li className="_headerHomeParaMobile">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/popular">
                <li className="_headerPopularParaMobile">Popular</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/account">
                <li className="_headerPopularParaMobile">Account</li>
              </Link>
              <img
                className="_closeCircleMobile"
                src="https://res.cloudinary.com/yash9676/image/upload/v1687002932/moviesAppMiniProjectCCBP/Shape_rpt4nh.png"
                alt="close icon"
                onClick={this.toggleNavItemsHeader2}
              />
            </ul>
          )}
        </div>
      </>
    )
  }
}

export default Header2
