<template>
    <div class="w-screen flex flex-col items-center p-3 h-screen py-12">

        <div class="flex justify-between items-center w-1/2 py-4">
            <div class="flex gap-x-6 items-center">
                <NuxtLink to="/">
                    <div class="bg-blue-100 py-2 px-5 rounded-3xl text-blue-600 hover:bg-blue-100 transition-colors">
                        Back
                    </div>
                </NuxtLink>
                <h1 class="text-3xl font-bold">
                    Kuliyyah Dashboard
                </h1>
            </div>
            <div class="flex gap-x-3">
                <button type="button" @click="openModal"
                    class="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 active:ring-2 active:ring-blue-500 active:ring-offset-2">
                    Register New Program
                </button>
                <button type="button" @click="refresh"
                    class="rounded-md bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 active:ring-2 active:ring-yellow-500 active:ring-offset-2">
                    Refresh Data
                </button>
            </div>
        </div>

        <div class="flex flex-col w-1/2 gap-y-1 items-center mt-6">
            <ProgramCard 
                v-for="item in programListData"
                :programName="item['programName']" 
                :kuliyyah="item['kuliyyah_name']"
                :status="item['approvedStatus']"
                :deleteProgram="() => deleteProgram(item['ID'])"
            />
        </div>

    </div>
    <ClientOnly>
        <HeadlessTransitionRoot appear :show="isOpen" as="template">
            <HeadlessDialog as="div" @close="closeModal" class="relative z-10">
                <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </HeadlessTransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95">
                            <HeadlessDialogPanel
                                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <HeadlessDialogTitle as="h3" class="text-xl font-bold leading-6 text-gray-900">
                                    Add New Program
                                </HeadlessDialogTitle>
                                <div class="mt-4">
                                    <!-- <p class="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent you
                                        an email with all of the details of your order.
                                    </p> -->
                                    <div class="mb-2">
                                        <label for="kuliyyah"
                                            class="block mb-2 text-sm font-medium text-gray-900">Kuliyyah</label>
                                        <select id="kuliyyah"
                                            v-model="kuliyyahID"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Select a kuliyyah" required>
                                            <option v-for="kul in kuliyyahData" :value="kul['kuliyyah_code']">
                                                {{ kul['kuliyyah_name'] }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="mb-2">
                                        <label for="program-name"
                                            class="block mb-2 text-sm font-medium text-gray-900">Program Name</label>
                                        <input type="text" id="program-name"
                                            v-model="programName"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter program name" required>
                                    </div>
                                    <div class="mb-2">
                                        <label for="duration"
                                            class="block mb-2 text-sm font-medium text-gray-900">Duration</label>
                                        <div class="flex w-full items-center gap-x-2">
                                            <input type="number" id="duration"
                                            v-model="duration"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow p-2.5"
                                            placeholder="10" required>
                                            <div class="text-sm">
                                                days
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-2">
                                        <label for="budget"
                                            class="block mb-2 text-sm font-medium text-gray-900">Budget</label>
                                        <input type="number" v-model="budget" id="budget"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="10000" required>
                                    </div>
                                    <div class="mb-2">
                                        <label for="program-date"
                                            class="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                        <input type="date" id="program-date" v-model="programDate"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="John" required>
                                    </div>
                                    <div class="mb-2">
                                        <!-- <vue-date-picker></vue-date-picker> -->
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 w-full text-sm font-medium text-blue-900 hover:bg-blue-200 active:ring-2 active:ring-blue-500 active:ring-offset-2"
                                        @click="registerProgram">
                                        Register Program
                                    </button>
                                </div>
                            </HeadlessDialogPanel>
                        </HeadlessTransitionChild>
                    </div>
                </div>
            </HeadlessDialog>
        </HeadlessTransitionRoot>
    </ClientOnly>
</template>

<script setup>
import { useFetch, useState } from 'nuxt/app';
import { ref } from 'vue'


const kuliyyahID = ref('')
const programName = ref('')
const duration = ref(0)
const budget = ref(0.00)
const programDate = ref(new Date())
const programsArr = useState('programs', () => [])

const { data: kuliyyahData } = await useFetch('/api/kuliyyah')
const { data: programListData, refresh } = await useFetch('/api/program/list')

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

async function deleteProgram(id) {

    useFetch('/api/program/delete', {
        body: {
            programID: id
        },
        method: 'DELETE'
    })
    .then(() => {

        refresh()

    })


}

async function registerProgram() {

    const { data, error } = await useFetch('/api/program/register', {
        body: {
            kuliyyahID: kuliyyahID.value,
            programName: programName.value,
            duration: duration.value,
            budget: budget.value,
            programDate: programDate.value,
        },
        method: 'POST'
    })

    await refresh()
    closeModal()

}
</script>