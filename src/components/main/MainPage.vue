<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section" v-if="language=='ch'">
            <div class="text-2xl">請詳閱報名系統使用說明書後再報名</div>
            <a class="text-orange-400 text-2xl" href="https://ryanxuan930.github.io/cdn/nsysu_athletics/document/Registration.pdf" target="_blank">說明書請點我</a>
        </div>
        <div class="box-section w-full">
            <div class="title">
                <template v-if="language=='ch'">基本資料</template>
                <template v-if="language=='en'">Account Info</template>
            </div>
            <hr>
            <div class="w-full">
                <table v-if="userData.hasOwnProperty('org_id')" class="user-data">
                    <tr>
                        <td class="w-1/4 sm:w-[10%]">Email</td>
                        <td class="w-1/4 sm:w-[40%]">{{userData.account}}</td>
                        <td class="w-1/4 sm:w-[10%]">
                            <template v-if="language=='ch'">權限</template>
                            <template v-if="language=='en'">Perm.</template>
                        </td>
                        <td class="w-1/4 sm:w-[40%]">
                            <span v-if="userData.permission==0">
                                <template v-if="language=='ch'">一般帳號</template>
                                <template v-if="language=='en'">General</template>
                            </span>
                            <span v-if="userData.permission==1">
                                <template v-if="language=='ch'">系所代表</template>
                                <template v-if="language=='en'">Departmental</template>
                            </span>
                            <span v-if="userData.permission==2">
                                <template v-if="language=='ch'">單位代表</template>
                                <template v-if="language=='en'">Organizational</template>
                            </span>
                            <span v-if="userData.permission==3">
                                <template v-if="language=='ch'">聯盟代表</template>
                                <template v-if="language=='en'">Interorganizational</template>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <template v-if="language=='ch'">姓名</template>
                            <template v-if="language=='en'">Name</template>
                        </td>
                        <td>{{userData.name}}</td>
                        <td>
                            <template v-if="language=='ch'">單位</template>
                            <template v-if="language=='en'">Org.</template>
                        </td>
                        <td>
                            <template v-if="language=='ch'">{{userData.name_ch_full}}</template>
                            <template v-if="language=='en'">{{userData.name_en_full}}</template>
                        </td>
                    </tr>
                    <tr  v-if="userData.org_id.substr(0,1)=='U'">
                        <td>
                            <template v-if="language=='ch'">學院</template>
                            <template v-if="language=='en'">Coll.</template>
                        </td>
                        <td>{{userData.college_ch}}</td>
                        <td>
                            <template v-if="language=='ch'">系所</template>
                            <template v-if="language=='en'">Dept.</template>
                        </td>
                        <td>{{userData.dept_ch}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="box-section">
            <div class="title">
                <template v-if="language=='ch'">功能選單</template>
                <template v-if="language=='en'">Actions</template>
            </div>
            <hr>
            <div>
                <!--<button class="arrow-button bg-orange-400" @click="$router.push(`/organization`)">
                    <span>單位資料管理</span>
                </button>-->
                <button class="arrow-button bg-orange-400" @click="$router.push(`/account`)">
                    <span>
                        <template v-if="language=='ch'">帳號資料管理</template>
                        <template v-if="language=='en'">Account</template>
                    </span>
                </button>
                <button class="arrow-button bg-orange-400" @click="$router.push(`/athlete`)">
                    <span>
                        <template v-if="language=='ch'">選手資料管理</template>
                        <template v-if="language=='en'">Athletes</template>
                    </span>
                </button>
            </div>
        </div>
        <div class="box-section">
            <div class="title">
                <template v-if="language=='ch'">賽事列表</template>
                <template v-if="language=='en'">Game List</template>
            </div>
            <hr>
            <GameList></GameList>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import GameList from '@/components/main/module/GameList.vue';
import { QuickData, QuickFetch } from '@/quick';
import { useStore } from 'vuex';
// import SmallModal from '@/components/SmallModal.vue';

export default defineComponent({
    setup() {
        const store = useStore();
        const displayModal = ref(0);
        const qf = new QuickFetch();
        const qd = new QuickData();
        const userData: any = ref({});
        function getUserData() {
            qf.Url('auth/user/info').GetAll(userData);
        }
        getUserData();
        return {
            displayModal,
            userData,
            language: computed(() => store.state.language),
        };
    },
    components: {
        GameList,
    },
});
</script>

<style lang="scss" scoped>
.box-section {
    @apply p-5 bg-white shadow my-5;
    .title {
        @apply text-2xl font-medium;
    }
    hr {
        @apply my-2;
        border: 1px solid #BDBDBD;
    }
}
.user-data {
    @apply w-full;
    td {
        @apply p-1 break-all whitespace-pre-wrap;
    }
}
</style>

<style lang="scss" src="@/assets/scss/arrow-button.scss" scoped></style>
