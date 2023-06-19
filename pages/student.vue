<template>
    <div class="w-screen flex flex-col items-center p-3 h-screen py-12">

        <div class="flex justify-between items-center w-full py-4 px-8">
            <div class="flex gap-x-6 items-center">
                <NuxtLink to="/">
                    <div class="bg-blue-100 py-2 px-5 rounded-3xl text-blue-600 hover:bg-blue-100 transition-colors">
                        Back
                    </div>
                </NuxtLink>
                <h1 class="text-3xl font-bold">
                    Student Dashboard
                </h1>
            </div>
        </div>

        <div class="flex w-full gap-x-8 px-8">
            <div class="flex flex-col w-1/2 gap-y-1 items-center mt-6">
                <StudentCard v-for="item in programListData" :programName="item['programName']"
                    :kuliyyah="item['kuliyyah_name']" :programID="item['ID']" :click="() => openModal(item['programID'])"
                    :programDuration="item['programDuration']" :date="item['programDate']" :totalStudents="item['totalStudents']" />
            </div>
            <div class="flex flex-col w-1/2 gap-y-1 items-center mt-6">

                <h1 class="text-xl font-bold w-full">
                    Registered Students
                </h1>

                <div class="flex flex-col gap-y-3 w-full">
                    <RegisteredStudentList v-for="item in studentList" :name="item['studentName']"
                        :matricNumber="item['matricNo']" :kuliyyah="item['kuliyyah_name']" :feedbackID="item['feedbackID']"
                        :programName="item['programName']"
                        :programID="item['programID']"
                        :feedbackClick="submitFeedback" />
                </div>

                <div class="text-sm py-6 my-2 flex justify-center rounded-lg bg-slate-100 w-full"
                    v-if="studentList.length === 0">
                    There are no students registered yet!
                </div>
            </div>
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
                                    Student Registration
                                </HeadlessDialogTitle>
                                <div class="mt-4">
                                    <div class="mb-2">
                                        <label for="matric-number"
                                            class="block mb-2 text-sm font-medium text-gray-900">Matric Number</label>
                                        <input type="text" id="matric-number" v-model="matricNumber"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="2111234" required>
                                    </div>
                                    <div class="mb-2">
                                        <label for="full-name" class="block mb-2 text-sm font-medium text-gray-900">Full
                                            Name</label>
                                        <input type="text" id="full-name" v-model="fullName"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Arman bin Nuri" required>

                                    </div>
                                    <div class="mb-2">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email
                                            Address</label>
                                        <input type="email" v-model="emailAddress" id="email"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="arman@iium.edu.my" required>
                                    </div>
                                    <div class="mb-2">
                                        <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900">Phone
                                            Number</label>
                                        <input type="text" v-model="phoneNumber" id="phone-number"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="012 345 6789" required>
                                    </div>
                                    <div class="mb-2">
                                        <label for="kuliyyah"
                                            class="block mb-2 text-sm font-medium text-gray-900">Kuliyyah</label>
                                        <select id="kuliyyah" v-model="kuliyyah"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Select a kuliyyah" required>
                                            <option v-for="kul in kuliyyahData" :value="kul['kuliyyah_code']">
                                                {{ kul['kuliyyah_name'] }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 w-full text-sm font-medium text-blue-900 hover:bg-blue-200 active:ring-2 active:ring-blue-500 active:ring-offset-2"
                                        @click="registerStudent">
                                        Register
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

import { useFetch } from 'nuxt/app'

const { data: programListData, refresh } = await useFetch('/api/student/programs');
const { data: studentList, refresh: studentRefresh, error } = await useFetch('/api/student/list');
const { data: kuliyyahData } = await useFetch('/api/kuliyyah')

console.log(error);

const isOpen = ref(false)

const currentProgramme = ref('')

const matricNumber = ref('')
const fullName = ref('')
const emailAddress = ref('')
const phoneNumber = ref('')
const kuliyyah = ref('')

function closeModal() {
    isOpen.value = false
}
function openModal(programID) {
    isOpen.value = true
    currentProgramme.value = programID
    console.log(programID);
}

async function registerStudent() {

    const { error } = await useFetch('/api/student/register', {
        body: {
            matricNumber: matricNumber.value,
            studentName: fullName.value,
            emailAddress: emailAddress.value,
            phoneNumber: phoneNumber.value,
            kuliyyah: kuliyyah.value,
            programID: currentProgramme.value,
        },
        method: 'POST'
    })

    matricNumber.value = ''
    fullName.value = ''
    emailAddress.value = ''
    phoneNumber.value = ''
    kuliyyah.value = ''

    // console.log(error);
    await refresh()
    await studentRefresh()

    closeModal()

}

async function submitFeedback(matricNumber, rating, feedback, programID) {

    const { error } = await useFetch('/api/student/feedback', {
        body: {
            matricNumber,
            rating,
            feedback,
            programID
        },
        method: 'POST'
    })

    console.log(error)

    await studentRefresh()

}

// async function changeProgramStatus(status, programID) {

//     const { data } = await useFetch('/api/program/update-status', {
//         method: 'POST',
//         body: {
//             status,
//             programID,
//         }
//     })

//     await refresh()

// }

</script>