<template>
    <div class="bg-blue-100 w-full py-3 px-4 rounded-lg flex mb-6">
        <div class="flex flex-col flex-grow">
            <div class="flex flex-col grow">
                <h1 class="font-bold text-2xl">{{ programName }}</h1>
                <p class="text-sm">{{ programDuration }} days</p>
                <p class="text-sm">{{ new Date(date).toLocaleDateString() }}</p>
            </div>
            <p class="text-sm">{{ kuliyyah }}</p>
            <p class="mt-4">Total students joined: {{ totalStudents }}</p>
        </div>
        <div>
            <button
                class="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                @click="() => click()">
                Register
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps(['programName', 'programID', 'kuliyyah', 'click', 'programDuration', 'date', 'totalStudents']);
</script>