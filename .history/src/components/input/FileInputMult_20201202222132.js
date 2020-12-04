import React, { ChangeEvent, useRef, useEffect, useCallback, useState }  from 'react';

import { useField } from '@unform/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({       
  error: {
    color: "red",
    opacity:"70%"
  }
}))

const FileInput = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const classes = useStyles()
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
    }

    const previewURL = URL.createObjectURL(file);

    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      }
    })
  }, [fieldName, registerField]);

  return (
    <div>
      <label for="input">Selecionar um arquivol{preview}}</label>
     <input id="input" className={classes.input} type="file" ref={inputRef} defaultValue={defaultValue} multiple {...rest} />;
     <span>{inputRef.current}</span>
    </div>
  );
};

export default FileInput;

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
    form: {
      background: "red"
    },
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
  return (
    <div>
      <label for="input">Selecionar um arquivo{inputRef.value}</label>
     <input id="input" className={classes.input} type="file" ref={inputRef} defaultValue={defaultValue} multiple {...rest} />;
     <span>{inputRef.current}</span>
    </div>
  )
  
}