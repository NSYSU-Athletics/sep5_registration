<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">
                <template v-if="language=='ch'">回上頁</template>
                <template v-if="language=='en'">Back</template>
            </div>
        </div>
        <div class="box-section">
            <div class="title">
                <template v-if="language=='ch'">新增報名</template>
                <template v-if="language=='en'">Individual Events</template>
            </div>
            <hr>
            <table class="athlete-table">
                <tr v-if="userData.org_id!='O0000'">
                    <td>
                        <template v-if="language=='ch'">是否為大專<br>院校學生</template>
                        <template v-if="language=='en'">University<br>Student</template>
                    </td>
                    <td colspan="3">
                        <label>
                            <input type="radio" value="1" :disabled="lockList.student" v-model="student">
                            <span>
                                <template v-if="language=='ch'">是</template>
                                <template v-if="language=='en'">Yes</template>
                            </span>
                        </label>
                        <label>
                            <input type="radio" value="0" :disabled="lockList.student" v-model="student">
                            <span>
                                <template v-if="language=='ch'">否</template>
                                <template v-if="language=='en'">No</template>
                            </span>
                        </label>
                    </td>
                </tr>
                <tr v-if="userData.org_id!='O0000'">
                    <td>
                        <template v-if="language=='ch'">所屬單位</template>
                        <template v-if="language=='en'">Organization</template>
                    </td>
                    <td colspan="3">
                        <div v-if="student==1">
                            <div>
                                <template v-if="language=='ch'">學校</template>
                                <template v-if="language=='en'">University</template>
                            </div>
                            <v-select class="cursor-pointer" :disabled="lockList.org_id" :clearable="false" :options="univList" :reduce="university => university.univ_id" v-model="orgId" @input="resetSelect">
                                <template v-slot:no-options="{ search, searching }">
                                    <template v-if="searching">找不到 <em>{{ search }}</em> Not found</template>
                                    <div v-else class="opacity-50">請輸入或選擇學校 Please select your university.</div>
                                </template>
                            </v-select>
                            <div>
                                <template v-if="language=='ch'">系所</template>
                                <template v-if="language=='en'">Depratment</template>
                            </div>
                            <div v-if="deptList.length>0">
                                <v-select class="cursor-pointer" :disabled="lockList.dept_id" :clearable="false" :options="deptList" :reduce="department => department.dept_id" v-model="deptId" label="label">
                                    <template v-slot:no-options="{ search, searching }">
                                        <template v-if="searching">找不到 <em>{{ search }}</em> Not found
                                        </template>
                                        <div v-else-if="orgId.length > 0" class="opacity-50">載入中 Loading</div>
                                    <div v-else class="opacity-50">請選擇學校 Please select your university.</div>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                        <div v-if="student==0">
                            <div>
                                <template v-if="language=='ch'">團體</template>
                                <template v-if="language=='en'">Organization Name</template>
                            </div>
                            <v-select class="cursor-pointer" :disabled="lockList.org_id" :clearable="false" :options="orgList" :reduce="org => org.org_id" v-model="orgId" label="name_ch_full">
                                <template v-slot:no-options="{ search, searching }">
                                    <template v-if="searching">找不到 <em>{{ search }}</em> Not found</template>
                                    <div v-else class="opacity-50">請輸入或選擇團體 Please select your organization.</div>
                                </template>
                            </v-select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">選手</template>
                        <template v-if="language=='en'">Athlete</template>
                    </td>
                    <td colspan="3">
                        <v-select class="cursor-pointer" :clearable="false" :options="athleteList" :reduce="athlete => athlete.athlete_id" v-model="data.athlete_id" label="name">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em> Not found</template>
                                <div v-else class="opacity-50">請輸入或選擇選手 Please select an athlete.</div>
                            </template>
                        </v-select>
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
                                <option v-if="sex==item.sex || item.sex==0" :value="item.game_division_id">{{item[language]}}</option>
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
                                <option v-if="item.multiple == 0 && item.game_division_id == data.game_division_id" :value="item.event_id">{{item[`event_${language}`]}}</option>
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
                        <template v-if="language=='ch'">姓名</template>
                        <template v-if="language=='en'">Name</template>
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
                        <td>{{item.name}}</td>
                        <td>{{item.ch}}</td>
                        <td>{{item.event_ch}}</td>
                        <td>
                            <button class="button button-red" @click="remove(item)">
                                <template v-if="language=='ch'">刪除</template>
                                <template v-if="language=='en'">Delete</template>
                            </button>
                        </td>
                    </tr>
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const qd = new QuickData();
        const route = useRoute();
        const store = useStore();
        const data: any = reactive({
            athlete_id: '',
            game_division_id: 0,
            event_id: '',
        });
        const student = ref(1);
        const sex: any = ref(0);
        const orgId = ref('');
        const deptId = ref('');
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
        const registerList: any = ref([]);
        function getRegisterList() {
            if (userData.value.permission === 2) {
                qf.Url(`register/ind/get/org/${gameData.value.type}/${gameData.value.game_id}/${userData.value.org_id}`).GetAll(registerList);
            } else {
                qf.Url(`register/ind/get/dept/${gameData.value.type}/${gameData.value.game_id}/${userData.value.dept_id}`).GetAll(registerList);
            }
        }
        watch(userData, () => {
            // eslint-disable-next-line no-prototype-builtins
            if (userData.value.hasOwnProperty('org_id')) {
                getAthleteList();
                getRegisterList();
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
        const errorList = reactive({
            athlete_id: {
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
            athleteList.value.forEach((item: any) => {
                if (item.athlete_id === data.athlete_id) {
                    sex.value = item.sex;
                }
            });
            errorList.athlete_id.filled = String(data.athlete_id).length > 0;
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
                            qd.Alert('請確認所有欄位皆已填寫 Please fill in all required fields.');
                        } else {
                            qd.Alert('請確認輸入的內容 Please check your input data.');
                        }
                        return;
                    }
                }
            }
            qf.Url(`register/ind/exist/${gameData.value.type}/${gameData.value.game_id}/${data.athlete_id}/${data.game_division_id}/${data.event_id}`).Get().then((status: any) => {
                if (status.message === true) {
                    qd.Alert('該選手已報名過此組別項目 Athlete has already been registered for this division and event.');
                } else {
                    qf.Url(`register/ind/add/${gameData.value.type}/${gameData.value.game_id}`).Post(data).then((res: any) => {
                        if (res.message === 'done') {
                            qd.Alert('新增成功 Done');
                            data.athlete_id = '';
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
                qf.Url(`register/ind/delete/${gameData.value.type}/${gameData.value.game_id}`).Delete(`${removeTemp.athlete_id}/${removeTemp.game_division_id}/${removeTemp.event_id}`).then((res: any) => {
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
            gameData,
            lockList,
            student,
            orgId,
            deptId,
            univList,
            deptList,
            orgList,
            divisionList,
            paramsList,
            data,
            athleteList,
            sex,
            resetSelect: () => {
                data.dept_id = '';
            },
            submitAll,
            registerList,
            remove,
            errorList,
            userData,
            language: computed(() => useStore().state.language),
        };
    },
    components: {
        'v-select': vSelect,
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
