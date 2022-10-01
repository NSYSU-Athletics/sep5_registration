import { createStore } from 'vuex';

export default createStore({
    state: {
        messageBox: '',
        confirmBox: '',
        confirmAnswer: '',
        gameId: '',
        language: 'ch',
    },
    getters: {
    },
    mutations: {
        setMessageBox(state, data) {
            state.messageBox = data;
        },
        setConfirmBox(state, data) {
            state.confirmBox = data;
        },
        setConfirmAnswer(state, data) {
            state.confirmAnswer = data;
        },
        setGameId(state, data) {
            state.gameId = data;
        },
        setLanguage(state, data) {
            state.language = data;
        },
    },
    actions: {
    },
    modules: {
    },
});
