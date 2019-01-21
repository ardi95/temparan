<template>
    <div>
        <v-app id="inspire">
            <router-view name="header"></router-view>
            <v-content>
                <transition
                    enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut"
                    mode="out-in"
                >
                    <router-view></router-view>
                </transition>
            </v-content>
            <router-view name="footer"></router-view>
        </v-app>
    </div>
</template>

<script>

export default {
    created() {
        this.$store.dispatch('tryAutoLogin')
    }
}
</script>

<style scoped>

</style>
