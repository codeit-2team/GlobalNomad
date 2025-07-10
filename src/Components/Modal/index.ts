import ModalWrapper from './Modal';
import ModalClose from './ModalClose';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalItem from './ModalItem';
import ModalTitle from './ModalTitle';
import ModalTrigger from './ModalTrigger';

const Modal = Object.assign(ModalWrapper, {
  Close: ModalClose,
  Content: ModalContent,
  Footer: ModalFooter,
  Header: ModalHeader,
  Item: ModalItem,
  Title: ModalTitle,
  Trigger: ModalTrigger,
});

export default Modal;
