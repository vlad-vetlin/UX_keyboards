<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <nodes-keyboard-component class="nodes-keyboard-component" @pressSymbol="pressSymbol"></nodes-keyboard-component>
        <output-menu :text="texts[curTextCount]"></output-menu>
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
                curTextCount: 1,
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

<style lang="scss" scoped>
    .nodes-keyboard-component {
        margin-bottom: 3em;
    }
</style>
