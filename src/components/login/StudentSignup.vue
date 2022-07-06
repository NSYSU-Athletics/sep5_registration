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
                    <td class="label">系所：</td>
                    <td>
                        <v-select class="cursor-pointer" :options="deptList" :reduce="department => department.dept_id" v-model="department" label="dept_ch">
                        <template v-slot:no-options="{ search, searching }">
                            <template v-if="searching">找不到 <em>{{ search }}</em>。
                            </template>
                            <div v-else class="opacity-50">請輸入或選擇學校</div>
                        </template>
                    </v-select>
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
                <button class="full-button bg-orange-400 text-white">註冊</button>
            </div>
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
        const deptList: any = ref([]);
        // get dept list
        qf.Url('dept-list').GetAll(deptList);
        const imageUrl = ref('');
        let image = '';
        function loadImage(event: any) {
            if (event.target.files[0].size > 3000000) {
                qd.Alert('檔案過大 File size is too large');
            } else {
                const reader: any = new FileReader();
                imageUrl.value = URL.createObjectURL(event.target.files[0]);
                reader.onload = () => {
                    const base64String: string = reader.result.replace('data:', '').replace(/^.+,/, '');
                    image = `data:image/png;base64, ${base64String}`;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
        // data
        const department: any = ref('');
        return {
            page: ref(1),
            imageUrl,
            loadImage,
            deptList,
            // data
            department,
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
