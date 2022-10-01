<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">一般單位註冊<br>Organization Signup</div>
        <hr class="my-2">
        <div v-show="nowPage==0">
            <div class="text-gray-500 text-sm">請輸入或選擇單位，若無您的單位名稱，請<span class="text-orange-400 cursor-pointer" @click="toNextPage(1)">建立單位資料</span>。<br>If there is no your organization, Please <span class="text-orange-400 cursor-pointer" @click="toNextPage(1)">create it</span>.</div>
            <hr class="my-2">
            <div class="mb-2">單位列表 Organization List</div>
            <div>
                <v-select class="cursor-pointer" :clearable="false" :options="orgList" :reduce="org => org.org_id" v-model="data.org_id" label="name_ch_full">
                    <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">找不到 <em>{{ search }}</em> 嗎？請<span class="text-orange-400" @click="toNextPage(1)">建立單位資料</span> <em>{{ search }}</em> not found. Please <span class="text-orange-400" @click="toNextPage(1)">create it</span>.
                        </template>
                        <div v-else class="opacity-50">請輸入或選擇單位 Please select your organization.</div>
                    </template>
                </v-select>
            </div>
            <div class="mt-2" v-if="data.org_id!=='' && data.org_id !==null">
                <button class="full-button bg-orange-400 text-white" @click="toNextPage(2)">下一步 Next</button>
            </div>
        </div>
        <div v-show="nowPage==1">
            <div @click="nowPage = 0" class="text-lg text-gray-500 flex items-center my-2 cursor-pointer">
                <div class="material-icons">arrow_back_ios</div>
                <div>回上一步 Back</div>
            </div>
            <div>建立單位資料 Create new organization</div>
            <table class="signup-form">
                <tr>
                    <td class="label">中文名稱 Name (CH)</td>
                    <td>
                        <input type="text" v-model="orgData.name_ch_full" @blur="orgExist">
                        <div v-if="orgData.name_ch_full.length>0 && !orgError.name_ch_full.unique" class="warning">單位已存在 Organization has already been added.</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">中文簡稱 Abbr. (CH)</td>
                    <td>
                        <input type="text" v-model="orgData.name_ch">
                    </td>
                </tr>
                <tr>
                    <td class="label">英文名稱 Name (EN)</td>
                    <td>
                        <input type="text" v-model="orgData.name_en_full">
                    </td>
                </tr>
                <tr>
                    <td class="label">英文簡稱 Abbr. (EN)</td>
                    <td>
                        <input type="text" v-model="orgData.name_en">
                    </td>
                </tr>
                <tr>
                    <td class="label">聯絡電話 Phone (TW)</td>
                    <td>
                        <input type="text" v-model="orgData.phone">
                    </td>
                </tr>
                <tr>
                    <td class="label">所屬縣市 City</td>
                    <td>
                        <select v-model="orgData.city">
                            <template v-for="(item, index) in cityList" :key="index">
                                <option :value="item.city_id">{{item.city_ch}} {{item.city_en}}</option>
                            </template>
                        </select>
                    </td>
                </tr>
            </table>
            <div class="my-2">If your organization does not have a Chinese name, Please just fill in English name in BOTH Name (CH) and Name (EN) blank.</div>
            <div>
                <button class="full-button bg-orange-400 text-white" @click="submitOrg">建立 Create</button>
            </div>
        </div>
        <div v-show="nowPage==2">
        <div @click="nowPage = prevPage" class="text-lg text-gray-500 flex items-center my-2 cursor-pointer">
                <div class="material-icons">arrow_back_ios</div>
                <div>回上一步 Back</div>
            </div>
            <div>單位帳號註冊 Organization Account Signup</div>
            <table class="signup-form">
                <tr>
                    <td class="label">Email</td>
                    <td>
                        <input type="email" v-model="data.account" @blur="exist">
                        <div v-if="data.account.length>0 && !errorList.account.format" class="warning">Email格式錯誤 Wrong format.</div>
                        <div v-if="data.account.length>0 && !errorList.account.unique" class="warning">Email已存在 Email has been taken.</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">真實姓名 Name</td>
                    <td>
                        <input type="text" v-model="data.name">
                    </td>
                </tr>
                <tr>
                    <td class="label">手機號碼 Phone(TW)</td>
                    <td>
                        <input type="text" v-model="data.phone">
                        <div v-if="data.phone.length>0 && !errorList.phone.format" class="warning">手機格式錯誤</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">密碼 Password</td>
                    <td>
                        <input type="password" v-model="data.password">
                        <div v-if="data.password.length>0 && !errorList.password.format" class="warning">密碼需格有大小寫字母與數字，並至少8個字元<br>Password must be at least 1 Uppercase character and 1 Lowercase character, with a minimum length of 8 characters.</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">確認密碼 Confirm Password</td>
                    <td>
                        <input type="password" v-model="data.password_confirm">
                        <div v-if="data.password_confirm.length>0 && !errorList.passwordConfirm.same" class="warning">兩次輸入密碼不相同 Password not match.</div>
                    </td>
                </tr>
            </table>
            <!--<div class="my-3 text-gray-500 text-sm">當您按下註冊，即代表您同意我們的<a href="" class="text-orange-400">使用政策與隱私權條款</a></div>-->
            <div>
                <button class="full-button bg-orange-400 text-white" @click="submitAll">註冊 Signup</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, reactive, watch, ref,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineComponent({
    setup(props, context) {
        const qf = new QuickFetch();
        const qd = new QuickData();
        // get org list
        const orgList: any = ref([]);
        function getOrgList() {
            qf.Url('organization/list').GetAll(orgList);
        }
        getOrgList();
        // get city list
        const cityList: any = ref([]);
        qf.Url('city-list').GetAll(cityList);
        // change page
        const nowPage = ref(0);
        const prevPage = ref(0);
        function toNextPage(nextPage: number) {
            prevPage.value = nowPage.value;
            nowPage.value = nextPage;
        }
        // organization
        const organization = ref('');
        const orgData = reactive({
            name_ch_full: '',
            name_ch: '',
            name_en_full: '',
            name_en: '',
            phone: '',
            avatar: '',
            city: 'KH',
        });
        const orgError = reactive({
            name_ch_full: {
                filled: false,
                unique: true,
            },
            name_ch: {
                filled: false,
            },
            name_en_full: {
                filled: false,
            },
            name_en: {
                filled: false,
            },
            phone: {
                filled: false,
            },
        });
        watch(orgData, () => {
            orgError.name_ch_full.filled = orgData.name_ch_full.length > 0;
            orgError.name_ch.filled = orgData.name_ch.length > 0;
            orgError.name_en_full.filled = orgData.name_en_full.length > 0;
            orgError.name_en.filled = orgData.name_en.length > 0;
            orgError.phone.filled = orgData.phone.length > 0;
        });
        function orgExist() {
            qf.Url(`organization/exist/${orgData.name_ch_full}`).Get().then((res: any) => {
                if (res.message === true) {
                    orgError.name_ch_full.unique = false;
                } else {
                    orgError.name_ch_full.unique = true;
                }
            });
        }
        function submitOrg() {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of Object.entries(orgError)) {
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
            const temp: any = JSON.parse(JSON.stringify(orgData));
            delete temp.password_confirm;
            qf.Url('organization/add').Post(temp).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('建立成功');
                    getOrgList();
                    toNextPage(1);
                    orgData.name_ch_full = '';
                    orgData.name_ch = '';
                    orgData.name_en_full = '';
                    orgData.name_en = '';
                    orgData.phone = '';
                    orgData.city = 'KH';
                }
            });
        }
        // data
        const data = reactive({
            account: '',
            name: '',
            org_id: '',
            dept_id: null,
            phone: '',
            password: '',
            password_confirm: '',
            image: null,
            verification: 1,
            permission: 2,
        });
        const errorList = reactive({
            account: {
                filled: false,
                format: true,
                unique: true,
            },
            name: {
                filled: false,
            },
            phone: {
                filled: false,
                format: true,
            },
            password: {
                filled: false,
                format: true,
            },
            passwordConfirm: {
                filled: false,
                same: true,
            },
        });
        watch(data, () => {
            errorList.account.filled = data.account.length > 0;
            // eslint-disable-next-line
            errorList.account.format = (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(data.account));
            errorList.name.filled = data.name.length > 0;
            errorList.phone.filled = data.phone.length > 0;
            errorList.phone.format = (/^09[0-9]{8}$/.test(data.phone));
            errorList.password.filled = data.password.length > 0;
            errorList.password.format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password);
            errorList.passwordConfirm.same = data.password === data.password_confirm;
            errorList.passwordConfirm.filled = data.password_confirm.length > 0;
        });

        function exist() {
            qf.Url(`auth/user/exist/${data.account}`).Get().then((res: any) => {
                if (res.message === true) {
                    errorList.account.unique = false;
                } else {
                    errorList.account.unique = true;
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
                            qd.Alert('請確認所有欄位皆已填寫 Please fill in all required fields.');
                        } else {
                            qd.Alert('請確認輸入的內容 Please check your input data.');
                        }
                        return;
                    }
                }
            }
            const temp: any = JSON.parse(JSON.stringify(data));
            delete temp.password_confirm;
            qf.Url('auth/user/register').Post(temp).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('註冊成功 Done');
                    context.emit('refresh');
                    context.emit('close_modal');
                    data.account = '';
                    data.name = '';
                    data.org_id = '';
                    data.password = '';
                    data.password_confirm = '';
                    data.phone = '';
                }
            });
        }
        return {
            nowPage,
            prevPage,
            toNextPage,
            orgList,
            cityList,
            // data
            orgData,
            orgError,
            submitOrg,
            orgExist,
            organization,
            data,
            errorList,
            submitAll,
            exist,
        };
    },
    components: {
        'v-select': vSelect,
    },
});
</script>

<style lang="scss" scoped>
.signup-form {
    @apply w-full;
    .label {
        @apply w-24;
    }
    td {
        @apply p-1;
        input, select {
            @apply border-b-2 p-1 w-full;
        }
    }
}
.warning {
    @apply text-sm text-red-600;
}
</style>
