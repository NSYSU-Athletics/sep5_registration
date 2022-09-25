<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">回上頁</div>
        </div>
        <div class="box-section">
            <div class="title">選手列表</div>
            <hr>
            <table class="athlete-list">
                <tr>
                    <th class="w-[20%]">身分證字號</th>
                    <th class="w-[20%]">學校/團體</th>
                    <th class="w-[20%]">系所</th>
                    <th class="w-[15%]">姓名</th>
                    <th class="w-[10%]">性別</th>
                    <th class="w-[15%]">
                        <button class="button" @click="displayModal=1">新增</button>
                    </th>
                </tr>
                <template v-for="(item, index) in athleteList" :key="index">
                    <tr>
                        <td>{{item.unified_id}}</td>
                        <td class="w-[20%] truncate max-w-0">{{item.org_ch}}</td>
                        <td class="w-[20%] truncate max-w-0">{{item.dept_ch}}</td>
                        <td class="w-[15%] truncate max-w-0">{{item.name}}</td>
                        <td>
                            <span v-if="item.sex==1">男</span>
                            <span v-if="item.sex==2">女</span>
                        </td>
                        <td>
                            <button class="button" @click="editAthlete(item)">顯示</button>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
    <SmallModal v-show="displayModal>0" @close_modal="displayModal=0">
        <template v-slot:title>
            <div class="text-2xl">
                <div v-if="displayModal==1">新增選手</div>
                <div v-if="displayModal==2">選手資訊</div>
            </div>
        </template>
        <template v-slot:content>
            <hr class="my-2">
            <AddAthlete v-if="displayModal==1" @close_modal="displayModal=0" @refresh="getAthleteList"></AddAthlete>
            <EditAthlete v-if="displayModal==2" @close_modal="displayModal=0" @refresh="getAthleteList" :athlete-data="selected"></EditAthlete>
        </template>
    </SmallModal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import SmallModal from '@/components/SmallModal.vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRoute } from 'vue-router';
import AddAthlete from '@/components/main/module/AddAthlete.vue';
import EditAthlete from '@/components/main/module/EditAthlete.vue';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const displayModal = ref(0);
        const selected = ref({});
        const route = useRoute();
        const gameData: any = ref({});
        const userStorage = JSON.parse(localStorage.sep5_reg_data);
        function getGameData() {
            qf.Url(`games/${route.params.game_id}`).GetAll(gameData);
        }
        getGameData();
        // department
        const orgList: any = ref([]);
        function getOrgList() {
            if (userStorage.type === 'stu') {
                qf.Url('dept-list').GetAll(orgList);
            } else if (userStorage.type === 'sch') {
                qf.Url('univ-list').GetAll(orgList);
            } else {
                qf.Url('organization/list').GetAll(orgList);
            }
        }
        getOrgList();
        // athlete
        const athleteList: any = ref([]);
        function getAthleteList() {
            qf.Url(`athlete/get/org/${userStorage.org_id}`).GetAll(athleteList);
        }
        getAthleteList();
        return {
            displayModal,
            gameData,
            orgList,
            athleteList,
            getAthleteList,
            selected,
            editAthlete: (input: any) => {
                selected.value = input;
                displayModal.value = 2;
            },
        };
    },
    components: {
        SmallModal,
        AddAthlete,
        EditAthlete,
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
    input, select {
        @apply border-2 rounded-md p-1;
    }
    .athlete-list {
        @apply w-full;
        td, th {
            @apply p-1 text-left;
        }
    }
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
