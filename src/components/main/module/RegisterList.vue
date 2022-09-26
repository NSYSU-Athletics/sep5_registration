<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">回上頁</div>
        </div>
        <div class="box-section">
            <div class="title">功能選單</div>
            <hr>
            <button class="arrow-button bg-orange-400" @click="$router.push(`/register/${$route.params.game_id}/individual`)">
                <span>個人項目</span>
            </button>
            <button class="arrow-button bg-orange-400" @click="$router.push(`/register/${$route.params.game_id}/team`)">
                <span>團體項目</span>
            </button>
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
}
</style>
<style lang="scss" src="@/assets/scss/arrow-button.scss" scoped></style>
