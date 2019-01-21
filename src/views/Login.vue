<template>
    <v-container fill-height>
        <v-layout
        justify-center
        align-center
        >
            <v-flex lg6>
                <v-alert
                    v-model="errorResult"
                    type="error"
                    dismissible
                    outline
                >
                    {{ errorMessage }}
                </v-alert>
                <v-card>
                    <form class="form-login" @submit.prevent="login">
                        <h3 class="display-2 font-weight-thin header-login">Login</h3>
                        <v-text-field
                        v-model="username"
                        label="Username"
                        :error-messages="usernameErrors"
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                        required
                        prepend-icon="person"></v-text-field>

                        <v-text-field
                        v-model="password"
                        :append-icon="fieldPassword ? 'visibility' : 'visibility_off'"
                        :type="fieldPassword ? 'text' : 'password'"
                        label="Password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        @click:append="fieldPassword = !fieldPassword"
                        prepend-icon="lock"
                        ></v-text-field>

                        <div class="text-xs-right">
                            <v-btn type="submit" round outline color="primary" :disabled="$v.$invalid">Login</v-btn>
                        </div>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            username: '',
            password: '',
            fieldPassword: false,
            alert: true
        }
    },
    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Username is required')
            !this.$v.username.email && errors.push('Must format email')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            !this.$v.password.minLen && errors.push('minimum of 6 characters')
            return errors
        },
        errorResult: {
            get() {
                return this.$store.getters.errorResult
            },
            set(v) {
                if (!v) {
                    this.$store.dispatch('closeError')
                }
            }
        },
        errorMessage() {
            return this.$store.getters.errorMessage
        }
    },
    methods: {
        login() {
            // this.$router.push('/dashboard')
            var data = {
                username: this.username,
                password: this.password
            }
            // console.log(data);
            this.$store.dispatch('login', data)
        }
    },
    validations: {
        username: {
            required,
            email
        },
        password: {
            required,
            minLen: minLength(6)
        }
    }
}
</script>

<style scoped>
.form-login {
    padding: 35px;
}

.header-login {
    margin-bottom: 20px;
}
</style>
