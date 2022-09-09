<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">大專院校註冊</div>
        <hr class="my-2">
        <div class="text-gray-500 text-sm">限中山以外之大專院校報名，請由一位代表填寫該校報名之選手資料。</div>
        <table class="signup-form">
            <tr>
                <td class="label">學校單位：</td>
                <td>
                    <v-select class="cursor-pointer" :options="univList" :reduce="university => university.univ_id" v-model="data.org_id">
                        <template v-slot:no-options="{ search, searching }">
                            <template v-if="searching">找不到 <em>{{ search }}</em>。
                            </template>
                            <div v-else class="opacity-50">請輸入或選擇學校</div>
                        </template>
                    </v-select>
                </td>
            </tr>
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
                <td class="label">手機號碼：</td>
                <td>
                    <input type="text" v-model="data.phone">
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
        <div class="my-3 text-gray-500 text-sm">當您按下註冊，即代表您同意我們的<a href="" class="text-orange-400">使用政策與隱私權條款</a></div>
        <div>
            <button class="full-button bg-orange-400 text-white" @click="submitAll">註冊</button>
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
        const univList: any = ref([]);
        // get dept list
        qf.Url('univ-list').GetAll(univList).then(() => {
            for (let i = 0; i < univList.value.length; i++) {
                univList.value[i].label = `${univList.value[i].univ_name_ch_full} (${univList.value[i].univ_name_en})`;
            }
        });
        // data
        const data = reactive({
            account: '',
            name: '',
            org_id: '',
            phone: '',
            password: '',
            password_confirm: '',
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
            if (data.org_id === 'O0000') {
                qd.Alert('單位設定錯誤');
                data.org_id = '';
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
                    data.org_id = '';
                    data.password = '';
                    data.password_confirm = '';
                    data.phone = '';
                }
            });
        }
        return {
            univList,
            // data
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
