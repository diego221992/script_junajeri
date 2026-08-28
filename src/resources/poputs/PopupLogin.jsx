import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import '../assets/css/popupLogin.css'; // Import the CSS file

const PopupLogin = ({translator, text}) => {    
    return (
        <>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="bg-dark position-relative popupLogin popupAnimation"
          >
            <ToastContainer
              className="p-3"
              position="top-center"
              style={{ zIndex: 1}}
            >
              <Toast className="custom-toast">
                <Toast.Header className='toastHeader' closeButton={false}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Bootstrap</strong>
                  <small></small>
                </Toast.Header>
                <Toast.Body className='toastBody'><p>{text}</p></Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        </>
      );
}

export default PopupLogin;