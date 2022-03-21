import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import DefaultHost from '../settings/configs/DefaultHost';
import DefaultHostNotif from '../settings/configs/DefaultHostNotif';

const DefaultCompanyHost = () => {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <h6>Default host</h6>
            <DefaultHost />
            <br />
            <h6>Default host message</h6>
            <DefaultHostNotif hide={() => {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DefaultCompanyHost;
