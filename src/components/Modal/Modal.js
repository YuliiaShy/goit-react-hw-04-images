import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
    useEffect(() => {
const handleEsc = event => {
        if (event.code === 'Escape') onClose();
    };
 window.addEventListener('keydown', handleEsc);
return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);  

    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) onClose();
    };

      return createPortal(
         
         <Overlay onClick={handleOverlayClick}>
           <ModalWindow>
            {children}
           </ModalWindow>
         </Overlay>,
          modalRoot
       );
    }


export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};