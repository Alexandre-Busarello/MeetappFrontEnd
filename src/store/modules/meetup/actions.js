export function fetchUserMeetupsRequest() {
  return {
    type: '@meetup/FETCH_USER_MEETUPS_REQUEST',
  };
}

export function fetchUserMeetupsSuccess(userMeetups) {
  return {
    type: '@meetup/FETCH_USER_MEETUPS_SUCCESS',
    payload: { userMeetups },
  };
}

export function fetchUserMeetupsFailure() {
  return {
    type: '@meetup/FETCH_USER_MEETUPS_FAILURE',
  };
}

export function cancelMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_REQUEST',
    payload: { id },
  };
}

export function cancelMeetupSuccess(meetup) {
  return {
    type: '@meetup/CANCEL_SUCCESS',
    payload: { meetup },
  };
}

export function cancelMeetupFailure() {
  return {
    type: '@meetup/CANCEL_FAILURE',
  };
}
