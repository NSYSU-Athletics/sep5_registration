<template>
    <div>
        <div class="text-lg p-1">隊名：{{team.team_name}}</div>
        <hr>
        <div class="p-1 text-lg">新增成員</div>
        <table class="athlete-table">
            <tr>
                <td>是否為大專<br>院校學生</td>
                <td colspan="3">
                    <label>
                        <input type="radio" value="1" :disabled="lockList.student" v-model="student">
                        <span>是</span>
                    </label>
                    <label>
                        <input type="radio" value="0" :disabled="lockList.student" v-model="student">
                        <span>否</span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>所屬單位</td>
                <td colspan="3">
                    <div v-if="student==1">
                        <div>學校</div>
                        <v-select class="cursor-pointer" :disabled="lockList.org_id" :clearable="false" :options="univList" :reduce="university => university.univ_id" v-model="orgId" @input="resetSelect">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em>。</template>
                                <div v-else class="opacity-50">請輸入或選擇學校</div>
                            </template>
                        </v-select>
                        <div>系所</div>
                        <div v-if="deptList.length>0">
                            <v-select class="cursor-pointer" :disabled="lockList.dept_id" :clearable="false" :options="deptList" :reduce="department => department.dept_id" v-model="deptId" label="label">
                                <template v-slot:no-options="{ search, searching }">
                                    <template v-if="searching">找不到 <em>{{ search }}</em>。
                                    </template>
                                    <div v-else-if="orgId.length > 0" class="opacity-50">載入中</div>
                                <div v-else class="opacity-50">請選擇學校</div>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div v-if="student==0">
                        <div>團體</div>
                        <v-select class="cursor-pointer" :disabled="lockList.org_id" :clearable="false" :options="orgList" :reduce="org => org.org_id" v-model="orgId" label="name_ch_full">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em>。</template>
                                <div v-else class="opacity-50">請輸入或選擇團體</div>
                            </template>
                        </v-select>
                    </div>
                </td>
            </tr>
            <tr>
                <td>選手</td>
                <td colspan="3">
                    <v-select class="cursor-pointer" :clearable="false" :options="athleteList" :reduce="athlete => athlete.athlete_id" v-model="athleteId" label="name">
                        <template v-slot:no-options="{ search, searching }">
                            <template v-if="searching">找不到 <em>{{ search }}</em>。</template>
                            <div v-else class="opacity-50">請輸入或選擇選手</div>
                        </template>
                    </v-select>
                </td>
            </tr>
        </table>
        <div class="my-1 text-right">
            <button class="button" @click="addMember">加入</button>
        </div>
        <div class="mx-1 my-2">成員名單：</div>
        <hr>
        <table class="athlete-table">
            <template v-for="(item, index) in athleteList" :key="index">
                <tr v-if="data.includes(item.athlete_id)">
                    <td class="w-[30%] truncate max-w-0">{{item.org_ch}}</td>
                    <td class="w-[30%] truncate max-w-0">{{item.dept_ch}}</td>
                    <td class="w-[20%] truncate max-w-0">{{item.name}}</td>
                    <td class="w-[5%] truncate max-w-0">
                        <span v-if="item.sex==1">男</span>
                        <span v-else>女</span>
                    </td>
                    <td class="w-[15%] truncate max-w-0 text-right">
                        <button class="button button-red block" @click="data.splice(data.indexOf(item.athlete_id),1)">刪除</button>
                    </td>
                </tr>
            </template>
        </table>
        <div class="my-1">
            <button class="button w-full" @click="submitAll">儲存</button>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, reactive, ref, watch,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineComponent({
    props: ['teamData'],
    setup(props, context) {
        const qf = new QuickFetch();
        const qd = new QuickData();
        const route = useRoute();
        const team = ref(props.teamData);
        const data: any = reactive(JSON.parse(props.teamData.member_list));
        const student = ref(1);
        const sex: any = ref(0);
        const orgId = ref('');
        const deptId = ref('');
        const athleteId = ref('');
        const lockList = reactive({
            org_id: false,
            dept_id: false,
            student: false,
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
        // get org list
        const orgList: any = ref([]);
        function getOrgList() {
            qf.Url('organization/list').GetAll(orgList);
        }
        getOrgList();
        // get univ list
        const univList: any = ref([]);
        qf.Url('univ-list').GetAll(univList).then(() => {
            for (let i = 0; i < univList.value.length; i++) {
                univList.value[i].label = `${univList.value[i].univ_name_ch_full} (${univList.value[i].univ_name_en})`;
            }
        });
        // get dept list
        const deptList: any = ref([]);
        function getDeptList() {
            deptList.value = [];
            qf.Url(`dept-list/${orgId.value}`).Get().then((res: any) => {
                let temp: any = {};
                for (let i = 0; i < res.length; i++) {
                    temp = res[i];
                    temp.label = `[${res[i].college_ch}] ${res[i].dept_ch}`;
                    deptList.value.push(temp);
                }
            });
        }
        // get user data
        const userData: any = ref({});
        function getUserData() {
            qf.Url('auth/user/info').Get().then((res: any) => {
                orgId.value = res.org_id;
                deptId.value = res.org_id.substr(0, 1) === 'U' ? res.dept_id : '';
                student.value = res.org_id.substr(0, 1) === 'U' ? 1 : 0;
                if (res.org_id.substr(0, 1) === 'U') {
                    getDeptList();
                }
                if (res.permission === 2) {
                    lockList.org_id = true;
                    lockList.student = true;
                    student.value = res.org_id.substr(0, 1) === 'U' ? 1 : 0;
                } else if (res.permission === 1) {
                    lockList.student = true;
                    lockList.org_id = true;
                    lockList.dept_id = true;
                    student.value = res.org_id.substr(0, 1) === 'U' ? 1 : 0;
                } else {
                    lockList.org_id = false;
                    lockList.dept_id = false;
                }
                userData.value = res;
            });
        }
        getUserData();
        // athlete
        const athleteList: any = ref([]);
        function getAthleteList() {
            let url = '';
            if (userData.value.permission === 2) {
                url = `athlete/get/org/${userData.value.org_id}/second`;
            } else {
                url = `athlete/get/org/${userData.value.org_id}/second/${userData.value.dept_id}`;
            }
            qf.Url(url).Get().then((res: any) => {
                const temp = res.home;
                temp.concat(res.other);
                athleteList.value = temp.concat(JSON.parse(JSON.stringify(res.other)));
            });
        }
        watch(userData, () => {
            // eslint-disable-next-line no-prototype-builtins
            if (userData.value.hasOwnProperty('org_id')) {
                getAthleteList();
            }
        });
        watch(orgId, (next, prev) => {
            if (next !== prev) {
                deptList.value = [];
                if (next.substring(0, 1) === 'U') {
                    getDeptList();
                }
            }
        });
        function submitAll() {
            qf.Url(`register/grp/team/member/${gameData.value.type}/${gameData.value.game_id}`).Patch(team.value.team_id, { member_list: JSON.stringify(data) }).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('編輯成功');
                    context.emit('refresh');
                    context.emit('close_modal');
                }
            });
        }
        return {
            gameData,
            lockList,
            student,
            orgId,
            deptId,
            athleteId,
            univList,
            deptList,
            orgList,
            divisionList,
            paramsList,
            data,
            athleteList,
            sex,
            team,
            resetSelect: () => {
                data.dept_id = '';
            },
            submitAll,
            addMember: () => {
                if (athleteId.value === '') {
                    qd.Alert('請先選擇選手');
                } else if (data.includes(athleteId.value)) {
                    qd.Alert('此選手已加入');
                } else {
                    data.push(athleteId.value);
                }
            },
        };
    },
    components: {
        'v-select': vSelect,
    },
});
</script>

<style lang="scss" scoped>
.athlete-table {
    @apply w-full;
    td {
        @apply p-1;
    }
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
