import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export interface ModalProps {
  size: string;
  title: string;
  content: string;
  showModal: boolean;
  closeModal: any;
}

const CustomModal = (props: ModalProps) => {
  return (
    <Modal
      size="lg"
      show={props.showModal}
      onHide={props.closeModal}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
