<template>
    <div class="w-full min-h-screen py-5 bg-gray-200">
        <div v-if="regSystem.switch==1" class="p-5 bg-white w-11/12 sm:w-96 mx-auto shadow text-gray-700 rounded">
            <div class="flex justify-center items-center">
                <div>
                    <img src="@/assets/nsysua/logo_no_bg.png" class="h-16 inline-block mr-2" alt="">
                </div>
                <div>
                    <div class="text-2xl font-medium">體育賽事報名系統</div>
                    <div class="text-xs font-medium">Sports Events Registration System</div>
                </div>
            </div>
            <hr class="my-2">
            <div class="font-medium">注意事項：</div>
            <div class="text-sm p-1">
                <div v-html="regSystem.content"></div>
            </div>
            <hr class="my-2">
            <div class="mb-2">
                <div class="text-gray-600">請選擇身份別：</div>
                <select class="block w-full p-1 border-b-2 border-gray-200 focus:border-black" v-model="identity">
                    <option value="" disabled selected>請選擇身份別</option>
                    <option value="idv">個人報名(公開組)</option>
                    <option value="stu">中山學生(新生盃、田徑新生組)</option>
                    <option value="sch">大專院校(大專組)</option>
                    <option value="grp">一般單位(公開組)</option>
                </select>
            </div>
            <div class="mb-2">
                <div class="mb-q">帳號 Account</div>
                <input type="text" class="block w-full p-1 border-b-2 border-gray-200 focus:border-black" placeholder="abc@ijk.xyz" v-model="account">
            </div>
            <div class="mb-2">
                <div class="mb-q">密碼 Password</div>
                <input type="password" class="block w-full p-1 border-b-2 border-gray-200 focus:border-black" placeholder="········" v-model="password">
            </div>
            <div class="mt-2">
                <button class="bg-orange-400 w-full p-3 rounded font-medium hover:bg-orange-500 text-white duration-300" @click="submitAll">登入 Login</button>
            </div>
            <hr class="my-2">
            <div class="mt-2">
                <button class="bg-orange-400 w-full p-3 rounded font-medium hover:bg-orange-500 text-white duration-300" @click="displayModal=1">註冊 Signup</button>
            </div>
            <div class="mt-2">
                <a class="text-orange-400 block mr-3 text-sm" href="">忘記密碼 Forgot Password</a>
                <div class="text-sm">賽事問題請洽各校隊，系統操作問題請洽<a class="text-orange-400" href="https://www.facebook.com/NSYSUAthletics" target="_blank">中山田徑</a></div>
            </div>
        </div>
        <div v-else class="p-5 bg-white w-11/12 sm:w-96 mx-auto shadow text-gray-700 rounded">
            <div class="text-2xl">報名系統維護中</div>
            <div class="text-2xl">Under Maintenance</div>
        </div>
    </div>
    <SmallModal v-show="displayModal==1" @close_modal="displayModal=0">
        <template v-slot:title>
            <div class="flex justify-center items-center">
                <div>
                    <img src="@/assets/nsysua/logo_no_bg.png" class="h-16 inline-block mr-2" alt="">
                </div>
                <div>
                    <div class="text-2xl font-medium">體育賽事報名系統</div>
                    <div class="text-xs font-medium">Sports Events Registration System</div>
                </div>
            </div>
            <hr class="my-3">
        </template>
        <template v-slot:content>
            <div class="flex items-center mb-3">
                <div class="text-gray-600">請選擇註冊身份別：</div>
                <select class="block flex-grow border-2 rounded px-1 py-0.5" v-model="identity">
                    <option value="" disabled selected>請選擇身份別</option>
                    <option value="idv">個人報名(公開組)</option>
                    <option value="stu">中山學生(新生盃、田徑新生組)</option>
                    <option value="sch">大專院校(大專組)</option>
                    <option value="grp">一般單位(公開組)</option>
                </select>
            </div>
            <div v-show="identity!=''" class="border-2 rounded p-3">
                <IndividualSignup v-if="identity=='idv'"  @close_modal="displayModal=0"></IndividualSignup>
                <StudentSignup v-if="identity=='stu'"  @close_modal="displayModal=0"></StudentSignup>
                <SchoolSignup v-if="identity=='sch'"  @close_modal="displayModal=0"></SchoolSignup>
                <GroupSignup v-if="identity=='grp'"  @close_modal="displayModal=0"></GroupSignup>
            </div>
        </template>
    </SmallModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallModal from '@/components/SmallModal.vue';
import IndividualSignup from '@/components/login/IndividualSignup.vue';
import StudentSignup from '@/components/login/StudentSignup.vue';
import SchoolSignup from '@/components/login/SchoolSignup.vue';
import GroupSignup from '@/components/login/GroupSignup.vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const account = ref('');
        const password = ref('');
        const identity = ref('');
        const displayModal = ref(0);
        const regSystem: any = ref({ switch: 0, content: '' });
        const qf = new QuickFetch();
        const qd = new QuickData();
        const router = useRouter();
        qf.Url('reg-system').GetNoH(regSystem);
        function submitAll(): any {
            if (identity.value === '') {
                qd.Alert('請選擇身份別');
            } else if (account.value.length === 0) {
                qd.Alert('請輸入帳號');
            } else if (password.value.length === 0) {
                qd.Alert('請輸入密碼');
            } else {
                let url = '';
                if (identity.value === 'stu') {
                    url = 'auth/student/login';
                } else {
                    url = 'auth/user/login';
                }
                qf.Dataset().AddObj('account', account).AddObj('password', password);
                qf.Url(url).Post(qf.GetDset()).then((res: any) => {
                    if (res.message === 'done') {
                        router.push('/');
                        // eslint-disable-next-line no-param-reassign
                        res.data.user.type = identity.value;
                        localStorage.sep5_reg_data = JSON.stringify(res.data.user);
                        localStorage.sep5_reg_token = res.data.token;
                    } else if (res.message === 'wrong_password') {
                        qd.Alert('密碼錯誤');
                    } else if (res.message === 'account_not_exist') {
                        qd.Alert('帳號不存在');
                    }
                    account.value = '';
                    password.value = '';
                });
            }
        }
        return {
            account,
            password,
            displayModal,
            identity,
            regSystem,
            submitAll,
        };
    },
    components: {
        SmallModal,
        IndividualSignup,
        StudentSignup,
        SchoolSignup,
        GroupSignup,
    },
});
</script>

<style lang="scss" scoped>

</style>
