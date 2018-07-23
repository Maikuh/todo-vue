<template>
    <div>
        <label>
            <input type="checkbox" :checked="!anyRemaining" @change="allChecked"> <span> Check All</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'todo-check-all',
    computed: {
        anyRemaining() {
            return this.$store.getters.anyRemaining
        }
    },
    methods: {
        allChecked(e) {
            this.$store.dispatch('checkAll', e.target.checked)
        }
    }
}
</script>

<style lang="scss" scoped>
label {
    vertical-align: middle;
    line-height: 2;
}

input[type="checkbox"] {
        display: none;

        + span::before {
            content: 'check_box_outline_blank';
            font-family: 'Material Icons';
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            width: 1em;
            color: gray;
            vertical-align: bottom;
            line-height: 2;
            display: inline-block;
            animation: popOut .2s ease-in-out;
        }

        &:checked + span::before {
            content: "check_box";
            color: rgb(19, 121, 255);
            animation: popIn .13s ease-in-out;
        }
    }

    @keyframes popIn {
        0% {transform: scale(0)}
        90% {transform: scale(1.2)}
        100% {transform: scale(1)}
    }

    @keyframes popOut {
        0% {
            transform: scale(1); 
            content: "check_box";
            color: rgb(19, 121, 255);
        }
        90% {
            transform: scale(1.2);
            content: "check_box";
            color: rgb(19, 121, 255);
        }
        100% {
            transform: scale(0);
            opacity: .1;
        }
    }
</style>
