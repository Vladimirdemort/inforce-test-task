import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children }) {
  return createPortal(
    <div className={s.Overlay}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}
