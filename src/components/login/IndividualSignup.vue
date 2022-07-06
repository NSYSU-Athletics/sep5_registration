<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">個人報名註冊</div>
        <hr class="my-2">
        <div class="text-gray-500 text-sm">僅限報名公開組填寫</div>
        <table class="signup-form">
            <tr>
                <td class="label">Email：</td>
                <td>
                    <input type="email">
                </td>
            </tr>
            <tr>
                <td class="label">真實姓名：</td>
                <td>
                    <input type="text">
                </td>
            </tr>
            <tr>
                <td class="label">聯絡電話：</td>
                <td>
                    <input type="text">
                </td>
            </tr>
            <tr>
                <td class="label">密碼：</td>
                <td>
                    <input type="password">
                </td>
            </tr>
            <tr>
                <td class="label">確認密碼：</td>
                <td>
                    <input type="password">
                </td>
            </tr>
        </table>
        <div class="my-3 text-gray-500 text-sm">當您按下註冊，即代表您同意我們的<a href="" class="text-orange-400">使用政策與隱私權條款</a></div>
        <div>
            <button class="full-button bg-orange-400 text-white">註冊</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {
        };
    },
});
</script>

<style lang="scss" scoped>
.signup-form {
    @apply w-full;
    .label {
        @apply w-24;
    }
    td {
        @apply p-1;
        input {
            @apply border-b-2 p-1 w-full;
        }
    }
}
</style>
