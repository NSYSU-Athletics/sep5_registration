<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">回上頁</div>
        </div>
        <div class="box-section">
            <div class="title">新增選手</div>
            <hr>
            <table class="new-athlete">
                <tr>
                    <td>
                        <label>
                            <span>身分證字號：</span>
                            <input type="text">
                        </label>
                    </td>
                    <td>
                        <label>
                            <span>姓名：</span>
                            <input type="text">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <span>性別：</span>
                            <select>
                                <option value="1">生理男</option>
                                <option value="2">生理女</option>
                            </select>
                        </label>
                    </td>
                    <td>
                        <label>
                            <span>生日：</span>
                            <input type="date">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label v-if="gameData.nsysu==0">
                            <span>系所：</span>
                            <select>
                            </select>
                        </label>
                    </td>
                    <td>
                        <label>
                            <span>手機：</span>
                            <input type="text">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label v-if="gameData.nsysu==0">
                            <span>學號：</span>
                            <input type="text">
                        </label>
                    </td>
                    <td class="text-right">
                        <button class="button">新增</button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="box-section">
            <div class="title">選手列表</div>
            <hr>
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
        // department
        const orgList: any = ref([]);
        function getOrgList() {
            if (userStorage.type === 'stu') {
                qf.Url('dept-list').GetAll(orgList);
            } else if (userStorage.type === 'sch') {
                qf.Url('univ-list').GetAll(orgList);
            } else {
                qf.Url('organization/list').GetAll(orgList);
            }
        }
        getOrgList();
        return {
            gameData,
            orgList,
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
