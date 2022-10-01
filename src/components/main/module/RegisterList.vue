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
                <template v-if="language=='ch'">功能選單</template>
                <template v-if="language=='en'">Actions</template>
            </div>
            <hr>
            <div v-if="language=='ch'" class="my-1 text-gray-400">個人項目報名與團體項目報名</div>
            <div v-if="language=='en'" class="my-1 text-gray-400">Register for individual events or group events.</div>
            <button class="arrow-button bg-orange-400" @click="$router.push(`/register/${$route.params.game_id}/individual`)">
                <span>
                    <template v-if="language=='ch'">個人項目</template>
                    <template v-if="language=='en'">Individual</template>
                </span>
            </button>
            <button v-if="userData.org_id!='O0000'" class="arrow-button bg-orange-400" @click="$router.push(`/register/${$route.params.game_id}/team`)">
                <span>
                    <template v-if="language=='ch'">團體項目</template>
                    <template v-if="language=='en'">Group</template>
                </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

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
            userData: JSON.parse(localStorage.sep5_reg_data),
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
</style>
<style lang="scss" src="@/assets/scss/arrow-button.scss" scoped></style>
