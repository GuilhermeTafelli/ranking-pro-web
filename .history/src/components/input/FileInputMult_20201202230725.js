import React, { ChangeEvent, useRef, useEffect, useCallback, useState }  from 'react';

import { useField } from '@unform/core';
import { makeStyles } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({       
  error: {
    color: "red",
    opacity:"70%"
  },
  label: {
    cursor: "pointer",
  },
  input: {
    display: "none"
  },
  mainLabel: {
    padding: "20px",
    display: "flex",
    border: "dashed",
    borderColor: "#A8A8A8",
    borderRadius: "30px",
    borderWidth: "2px",
    alignItems: "center"
  },
  choseFiles: {
    border: "solid",
    borderRadius: "15px",
    borderWidth: "2px",
    padding: "10px",
    borderColor: "#A8A8A8",
    borderWidth: "2px",
    fontFamily: "branding-semibold",
    fontSize: "16px",
    color: "#A8A8A8",
  },
  fileName: {
    marginLeft: "20px",
    fontFamily: "branding-semibold",
    fontSize: "14px",
    color: "#3052DE",
    textAlign: "justify"
  },
  main: {
    marginTop: "15px"
  },
  labelTitle: {
    color: "#A8A8A8",
    fontFamily: "branding-medium",
    fontSize: "18px",
    marginTop: "50px",
    marginLeft: "16px",
    textAlign: "start"

  }
}))

const FileInputMult = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const classes = useStyles()
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e) => {
    const files = e.target.files

    if (!files || files.length === 0) {
      setPreview(null);
    }

    if(files.length === 1){
      setPreview(files[0].name);
    }
    else {
      setPreview(files.length+" arquivos")
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
    <div className={classes.main}>
     <label className={classes.labelTitle} for="input-file">{label}</label>
     <label className={classes.label} for="input-file">
      <div className={classes.mainLabel}>
        <h2 className={classes.choseFiles}>Escolher arquivos</h2>
        <span className={classes.fileName}>{preview}</span>
      </div>

     </label>
     <input ref={inputRef} id="input-file" name="input" onChange={handlePreview}  className={classes.input} type="file" defaultValue={defaultValue} multiple {...rest} />
    </div>
  );
};

export default FileInputMult