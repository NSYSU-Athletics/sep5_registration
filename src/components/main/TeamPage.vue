<template>
    <div class="mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
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
            <button class="arrow-button bg-orange-400" @click="displayModal=1">
                <span>
                    <template v-if="language=='ch'">隊伍管理</template>
                    <template v-if="language=='en'">Team Data</template>
                </span>
            </button>
            <button class="arrow-button bg-orange-400" @click="$router.push(`/register/${$route.params.game_id}/group`)">
                <span>
                    <template v-if="language=='ch'">隊伍報名</template>
                    <template v-if="language=='en'">Register</template>
                </span>
            </button>
        </div>
    </div>
    <SmallModal v-show="displayModal>0" @close_modal="displayModal=0">
        <template v-slot:title>
            <div class="text-2xl">
                <div v-if="displayModal==1">
                    <template v-if="language=='ch'">隊伍管理</template>
                    <template v-if="language=='en'">Team Data</template>
                </div>
            </div>
        </template>
        <template v-slot:content>
            <hr class="my-2">
            <TeamList v-if="displayModal==1" @close_modal="displayModal=0"></TeamList>
        </template>
    </SmallModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import SmallModal from '@/components/SmallModal.vue';
import TeamList from '@/components/main/module/TeamList.vue';

export default defineComponent({
    setup() {
        const displayModal = ref(0);
        return {
            displayModal,
            language: computed(() => useStore().state.language),
        };
    },
    components: {
        SmallModal,
        TeamList,
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
<style lang="scss" src="@/assets/scss/arrow-button.scss" scoped></style>
