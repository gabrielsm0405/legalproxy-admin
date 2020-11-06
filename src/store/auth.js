import session from '../api/session'
import error_analyzer from './error'

import {
  SIGNIN_BEGIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
} from './types';

const TOKEN_STORAGE_KEY = 'SUPER_USER_TOKEN_STORAGE_KEY'

const initialState = {
  authenticating: false,
  signin_error: false,
  token: null,
  sigin_error_message: '',
};

const getters = {
  isAuthenticated: state => !!state.token,
};

const actions = {
  signin({ commit }, { username, password }) {
    commit(SIGNIN_BEGIN);

    var text = "grant_type=password&client_id=U3mDEQT6SqAfvpfh13udbvCbQ6LtHfyoUDABdSii&client_secret=novW6h83iYPO0PLBd2NY9SHTciY8yxIc2C3TCGDOCwR8U6UkliOaQFMe5kzC89FLxUiLwJ0AZ2zN2RhBpHjq31tGQIkbkN74ezSjZk62ZM0FOQx9RnqZsxkpp1fozqNW&username="+username+"&password="+password+"&platform=company"

    return session.post('/authenticate/token/', text)
      .then(({ data }) => commit(SET_TOKEN, data.access_token))
      .then(() => commit(SIGNIN_SUCCESS))
      .catch(function (error) {
        commit(SIGNIN_FAILURE, error)
      });
  },
  signout({ commit }) {
    commit(SIGNOUT)
    commit(REMOVE_TOKEN)
  },
  initialize({ commit }) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    if (token) {
      commit(SET_TOKEN, token);
    }
    else{
      commit(REMOVE_TOKEN)
    }
  },
};

const mutations = {
  [SIGNIN_BEGIN](state) {
    state.authenticating = true;
    state.signin_error = false;
  },
  [SIGNIN_FAILURE](state, error) {
    state.authenticating = false;
    state.signin_error = true;

    state.signin_error_message = error_analyzer.analyse_error(error)
  },
  [SIGNIN_SUCCESS](state) {
    state.authenticating = false;
    state.signin_error = false;
  },
  [SIGNOUT](state) {
    state.authenticating = false;
    state.signin_error = false;
  },
  [SET_TOKEN](state, token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    session.defaults.headers.Authorization = ` Bearer ${token}`
    state.token = token
  },
  [REMOVE_TOKEN](state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    delete session.defaults.headers.Authorization;
    state.token = null;
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};