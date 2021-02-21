import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

const ModalTemplate = (props) => {
  const { modalOptions, setActiveModal } = props;
  const { headerString, labelString, buttonString } = modalOptions;
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    modalOptions.submitFunc(inputRef.current.value);
    setActiveModal(false);
  };

  return (
    <div>
      <Modal.Header closeButton>{headerString}</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>{labelString}</Form.Label>
            <Form.Control type="text" ref={inputRef} required />
          </Form.Group>
          <Button type="submit">{buttonString}</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

ModalTemplate.propTypes = {
  modalOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  setActiveModal: PropTypes.func.isRequired,
};

export default ModalTemplate;
