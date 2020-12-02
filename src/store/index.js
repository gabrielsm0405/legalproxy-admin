import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './auth'
import address from './address'
import hearings from './hearings'
import companies from './companies'
import questionaries from './questionaries'
import user_data from './user_data'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        address,
        hearings,
        companies,
        questionaries,
        user_data
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})