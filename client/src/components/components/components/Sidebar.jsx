import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../contexts/APIProvider';
import { useChatroom } from '../../../contexts/ChatroomProvider';
import ChatroomModal from './ChatroomModal';

const Sidebar = () => {
  const [openModal, setOpenModal] = useState(null);
  const { chatrooms } = useAPI();
  const { selectChatroom } = useChatroom();

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
      <Button className="p-2 border-top rounded-0" onClick={() => setOpenModal('Join')}>
        Join chatroom
      </Button>
      <Button className="p-2 border-top rounded-0" onClick={() => setOpenModal('Create')}>
        Create chatroom
      </Button>
      <Modal
        show={openModal === 'Create' || openModal === 'Join'}
        onHide={() => setOpenModal(false)}
      >
        <ChatroomModal openModal={openModal} setOpenModal={setOpenModal} />
      </Modal>
      <Button variant="outline" className="p-2 border-top rounded-0">
        Logout
      </Button>
    </nav>
  );
};

export default Sidebar;
