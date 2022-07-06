<template>
<div v-show="message.length>0" class="fixed z-50 w-full top-36 left-0">
        <div class="mx-auto w-2/3 py-5 px-10 bg-orange-500 text-2xl opacity-90 font-medium shadow text-white rounded">
            <div><span class="material-icons mr-3">notification_important</span>{{message}}</div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const message = computed(() => store.state.messageBox);
        watch(message, (val) => {
            if (val.length > 0) {
                setTimeout(() => {
                    store.commit('setMessageBox', '');
                }, 3000);
            }
        });
        return {
            message,
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
