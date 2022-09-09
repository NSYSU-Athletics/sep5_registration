<template>
    <div>
        <template v-for="(item, index) in data" :key="index">
            <template v-if="(userStorage.type=='stu' && item.nsysu==0) || (userStorage.type!='stu' && item.nsysu==1)">
                <div class="item-box" @click="$router.push(`/register/${item.game_id}`)">
                    <div>[{{item.sport_ch}}]</div>
                    <div>{{item.reg_end.substr(0, 16)}}</div>
                    <div class="flex-grow">{{item.name_ch}}</div>
                </div>
                <hr>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuickData, QuickFetch } from '@/quick';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const data: any = ref([]);
        const userStorage = JSON.parse(localStorage.sep5_reg_data);
        qf.Url('games/list').GetAll(data);
        return {
            data,
            userStorage,
        };
    },
});
</script>

<style lang="scss" scoped>
.item-box {
    @apply flex text-orange-400 hover:text-orange-500 duration-200 cursor-pointer;
    div {
        @apply p-2;
    }
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
