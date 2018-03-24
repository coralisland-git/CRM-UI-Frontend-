import { SEARCH } from './types';

export const getSearchKey = (dispatch) => {
	dispatch({ type:SEARCH.GET })
}

export const saveSearchKey = (key, url, dispatch) => {
	dispatch({ type:SEARCH.SAVE, payload:{key: key, url: url} })
}