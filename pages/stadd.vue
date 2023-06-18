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
                    IIUM STADD Dashboard
                </h1>
            </div>
        </div>

        <div class="flex flex-col w-1/2 gap-y-1 items-center mt-6">
            <STADDCard 
                v-for="item in programListData" 
                :programName="item['programName']" 
                :kuliyyah="item['kuliyyah_name']"
                :status="item['approvedStatus']" 
                :deleteProgram="() => deleteProgram(item['ID'])" 
                :programID="item['programID']"
                :onStatusChange="changeProgramStatus"
            />
        </div>

    </div>
</template>

<script setup>

const { data: programListData, refresh } = await useFetch('/api/program/list');

async function changeProgramStatus(status, programID) {

    const { data } = await useFetch('/api/program/update-status', {
        method: 'POST',
        body: {
            status,
            programID,
        }
    })

    await refresh()

}

</script>