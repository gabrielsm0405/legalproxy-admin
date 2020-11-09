import session from '../api/session';
import error_analyzer from './error'

import {
    GET_ESFERAS,
    GET_TRIBUNAIS,
    GET_COMARCAS,
    GET_FOROS,
    GET_VARAS,
    GET_HEARING_TYPES,
    LOADING_HEARING_REQUEST,
    HEARING_REQUEST_ERROR,
    REGISTER_HEARING,
    GET_HEARINGS,
    SEARCH_PROXIES,
    INVITE_PROXY,
    UPDATE_HEARING,
    DELETE_UPDATE_HEARING,
    GET_ALL_HEARINGS,
    DELETE_ALL_UPDATE_HEARING
  } from './types';

export default {
    namespaced: true,
    state: {
        hearing_types: [],
        esferas: [],
        tribunais: [],
        comarcas: [],
        foros: [],
        varas: [],
        loading_hearing_request: false,
        hearing_request_error: false,
        hearing_request_error_message: '',
        hearing_registred: false,
        hearings: [],
        proxies: [],
        proxy_invited: false,
        hearings_updates: [],
        all_hearings: []
    },
    actions: {
        get_hearing_types({ commit }){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getHearingTypes/')
            .then(({ data }) => commit(GET_HEARING_TYPES, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        get_esferas({ commit }){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getEsferas/')
            .then(({ data }) => commit(GET_ESFERAS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        get_tribunais({ commit }, id){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getTribunais/byEsfera/'+id.toString()+'/')
            .then(({ data }) => commit(GET_TRIBUNAIS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        get_comarcas({ commit }, id){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getComarcas/byTribunal/'+id.toString()+'/')
            .then(({ data }) => commit(GET_COMARCAS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        get_foros({ commit }, id){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getForos/byComarca/'+id.toString()+'/')
            .then(({ data }) => commit(GET_FOROS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        get_varas({ commit }, id){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getVaras/byForo/'+id.toString()+'/')
            .then(({ data }) => commit(GET_VARAS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        register_hearing({ commit }, send_data){
            commit(LOADING_HEARING_REQUEST)

            return session.post('/newHearing/', send_data)
            .then(() => commit(REGISTER_HEARING))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        get_hearings({ commit }, {start, end}){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getHearings/start/'+start.toString()+'/end/'+end.toString())
            .then(({ data }) => commit(GET_HEARINGS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        search_proxies({ commit }, id){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/getProxies/forHearing/'+id.toString()+'/')
            .then(({ data }) => commit(SEARCH_PROXIES, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        invite_proxy({ commit }, {proxy_id, hearing_id}){
            commit(LOADING_HEARING_REQUEST)

            return session.get('/inviteProxy/'+proxy_id.toString()+'/forHearing/'+hearing_id.toString())
            .then(() => commit(INVITE_PROXY))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        },
        hearing_update({ commit }, update){
            commit(UPDATE_HEARING, update)
        },
        delete_hearing_update({ commit }, id){
            commit(DELETE_UPDATE_HEARING, id)
        },
        delete_all_hearing_update({ commit }){
            commit(DELETE_ALL_UPDATE_HEARING)
        },
        get_all_hearings({ commit }){
            commit(LOADING_HEARING_REQUEST)

            var start = new Date('2020-01-01').toISOString().split("T")[0]
            var end = new Date('2030-12-31').toISOString().split("T")[0]

            return session.get('/getHearings/start/'+start.toString()+'/end/'+end.toString())
            .then(({ data }) => commit(GET_ALL_HEARINGS, data))
            .catch(function (error) {
                commit(HEARING_REQUEST_ERROR, error)
            });
        }
    },
    mutations: {
        [LOADING_HEARING_REQUEST](state){
            state.loading_hearing_request = true
            state.request_hearing_error = false
            state.hearing_registred = false
            state.proxy_invited = false
        },
        [HEARING_REQUEST_ERROR](state, error){
            state.loading_hearing_request = false
            state.hearing_request_error = true

            state.hearing_request_error_message = error_analyzer.analyse_error(error)
        },
        [GET_HEARING_TYPES](state, hearing_types){
            state.hearing_types = hearing_types

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [GET_ESFERAS](state, esferas) {
            state.esferas = esferas;

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [GET_TRIBUNAIS](state, tribunais) {
            state.tribunais = tribunais;

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [GET_COMARCAS](state, comarcas) {
            state.comarcas = comarcas;

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [GET_FOROS](state, foros) {
            state.foros = foros;

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [GET_VARAS](state, varas) {
            state.varas = varas;

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [REGISTER_HEARING](state){
            state.loading_hearing_request = false
            state.hearing_request_error = false
            state.hearing_registred = true
        },
        [GET_HEARINGS](state, hearings){
            state.hearings = hearings

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [SEARCH_PROXIES](state, proxies){
            state.proxies = proxies

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
        [INVITE_PROXY](state){
            state.loading_hearing_request = false
            state.hearing_request_error = false
            state.proxy_invited = true
        },
        [UPDATE_HEARING](state, update){
            if(state.hearings_updates.find(element => element.id == update.id) == null){
                state.hearings_updates.push(update)
            }
        },
        [DELETE_UPDATE_HEARING](state, id){
            let index = state.hearings_updates.map(x => x.id).indexOf(id);
            state.hearings_updates.splice(index, 1);
        },
        [DELETE_ALL_UPDATE_HEARING](state){
            state.hearings_updates = []
        },
        [GET_ALL_HEARINGS](state, hearings){
            state.all_hearings = hearings

            state.loading_hearing_request = false
            state.hearing_request_error = false
        },
    }
}