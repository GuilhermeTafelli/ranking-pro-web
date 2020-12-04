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
    alignItems: "center"
  },
  choseFiles: {
    border: "solid",
    borderRadius: "15px",
    borderWidth: "2px",
    padding: "10px",
    borderColor: "#A8A8A8",
    fontFamily: "branding-semibold",
    fontSize: "16px",
    color: "#3052DE",
  },
  fileName: {
    marginLeft: "20px",
    fontFamily: "branding-semibold",
    fontSize: "14px",
    color: "#3052DE",
  },
  main: {
    marginTop: "15px"
  }
}))

const FileInputMult = ({ name, ...rest }) => {
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
     <label className={classes.label} for="input-file">
      <div className={classes.mainLabel}>
        <h2 className={classes.choseFiles}>Escolha os arquivos</h2>
        <span className={classes.fileName}>{preview}</span>
      </div>

     </label>
     <input ref={inputRef} id="input-file" name="input" onChange={handlePreview}  className={classes.input} type="file" defaultValue={defaultValue} multiple {...rest} />
    </div>
  );
};

export default FileInputMult