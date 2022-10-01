<template>
    <div>
        <div class="new-team">
            <div>
                <template v-if="language=='ch'">新增隊伍：</template>
                <template v-if="language=='en'">New Team : </template>
            </div>
            <input type="text" class="flex-grow block" v-model="data.team_name">
            <button class="block button" @click="submitAll">
                <template v-if="language=='ch'">新增</template>
                <template v-if="language=='en'">Add</template>
            </button>
        </div>
        <hr>
        <div>
            <template v-for="(item, index) in teamList" :key="index">
                <div class="flex p-1 items-center">
                    <div class="flex-grow">
                        <div>{{item.team_name}}</div>
                        <div class="flex gap-3 items-center">
                            <div>
                                <template v-if="language=='ch'">成員</template>
                                <template v-if="language=='en'">Member</template>
                            </div>
                            <template v-for="(member, index) in item.member_data_list" :key="index">
                                <div class="border-2 rounded px-1 py-0.5">{{member.name}}</div>
                            </template>
                            <div v-if="item.member_list.length == 0">目前還沒有成員 No any member.</div>
                        </div>
                    </div>
                    <button class="button block" @click="openTeam(item)">
                        <template v-if="language=='ch'">編輯</template>
                        <template v-if="language=='en'">Edit</template>
                    </button>
                </div>
            </template>
        </div>
    </div>
    <SmallModal v-show="displayModal>0" @close_modal="displayModal=0">
        <template v-slot:title>
            <div class="text-2xl">
                <div v-if="displayModal==1">
                    <template v-if="language=='ch'">編輯成員</template>
                    <template v-if="language=='en'">Edit Member</template>
                </div>
            </div>
        </template>
        <template v-slot:content>
            <hr class="my-2">
            <AddMember v-if="displayModal==1" :team-data="teamData" @close_modal="displayModal=0" @refresh="getTeamList"></AddMember>
        </template>
    </SmallModal>
</template>

<script lang="ts">
import {
    defineComponent, reactive, ref, watch, computed,
} from 'vue';
import { QuickData, QuickFetch } from '@/quick';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import SmallModal from '@/components/SmallModal.vue';
import AddMember from '@/components/main/module/AddMember.vue';

export default defineComponent({
    setup() {
        const qf = new QuickFetch();
        const qd = new QuickData();
        const route = useRoute();
        const store = useStore();
        const displayModal = ref(0);
        const userData: any = ref({});
        const data: any = reactive({
            team_name: '',
        });
        const teamData: any = ref({});
        // game data
        const gameData: any = ref({});
        const paramsList: any = ref([]);
        const divisionList: any = ref([]);
        function getGameData() {
            qf.Url(`games/${route.params.game_id}`).GetAll(gameData).then(() => {
                const prefix = qd.SportPrefix(gameData.value.type);
                qf.Url(`${prefix}/event-params/${gameData.value.game_id}`).GetAll(paramsList);
                qf.Url(`${prefix}/game-division/${gameData.value.game_id}`).GetAll(divisionList);
            });
        }
        getGameData();
        // get team list
        const teamList: any = ref([]);
        function getTeamList() {
            let url = '';
            if (userData.value.permission === 2) {
                url = `register/grp/team/${gameData.value.type}/${gameData.value.game_id}/${userData.value.org_id}`;
            } else {
                url = `register/grp/team/${gameData.value.type}/${gameData.value.game_id}/${userData.value.org_id}/${userData.value.dept_id}`;
            }
            qf.Url(url).GetAll(teamList);
        }
        // get user data
        function getUserData() {
            qf.Url('auth/user/info').Get().then((res: any) => {
                data.org_id = res.org_id;
                data.dept_id = res.org_id.substr(0, 1) === 'U' ? res.dept_id : '';
                userData.value = res;
            });
        }
        getUserData();
        watch([gameData, userData], () => {
            // eslint-disable-next-line no-prototype-builtins
            if (gameData.value.hasOwnProperty('game_id') && userData.value.hasOwnProperty('org_id')) {
                getTeamList();
            }
        });
        function submitAll() {
            if (data.team_name.length === 0) {
                qd.Alert('請輸入隊名');
                return;
            }
            qf.Url(`register/grp/team/add/${gameData.value.type}/${gameData.value.game_id}`).Post(data).then((res: any) => {
                if (res.message === 'done') {
                    qd.Alert('新增成功');
                    data.team_name = '';
                    getTeamList();
                }
            });
        }
        return {
            data,
            submitAll,
            teamList,
            displayModal,
            openTeam: (input: any) => {
                displayModal.value = 1;
                teamData.value = input;
            },
            teamData,
            getTeamList,
            language: computed(() => store.state.language),
        };
    },
    components: {
        SmallModal,
        AddMember,
    },
});
</script>

<style lang="scss" scoped>
.new-team {
    @apply flex items-center gap-2 p-1;
    input {
        @apply p-1 border-2 rounded;
    }
}
.team-table {
    @apply w-full;
    td {
        @apply text-left p-1;
    }
}
</style>
<style lang="scss" src="@/assets/scss/button.scss" scoped></style>
