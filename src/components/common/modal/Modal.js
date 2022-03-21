import React from 'react';
import { Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

const ModalComponent = props => {
  if (!props.show) return null;
  return (
    <Card>
      <CardBody>
        <Modal isOpen={props.show} toggle={() => props.close()}>
          <ModalHeader toggle={() => props.close()}>{props.header}</ModalHeader>
          <ModalBody>{props.children}</ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default ModalComponent;
