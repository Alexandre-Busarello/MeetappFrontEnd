import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';

import {
  fetchUserMeetupsSuccess,
  fetchUserMeetupsFailure,
  cancelMeetupSuccess,
  cancelMeetupFailure,
} from './actions';

export function* fetchUserMeetups() {
  try {
    const response = yield call(api.get, `user-meetups`);
    const data = response.data.map(meetup => ({
      ...meetup,
      dateFormatted: format(parseISO(meetup.date), "dd 'de' MMMM, 'às' hh'h'", {
        locale: pt,
      }),
    }));

    yield put(fetchUserMeetupsSuccess(data));
  } catch (err) {
    toast.error('Erro ao obter os dados do meetup!');
    yield put(fetchUserMeetupsFailure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const response = yield call(api.delete, `meetups/${payload.id}`);
    yield put(cancelMeetupSuccess(response.data));

    history.push('/dashboard');

    toast.error('Meetup cancelado com sucesso!');
  } catch (err) {
    toast.error('Erro ao tentar cancelar o meetup!');
    yield put(cancelMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/FETCH_USER_MEETUPS_REQUEST', fetchUserMeetups),
  takeLatest('@meetup/CANCEL_REQUEST', cancelMeetup),
]);
