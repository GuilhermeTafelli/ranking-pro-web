import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Input } from '@material-ui/core';

import { TextField, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({       
  error: {
    color: "red",
    opacity:"70%"
  },
  input: {
    borderRadius: "31px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "none",
    fontFamily: "branding-semibold",
    color: "#3052DE",
    size: "24px",
    padding: "0px"
    marginTop: "6px",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
  },
  label: {
    color: "#A8A8A8",
    fontFamily: "branding-medium",
    fontSize: "18px",
    marginBottom: "20px",
    marginLeft: "16px"
  }
}))

export default function CustomInput({ name, label, ...rest }) {
  const classes = useStyles()
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
    return (
      <>
        <label className={classes.label} for="input" >{label}</label>
        <input id="input" className={classes.input} ref={inputRef} defaultValue={defaultValue} {...rest} />
        { error && <span className={classes.error}>{error}</span> }
      </>
    )
}