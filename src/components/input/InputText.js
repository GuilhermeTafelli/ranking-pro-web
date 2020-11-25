import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({       
  errorField: {
    notchedOutline:{
    borderColor: "red",
    }  },
  error: {
    color: "red",
    opacity:"70%"
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
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      <TextField inputRef={inputRef} defaultValue={defaultValue} {...rest} />
      { error && <span className={classes.error}>{error}</span> }
    </>
  )
}