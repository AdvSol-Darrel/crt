import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PageSpinner from '../ui/PageSpinner';

import * as Constants from '../../Constants';
import * as api from '../../Api';

function EditSegmentFormFields({ closeForm, projectId, refreshData, formType, segmentId }) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setURL] = useState(`${Constants.PATHS.TWM}?c=crt&project=${projectId}`);

  const myIframe = useRef(null);

  useEffect(() => {
    window.addEventListener('message', addEventListenerCloseForm);

    return removeEventListenerCloseForm;
  });

  useEffect(() => {
    if (formType === Constants.FORM_TYPE.EDIT) {
      setURL(`${url}&segment=${segmentId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //event functions

  const addEventListenerCloseForm = (event) => {
    if (event.data.message === 'closeForm' && event.origin === `${window.location.protocol}//${window.location.host}`) {
      setLoading(true);

      //convert route lineString data into groups of 2. Represents lon and lat coordinates.
      let data = _.chunk(event.data.route, 2);
      let description = event.data.description;
      //temporary fix check if it's add or edit.
      api
        .postSegment(projectId, { route: data, description })
        .then(() => {
          setLoading(false);
          refreshData();
          closeForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeEventListenerCloseForm = () => {
    window.removeEventListener('message', addEventListenerCloseForm);
  };

  //modal helper functions

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleClose = () => {
    if (dirtyCheck()) {
      toggle();
    } else {
      closeForm();
    }
  };

  const dirtyCheck = () => {
    // check if iFrame form is empty. if it's dirty we should ask user to confirm leaving
    let myForm = myIframe.current.contentWindow.document.forms['simple-router-form'];
    let dirtyFlag = false;

    //fixes crash if myiFrame hasn't loaded.
    if (!myForm) {
      return dirtyFlag;
    }

    for (let i = 0; i < myForm.elements.length; i++) {
      let fieldValue = myForm.elements[i].value;
      if (fieldValue) {
        dirtyFlag = true;
      }
    }

    return dirtyFlag;
  };

  if (loading) return <PageSpinner />;

  return (
    <React.Fragment>
      <iframe
        className="w-100"
        style={{ height: '800px' }}
        src={url}
        name="myIframe"
        id="myIframe"
        title="map"
        ref={myIframe}
      />
      <Button className="float-right mb-2" onClick={handleClose}>
        Cancel
      </Button>
      <Modal isOpen={modalOpen}>
        <ModalHeader>You have unsaved changes.</ModalHeader>
        <ModalBody>
          If the screen is closed before saving these changes, they will be lost. Do you want to continue without
          saving?
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={closeForm}>
            Leave
          </Button>
          <Button color="secondary" size="sm" onClick={toggle}>
            Go Back
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default EditSegmentFormFields;
