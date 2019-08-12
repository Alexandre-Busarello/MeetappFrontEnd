import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

registerLocale('br', ptBR);

export default function DatePicker({ name, placeholderText }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selected, setSelected] = useState(
    defaultValue && parseISO(defaultValue)
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <ReactDatePicker
        name={name}
        selected={selected}
        dateFormat="dd/MM/yyyy"
        onChange={date => setSelected(date)}
        placeholderText={placeholderText}
        locale="br"
        ref={ref}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
};

DatePicker.defaultProps = {
  placeholderText: '',
};
