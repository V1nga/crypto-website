<template>
    <table class="min-w-full text-left">
        <thead>
            <tr class="mx-2">
                <th v-for="(header, index) of headers" :key="index" scope="col" class="px-6 py-4 font-bold text-sm">
                    {{ header.text }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) of items" :key="index" class="border-b border-primary-light">
                <td v-for="(header, index) of headers" :key="index" class="whitespace-nowrap px-6 py-4 font-semibold">
                    <slot :name="`item-${header.field}`" :item="item">
                        {{ item[header.field] }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
const props = defineProps({
    headers: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
});
</script>
<style scoped>
table thead {
    display: block;
    position: relative;
    box-shadow: 0px 2px 8px 0px #14172514;
}
    
table tr {
    display: table;
    table-layout: fixed;
    width: 100%;
}

table tr td {
    position: relative;
}

table tr td:first-child {
    left: 8px;
}

table tr td:last-child {
    right: 8px;
}
</style>