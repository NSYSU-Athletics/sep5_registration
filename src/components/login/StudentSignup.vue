<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">中山學生註冊</div>
        <hr class="my-2">
        <div v-if="page==1">
            <div class="text-gray-500 text-sm">限中山學生報名新生盃(含田徑新生組)、系際運動會(系際盃)者。各系所請由一位代表註冊及報名，註冊後須待審核通過方可進行報名。</div>
            <table class="signup-form">
                <tr>
                    <td class="label">Email：</td>
                    <td>
                        <input type="email" v-model="data.account" @blur="exist">
                        <div v-if="data.account.length>0 && !errorList.account.format" class="warning">Email格式錯誤</div>
                    <div v-if="data.account.length>0 && !errorList.account.unique" class="warning">Email已存在</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">真實姓名：</td>
                    <td>
                        <input type="text" v-model="data.name">
                    </td>
                </tr>
                <tr>
                    <td class="label">系所：</td>
                    <td>
                        <v-select class="cursor-pointer" :options="deptList" :reduce="department => department.dept_id" v-model="data.dept_id" label="dept_ch">
                            <template v-slot:no-options="{ search, searching }">
                                <template v-if="searching">找不到 <em>{{ search }}</em>。
                                </template>
                                <div v-else class="opacity-50">載入中</div>
                            </template>
                        </v-select>
                    </td>
                </tr>
                <tr>
                    <td class="label">手機號碼：</td>
                    <td>
                        <input type="tel" v-model="data.phone">
                        <div v-if="data.phone.length>0 && !errorList.phone.format" class="warning">手機格式錯誤</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">密碼：</td>
                    <td>
                        <input type="password" v-model="data.password">
                        <div v-if="data.password.length>0 && !errorList.password.format" class="warning">密碼需格有大小寫字母與數字，並至少8個字元</div>
                    </td>
                </tr>
                <tr>
                    <td class="label">確認密碼：</td>
                    <td>
                        <input type="password" v-model="data.password_confirm">
                        <div v-if="data.password_confirm.length>0 && !errorList.passwordConfirm.same" class="warning">兩次輸入密碼不相同</div>
                    </td>
                </tr>
            </table>
            <div>
                <button @click="page=2" class="full-button bg-orange-400 text-white">下一步</button>
            </div>
        </div>
        <div v-if="page==2">
            <div @click="page=1" class="text-lg text-gray-500 flex items-center my-2 cursor-pointer">
                <div class="material-icons">arrow_back_ios</div>
                <div>回上一步</div>
            </div>
            <hr>
            <div>請上傳學生證</div>
            <div class="text-xs text-gray-500">檔案需小於3MB，且學號、姓名、系所需清晰可見，否則將無法通過審核。</div>
            <label class="inline-block py-1 px-3 rounded my-2 bg-orange-400 hover:bg-orange-500 text-white duration-300 cursor-pointer">
                上傳學生證
                <input type="file" accept="image/*" class="hidden" @change="loadImage">
            </label>
            <div v-if="imageUrl!==''">
                <div>圖片預覽</div>
                <hr class="my-2">
                <div class="flex">
                    <div class="flex-grow"></div>
                    <img :src="imageUrl" class="block max-h-60" alt="">
                    <div class="flex-grow"></div>
                </div>
                <hr class="my-2">
            </div>
            <div class="mt-3">
                <button class="full-button bg-orange-400 text-white" @click="submitAll">註冊</button>
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
        const deptList: any = ref([]);
        // get dept list
        qf.Url('dept-list').Get().then((res: any) => {
            res.forEach((el: any) => {
                if (el.univ_id === 'U0009') {
                    deptList.value.push(el);
                }
            });
        });
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
                            qd.Alert('請確認所有欄位皆已填寫');
                        } else {
                            qd.Alert('請確認輸入的內容');
                        }
                        return;
                    }
                }
            }
            const temp: any = JSON.parse(JSON.stringify(data));
            delete temp.password_confirm;
            qf.Url('auth/user/register').Post(temp).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('註冊成功');
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
</style>
