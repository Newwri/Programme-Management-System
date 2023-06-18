<template>
    <div class="bg-blue-100 w-full flex flex-col py-4 px-4 items-center rounded-lg">
        <div class="flex w-full gap-x-4">
            <img 
            src="/person-placeholder.png"
            class="w-8 rounded-full" alt="user picture" 
            style="width: 32px; height: 32px; object-fit: cover;"
            />
            <p class="text-lg">
                {{ name }} ({{ matricNumber }})
            </p>
        </div>
        <p class="w-full mt-4">
            {{ kuliyyah }}
        </p>
    </div>
</template>

<script setup>
defineProps(['name',
    'matricNumber',
    'kuliyyah']);
</script>