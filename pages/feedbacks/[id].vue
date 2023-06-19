<template>
    <div class="w-screen flex flex-col items-center p-3 h-screen py-12">

        <div class="flex justify-between items-center w-1/2 py-4">
            <div class="flex gap-x-6 items-center">
                <NuxtLink to="/kuliyyah">
                    <div class="bg-blue-100 py-2 px-5 rounded-3xl text-blue-600 hover:bg-blue-100 transition-colors">
                        Back
                    </div>
                </NuxtLink>
                <h1 class="text-3xl font-bold">
                    Feedbacks for {{ data['programName'] }}
                </h1>
            </div>
        </div>
        <div class="flex flex-col w-1/2 gap-y-1 items-center mt-6">

            <div class="bg-yellow-100 py-4 px-3 rounded-lg w-full text-yellow-700 h-28 flex items-center justify-center font-bold text-lg" v-if="data['status'] === 'PENDING'">
                This program is still waiting an approval from STADD!
            </div>

            <div class="bg-red-100 py-4 px-3 rounded-lg w-full text-red-700 h-28 flex items-center justify-center font-bold text-lg" v-if="data['status'] === 'REJECTED'">
                This program is rejected by STADD.
            </div>

            <div class="bg-slate-100 py-4 px-3 rounded-lg w-full text-slate-700 h-28 flex items-center justify-center font-bold text-lg" v-if="data['feedbacks'].length === 0 && data['status'] === 'APPROVED'">
                This program doesn't have any feedbacks yet!
            </div>

            <FeedbackCard 
                v-for="item in data['feedbacks']"
                :feedback="item['feedback']"
                :matricNumber="item['matricNo']"
                :rating="item['rating']"
                :programName="item['programName']"
                :programDate="item['programDate']"
                :feedbackTime="item['time']"
                :studentName="item['studentName']"
                :emailAddress="item['emailAddress']"
                :kuliyyah_name="item['kuliyyah_name']"
            >
                {{ item['feedback'] }}
            </FeedbackCard>
        </div>
    </div>
</template>

<script setup>

import { useRoute } from 'nuxt/app'

const route = useRoute()

const { data } = await useFetch('/api/feedbacks', {
    body: {
        programID: route.params['id']
    },
    method: 'POST'
});

</script>