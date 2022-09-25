<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">回上頁</div>
        </div>
        <div class="box-section">
            <div class="title">帳號資料管理</div>
            <hr>
            <table>
                <tr>
                    <td>帳號</td>
                    <td>{{userData.account}}</td>
                </tr>
                <tr>
                    <td>姓名</td>
                    <td v-if="isEdit">
                        <input type="text" v-model="data.name">
                    </td>
                    <td v-else>{{userData.name}}</td>
                </tr>
                <tr>
                    <td>手機號碼</td>
                    <td v-if="isEdit">
                        <input type="text" v-model="data.phone">
                    </td>
                    <td v-else>{{userData.phone}}</td>
                </tr>
                <tr>
                    <td>單位全名</td>
                    <td>{{userData.name_ch_full}}</td>
                </tr>
                <tr>
                    <td>單位簡稱</td>
                    <td>{{userData.name_ch}}</td>
                </tr>
                <tr>
                    <td>權限</td>
                    <td>
                        <span v-if="userData.permission==0">一般帳號</span>
                        <span v-if="userData.permission==1">系所代表</span>
                        <span v-if="userData.permission==2">學校、團體代表</span>
                        <span v-if="userData.permission==3">聯盟代表</span>
                    </td>
                </tr>
            </table>
            <div class="text-right">
                <button v-if="!isEdit" class="button" @click="isEdit=true">編輯</button>
                <button v-if="isEdit" class="button" @click="submitAll">儲存</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, reactive, watch,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';

export default defineComponent({
    setup() {
        const displayModal = ref(0);
        const isEdit = ref(false);
        const qf = new QuickFetch();
        const qd = new QuickData();
        const userData: any = ref({});
        const data = reactive({
            name: '',
            phone: '',
            image: '',
        });
        function getUserData() {
            qf.Url('auth/user/info').GetAll(userData).then(() => {
                data.name = userData.value.name;
                data.phone = userData.value.phone;
                data.image = userData.value.image;
            });
        }
        getUserData();
        const errorList = reactive({
            name: {
                filled: false,
            },
            phone: {
                filled: false,
                format: false,
            },
        });
        watch(data, () => {
            errorList.name.filled = data.name.length > 0;
            errorList.phone.filled = data.phone.length > 0;
            errorList.phone.format = (/^09[0-9]{8}$/.test(data.phone));
        });
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
            qf.Url('auth/user/edit').Patch(userData.value.u_id, temp).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('編輯成功');
                    isEdit.value = false;
                    getUserData();
                }
            });
        }
        return {
            displayModal,
            userData,
            data,
            isEdit,
            submitAll,
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
    }
    table {
        @apply w-full;
        td {
            @apply p-1 text-left;
            input {
                @apply p-1 border-2 rounded w-full;
            }
        }
    }
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
