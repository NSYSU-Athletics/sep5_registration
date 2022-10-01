<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">
                <template v-if="language=='ch'">回上頁</template>
                <template v-if="language=='en'">Back</template>
            </div>
        </div>
        <div class="box-section">
            <div class="title">
                <template v-if="language=='ch'">隊伍報名</template>
                <template v-if="language=='en'">Group events</template>
            </div>
            <hr>
            <table class="athlete-table">
                <tr>
                    <td>
                        <template v-if="language=='ch'">隊名</template>
                        <template v-if="language=='en'">Team Name</template>
                    </td>
                    <td colspan="3">
                        <select v-model="data.team_id">
                            <template v-for="(item, index) in teamList" :key="index">
                            <option :value="item.team_id">{{item.team_name}}</option>
                        </template>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">報名組別</template>
                        <template v-if="language=='en'">Division</template>
                    </td>
                    <td>
                        <select v-model="data.game_division_id">
                            <template v-for="(item, index) in divisionList" :key="index">
                                <option v-if="groupSex(item.sex) || item.sex==0" :value="item.game_division_id">{{item.ch}}</option>
                            </template>
                        </select>
                    </td>
                    <td>
                        <template v-if="language=='ch'">報名項目</template>
                        <template v-if="language=='en'">Event</template>
                    </td>
                    <td>
                        <select v-model="data.event_id">
                            <template v-for="(item, index) in paramsList" :key="index">
                                <option v-if="item.multiple == 1 && item.game_division_id == data.game_division_id" :value="item.event_id">{{item[`event_${language}`]}}</option>
                            </template>
                        </select>
                    </td>
                </tr>
            </table>
            <div class="text-right">
                <button class="button" @click="submitAll">
                    <template v-if="language=='ch'">新增</template>
                    <template v-if="language=='en'">Add</template>
                </button>
            </div>
        </div>
        <div class="box-section">
            <div class="title">
                <template v-if="language=='ch'">報名項目</template>
                <template v-if="language=='en'">Registered</template>
            </div>
            <hr>
            <table class="register-table">
                <tr>
                    <th>
                        <template v-if="language=='ch'">隊伍</template>
                        <template v-if="language=='en'">Team</template>
                    </th>
                    <th>
                        <template v-if="language=='ch'">組別</template>
                        <template v-if="language=='en'">Division</template>
                    </th>
                    <th>
                        <template v-if="language=='ch'">項目</template>
                        <template v-if="language=='en'">Event</template>
                    </th>
                    <th></th>
                </tr>
                <template v-for="(item, index) in registerList" :key="index">
                    <tr>
                        <td>{{item.team_name}}</td>
                        <td>{{item.ch}}</td>
                        <td>{{item.event_ch}}</td>
                        <td>
                            <button class="button button-red" @click="remove(item)">
                                <template v-if="language=='ch'">刪除</template>
                                <template v-if="language=='en'">Delete</template>
                            </button>
                        </td>
                    </tr>
                    <!--
                    <tr>
                        <td colspan="3">
                            <div class="flex items-center gap-2">
                                <div>成員：</div>
                                <template v-for="(member, index) in item.member_data_list" :key="index">
                                    <div>{{member.name}}</div>
                                </template>
                            </div>
                        </td>
                    </tr>-->
                </template>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, reactive, ref, watch, computed,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const qd = new QuickData();
        const route = useRoute();
        const store = useStore();
        const userData: any = ref({});
        const data: any = reactive({
            team_id: '',
            game_division_id: 0,
            event_id: '',
        });
        // game data
        const gameData: any = ref({});
        const paramsList: any = ref([]);
        const divisionList: any = ref([]);
        function getGameData() {
            qf.Url(`games/${route.params.game_id}`).GetAll(gameData).then(() => {
                const prefix = qd.SportPrefix(gameData.value.type);
                qf.Url(`${prefix}/event-params/${gameData.value.game_id}`).GetAll(paramsList);
                qf.Url(`${prefix}/game-division/${gameData.value.game_id}`).GetAll(divisionList);
            });
        }
        getGameData();
        // get team list
        const teamList: any = ref([]);
        function getTeamList() {
            let url = '';
            if (userData.value.permission === 2) {
                url = `register/grp/team/${gameData.value.type}/${gameData.value.game_id}/${userData.value.org_id}`;
            } else {
                url = `register/grp/team/${gameData.value.type}/${gameData.value.game_id}/${userData.value.org_id}/${userData.value.dept_id}`;
            }
            qf.Url(url).GetAll(teamList).then(() => {
                data.team_id = teamList.value[0].team_id;
            });
        }
        // get user data
        function getUserData() {
            qf.Url('auth/user/info').GetAll(userData);
        }
        getUserData();
        const registerList: any = ref([]);
        function getRegisterList() {
            if (userData.value.permission === 2) {
                qf.Url(`register/grp/get/org/${gameData.value.type}/${gameData.value.game_id}/${userData.value.org_id}`).GetAll(registerList);
            } else {
                qf.Url(`register/grp/get/dept/${gameData.value.type}/${gameData.value.game_id}/${userData.value.dept_id}`).GetAll(registerList);
            }
        }
        watch([gameData, userData], () => {
            // eslint-disable-next-line no-prototype-builtins
            if (gameData.value.hasOwnProperty('game_id') && userData.value.hasOwnProperty('org_id')) {
                getTeamList();
                getRegisterList();
            }
        });
        const errorList = reactive({
            team_id: {
                filled: false,
            },
            game_division_id: {
                filled: false,
            },
            event_id: {
                filled: false,
            },
        });
        watch(data, () => {
            errorList.team_id.filled = String(data.team_id).length > 0;
            errorList.game_division_id.filled = data.game_division_id > 0;
            errorList.event_id.filled = data.event_id.length > 0;
        });
        function submitAll() {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of Object.entries(errorList)) {
                // eslint-disable-next-line no-restricted-syntax
                for (const error of Object.entries(item[1])) {
                    if (error[1] === false) {
                        if (error[0] === 'filled') {
                            qd.Alert('不得送出空報名內容');
                        } else {
                            qd.Alert('請確認輸入的內容');
                        }
                        return;
                    }
                }
            }
            qf.Url(`register/grp/exist/${gameData.value.type}/${gameData.value.game_id}/${data.team_id}/${data.game_division_id}/${data.event_id}`).Get().then((status: any) => {
                if (status.message === true) {
                    qd.Alert('該隊伍已報名過此組別項目');
                } else {
                    qf.Url(`register/grp/add/${gameData.value.type}/${gameData.value.game_id}`).Post(data).then((res: any) => {
                        if (res.message === 'done') {
                            qd.Alert('新增成功');
                            data.game_division_id = 0;
                            data.event_id = '';
                            getRegisterList();
                        }
                    });
                }
            });
        }
        let removeTemp: any = {};
        function remove(input: any) {
            qd.Confirm('確定要刪除嗎？');
            removeTemp = input;
        }
        const confirmAnswer = computed(() => store.state.confirmAnswer);
        watch(confirmAnswer, (val: any) => {
            if (val === 'y') {
                qf.Url(`register/grp/delete/${gameData.value.type}/${gameData.value.game_id}`).Delete(`${removeTemp.team_id}/${removeTemp.game_division_id}/${removeTemp.event_id}`).then((res: any) => {
                    if (res.message === 'done') {
                        qd.Alert('已刪除該報名項目');
                        getRegisterList();
                    }
                });
            }
            if (val === 'n') {
                qd.Alert('取消刪除');
            }
            qd.ResetConfirm();
        });
        return {
            data,
            teamList,
            divisionList,
            paramsList,
            getTeamList,
            registerList,
            groupSex: (input: number) => {
                let flag = true;
                teamList.value.forEach((team: any) => {
                    if (team.team_id === data.team_id) {
                        team.member_data_list.forEach((member: any) => {
                            if (member.sex !== input) {
                                flag = false;
                            }
                        });
                    }
                });
                return flag;
            },
            remove,
            submitAll,
            language: computed(() => useStore().state.language),
        };
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
}
.athlete-table, .register-table {
    @apply w-full;
    td, th {
        @apply p-1 text-left;
        input[type=text], input[type=date], select {
            @apply border-2 rounded p-0.5 w-full;
        }
        label {
            @apply inline-block p-1;
            span {
                @apply inline-block ml-2;
            }
        }
    }
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
<style lang="scss" src="@/assets/scss/arrow-button.scss" scoped></style>
