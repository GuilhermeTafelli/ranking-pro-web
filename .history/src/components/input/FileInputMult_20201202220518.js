import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({       
  error: {
    color: "red",
    opacity:"70%",
    marginLeft: "16px",
    textAlign: "justify",
    display: "block",
  },
  input: {
    borderRadius: "31px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "none",
    fontFamily: "branding-semibold",
    color: "#3052DE",
    height: "43px",
    marginTop: "6px",
    marginBottom: "6px",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
  }
}))
export default function InputText({ name, ...rest }) {
  const classes = useStyles()
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files',
    });
  }, [fieldName, registerField]);
  return <input className={classes.input} type="file" ref={inputRef} defaultValue={defaultValue} multiple {...rest} />;
}