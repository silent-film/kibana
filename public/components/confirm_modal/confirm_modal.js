/* eslint-disable react/forbid-elements */
import React from 'react';
import PropTypes from 'prop-types';
import { EuiConfirmModal, EuiOverlayMask } from '@elastic/eui';

export const ConfirmModal = props => {
  const {
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmButtonText,
    cancelButtonText,
    className,
  } = props;

  const confirm = ev => {
    onConfirm && onConfirm(ev);
  };

  const cancel = ev => {
    onCancel && onCancel(ev);
  };

  // render nothing if this component isn't open
  if (!isOpen) return null;

  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        className={`canvasConfirmModal ${className || ''}`}
        title={title}
        onCancel={cancel}
        onConfirm={confirm}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        defaultFocusedButton="confirm"
        buttonColor="danger"
      >
        {message}
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  className: PropTypes.string,
};

ConfirmModal.defaultProps = {
  title: 'Confirm',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
};
