<template>
    <table class="w-full">
        <tr>
            <th class="w-[15%]">
                <template v-if="language=='ch'">運動項目</template>
                <template v-if="language=='en'">Sport</template>
            </th>
            <th class="w-[25%]">
                <template v-if="language=='ch'">報名截止</template>
                <template v-if="language=='en'">Deadline</template>
            </th>
            <th class="w-[60%]">
                <template v-if="language=='ch'">賽事名稱</template>
                <template v-if="language=='en'">Game</template>
            </th>
        </tr>
        <template v-for="(item, index) in data" :key="index">
            <template v-if="(item.nsysu == 0 && userStorage.org_id == 'U0009') || item.nsysu == 1">
                <tr class="item-box" @click="$router.push(`/register/${item.game_id}`)">
                    <td>{{item[`sport_${language}`]}}</td>
                    <td>{{item.reg_end.substr(0, 16)}}</td>
                    <td class="flex-grow">{{item[`name_${language}`]}}</td>
                </tr>
            </template>
        </template>
    </table>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const data: any = ref([]);
        const userStorage = JSON.parse(localStorage.sep5_reg_data);
        qf.Url('games/list').GetAll(data);
        return {
            data,
            userStorage,
            language: computed(() => useStore().state.language),
        };
    },
});
</script>

<style lang="scss" scoped>
.item-box {
    @apply text-orange-400 hover:text-orange-500 duration-200 cursor-pointer;
}
td, th {
    @apply p-2 border-b-2 text-left;
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
