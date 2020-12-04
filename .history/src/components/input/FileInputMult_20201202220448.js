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
export default function InputText({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files',
    });
  }, [fieldName, registerField]);
  return <input type="file" ref={inputRef} defaultValue={defaultValue} multiple {...rest} />;
}