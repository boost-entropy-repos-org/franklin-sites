import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/modal.scss';

export default function useModal(Backdrop, Content) {
  const [displayModal, setDisplayModal] = useState(false);
  const Modal = ({
    children,
    ...props
  }) => (
    <div className="modal">
      <Backdrop className="modal__backdrop--visible" {...props} />
      <Content className="modal__content" {...props}>
        {children}
      </Content>
    </div>
  );

  Modal.propTypes = {
    children: PropTypes.oneOfType(
      [PropTypes.arrayOf(PropTypes.node), PropTypes.node],
    ).isRequired,
  };

  return {
    displayModal,
    setDisplayModal,
    Modal,
  };
}


