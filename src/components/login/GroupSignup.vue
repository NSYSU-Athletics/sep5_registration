<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">一般單位註冊</div>
        <hr class="my-2">
        <div v-show="nowPage==0">
            <div class="text-gray-500 text-sm">僅限報名公開組填寫，請輸入或選擇單位，若無您的單位名稱，請<span class="text-orange-400 cursor-pointer" @click="toNextPage(1)">建立單位資料</span>。</div>
            <hr class="my-2">
            <div class="mb-2">單位列表</div>
            <div>
                <v-select class="cursor-pointer" :options="orgList" :reduce="org => org.org_id" v-model="organization" label="name_ch_full">
                    <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">找不到 <em>{{ search }}</em>嗎？請<span class="text-orange-400" @click="toNextPage(1)">建立單位資料</span>。
                        </template>
                        <div v-else class="opacity-50">請輸入或選擇單位</div>
                    </template>
                </v-select>
            </div>
            <div class="mt-2" v-if="organization!=='' && organization !==null">
                <button class="full-button bg-orange-400 text-white" @click="toNextPage(2)">下一步</button>
            </div>
        </div>
        <div v-show="nowPage==1">
            <div @click="nowPage = 0" class="text-lg text-gray-500 flex items-center my-2 cursor-pointer">
                <div class="material-icons">arrow_back_ios</div>
                <div>回上一步</div>
            </div>
            <div>建立單位資料</div>
            <table class="signup-form">
                <tr>
                    <td class="label">中文名稱：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">中文簡稱：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">英文名稱：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">英文簡稱：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">聯絡電話：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">所屬縣市：</td>
                    <td>
                        <select v-model="city">
                            <template v-for="(item, index) in cityList" :key="index">
                                <option :value="item.city_id">{{item.city_ch}}</option>
                            </template>
                        </select>
                    </td>
                </tr>
            </table>
            <div>
                <button class="full-button bg-orange-400 text-white" @click="toNextPage(2)">下一步</button>
            </div>
        </div>
        <div v-show="nowPage==2">
        <div @click="nowPage = prevPage" class="text-lg text-gray-500 flex items-center my-2 cursor-pointer">
                <div class="material-icons">arrow_back_ios</div>
                <div>回上一步</div>
            </div>
            <table class="signup-form">
                <div>單位帳號註冊</div>
                <tr>
                    <td class="label">Email：</td>
                    <td>
                        <input type="email">
                    </td>
                </tr>
                <tr>
                    <td class="label">真實姓名：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">聯絡電話：</td>
                    <td>
                        <input type="text">
                    </td>
                </tr>
                <tr>
                    <td class="label">密碼：</td>
                    <td>
                        <input type="password">
                    </td>
                </tr>
                <tr>
                    <td class="label">確認密碼：</td>
                    <td>
                        <input type="password">
                    </td>
                </tr>
            </table>
            <div class="my-3 text-gray-500 text-sm">當您按下註冊，即代表您同意我們的<a href="" class="text-orange-400">使用政策與隱私權條款</a></div>
            <div>
                <button class="full-button bg-orange-400 text-white">註冊</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { QuickData, QuickFetch } from '@/quick';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        // get org list
        const orgList: any = ref([]);
        qf.Url('org-list').GetAll(orgList);
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
        // data
        const organization = ref('');
        const city = ref('');
        return {
            nowPage,
            prevPage,
            toNextPage,
            orgList,
            cityList,
            // data
            organization,
            city,
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
</style>
