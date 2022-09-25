<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 py-5">
        <div class="box-section">
            <div class="text-xl text-gray-400 cursor-pointer" @click="$router.go(-1)">回上頁</div>
        </div>
        <div class="box-section">
            <div class="title">單位資料管理</div>
            <hr>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
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
