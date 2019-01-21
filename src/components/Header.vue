<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        fixed
        app
        >
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-tooltip right>
                        <v-list-tile slot="activator" avatar to="/">
                            <v-list-tile-avatar>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Name</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span>Click For Edit Profile</span>
                    </v-tooltip>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile to="/dashboard">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon>fas fa-sign-out-alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Daily Activity</v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null
    }),
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style>
</style>
