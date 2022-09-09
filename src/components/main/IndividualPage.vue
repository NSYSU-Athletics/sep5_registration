<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">回上頁</div>
        </div>
        <div class="box-section">
            <div class="title">新增報名</div>
            <hr>
            <table>
                <tr>
                    <td>
                        <span>姓名：</span>
                        <select>
                            <option value="">測試一</option>
                            <option value="">測試二</option>
                            <option value="">測試三</option>
                        </select>
                    </td>
                    <td>
                        <span>組別：</span>
                        <select>
                            <option value="">新生男子組</option>
                            <option value="">新生女子組</option>
                            <option value="">新生混合組</option>
                        </select>
                    </td>
                    <td>
                        <span>項目：</span>
                        <select>
                            <option value="">100公尺</option>
                            <option value="">200公尺</option>
                            <option value="">400公尺</option>
                        </select>
                    </td>
                    <td>
                        <button class="button">新增</button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="box-section">
            <div class="title">報名項目</div>
            <hr>
            <table>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const route = useRoute();
        const gameData: any = ref({});
        const userStorage = JSON.parse(localStorage.sep5_reg_data);
        function getGameData() {
            qf.Url(`games/${route.params.game_id}`).GetAll(gameData);
        }
        getGameData();
        return {
            gameData,
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
    input, select {
        @apply border-2 rounded-md p-1;
    }
    .new-athlete {
        @apply w-full;
        td {
            @apply p-1 w-1/2;
            label {
                @apply flex items-center;
                span {
                    @apply block flex-shrink-0;
                }
                input, select {
                    @apply block flex-grow w-full;
                }
            }
        }
    }
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
