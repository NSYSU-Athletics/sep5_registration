<template>
    <div class="flex flex-col h-screen">
        <div class="bg-orange-400 flex items-center">
            <img src="@/assets/nsysua/logo_no_bg_white.png" class="h-16 block mx-3" alt="">
            <div class="text-white p-2 hidden sm:block">
                <div class="text-xl font-medium">體育賽事報名系統</div>
                <div class="text-xs">Sports Events Registration System</div>
            </div>
            <div class="flex-grow"></div>
            <div class="nav-button" v-if="language=='en'" @click="language='ch'">中文</div>
            <div class="nav-button" v-if="language=='ch'" @click="language='en'">EN</div>
            <div class="nav-button" @click="logout">登出</div>
        </div>
        <div class="flex-grow bg-gray-100">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        // vuex
        const store = useStore();
        const qf = new QuickFetch();
        const qd = new QuickData();
        const router = useRouter();
        function logout() {
            qf.Url('auth/user/logout').Post().then((res: any) => {
                if (res.message === 'done') {
                    localStorage.removeItem('sep5_reg_token');
                    localStorage.removeItem('sep5_reg_data');
                    router.push('/login');
                } else {
                    qd.Alert('登出失敗');
                }
            });
        }
        const language = ref(store.state.language);
        if (navigator.language.includes('en')) {
            store.commit('setLanguage', 'en');
        }
        watch(language, () => {
            store.commit('setLanguage', language.value);
        });
        return {
            logout,
            language,
        };
    },
});
</script>

<style lang="scss" src="@/assets/scss/main.scss"></style>

<style lang="scss" scoped>
.nav-button {
    @apply p-4 hover:bg-orange-300 duration-200 text-white font-medium text-2xl cursor-pointer;
}
</style>
