import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import BannerPhotoInput from './BannerPhotoInput';
import DatePicker from '~/components/DatePicker';

import { Container, FormFields } from './styles';

export default function Meetup({ match }) {
  const { meetupId } = match.params;
  const meetup = useSelector(state =>
    state.meetup.userMeetups.find(m => String(m.id) === meetupId)
  );

  async function handleSubmit(data) {
    try {
      if (meetup) {
        await api.put(`/meetups/${meetup.id}`, data);
      } else {
        await api.post('/meetups', data);
      }
      toast.success(
        `O meetup foi ${meetup ? 'atualizado' : 'criado'} com sucesso!`
      );
    } catch (err) {
      toast.error(
        `Erro ao ${
          meetup ? 'atualizar' : 'criar'
        } o meetup, confira seus dados!`
      );
    }
  }

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <FormFields>
          <BannerPhotoInput name="banner" />
          <Input name="title" type="text" placeholder="Título do Meetup" />
          <Textarea
            name="description"
            rows={6}
            placeholder="Descrição completa do evento"
          />
          <DatePicker name="date" placeholderText="Data do Meetup" />
          <Input name="location" type="text" placeholder="Localização" />
        </FormFields>

        <button type="submit">
          <MdControlPoint color="#FFF" size={18} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.number,
    }),
  }).isRequired,
};
