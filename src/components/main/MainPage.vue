<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section">
            <div class="title">基本資料</div>
            <hr>
            <div>
                <table v-if="userData.hasOwnProperty('org_id')" class="user-data">
                    <tr>
                        <td>帳號</td>
                        <td>{{userData.account}}</td>
                        <td>權限</td>
                        <td>
                            <span v-if="userData.permission==0">一般帳號</span>
                            <span v-if="userData.permission==1">系所代表</span>
                            <span v-if="userData.permission==2">學校、團體代表</span>
                            <span v-if="userData.permission==3">聯盟代表</span>
                        </td>
                    </tr>
                    <tr>
                        <td>姓名</td>
                        <td>{{userData.name}}</td>
                        <td>單位</td>
                        <td v-if="userData.org_id.substr(0,1)=='U'">{{userData.univ_name_ch_full}}</td>
                        <td v-else>{{userData.name_ch}}</td>
                    </tr>
                    <tr  v-if="userData.org_id.substr(0,1)=='U'">
                        <td>學院</td>
                        <td>{{userData.college_ch}}</td>
                        <td>系所</td>
                        <td>{{userData.dept_ch}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="box-section">
            <div class="title">功能選單</div>
            <hr>
            <div>
                <!--<button class="arrow-button bg-orange-400" @click="$router.push(`/organization`)">
                    <span>單位資料管理</span>
                </button>-->
                <button class="arrow-button bg-orange-400" @click="$router.push(`/account`)">
                    <span>帳號資料管理</span>
                </button>
                <button class="arrow-button bg-orange-400" @click="$router.push(`/athlete`)">
                    <span>選手資料管理</span>
                </button>
            </div>
        </div>
        <div class="box-section">
            <div class="title">賽事列表</div>
            <hr>
            <GameList></GameList>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GameList from '@/components/main/module/GameList.vue';
import { QuickData, QuickFetch } from '@/quick';
// import SmallModal from '@/components/SmallModal.vue';

export default defineComponent({
    setup() {
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
        @apply p-1;
    }
}
</style>

<style lang="scss" src="@/assets/scss/arrow-button.scss" scoped></style>
