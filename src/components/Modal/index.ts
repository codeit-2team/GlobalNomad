import ModalWrapper from './Modal';
import ModalClose from './Close';
import ModalContent from './Content';
import ModalFooter from './Footer';
import ModalHeader from './Header';
import ModalItem from './Item';
import ModalTitle from './Title';
import ModalTrigger from './Trigger';

const Modal = Object.assign(ModalWrapper, {
  Content: ModalContent,
  Footer: ModalFooter,
  Header: ModalHeader,
  Item: ModalItem,
  Title: ModalTitle,
  Trigger: ModalTrigger,
  Close: ModalClose,
});

export default Modal;
