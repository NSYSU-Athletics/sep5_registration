<template>
    <div>
        <router-view></router-view>
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
