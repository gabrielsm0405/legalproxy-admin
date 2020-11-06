import {
    LOADING_ADDRESS,
    ADDRESS_ERROR,
    GET_ADDRESS
} from './types'

const initialState = {
    loading_address: false,
    address_error: false,
    address_street: '',
    address_district: '',
    city: '',
    state: ''
}

const actions = {
    get_address({ commit }, cep){
        commit(LOADING_ADDRESS)

        var Httpreq = new XMLHttpRequest()
        Httpreq.open("GET", "https://viacep.com.br/ws/"+cep+"/json/", false)

        try{
            Httpreq.send(null)

            commit(GET_ADDRESS, JSON.parse(Httpreq.responseText))

            return true
        }catch(ex){
            commit(ADDRESS_ERROR)

            return false;
        }
    }
}

const mutations = {
    [LOADING_ADDRESS](state){
        state.loading_address = true
        state.address_error = false
    },
    [ADDRESS_ERROR](state){
        state.loading_address = false
        state.address_error = true
    },
    [GET_ADDRESS](state, address){
        state.loading_address = false
        state.address_error = false

        state.address_street = address.logradouro
        state.address_district = address.bairro
        state.city = address.localidade
        state.state = address.uf
    }
}

export default {
    namespaced: true,
    state: initialState,
    actions,
    mutations
  };