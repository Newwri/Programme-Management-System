<template>
    <div class="w-screen flex flex-col items-center p-3 justify-center h-screen">
        <div class="flex flex-col items-center">
            <img src="/IIUM_Logo.png" alt="IIUM Logo" class="w-2/5 mb-3">
            <NuxtLink to="/" class="transition-colors my-5 hover:text-blue-500">
                <h1 class="text-4xl font-bold">Programme Management System</h1>
            </NuxtLink>
        </div>
        <div class="flex flex-col w-full items-center gap-y-4 my-6">
            <button
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 w-1/4 py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="goToPage('/stadd')">
                Login as IIUM STADD
            </button>
            <button
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 w-1/4 py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="goToPage('/kuliyyah')">
                Login as Kuliyyah
            </button>
            <button
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 w-1/4 py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="goToPage('/student')">
                Login as Student
            </button>
        </div>
        <div class="bg-slate-100 w-1/4 p-5 rounded-lg mt-6">
            <h2 class="text-xl font-bold mb-3">Group Members</h2>
            <ul>
                <li>2119279 Arman Nuri Anuar</li>
                <li>2118228 Alya Qasrina</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app';

function goToPage(page: string) {
    navigateTo(page)
}

</script>