<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <simple-keyboard-component @pressSymbol="pressSymbol"></simple-keyboard-component>
    </div>
</template>

<script>
    import SimpleKeyboardComponent from "../components/simpleKeyboard/SimpleKeyboardComponent";
    import OutputMenu from "../components/OutputMenu";
    import {texts} from "../assets/js/texts";
    export default {
        name: "SimpleKeyboard",
        data() {
            return {
                curString: '',
                texts: '',
            }
        },
        methods: {
            pressSymbol(symbol) {
                this.curString = this.curString.concat(symbol);
            }
        },
        mounted() {
            this.texts = texts;
        },
        components: {SimpleKeyboardComponent, OutputMenu}
    }
</script>

<style scoped>

</style>
