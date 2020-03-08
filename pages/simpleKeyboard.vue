<template>
    <div>
        <simple-keyboard-button name="red-test"></simple-keyboard-button>
        <simple-keyboard-button name="green-test" is-focused></simple-keyboard-button>
    </div>
</template>

<script>
    import SimpleKeyboardButton from "../components/SimpleKeyboardButton";
    export default {
        name: "SimpleKeyboard",
        components: {SimpleKeyboardButton}
    }
</script>

<style scoped>

</style>
