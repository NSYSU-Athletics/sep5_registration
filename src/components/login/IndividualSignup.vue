<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">個人報名註冊<br>Individual Signup</div>
        <hr class="my-2">
        <div class="text-gray-500 text-sm">大專院校學生請勿填寫</div>
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
                <td class="label">手機號碼 Phone (TW)</td>
                <td>
                    <input type="text" v-model="data.phone">
                    <div v-if="data.phone.length>0 && !errorList.phone.format" class="warning">手機格式錯誤</div>
                </td>
            </tr>
            <tr>
                <td class="label">密碼 Password</td>
                <td>
                    <input type="password" v-model="data.password">
                    <div v-if="data.password.length>0 && !errorList.password.format" class="warning">密碼需格有大小寫字母與數字，並至少8個字元。<br>Password must be at least 1 Uppercase character and 1 Lowercase character, with a minimum length of 8 characters.</div>
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
</template>

<script lang="ts">
import {
    defineComponent, reactive, watch,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';

export default defineComponent({
    setup(props, context) {
        const qf = new QuickFetch();
        const qd = new QuickData();
        const data = reactive({
            account: '',
            name: '',
            org_id: 'O0000',
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
                    data.org_id = 'O0000';
                    data.password = '';
                    data.password_confirm = '';
                    data.phone = '';
                }
            });
        }
        return {
            data,
            errorList,
            submitAll,
            exist,
        };
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
        input {
            @apply border-b-2 p-1 w-full;
        }
    }
}
.warning {
    @apply text-sm text-red-600;
}
</style>
