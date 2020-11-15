import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Checkbox } from '@material-ui/core';

export default function CheckboxInput({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <Checkbox inputRef={inputRef} defaultValue={defaultValue} {...rest} />;
}