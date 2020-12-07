import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Input } from '@material-ui/core';

import { TextField, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    opacity: "70%",
    marginLeft: "16px",
    textAlign: "justify",
    display: "block",
  },
  input: {
    borderRadius: "0px 31px 31px 0px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "none",
    fontFamily: "branding-semibold",
    color: "#3052DE",
    height: "42px",
    marginTop: "6px",
    marginBottom: "6px",
    boxShadow: "1px 0 6px rgba(0, 0, 0, 0.09)",
    paddingLeft: "3px",
  },
  label: {
    color: "#A8A8A8",
    fontFamily: "branding-medium",
    fontSize: "18px",
    marginTop: "50px",
    marginLeft: "16px"
  },
  mainContainer: {
    // marginTop: "15px",
    display: "flex",
    alignItems: "flex-end"
  },
  main: {
    width: "100%"
  },
  adornment: {
    borderRadius: "31px 0px 0px 31px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "none",
    fontFamily: "branding-semibold",
    fontSize: "14px",
    color: "#A8A8A8",
    height: "42px",
    marginTop: "6px",
    marginBottom: "6px",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
    padding: "10px 1px 10px 16px"
  },
  inputContainer: {
    display: "flex",
    width: "100%"
  }
}))

export default function CustomInputAdornment({ name, label, adornment, ...rest }) {
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
      <label className={classes.label} for="container" >{label}</label>
      <div id="container" className={classes.mainContainer}>
        <div>
          <h2 className={classes.adornment}>{adornment}</h2>
        </div>
        <div className={classes.inputContainer}>
          <input id="input" className={classes.input} ref={inputRef} defaultValue={defaultValue} {...rest} />
        </div>
      </div>
      {error && <span className={classes.error}>{error}</span>}

    </div>
  )
}