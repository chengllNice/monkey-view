<template>
    <div class="dev-time">
        <Time :time="baseTime" format="yyyy-MM hh:mm"></Time>
        <br>
        <Time :time="baseTime" type="date"></Time>
        <br>
        <Time :time="baseTime" type="datetime"></Time>
    </div>
</template>

<script>
    export default {
        data() {
            const nowDate = new Date();
            const yesterDate = new Date();
            yesterDate.setDate(nowDate.getDate() - 1);
            return {
                baseTime: nowDate.getTime() + 4 * 60 * 60 * 1000
            }
        }
    }
</script>
