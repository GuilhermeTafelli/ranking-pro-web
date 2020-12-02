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
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "none",
    fontFamily: "branding-semibold",
    color: "#3052DE",
    height: "43px",
    marginTop: "6px",
    marginBottom: "6px",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
  },
  main:{
    marginTop: "15px"
  }
}))

export default function CustomInputMult({ name, label, ...rest }) {
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
      <div className={classes.main}>
        <input id="input" className={classes.input} ref={inputRef} defaultValue={defaultValue} {...rest} />
        { error && <span className={classes.error}>{error}</span> }
      </div>
    )
}