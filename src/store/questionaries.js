import session from '../api/session';
import error_analyzer from './error'

import {
    LOADING_QUESTIONARIES_REQUEST,
    GET_QUESTIONARIES,
    QUESTIONARIES_REQUEST_ERROR,
    NEW_QUESTIONARY
} from './types';

export default {
    namespaced: true,
    state: {
        loading_questionaries_request: false,
        questionaries_request_error: false,
        questionaries_request_error_message: '',
        questionaries: [],
        questionary_added: false
    },
    actions: {
        get_questionaries({ commit }){
            commit(LOADING_QUESTIONARIES_REQUEST)

            return session.get('/getQuestionaires/')
            .then(({ data }) => commit(GET_QUESTIONARIES, data))
            .catch(function (error) {
                commit(QUESTIONARIES_REQUEST_ERROR, error)
            });
        },
        new_questionary({ commit }, questionary){
            commit(LOADING_QUESTIONARIES_REQUEST)
            
            return session.post('/newQuestionaire/', questionary)
            .then(() => commit(NEW_QUESTIONARY))
            .catch(function (error) {
                commit(QUESTIONARIES_REQUEST_ERROR, error)
            });
        }
    },
    mutations: {
        [LOADING_QUESTIONARIES_REQUEST](state){
            state.loading_questionaries_request = true
            state.questionaries_request_error = false
            state.questionary_added = false
        },
        [GET_QUESTIONARIES](state, questionaries){
            state.loading_questionaries_request = false

            state.questionaries = questionaries
        },
        [QUESTIONARIES_REQUEST_ERROR](state, error){
            state.loading_questionaries_request = false
            state.questionaries_request_error = true

            state.questionaries_request_error_message = error_analyzer.analyse_error(error)
        },
        [NEW_QUESTIONARY](state){
            state.loading_questionaries_request = false

            state.questionary_added = true
        }
    }
}