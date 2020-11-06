<template>
    <v-container fluid>
        <v-row v-if="editing">
            <v-switch
                v-model="change_password"
                inset
                label="Alterar senha"
            ></v-switch>
        </v-row>
        <v-row>
            <v-col :sm="editing ? '4': '6'" cols="12">
                <v-menu top offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            v-model="password"
                            :label="editing ? 'Nova senha' : 'Senha'"
                            outlined
                            required
                            :rules="[ check_password ]"
                            :type="showPassword ? 'text' : 'password'"
                            :v-bind="attrs"
                            v-on="on"
                            @click:append="showPassword = !showPassword"
                            :disabled="!change_password && editing"
                        ></v-text-field>
                    </template>
                    <v-card outlined class="pa-2">
                        <v-card-title>A senha deve conter pelo menos: </v-card-title>
                        <v-card-text>
                            <v-row align="center">
                                <v-icon v-if="password.length < 8" class="mr-2" color="red" small>fa fa-exclamation-triangle</v-icon>
                                <v-icon v-if="password.length >= 8" class="mr-2" color="green" small>fa fa-check-circle</v-icon>
                                8 caracteres
                            </v-row>
                            <v-row align="center">
                                <v-icon v-if="!lcaseFlag" class="mr-2" color="red" small>fa fa-exclamation-triangle</v-icon>
                                <v-icon v-if="lcaseFlag" class="mr-2" color="green" small>fa fa-check-circle</v-icon>
                                Letra Minúscula
                            </v-row>
                            <v-row align="center">
                                <v-icon v-if="!ucaseFlag" class="mr-2" color="red" small>fa fa-exclamation-triangle</v-icon>
                                <v-icon v-if="ucaseFlag" class="mr-2" color="green" small>fa fa-check-circle</v-icon>
                                Letra Maiúscula
                            </v-row>
                            <v-row align="center">
                                <v-icon v-if="!digitsFlag" class="mr-2" color="red" small>fa fa-exclamation-triangle</v-icon>
                                <v-icon v-if="digitsFlag" class="mr-2" color="green" small>fa fa-check-circle</v-icon>
                                Dígito
                            </v-row>
                            <v-row align="center">
                                <v-icon v-if="!splCharsFlag" class="mr-2" color="red" small>fa fa-exclamation-triangle</v-icon>
                                <v-icon v-if="splCharsFlag" class="mr-2" color="green" small>fa fa-check-circle</v-icon>
                                Caracter Especial: !@#$%&*()
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-col>
            <v-col :sm="editing ? '4': '6'" cols="12">
                <v-text-field
                    :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="confirmation_password"
                    :label="editing ? 'Confirmação de nova senha' : 'Confirmação de senha'"
                    outlined
                    required
                    :rules="[ confirm_password ]"
                    :type="showConfirmationPassword ? 'text' : 'password'"
                    @click:append="showConfirmationPassword = !showConfirmationPassword"
                    :disabled="!change_password && editing"
                ></v-text-field>
            </v-col>
            <v-col v-if="editing" :sm="editing ? '4': '6'" cols="12">
                <v-text-field
                    :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="current_password"
                    label="Senha atual"
                    outlined
                    required
                    :rules="[ current_password_rule ]"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    @click:append="showCurrentPassword = !showCurrentPassword"
                    :disabled="!change_password && editing"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        showPassword: false,
        password: '',
        ucaseFlag: false,
        lcaseFlag: false,
        digitsFlag: false,
        splCharsFlag: false,
        showConfirmationPassword: false,
        confirmation_password: '',
        change_password: false,
        showCurrentPassword: false,
        current_password: ''
    }),
    props: {
        editing: Boolean
    },
    watch: {
        password(){
            this.$emit('password_update', this.password)
        },
        current_password(){
            this.$emit('current_password_update', this.current_password)
        },
        change_password(){
            if(!this.change_password){
                this.password = ''
                this.confirmation_password = ''
                this.current_password = ''
            }
        }
    },
    methods: {
        check_password(password){
            var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            var lowercase = "abcdefghijklmnopqrstuvwxyz"
            var digits = "0123456789"
            var splChars ="!@#$%&*()"

            this.ucaseFlag = this.contains(password, uppercase)
            this.lcaseFlag = this.contains(password, lowercase)
            this.digitsFlag = this.contains(password, digits)
            this.splCharsFlag = this.contains(password, splChars)

            if(password.length == 0){
                if(this.editing) {
                    if(this.change_password) return 'Campo obrigatório'
                    else return true
                }
                else return 'Campo obrigatório'
            }

            if(password.length>=8 && this.ucaseFlag && this.lcaseFlag && this.digitsFlag && this.splCharsFlag)
                return true
            else
                return 'Senha fraca'
        },
        contains(password, allowedChars) {
            for (var i = 0; i < password.length; i++) {
                var char = password.charAt(i);
                if (allowedChars.indexOf(char) >= 0) { return true }
            }
            return false;
        },
        confirm_password(confirmation_password) {
            if(confirmation_password == '' && !this.editing){
                return 'Campo Obrigatório'
            }
            else if(confirmation_password != this.password){
                return 'As senhas devem ser iguais'
            }
            else{
                return true
            }
        },
        current_password_rule(current_password){
            if(current_password == '' && this.change_password){
                return 'Campo Obrigatório'
            }
            else{
                return true
            }
        }
    }
}
</script>