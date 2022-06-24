<template>
    <div class="w-full min-h-screen py-10 bg-gray-200">
        <div class="p-5 bg-white w-11/12 sm:w-96 mx-auto shadow text-gray-700 rounded">
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
            <div class="font-medium">注意事項：</div>
            <div class="text-sm p-1">
                <div class="mb-2"><strong>新生盃報名</strong>：請由各系所班代統一進行報名。</div>
                <div><strong>中山田徑公開賽</strong>：<br>新生組：中山選手比照新生盃作業；高科大選手請向高科大田徑隊報名。<br>大專組：以學校為單位由負責人統一報名。<br>公開組：可以個人報名，或由單位負責人統一報名。</div>
            </div>
            <hr class="my-3">
            <div class="mb-3">
                <div class="mb-q">帳號 Account</div>
                <input type="text" class="block w-full p-1 border-b-2 border-gray-200 focus:border-black" placeholder="abc@ijk.xyz" v-model="account">
            </div>
            <div class="mb-3">
                <div class="mb-q">密碼 Password</div>
                <input type="password" class="block w-full p-1 border-b-2 border-gray-200 focus:border-black" placeholder="········" v-model="password">
            </div>
            <div class="mt-3">
                <button class="bg-orange-400 w-full p-3 rounded font-medium hover:bg-orange-500 text-white duration-300">登入 Login</button>
            </div>
            <hr class="my-3">
            <div class="mt-3">
                <button class="bg-orange-400 w-full p-3 rounded font-medium hover:bg-orange-500 text-white duration-300" @click="displayModal=1">註冊 Signup</button>
            </div>
            <div class="mt-3">
                <a class="text-orange-400 block mr-3 text-sm" href="">忘記密碼 Forgot Password</a>
                <div class="text-sm">賽事問題請洽各校隊，系統操作問題請洽<a class="text-orange-400" href="">中山田徑</a></div>
            </div>
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
                    <IndividualSignup v-if="identity=='idv'"></IndividualSignup>
                </div>
            </template>
    </SmallModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallModal from '@/components/SmallModal.vue';
import IndividualSignup from '@/components/login/IndividualSignup.vue';

export default defineComponent({
    setup() {
        const account = ref('');
        const password = ref('');
        const displayModal = ref(1);
        return {
            account,
            password,
            displayModal,
            identity: ref(''),
        };
    },
    components: {
        SmallModal,
        IndividualSignup,
    },
});
</script>

<style lang="scss" scoped>

</style>
