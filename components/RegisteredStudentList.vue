<template>
    <div class="bg-blue-100 w-full flex py-4 px-4 items-center rounded-lg">
        <div class="flex flex-col grow">
            <div class="flex w-full gap-x-4">
                <img src="/person-placeholder.png" class="w-8 rounded-full" alt="user picture"
                    style="width: 32px; height: 32px; object-fit: cover;" />
                <p class="text-lg">
                    {{ name }} ({{ matricNumber }})
                </p>
            </div>
            <p class="w-full flex h-full items-center mt-4 text-sm">
                Joined {{ programName }}
            </p>
            <p class="w-full flex h-full items-center text-sm">
                {{ kuliyyah }}
            </p>
        </div>
        <div>
            <button type="button"
                :disabled="feedbackID !== null"
                class="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 w-full text-sm font-medium text-yellow-900 hover:bg-yellow-200 active:ring-2 active:ring-yellow-500 active:ring-offset-2 disabled:bg-gray-200 disabled:text-gray-400"
                @click="openModal">
                {{ feedbackID === null ? 'Feedback' : 'Feedback Submitted' }}
            </button>
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
                                    Student Feedback
                                </HeadlessDialogTitle>
                                <div class="mt-4">
                                    <div class="mb-2">
                                        <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900">Rating</label>
                                        <div class="flex justify-center">
                                            <div class="flex items-center mr-4">
                                                <input id="inline-radio" type="radio" v-model="rating" value="1" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  ">
                                                <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 ">1</label>
                                            </div>
                                            <div class="flex items-center mr-4">
                                                <input id="inline-2-radio" type="radio" v-model="rating" value="2" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  ">
                                                <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 ">2</label>
                                            </div>
                                            <div class="flex items-center mr-4">
                                                <input id="inline-radio" type="radio" v-model="rating" value="3" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  ">
                                                <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 ">3</label>
                                            </div>
                                            <div class="flex items-center mr-4">
                                                <input id="inline-2-radio" type="radio" v-model="rating" value="4" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  ">
                                                <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 ">4</label>
                                            </div>
                                            <div class="flex items-center mr-4">
                                                <input id="inline-radio" type="radio" v-model="rating" value="5" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  ">
                                                <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 ">5</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-2">
                                        <label for="full-name" class="block mb-2 text-sm font-medium text-gray-900">Comment</label>
                                        <textarea type="text" id="full-name" v-model="comment"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Your comments here..." rows="5" required>
                                        </textarea>

                                    </div>
                                </div>

                                <div class="mt-4">
                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 w-full text-sm font-medium text-blue-900 hover:bg-blue-200 active:ring-2 active:ring-blue-500 active:ring-offset-2"
                                        @click="async () => {
                                            const { comment, rating } = getUserValue();
                                            await feedbackClick(matricNumber, rating, comment, programID);
                                            closeModal()
                                        }">
                                        Submit Feedback
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

const comment = ref('')
const rating = ref('')

defineProps(['name',
    'matricNumber',
    'kuliyyah',
    'feedbackID',
    'feedbackClick',
    'programName',
    'programID'
]);

const isOpen = ref(false)
function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

const getUserValue = () => {
    return {
        comment: comment.value,
        rating: rating.value
    }
}

</script>