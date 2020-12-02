import session from '../api/session';
import error_analyzer from './error'

import {
    GET_USER_DATA,
    LOADING_GET_USER_DATA,
    GET_USER_DATA_ERROR
  } from './types';

export default {
    namespaced: true,
    state: {
        user_data_loaded: false,
        user_data: {},
        loading_get_user_data: false,
        get_user_data_error: false,
        get_user_data_error_message: '',
        signout: false,
    },
    actions: {
        get_user_data({ commit }){
            commit(LOADING_GET_USER_DATA)

            return session.get('/getUser/')
            .then(({ data }) => commit(GET_USER_DATA, data[0]))
            .catch(function (error) {
                commit(GET_USER_DATA_ERROR, error)
            });
        }
    },
    mutations: {
        [LOADING_GET_USER_DATA](state){
            state.loading_get_user_data = true
            state.get_user_data_error = false
            state.signout = false
            state.user_data_loaded = false
            state.user_data_updated = false
        },
        [GET_USER_DATA_ERROR](state, error){
            state.loading_get_user_data = false
            state.get_user_data_error = true

            state.get_user_data_error_message = error_analyzer.analyse_error(error)

            if(state.get_user_data_error_message == 'Authentication credentials were not provided. '){
                state.signout = true
            }
        },
        [GET_USER_DATA](state, user_data) {
            state.user_data = user_data;

            state.user_data_loaded = true
            state.loading_get_user_data = false
            state.get_user_data_error = false
        }
    }
}