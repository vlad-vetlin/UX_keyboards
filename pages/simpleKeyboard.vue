<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <simple-keyboard-component @pressSymbol="pressSymbol" :is-ready="isReady"></simple-keyboard-component>
        <output-menu :text="currentActiveText"></output-menu>
    </div>
</template>

<script>
    import SimpleKeyboardComponent from "../components/simpleKeyboard/SimpleKeyboardComponent";
    import OutputMenu from "../components/OutputMenu";
    import {texts} from "../assets/js/texts";
    import {timeEntryMixin} from "../mixins/timeEntryMixin";
    export default {
        name: "SimpleKeyboard",
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
            }
        },
        computed: {
            currentActiveText() {
                return this.texts[this.curTextCount];
            },
        },
        mixins: [timeEntryMixin],
        mounted() {
            this.init();
            this.texts = texts;
        },
        components: {SimpleKeyboardComponent, OutputMenu}
    }
</script>

<style scoped>

</style>
