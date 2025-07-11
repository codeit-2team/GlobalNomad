import ModalWrapper from './Modal';
import ModalClose from './ModalClose';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalItem from './ModalItem';
import ModalTitle from './ModalTitle';
import ModalTrigger from './ModalTrigger';

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
