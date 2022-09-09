import { createStore } from 'vuex';

export default createStore({
    state: {
        messageBox: '',
        confirmBox: '',
        confirmAnswer: '',
        gameId: '',
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
    },
    actions: {
    },
    modules: {
    },
});
