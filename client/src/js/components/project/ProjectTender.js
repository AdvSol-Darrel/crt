import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { showValidationErrorDialog } from '../../redux/actions';

//components
import Authorize from '../fragments/Authorize';
import MaterialCard from '../ui/MaterialCard';
import UIHeader from '../ui/UIHeader';
import PageSpinner from '../ui/PageSpinner';
import DataTableControl from '../ui/DataTableControl';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import EditTenderFormFields from '../forms/EditTenderFormFields';

import useFormModal from '../hooks/useFormModal';
import moment from 'moment';
import * as api from '../../Api';
import * as Constants from '../../Constants';

const ProjectTender = ({ match, history, fiscalYears, showValidationErrorDialog, projectSearchHistory }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .getProjectTender(match.params.id)
      .then((response) => {
        let dateFormattedResponse = { ...response.data, tenders: changeDateFormat(response.data.tenders) };
        setData(dateFormattedResponse);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        showValidationErrorDialog(error.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectTenderTableColumns = [
    { heading: 'Tendor #', key: 'tenderNumber', nosort: true },
    { heading: 'Planned Date', key: 'plannedDate', nosort: true },
    { heading: 'Actual Date', key: 'actualDate', nosort: true },
    { heading: 'Tendor Value', key: 'tenderValue', nosort: true },
    { heading: 'Winning Contractor', key: 'winningCntrctr', nosort: true },
    { heading: 'Winning Bid', key: 'bidValue', nosort: true },
    { heading: 'Comment', key: 'comment', nosort: true },
  ];

  const onTenderEditClicked = (tenderId) => {
    tendersFormModal.openForm(Constants.FORM_TYPE.EDIT, { tenderId, projectId: data.id });
    console.log(tenderId + 'Edit');
  };

  const onTenderDeleteClicked = (tenderId) => {
    console.log(tenderId + 'Delete');
  };

  const addTenderClicked = () => {
    tendersFormModal.openForm(Constants.FORM_TYPE.ADD);
  };

  const handleEditTenderFormSubmit = (values, formType) => {
    if (!tendersFormModal.submitting) {
      tendersFormModal.setSubmitting(true);
      if (formType === Constants.FORM_TYPE.ADD) {
        api
          .postFinTarget(data.id, values)
          .then(() => {
            tendersFormModal.closeForm();
            refreshData();
          })
          .catch((error) => {
            console.log(error.response);
            showValidationErrorDialog(error.response.data);
          })
          .finally(() => tendersFormModal.setSubmitting(false));
      } else if (formType === Constants.FORM_TYPE.EDIT) {
        api
          .putFinTarget(data.id, values.id, values)
          .then(() => {
            tendersFormModal.closeForm();
            refreshData();
          })
          .catch((error) => {
            console.log(error.response);
            showValidationErrorDialog(error.response.data);
          })
          .finally(() => tendersFormModal.setSubmitting(false));
      }
    }
  };

  const refreshData = () => {
    api
      .getProjectTender(data.id)
      .then((response) => {
        let dateFormattedResponse = { ...response.data, tenders: changeDateFormat(response.data.tenders) };
        setData(dateFormattedResponse);
      })
      .catch((error) => {
        console.log(error.response);
        showValidationErrorDialog(error.response.data);
      });
  };

  const changeDateFormat = (tenderArray) => {
    let changedTenderArray = tenderArray.map((tender) => {
      return {
        ...tender,
        plannedDate: moment(tender.plannedDate).format(Constants.DATE_DISPLAY_FORMAT),
        actualDate: moment(tender.actualDate).format(Constants.DATE_DISPLAY_FORMAT),
      };
    });

    return changedTenderArray;
  };

  const tendersFormModal = useFormModal('Tender Details', <EditTenderFormFields />, handleEditTenderFormSubmit, true);

  if (loading) return <PageSpinner />;

  return (
    <React.Fragment>
      <UIHeader>Project {data.id} Details</UIHeader>
      <MaterialCard>
        <UIHeader>
          Project Tender Details{' '}
          <Authorize requires={Constants.PERMISSIONS.PROJECT_W}>
            <Button color="primary" className="float-right" onClick={addTenderClicked}>
              + Add
            </Button>
          </Authorize>
        </UIHeader>
        <DataTableControl
          dataList={data.tenders}
          tableColumns={projectTenderTableColumns}
          editable
          deletable
          editPermissionName={Constants.PERMISSIONS.PROJECT_W}
          onEditClicked={onTenderEditClicked}
          onDeleteClicked={onTenderDeleteClicked}
        />
      </MaterialCard>
      <MaterialCard>
        <UIHeader>Announcement Details</UIHeader>
      </MaterialCard>
      <div className="text-right">
        <Link to={`${Constants.API_PATHS.PROJECTS}/${data.id}`}>
          <Button color="secondary">{'< Project Details'}</Button>
        </Link>
        <Button color="primary" onClick={() => alert('temporary fix link to next section')}>
          Continue
        </Button>
        <Button color="secondary" onClick={() => history.push(projectSearchHistory)}>
          Close
        </Button>
      </div>
      {tendersFormModal.formElement}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fiscalYears: state.codeLookups.fiscalYears,
    projectSearchHistory: state.projectSearchHistory.projectSearch,
  };
};

export default connect(mapStateToProps, { showValidationErrorDialog })(ProjectTender);