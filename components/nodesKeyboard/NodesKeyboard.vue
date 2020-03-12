<template>
    <div>
        <div>
            <node></node>
            <node></node>
            <node></node>
        </div>
        <div>
            <node></node>
            <node></node>
            <node></node>
            <node></node>
        </div>
        <div>
            <node></node>
            <node></node>
            <node></node>
        </div>
    </div>
</template>

<script>
    import Node from "../Node";
    export default {
        name: "NodesKeyboard",
        components: {Node},
        data() {
            return {
                buttons: [
                    ['о', 'a', 'e', ' '], // центр
                    ['и', 'п', 'с', 'я'], // верх
                    ['л', 'м', 'н', 'ы'], // прав
                    ['у', 'ь', 'в', 'т'], // низ
                    ['д', 'з', 'к', 'р'], // лево
                    ['0', '1', '2', '3'], // право верх
                    ['4', '5', '6', '7'], // лево верх
                    ['ё', 'ц', 'ь', '9'], // лево низ
                    ['г', 'ш', 'э', '8'], // право низ
                    ['й', 'х', 'ч', 'щ'], // самый правый
                    ['б', 'ж', 'ф', 'ю']  // самый левый
                ]
            }
        }
    }
</script>

<style scoped>

</style>
