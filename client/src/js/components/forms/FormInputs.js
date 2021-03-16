import React from 'react';
import { CustomInput, Col, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useField } from 'formik';
import MouseoverTooltip from '../ui/MouseoverTooltip';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';

import { HELPER_TEXT } from '../helpers/helperText';

export const FormRow = ({ name, label, children, helper = '' }) => {
  return (
    <FormGroup row>
      <Col sm={3}>
        <Label for={name}>
          {label}
          {helper && <MouseoverTooltip id={`${helper}__tooltip`}>{HELPER_TEXT[helper]}</MouseoverTooltip>}
        </Label>
      </Col>
      <Col sm={9}>{children}</Col>
    </FormGroup>
  );
};

export const FormSwitchInput = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  return <CustomInput type="switch" id={props.name} {...field} {...props} />;
};

export const FormCheckboxInput = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  return <CustomInput type="checkbox" id={props.name} {...field} {...props} />;
};

export const FormInput = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <React.Fragment>
      <Input {...field} {...props} invalid={meta.error && meta.touched}>
        {children}
      </Input>
      {meta.error && meta.touched && <FormFeedback>{meta.error}</FormFeedback>}
    </React.Fragment>
  );
};

export const FormNumberInput = ({ className, children, ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });

  return (
    <React.Fragment>
      <Input type="hidden" {...field} {...props} invalid={meta.error && meta.touched} />
      <NumberFormat
        className={classNames('form-control', className)}
        thousandSeparator={true}
        value={props.value || undefined}
        onValueChange={(val) => {
          helpers.setTouched(true);
          helpers.setValue(val.floatValue);
        }}
        {...props}
      >
        {children}
      </NumberFormat>
      {meta.error && meta.touched && <FormFeedback>{meta.error}</FormFeedback>}
    </React.Fragment>
  );
};
