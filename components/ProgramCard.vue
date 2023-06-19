<template>
    <div class="bg-blue-100 w-full py-3 px-4 rounded-lg h-36 flex mb-6"
        :class="{ 'bg-green-200': (status === 'APPROVED'), 'bg-yellow-100': (status === 'PENDING'), 'bg-red-100': (status === 'REJECTED') }">
        <div class="flex flex-col flex-grow">
            <div class="flex flex-col grow">
                <h1 class="font-bold text-2xl">{{ programName }}</h1>
                <p class="text-red-700 text-sm">
                    {{ (status === 'PENDING') ? 'Waiting for approval' : (status === 'APPROVED' ? 'Approved' : 'Rejected') }}
                </p>
            </div>
            <p class="text-sm">{{ kuliyyah }}</p>
            <div class="flex gap-x-3 items-center">
                <button 
                    type="button"
                    v-if="status !== 'REJECTED'"
                    class="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 w-1/4 text-sm font-medium text-yellow-900 hover:bg-yellow-200 active:ring-2 active:ring-yellow-500 active:ring-offset-2"
                    @click="() => navigateTo(`/feedbacks/${programID}`)">
                    View Feedbacks
                </button>
                <p class="text-sm">
                    Total feedbacks: {{ feedbackCount }}
                </p>
            </div>
        </div>
        <div>
            <button class="p-2 border border-red-500 rounded-full hover:bg-red-200"
                @click="async () => await deleteProgram()">
                <svg preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" height="20"
                    viewBox="0 -960 960 960" width="20" fill="#ff0000">
                    <path
                        d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { navigateTo } from 'nuxt/app';

defineProps(['programName', 'programID', 'budget', 'status', 'kuliyyah', 'deleteProgram', 'feedbackCount']);
</script>