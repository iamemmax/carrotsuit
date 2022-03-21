import React from 'react';
import { connect } from "react-redux";
import PropTypes from '../../utils/propTypes';

import classNames from 'classnames';

const userImage = '/images/default_avatar.jpeg';

const Avatar = ({
  rounded,
  auth,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  const avatarSrc = auth.user.avatar
  return (
    <Tag
      src={ avatarSrc || userImage}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...restProps}
    />
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  style: {},
};

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Avatar);