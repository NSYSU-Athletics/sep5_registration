<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section">
            <div class="title">賽事列表</div>
            <hr>
            <GameList></GameList>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GameList from '@/components/main/module/GameList.vue';
// import SmallModal from '@/components/SmallModal.vue';

export default defineComponent({
    setup() {
        const displayModal = ref(0);
        return {
            displayModal,
        };
    },
    components: {
        GameList,
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
