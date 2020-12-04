import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Input } from '@material-ui/core';

import { TextField, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({       
  error: {
    color: "red",
    opacity:"70%",
    marginLeft: "16px",
    textAlign: "justify",
    display: "block",
  },
  input: {
    background: "#FFFFFF",
    border: "none",
    fontFamily: "branding-semibold",
    color: "#3052D",
    fontSize: "18px",
    paddingTop:"10px"
  },
  label: {
    color: "#A8A8A8",
    fontFamily: "branding-medium",
    fontSize: "18px",
    marginTop: "50px",
    marginLeft: "16px"
  },
}))

export default function CustomTextArea({ name, label, ...rest }) {
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
      <div>
        <label className={classes.label} for="input" >{label}</label>
        <textarea id="input" className={classes.input} ref={inputRef} defaultValue={defaultValue} {...rest} />
        { error && <span className={classes.error}>{error}</span> }
      </div>
    )
}