<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">
                <template v-if="language=='ch'">回上頁</template>
                <template v-if="language=='en'">Back</template>
            </div>
        </div>
        <div class="box-section">
            <div class="title">
                <template v-if="language=='ch'">帳號資料管理</template>
                <template v-if="language=='en'">Account Info</template>
            </div>
            <hr>
            <table>
                <tr>
                    <td>
                        <template v-if="language=='ch'">帳號</template>
                        <template v-if="language=='en'">Account</template>
                    </td>
                    <td>{{userData.account}}</td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">姓名</template>
                        <template v-if="language=='en'">Name</template>
                    </td>
                    <td v-if="isEdit">
                        <input type="text" v-model="data.name">
                    </td>
                    <td v-else>{{userData.name}}</td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">手機號碼</template>
                        <template v-if="language=='en'">Phone (TW)</template>
                    </td>
                    <td v-if="isEdit">
                        <input type="text" v-model="data.phone">
                    </td>
                    <td v-else>{{userData.phone}}</td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">單位全名</template>
                        <template v-if="language=='en'">Organization<br>Full Name</template>
                    </td>
                    <td>{{userData[`name_${language}_full`]}}</td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">單位簡稱</template>
                        <template v-if="language=='en'">Organization<br>Abbriviation</template>
                    </td>
                    <td>{{userData[`name_${language}`]}}</td>
                </tr>
                <tr>
                    <td>
                        <template v-if="language=='ch'">權限</template>
                        <template v-if="language=='en'">Permission</template>
                    </td>
                    <td>
                        <span v-if="userData.permission==0">
                            <template v-if="language=='ch'">一般帳號</template>
                            <template v-if="language=='en'">General</template>
                        </span>
                        <span v-if="userData.permission==1">
                            <template v-if="language=='ch'">系所代表</template>
                            <template v-if="language=='en'">Departmental</template>
                        </span>
                        <span v-if="userData.permission==2">
                            <template v-if="language=='ch'">單位代表</template>
                            <template v-if="language=='en'">Organizational</template>
                        </span>
                        <span v-if="userData.permission==3">
                            <template v-if="language=='ch'">聯盟代表</template>
                            <template v-if="language=='en'">Interorganizational</template>
                        </span>
                    </td>
                </tr>
            </table>
            <div class="text-right">
                <button v-if="!isEdit" class="button" @click="isEdit=true">
                    <template v-if="language=='ch'">編輯</template>
                    <template v-if="language=='en'">Edit</template>
                </button>
                <button v-if="isEdit" class="button" @click="submitAll">
                    <template v-if="language=='ch'">儲存</template>
                    <template v-if="language=='en'">Save</template>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, reactive, watch, computed,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useStore } from 'vuex';

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
