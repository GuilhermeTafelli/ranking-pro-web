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
    height: "50px",
    marginTop: "6px",
    width: "100%",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  label: {
    color: "#A8A8A8",
    fontFamily: "branding-medium",
    fontSize: "18px",
    marginTop: "50px",
    marginLeft: "16px"
  },
  main:{
    marginTop: "15px"
  }
}))

export default function CustomInput({ name, label, options, ...rest }) {
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
        <label className={classes.label} for="select" >{label}
        <select id="select" className={classes.input} ref={inputRef} defaultValue={defaultValue} {...rest}>
          {options.map(option => (<option value={option}>{option}</option>))}
        </select>
        </label>
        { error && <span className={classes.error}>{error}</span> }
      </div>
    )
}