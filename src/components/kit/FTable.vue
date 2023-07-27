<template>
    <div>
        <div class="table-wrapper hidden md:block">
            <table class="text-left whitespace-nowrap">
                <thead>
                    <tr>
                        <th v-for="(header, index) of headers" :key="index" scope="col" class="px-6 py-4 font-bold text-xs">
                            {{ header.text }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) of items" :key="index" class="border-b border-primary-light">
                        <td v-for="(header, index) of headers" :key="index" class="whitespace-nowrap px-6 py-2 text-sm font-semibold">
                            <slot :name="`item-${ header.field }`" :item="item">
                                {{ item[header.field] }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="grid md:hidden">
            <div
                v-for="(item, index) of items"
                :key="index"
            >
                <slot name="mobile-item" :item="item" :headers="headers" :index="index">
                    <div class="p-4 grid gap-2" :class="{ 'bg-active': index % 2 }">
                        <div
                            v-for="(header, index) of headers"
                            :key="index"
                            class="grid grid-cols-2"
                        >
                            <slot :name="`mobile-item-${ header.field }`" :item="item">
                                <div class="font-bold">{{ header.text }}</div>
                                <div class="text-dark text-right font-semibold">{{ item[header.field] }}</div>
                            </slot>           
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
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
.table-wrapper {
    overflow-x: auto;
}

table {
    width: 100%;
}

table thead {
    position: relative;
    box-shadow: 0px 2px 8px 0px #14172514;
}

table thead tr th:first-child {
    padding-left: 32px;
}

table tbody tr {
    table-layout: fixed;
}

table tbody tr td {
    position: relative;
}

table tbody tr td:first-child {
    left: 8px;
}

table tbody tr td:last-child {
    right: 8px;
}
</style>