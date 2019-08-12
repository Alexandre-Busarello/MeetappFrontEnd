import produce from 'immer';

const INITIAL_STATE = {
  userMeetups: [],
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/FETCH_USER_MEETUPS_REQUEST':
        draft.loading = true;
        break;
      case '@meetup/FETCH_USER_MEETUPS_SUCCESS':
        draft.userMeetups = action.payload.userMeetups;
        draft.loading = false;
        break;
      case '@meetup/FETCH_USER_MEETUPS_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meetup/CANCEL_REQUEST':
        draft.loading = true;
        break;
      case '@meetup/CANCEL_SUCCESS':
        draft.userMeetups = draft.userMeetups.filter(
          m => m.id !== action.payload.meetup.id
        );
        draft.loading = false;
        break;
      case '@meetup/CANCEL_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
