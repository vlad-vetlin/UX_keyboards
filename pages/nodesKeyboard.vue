<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <nodes-keyboard-component @pressSymbol="pressSymbol"></nodes-keyboard-component>
    </div>
</template>

<script>
    import NodesKeyboardComponent from "../components/nodesKeyboard/NodesKeyboardComponent";
    import OutputMenu from "../components/OutputMenu";
    import {texts} from "../assets/js/texts";

    export default {
        name: "NodesKeyboard",
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
        components: {
            NodesKeyboardComponent, OutputMenu
        },
        mounted() {
            this.texts = texts;
        }
    }
</script>

<style scoped>

</style>
