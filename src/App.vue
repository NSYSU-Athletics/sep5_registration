<template>
    <div v-show="message.length>0" class="fixed z-50 w-full top-36 left-0">
        <div class="mx-auto w-2/3 py-5 px-10 bg-orange-500 text-2xl opacity-90 font-medium shadow text-white rounded">
            <div><span class="material-icons mr-3">notification_important</span>{{message}}</div>
        </div>
    </div>
    <div v-show="confirmMessage.length>0" class="fixed z-50 w-full h-full bg-black bg-opacity-50">
        <div class="mx-auto my-36 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-2xlfont-medium shadow bg-white">
            <div class="py-5 px-10">{{confirmMessage}}</div>
            <div class="flex b-0 m-0 text-lg text-white">
                <button @click="confirmAnswer='n'" class="block basis-1/2 p-2 m-0 rounded-none bg-red-700 hover:bg-red-600">取消 Cancel</button>
                <button @click="confirmAnswer='y'" class="block basis-1/2 p-2 m-0 rounded-none bg-green-700 hover:bg-green-600">確定 Confirm</button>
            </div>
        </div>
    </div>
    <router-view></router-view>
  </template>

<script lang="ts">
import {
    defineComponent, computed, watch, ref,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const message = computed(() => store.state.messageBox);
        const confirmMessage = computed(() => store.state.confirmBox);
        const confirmAnswer = ref('');
        watch(message, (val) => {
            if (val.length > 0) {
                setTimeout(() => {
                    store.commit('setMessageBox', '');
                }, 3000);
            }
        });
        watch(confirmAnswer, (val) => {
            if (val.length > 0) {
                store.commit('setConfirmAnswer', val);
                store.commit('setConfirmBox', '');
                setTimeout(() => {
                    confirmAnswer.value = '';
                }, 3000);
            }
        });
        return {
            message,
            confirmMessage,
            confirmAnswer,
        };
    },
});
</script>

<style lang="scss">
#app {
    font-family: 'Noto Sans TC', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
