<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">大專院校註冊</div>
        <hr class="my-2">
        <div class="text-gray-500 text-sm">限中山以外之大專院校報名，請由一位代表填寫該校報名之選手資料。</div>
        <table class="signup-form">
            <tr>
                <td class="label">學校單位：</td>
                <td>
                    <v-select class="cursor-pointer" :options="univList" :reduce="university => university.univ_id" v-model="university">
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineComponent({
    setup() {
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
        const university: any = ref('');
        return {
            univList,
            // data
            university,
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
