import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
    theme: {
        themes: {
            light: {
                primary: '#262626', // GRAFITE
                secondary: '#e5ad3c', // AMARELO ESCURO
                tertiary: '#f1f3f4', // CINZA CLARO,
                amarelo_claro: '#fad97d'
            },
            dark: {

            }
        },
    },
});
