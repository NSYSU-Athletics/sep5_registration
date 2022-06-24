<template>
    <div class="text-gray-800">
        <div class="text-2xl font-medium">個人報名註冊</div>
        <hr class="my-2">
        <div class="text-gray-500 text-sm">僅限報名公開組填寫</div>
        <div class="signup-form">
            <label>
                <div>帳號：</div>
                <input type="text">
            </label>
            <label>
                <div>姓名：</div>
                <input type="text">
            </label>
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
    & > label {
        @apply flex w-full my-1;
        & > div {
            @apply mr-2;
        }
        & > input {
            @apply block flex-grow border-b-2;
        }
    }
}
</style>
