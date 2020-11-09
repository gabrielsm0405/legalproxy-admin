import session from '../api/session';
import error_analyzer from './error'

import {
    GET_COMPANIES_SHORT,
    LOADING_COMPANIES_REQUEST,
    COMPANIES_REQUEST_ERROR,
    GET_COMPANIES_LARGE,
    UPDATE_COMPANY,
    NEW_COMPANY,
    DELETE_COMPANY
  } from './types';

export default {
    namespaced: true,
    state: {
        companies_short: [],
        loading_companies_request: false,
        companies_request_error: false,
        companies_request_error_message: '',
        companies_large: [],
        company_updated: false,
        company_created: false,
        company_deleted: false
    },
    actions: {
        get_companies_short({ commit }){
            commit(LOADING_COMPANIES_REQUEST)

            return session.get('/getCompaniesShort/')
            .then(({ data }) => commit(GET_COMPANIES_SHORT, data))
            .catch(function (error) {
                commit(COMPANIES_REQUEST_ERROR, error)
            });
        },
        get_companies_large({ commit }){
            commit(LOADING_COMPANIES_REQUEST)

            return session.get('/getCompaniesLarge/')
            .then(({ data }) => commit(GET_COMPANIES_LARGE, data))
            .catch(function (error) {
                commit(COMPANIES_REQUEST_ERROR, error)
            });
        },
        update_company({ commit }, [id, company]){
            commit(LOADING_COMPANIES_REQUEST)
            
            return session.put('/updateCompany/'+id.toString()+'/', company)
            .then(() => commit(UPDATE_COMPANY))
            .catch(function (error) {
                commit(COMPANIES_REQUEST_ERROR, error)
            });
        },
        new_company({ commit }, company){
            commit(LOADING_COMPANIES_REQUEST)

            return session.post('/newCompany/', company)
            .then(() => commit(NEW_COMPANY))
            .catch(function (error) {
                commit(COMPANIES_REQUEST_ERROR, error)
            });
        },
        delete_company({ commit }, id){
            commit(LOADING_COMPANIES_REQUEST)

            return session.put('/deleteCompany/'+id.toString()+'/')
            .then(() => commit(DELETE_COMPANY))
            .catch(function (error) {
                commit(COMPANIES_REQUEST_ERROR, error)
            });
        }
    },
    mutations: {
        [LOADING_COMPANIES_REQUEST](state){
            state.loading_companies_request = true
            state.companies_request_error = false
            state.company_updated = false
            state.company_created = false
            state.company_deleted = false
        },
        [COMPANIES_REQUEST_ERROR](state, error){
            state.loading_companies_request = false
            state.companies_request_error = true

            state.companies_request_error_message = error_analyzer.analyse_error(error)
        },
        [GET_COMPANIES_SHORT](state, companies){
            state.companies_short = companies

            state.loading_companies_request = false
            state.companies_request_error = false
        },
        [GET_COMPANIES_LARGE](state, companies){
            state.companies_large = companies
            
            state.loading_companies_request = false
            state.companies_request_error = false
        },
        [UPDATE_COMPANY](state){
            state.loading_companies_request = false
            state.companies_request_error = false
            state.company_updated = true
        },
        [NEW_COMPANY](state){
            state.loading_companies_request = false
            state.companies_request_error = false
            state.company_created = true
        },
        [DELETE_COMPANY](state){
            state.loading_companies_request = false
            state.companies_request_error = false
            state.company_deleted = true
        }
    }
}