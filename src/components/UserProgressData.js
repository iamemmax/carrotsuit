import React from 'react';
import PropTypes from '../utils/propTypes';

import { Table, Progress } from 'reactstrap';

import Avatar from './includes/Avatar';

import withBadge from './includes/WithBadge';

const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

const UserProgressTable = ({ headers, usersData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ avatar, name, visitors, percent }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <AvatarWithBadge src={avatar || '/images/logo_200.png'} />
            </td>
            <td className="align-middle text-center">{name}</td>
            <td className="align-middle text-center">{visitors}</td>
            <td className="align-middle text-center">
              <Progress value={percent} style={{ height: 5 }} />
            </td>
            <td className="align-middle text-center">{percent}%</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.date,
    })
  ),
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserProgressTable;