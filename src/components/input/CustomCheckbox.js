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
      height: "12px"
  },
  span: {
    backgroundColor: "#000"
  },
  label: {
    // color: "#373737",
    // fontFamily: "branding-semibold",
    // fontSize: "22px",
    background: "#000"
  }
}))

export default function CustomCheckbox({ name, label, ...rest }) {
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
        <label className={classes.input}>
          <input type="checkbox" ref={inputRef} defaultValue={defaultValue} {...rest}style={{backgroundColor: "red"}} />
          <span style={{backgroundColor: "red"}}></span>{label}
        </label>
        { error && <span className={classes.error}>{error}</span> }
      </>
    )
}