import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Fields } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  root: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  submit: {
    marginTop: '10px',
  },
};

const renderFields = ({ emails }) =>
  emails.map((email, index) => {
    const {
      input,
      meta: { error, pristine },
    } = email;
    const errorText = !pristine && error;
    return (
      <div key={index}>
        <TextField {...input} error={!pristine && !!error} label={errorText || 'Email'} />
      </div>
    );
  });

const EmailForm = props => {
  const { classes, handleSubmit, numberOfPeople } = props;
  const names = [...Array(numberOfPeople).keys()].map(n => `emails[${n}]`);
  return (
    <div className={classes.root}>
      <Form onSubmit={handleSubmit} className={classes.form}>
        <Fields names={names} component={renderFields} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          classes={{ root: classes.submit }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

EmailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
};

const validate = (values, props) => {
  const errors = {};
  if (!values.emails) {
    errors._error = 'Please enter emails';
  } else {
    const emailsError = [];

    for (let i = 0; i < props.numberOfPeople; i++) {
      const email = values.emails[i];
      if (!email) {
        emailsError[i] = 'Required';
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        emailsError[i] = 'Invalid Email';
      }
    }

    if (emailsError.length) {
      errors.emails = emailsError;
    }
  }

  return errors;
};

const StyledEmailForm = withStyles(styles)(EmailForm);
export default reduxForm({
  form: 'emailForm',
  onSubmit: values => {
    // eslint-disable-next-line no-console
    console.log(values);
  },
  validate,
})(StyledEmailForm);
