import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdControlPoint } from 'react-icons/md';
import PropTypes from 'prop-types';

import history from '~/services/history';
import { cancelMeetupRequest } from '~/store/modules/meetup/actions';
import { Container, CustomButton, Banner } from './styles';

export default function Details({ match }) {
  const dispatch = useDispatch();

  const { meetupId } = match.params;
  const meetup = useSelector(state =>
    state.meetup.userMeetups.find(m => String(m.id) === meetupId)
  );

  if (!meetup) {
    history.push('/dashboard');
    return <Container />;
  }

  function handleCancel(id) {
    dispatch(cancelMeetupRequest(id));
  }

  function handleEdit(id) {
    console.tron.log(id);
    history.push(`/meetup/${id}`);
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <CustomButton
            blue
            type="button"
            onClick={() => handleEdit(meetup.id)}
          >
            <MdControlPoint color="#FFF" size={18} />
            Editar
          </CustomButton>
          <CustomButton type="button" onClick={() => handleCancel(meetup.id)}>
            <MdControlPoint color="#FFF" size={18} />
            Cancelar
          </CustomButton>
        </div>
      </header>
      <div>
        <Banner>
          <img src={meetup.banner.url} alt="Banner do Meetup" />
        </Banner>
        <p>{meetup.description}</p>
        <div>
          <span>{meetup.dateFormatted}</span>
          <span>{meetup.location}</span>
        </div>
      </div>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.string,
    }),
  }).isRequired,
};
