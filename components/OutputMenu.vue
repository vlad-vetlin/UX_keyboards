<template>
    <div class="output-menu">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: "OutputMenu",
        props: {
            text: {required: true},
        }
    }
</script>

<style lang="scss" scoped>
    .output-menu {
        border-width: .1em;
        border-color: black;
        border-style: solid;

        width: 98vw;
        height: 5em;

        margin-bottom: 3em;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
