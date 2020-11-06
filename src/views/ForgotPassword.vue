<template>
    <v-container fill-height fluid class="primary">
        <v-card
            class="mx-auto pa-10 rounded-xl"
        >
            <v-img
                src='../assets/logo.png'
                class="ma-3"
                contain
                max-width="500"
                max-height="200"
            >
            </v-img>
                <v-card-title class="headline">Esqueci a senha</v-card-title>
                <v-form
                    ref="form"
                    class="ma-3"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="email"
                        label="Email"
                        outlined
                        :rules="regraEmail"
                    ></v-text-field>

                    <v-row class="ma-1" justify="center">
                        <v-btn
                            color="primary"
                            class="white--text"
                            @click="confirmar"
                            block
                            :disabled="!valid"
                        >
                            Confirmar
                        </v-btn>
                    </v-row>

                    <v-row class="ma-5" justify="center" v-if=" emailEnviado == true" >
                        <v-alert type="success">
                            Email Enviado
                        </v-alert>
                    </v-row>
                </v-form>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            email: '',
            regraEmail: [
                v => !!v || 'Campo necessário',
                v => /.+@.+\..+/.test(v) || 'E-mail inválido',
            ],
            emailEnviado: false
        }),
        methods: {
            confirmar(){
                if(this.$refs.form.validate()){
                    this.emailEnviado = true
                }
            }
        }
    }
</script>