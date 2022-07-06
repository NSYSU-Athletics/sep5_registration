import { createStore } from 'vuex';

export default createStore({
    state: {
        messageBox: '',
    },
    getters: {
    },
    mutations: {
        setMessageBox(state, data) {
            state.messageBox = data;
        },
    },
    actions: {
    },
    modules: {
    },
});
