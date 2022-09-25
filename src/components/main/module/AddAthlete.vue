<template>
    <div>
        <table class="athlete-table">
            <tr>
                <td class="w-[20%]">身分證字號*</td>
                <td class="w-[80%]">
                    <input type="text" maxlength="10" v-model="data.unified_id" @blur="exist">
                    <div v-if="data.unified_id.length>0 && !errorList.unified_id.unique" class="warning">身分證字號已存在</div>
                </td>
            </tr>
            <tr>
                <td>姓名*</td>
                <td>
                    <input type="text" v-model="data.name">
                </td>
            </tr>
            <tr>
                <td>性別*</td>
                <td>
                    <select v-model="data.sex">
                        <option value="1">生理男</option>
                        <option value="2">生理女</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>是否為大專<br>院校學生*</td>
                <td>
                    <label>
                        <input type="radio" value="1" :disabled="lockList.student" v-model="data.student" @change="changeOrg(1)">
                        <span>是</span>
                    </label>
                    <label>
                        <input type="radio" value="0" :disabled="lockList.student" v-model="data.student" @change="changeOrg(0)">
                        <span>否</span>
                    </label>
                </td>
            </tr>
            <template v-if="data.student==1">
                <tr>
                    <td>學校*</td>
                    <td>
                        <v-select class="cursor-pointer" :disabled="lockList.org_id" :clearable="false" :options="univList" :reduce="university => university.univ_id" v-model="data.org_id" @input="resetSelect">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em>。</template>
                                <div v-else class="opacity-50">請輸入或選擇學校</div>
                            </template>
                        </v-select>
                    </td>
                </tr>
                <tr>
                    <td>系所</td>
                    <td>
                        <div v-if="deptList.length>0">
                            <v-select class="cursor-pointer" :disabled="lockList.dept_id" :clearable="false" :options="deptList" :reduce="department => department.dept_id" v-model="data.dept_id" label="label">
                                <template v-slot:no-options="{ search, searching }">
                                    <template v-if="searching">找不到 <em>{{ search }}</em>。
                                    </template>
                                    <div v-else-if="data.org_id.length > 0" class="opacity-50">載入中</div>
                                <div v-else class="opacity-50">請選擇學校</div>
                                </template>
                            </v-select>
                        </div>
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td>團體*</td>
                    <td>
                        <v-select class="cursor-pointer" :disabled="lockList.org_id" :clearable="false" :options="orgList" :reduce="org => org.org_id" v-model="data.org_id" label="name_ch_full">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em>。</template>
                                <div v-else class="opacity-50">請輸入或選擇團體</div>
                            </template>
                        </v-select>
                    </td>
                </tr>
            </template>
            <tr>
                <td>身份*</td>
                <td>
                    <select v-model="data.role">
                        <option value="0">隊員</option>
                        <option value="1">隊長</option>
                    </select>
                </td>
            </tr>
            <tr v-if="data.student==1">
                <td>學號</td>
                <td>
                    <input type="text" v-model="data.student_id">
                </td>
            </tr>
            <tr>
                <td>生日*</td>
                <td>
                    <input type="date" v-model="data.birthday">
                </td>
            </tr>
            <tr>
                <td>手機</td>
                <td>
                    <input type="text" v-model="data.phone">
                </td>
            </tr>
        </table>
        <div class="text-right">
            <button class="button" @click="submitAll">新增</button>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, reactive, watch,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineComponent({
    setup(props, context) {
        const qf = new QuickFetch();
        const qd = new QuickData();
        // data
        const data = reactive({
            unified_id: '',
            name: '',
            org_id: '',
            dept_id: '',
            sex: 1,
            student: 1,
            student_id: '',
            birthday: '',
            phone: '',
            role: 0,
            avatar: '',
            remark: '{}',
        });
        const lockList = reactive({
            org_id: false,
            dept_id: false,
            student: false,
        });
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
            qf.Url(`dept-list/${data.org_id}`).Get().then((res: any) => {
                let temp: any = {};
                for (let i = 0; i < res.length; i++) {
                    temp = res[i];
                    temp.label = `[${res[i].college_ch}] ${res[i].dept_ch}`;
                    deptList.value.push(temp);
                }
            });
        }
        // get user data
        function getUserData() {
            qf.Url('auth/user/info').Get().then((res: any) => {
                data.org_id = res.org_id;
                data.dept_id = res.org_id.substr(0, 1) === 'U' ? res.dept_id : '';
                if (res.org_id.substr(0, 1) === 'U') {
                    getDeptList();
                }
                if (res.permission === 2) {
                    lockList.org_id = true;
                    lockList.student = true;
                    data.student = res.org_id.substr(0, 1) === 'U' ? 1 : 0;
                } else if (res.permission === 1) {
                    lockList.org_id = true;
                    lockList.dept_id = true;
                    lockList.student = true;
                    data.student = res.org_id.substr(0, 1) === 'U' ? 1 : 0;
                } else {
                    lockList.org_id = false;
                    lockList.dept_id = false;
                    lockList.student = false;
                }
            });
        }
        getUserData();
        const errorList = reactive({
            unified_id: {
                filled: false,
                unique: true,
            },
            name: {
                filled: false,
            },
            org_id: {
                filled: false,
            },
            birthday: {
                filled: false,
            },
        });
        watch(data, () => {
            errorList.unified_id.filled = data.unified_id.length > 0;
            errorList.name.filled = data.name.length > 0;
            errorList.org_id.filled = data.org_id.length > 0;
            errorList.birthday.filled = data.birthday.length > 0;
        });
        function exist() {
            qf.Url(`athlete/exist/${data.unified_id}`).Get().then((res: any) => {
                if (res.message === true) {
                    errorList.unified_id.unique = false;
                } else {
                    errorList.unified_id.unique = true;
                }
            });
        }
        function submitAll() {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of Object.entries(errorList)) {
                // eslint-disable-next-line no-restricted-syntax
                for (const error of Object.entries(item[1])) {
                    if (error[1] === false) {
                        if (error[0] === 'filled') {
                            qd.Alert('請確認所有欄位皆已填寫');
                        } else {
                            qd.Alert('請確認輸入的內容');
                        }
                        return;
                    }
                }
            }
            const temp: any = JSON.parse(JSON.stringify(data));
            qf.Url('athlete/add').Post(temp).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('新增成功');
                    context.emit('refresh');
                    context.emit('close_modal');
                    data.unified_id = '';
                    data.name = '';
                    data.dept_id = '';
                    data.student_id = '';
                    data.birthday = '';
                    data.phone = '';
                }
            });
        }
        return {
            orgList,
            univList,
            deptList,
            data,
            errorList,
            lockList,
            submitAll,
            exist,
            resetSelect: () => {
                data.dept_id = '';
            },
            changeOrg: (input: number) => {
                if (input === 1 && data.org_id.substring(0, 1) !== 'U') {
                    data.org_id = '';
                }
                if (input === 0 && data.org_id.substring(0, 1) === 'U') {
                    data.org_id = '';
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
.warning {
    @apply text-sm text-red-600;
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
