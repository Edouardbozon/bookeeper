import { set, lensProp } from 'ramda';
import {
  SHARED_FLAT_CHOOSE_FILE,
} from './constants';

export function chooseFile(files, type, index) {
  return {
    type: SHARED_FLAT_CHOOSE_FILE,
    data: { files, type, index }
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_CHOOSE_FILE:
      const filesProp = lensProp('files');
      return set(filesProp, action.data.files, state);

    default:
      return state;
  }
}
