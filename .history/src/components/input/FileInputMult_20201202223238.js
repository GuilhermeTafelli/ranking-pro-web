import React, { ChangeEvent, useRef, useEffect, useCallback, useState }  from 'react';

import { useField } from '@unform/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({       
  error: {
    color: "red",
    opacity:"70%"
  },
  label: {
    height: "20px",
    width: "100%"
  },
  input: {
    display: "none"
  }
}))

const FileInputMult = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const classes = useStyles()
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e) => {
    const files = e.target.files

    if (!files) {
      setPreview(null);
    }

    if(files.length === 1){
      setPreview(files[0].name);
    }
    else {
      setPreview(files.length)
    } 

  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files',
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
     <label for="input">Selecionar um arquivo</label>
     <input onChange={handlePreview} id="input" className={classes.input} type="file" ref={inputRef} defaultValue={defaultValue} multiple {...rest} />;
     <span>{preview}</span>
    </div>
  );
};

export default FileInputMult