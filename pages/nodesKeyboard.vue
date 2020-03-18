<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <nodes-keyboard-component @pressSymbol="pressSymbol"></nodes-keyboard-component>
    </div>
</template>

<script>
    import NodesKeyboardComponent from "../components/nodesKeyboard/NodesKeyboardComponent";
    import OutputMenu from "../components/OutputMenu";

    export default {
        name: "NodesKeyboard",
        data() {
            return {
                curString: '',
            }
        },
        methods: {
            pressSymbol(symbol) {
                console.log('lalka');
                this.curString = this.curString.concat(symbol);
            }
        },
        components: {
            NodesKeyboardComponent, OutputMenu
        }
    }
</script>

<style scoped>

</style>
