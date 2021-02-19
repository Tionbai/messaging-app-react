import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../contexts/APIProvider';
import { useChatroom } from '../../../contexts/ChatroomProvider';
import CreateChatroomModal from './CreateChatroomModal';
import JoinChatroomModal from './JoinChatroomModal';

const Sidebar = () => {
  const [openCreateChatroomModal, setOpenCreateChatroomModal] = useState(false);
  const [openJoinChatroomModal, setOpenJoinChatroomModal] = useState(false);
  const { chatrooms } = useAPI();
  const { selectChatroom } = useChatroom();

  const closeCreateModal = () => {
    setOpenCreateChatroomModal(false);
  };
  const closeJoinModal = () => {
    setOpenJoinChatroomModal(false);
  };

  return (
    <nav style={{ width: '250px' }} className="d-flex flex-column border justify-content-end">
      <section className="d-flex flex-column flex-grow-1">
        <h3 className="mx-auto">Chatrooms</h3>
        <ListGroup>
          {chatrooms &&
            chatrooms.length &&
            chatrooms.map((chatroom) => {
              return (
                <ListGroup.Item
                  className="p-2 border-right-0"
                  key={uuidv4()}
                  action
                  active={chatroom.selected}
                  onClick={() => selectChatroom(chatroom._id)}
                >
                  Room:
                  {` ${chatroom.name}`}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </section>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setOpenJoinChatroomModal(true)}
      >
        Join chatroom
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setOpenCreateChatroomModal(true)}
      >
        New chatroom
      </Button>
      <Modal show={openJoinChatroomModal} onHide={closeJoinModal}>
        <JoinChatroomModal closeModal={closeJoinModal} />
      </Modal>
      <Modal show={openCreateChatroomModal} onHide={closeCreateModal}>
        <CreateChatroomModal closeModal={closeCreateModal} />
      </Modal>
      <Button variant="outline" className="p-2 border-top rounded-0">
        Logout
      </Button>
    </nav>
  );
};

export default Sidebar;
