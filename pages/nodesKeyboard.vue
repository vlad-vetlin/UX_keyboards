<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <nodes-keyboard-component class="nodes-keyboard-component" @pressSymbol="pressSymbol" :isReady="isReady"></nodes-keyboard-component>
        <output-menu :text="currentActiveText"></output-menu>
    </div>
</template>

<script>
    import NodesKeyboardComponent from "../components/nodesKeyboard/NodesKeyboardComponent";
    import OutputMenu from "../components/OutputMenu";
    import {timeEntryMixin} from "../mixins/timeEntryMixin";
    import {texts} from "../assets/js/texts";


    export default {
        name: "NodesKeyboard",
        data() {
            return {
                curString: '',
                texts: '',
                curTextCount: 0,
            }
        },
        methods: {
            pressSymbol(symbol) {
                this.curString = this.curString.concat(symbol);
            },
        },
        computed: {
            currentActiveText() {
                return this.texts[this.curTextCount];
            },
        },
        mixins: [timeEntryMixin],
        components: {
            NodesKeyboardComponent, OutputMenu
        },
        mounted() {
            this.init();
            this.texts = texts;
        }
    }
</script>

<style lang="scss" scoped>
    .nodes-keyboard-component {
        margin-bottom: 3em;
    }
</style>
