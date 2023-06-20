import {Component} from 'react'
import {AiOutlineSend} from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import {Popup} from 'reactjs-popup'
import './index.css'

class MailPage extends Component {
  submitEmail = e => {
    e.preventDefault()

    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_PUBLIC_KEY,
    ) //  (service_id,template_id,e.target,public_key)
    // alert('The mail has been sent successfully to yashwanth lal')
  }

  render() {
    const overlayStyles = {
      background: '#4837b16b',
      zindex: 5,
      width: '100%',
      height: '100%',
    }
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Mail Us
            </button>
          }
          overlayStyle={overlayStyles}
        >
          {close => (
            <>
              <div className="closeBtnDiv">
                <button
                  type="button"
                  className="close-button"
                  onClick={() => close()}
                >
                  Close
                </button>
              </div>
              <div className="App">
                <form onSubmit={this.submitEmail} className="contact__form">
                  <label htmlFor="email_From">Email:</label>
                  <input
                    type="email"
                    name="emailFrom"
                    id="email_From"
                    className="email_from"
                    placeholder="Enter Your Email"
                  />
                  <label htmlFor="name_From">Name:</label>
                  <input
                    type="text"
                    name="nameFrom"
                    id="name_From"
                    className="email_from"
                    placeholder="Your Name"
                  />
                  <label htmlFor="message">Message:</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enter Your Message"
                    className="message_box"
                    cols="50"
                    rows="10"
                  >
                    {}
                  </textarea>
                  <Popup
                    modal
                    trigger={
                      <button
                        onSubmit={this.submitEmail}
                        type="submit"
                        className="sendEmailButton"
                        onClick={() => this.close()}
                      >
                        <AiOutlineSend className="sendIcon" />
                        <span className="sendPara">Send</span>
                      </button>
                    }
                  >
                    <p className="successMsg">
                      The mail has been sent successfully to yashwanth lal
                    </p>
                  </Popup>
                </form>
              </div>
            </>
          )}
        </Popup>
      </div>
    )
  }
}
export default MailPage
