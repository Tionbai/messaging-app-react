import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../contexts/APIProvider';
import CreateChatroomModal from './CreateChatroomModal';

const Sidebar = () => {
  const [openCreateChatroomModal, setOpenCreateChatroomModal] = useState(false);
  const { chatrooms } = useAPI();

  const closeModal = () => {
    setOpenCreateChatroomModal(false);
  };

  return (
    <nav style={{ width: '250px' }} className="d-flex flex-column border justify-content-end">
      <section className="d-flex flex-column flex-grow-1">
        <h3 className="mx-auto">Chatrooms</h3>
        {chatrooms &&
          chatrooms.length &&
          chatrooms.map((chatroom) => {
            return (
              <div className="p-2 border-top border-bottom" key={uuidv4()}>
                Room:
                {` ${chatroom.name}`}
              </div>
            );
          })}
      </section>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setOpenCreateChatroomModal(true)}
      >
        New chatroom
      </Button>
      <Modal show={openCreateChatroomModal} onHide={closeModal}>
        <CreateChatroomModal closeModal={closeModal} />
      </Modal>
      <Button variant="outline" className="p-2 border-top rounded-0">
        Logout
      </Button>
    </nav>
  );
};

export default Sidebar;
