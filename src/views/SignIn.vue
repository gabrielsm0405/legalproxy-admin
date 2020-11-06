<template>
    <v-container fill-height fluid class="primary">
        <v-card
            class="mx-auto rounded-xl"
        >
            <v-img
                src='../assets/logo.png'
                class="ma-3"
                contain
                max-width="500"
                max-height="200"
            >
            </v-img>
            <v-card-title>Administração</v-card-title>
            <v-form
                ref="form"
                class="ma-10"
                v-model="valid"
                lazy-validation
                @keyup.native.enter="entrar(username, password)"
            >   
                <v-text-field
                    v-model="username"
                    label="Login"
                    outlined
                    :rules="regraNaoVazio"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="Senha"
                    type="password"
                    outlined
                    :rules="regraNaoVazio"
                ></v-text-field>
                <v-row class="ma-5" justify="center">
                    <v-btn
                        color="primary"
                        class="white--text"
                        @click="entrar(username, password)"
                        block
                        :disabled="!valid"
                    >
                        Entrar
                    </v-btn>
                </v-row>
                <v-row class="ma-3" justify="center">
                    <a @click="esqueci_senha">Esqueci minha senha</a>
                </v-row>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>    
    export default {
        data: () => ({
            valid: true,
            regraNaoVazio: [
                v => !!v || 'Campo Obrigatório'
            ],  
            username: '',
            password: ''
        }),
        methods: {
            entrar (username, password) {
                if(this.$refs.form.validate()){
                    this.$store.dispatch('auth/signin', { username, password }).then(() => this.$router.push('/dashboard'))
                }
            },
            esqueci_senha(){
                this.$router.push({ name: 'ForgotPassword'})
            }
        }
    }
</script>