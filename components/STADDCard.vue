<template>
    <div class="bg-blue-100 w-full py-3 px-4 rounded-lg h-36 flex mb-6"
        :class="{ 'bg-green-200': (status === 'APPROVED'), 'bg-yellow-100': (status === 'PENDING'), 'bg-red-200': (status === 'REJECTED') }">
        <div class="flex flex-col flex-grow">
            <div class="flex flex-col grow">
                <h1 class="font-bold text-2xl">{{ programName }}</h1>
                <p class="text-red-700 text-sm">
                    {{ (status === 'PENDING') ? 'Waiting for approval' : (status === 'APPROVED' ? 'Approved' : 'Rejected') }}
                </p>
            </div>
            <p class="text-sm">{{ kuliyyah }}</p>
        </div>
        <div style="width: 150px;" class="flex flex-col justify-center gap-y-3">
            <button
                class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 w-full py-3 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus:outline focus:outline-green-300 disabled:bg-gray-200 disabled:text-gray-400"
                :disabled="status === 'APPROVED'"
                @click="onStatusChange('APPROVED', programID)">
                Approve
            </button>
            <button
                class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 w-full py-3 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus:outline focus:outline-red-300 disabled:bg-gray-200 disabled:text-gray-400"
                :disabled="status === 'REJECTED'"
                @click="onStatusChange('REJECTED', programID)">
                Reject
            </button>
        </div>
    </div>
</template>

<script setup>

defineProps(['programName', 'programID', 'budget', 'status', 'kuliyyah', 'programID', 'onStatusChange']);

</script>