<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">大專院校學生註冊<br>University Student Signup</div>
        <hr class="my-2">
        <div v-if="page==1">
            <div class="text-gray-500 text-sm">各系所/單位請由一位代表註冊及報名，註冊後須待審核通過方可進行報名。</div>
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
                <td class="label">學校單位 University</td>
                <td>
                    <v-select class="cursor-pointer"  :clearable="false" :options="univList" :reduce="university => university.univ_id" v-model="data.org_id">
                        <template v-slot:no-options="{ search, searching }">
                            <template v-if="searching">找不到 <em>{{ search }} </em> not found
                            </template>
                            <div v-else class="opacity-50">請輸入或選擇學校 Please select your university</div>
                        </template>
                    </v-select>
                </td>
            </tr>
                <tr>
                    <td class="label">系所 Department</td>
                    <td>
                        <v-select class="cursor-pointer"  :clearable="false" :options="deptList" :reduce="department => department.dept_id" v-model="data.dept_id" label="dept_ch">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em>。
                                </template>
                                <div v-else-if="data.org_id.length > 0" class="opacity-50">載入中</div>
                            <div v-else class="opacity-50">請選擇學校</div>
                            </template>
                        </v-select>
                    </td>
                </tr>
                <tr>
                    <td class="label">申請權限 Permission</td>
                    <td>
                        <select v-model="data.permission">
                            <option value="1" selected>系所帳號 Departmental</option>
                            <option value="2">單位帳號 Organizational</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="label">手機號碼 Phone (TW)</td>
                    <td>
                        <input type="tel" v-model="data.phone">
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
            <div>
                <button @click="page=2" class="full-button bg-orange-400 text-white">下一步 Next</button>
            </div>
        </div>
        <div v-if="page==2">
            <div @click="page=1" class="text-lg text-gray-500 flex items-center my-2 cursor-pointer">
                <div class="material-icons">arrow_back_ios</div>
                <div>回上一步 Back</div>
            </div>
            <hr>
            <div>請上傳學生證<br>Please upload your student card image.</div>
            <div class="text-xs text-gray-500">檔案需小於3MB，且學號、姓名、系所需清晰可見。<br>File size must be less than 3MB, and your student id, name, and department must be clear to verify.</div>
            <label class="inline-block py-1 px-3 rounded my-2 bg-orange-400 hover:bg-orange-500 text-white duration-300 cursor-pointer">
                上傳 Upload
                <input type="file" accept="image/*" class="hidden" @change="loadImage">
            </label>
            <div v-if="imageUrl!==''">
                <div>圖片預覽 Preview</div>
                <hr class="my-2">
                <div class="flex">
                    <div class="flex-grow"></div>
                    <img :src="imageUrl" class="block max-h-60" alt="">
                    <div class="flex-grow"></div>
                </div>
                <hr class="my-2">
            </div>
            <div class="mt-3">
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
        // data
        const data = reactive({
            account: '',
            name: '',
            org_id: 'U0009',
            dept_id: '',
            phone: '',
            password: '',
            password_confirm: '',
            image: '',
            verification: 0,
            permission: 1,
        });
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
            qf.Url('dept-list').Get().then((res: any) => {
                let temp: any = {};
                for (let i = 0; i < res.length; i++) {
                    if (res[i].univ_id === data.org_id) {
                        temp = res[i];
                        temp.label = `[${res[i].college_ch}] ${res[i].dept_ch}`;
                        deptList.value.push(temp);
                    }
                }
            });
        }
        getDeptList();
        let univTemp = 'U0009';
        const errorList = reactive({
            account: {
                filled: false,
                format: true,
                unique: true,
            },
            name: {
                filled: false,
            },
            org_id: {
                filled: false,
            },
            dept_id: {
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
            image: {
                uploaded: false,
            },
        });
        watch(data, () => {
            errorList.account.filled = data.account.length > 0;
            // eslint-disable-next-line
            errorList.account.format = (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(data.account));
            errorList.name.filled = data.name.length > 0;
            errorList.org_id.filled = data.org_id.length > 0;
            errorList.dept_id.filled = data.dept_id.length > 0;
            errorList.phone.filled = data.phone.length > 0;
            errorList.phone.format = (/^09[0-9]{8}$/.test(data.phone));
            errorList.password.filled = data.password.length > 0;
            errorList.password.format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password);
            errorList.passwordConfirm.same = data.password === data.password_confirm;
            errorList.passwordConfirm.filled = data.password_confirm.length > 0;
            errorList.image.uploaded = data.image.length > 0;
            if (data.org_id === 'O0000') {
                qd.Alert('單位設定錯誤');
                data.org_id = '';
            }
            if (data.org_id !== univTemp) {
                getDeptList();
                data.dept_id = '';
                univTemp = data.org_id;
            }
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
                    data.dept_id = '';
                    data.password = '';
                    data.password_confirm = '';
                    data.phone = '';
                }
            });
        }
        // image handler
        const imageUrl = ref('');
        function loadImage(event: any) {
            if (event.target.files[0].size > 3000000) {
                qd.Alert('檔案過大 File size is too large');
            } else {
                const reader: any = new FileReader();
                imageUrl.value = URL.createObjectURL(event.target.files[0]);
                reader.onload = () => {
                    const base64String: string = reader.result.replace('data:', '').replace(/^.+,/, '');
                    data.image = `data:image/png;base64, ${base64String}`;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
        return {
            page: ref(1),
            imageUrl,
            loadImage,
            univList,
            deptList,
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
        @apply w-28;
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
