<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row>
            <v-col sm="4" cols="12">
                <v-text-field
                    v-model="form_data.first_name"
                    label="Nome"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
            <v-col sm="4" cols="12">
                <v-text-field
                    v-model="form_data.last_name"
                    label="Sobrenome"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
            <v-col sm="2" cols="12">
                <v-text-field
                    v-model="form_data.cpf"
                    label="CPF"
                    outlined
                    required
                    :rules="[ check_cpf ]"
                    @input="format_cpf"
                    :disabled="editing"
                ></v-text-field>
            </v-col>
            <v-col sm="2" cols="12">
                <v-select
                    v-model="form_data.gender"
                    :items="genders"
                    label="Sexo"
                    outlined
                    :rules="non_empty_rule"
                    :style="{width: '350px'}"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col sm="4" cols="12">
                <v-text-field
                    v-model="form_data.email"
                    label="Email"
                    outlined
                    required
                    :rules="email_rule"
                    :disabled="editing"
                ></v-text-field>
            </v-col>

            <v-col sm="3" cols="12">
                <v-text-field
                    v-model="dateFormatted"
                    label="Data de Nascimento"
                    outlined
                    required
                    @input="format_date"
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>

            <v-col sm="3" cols="12">
                <v-text-field
                    v-model="form_data.phone_number"
                    label="Telefone"
                    outlined
                    required
                    :rules="non_empty_rule"
                    @input="format_phone_number"
                ></v-text-field>
            </v-col>

            <v-col sm="2" cols="12">
                <v-checkbox
                    v-model="form_data.is_whatsapp"
                    label="Whatsapp"
                    outlined
                >
                </v-checkbox>
            </v-col>
            
        </v-row>

        <v-row>
            <v-col sm="3" cols="12">
                <v-text-field
                    v-model="form_data.postal_code"
                    label="CEP"
                    outlined
                    required
                    :rules="non_empty_rule"
                    @change="autocomplete"
                    @input="format_postal_code"
                ></v-text-field>
            </v-col>
            <v-col sm="5" cols="12">
                <v-text-field
                    v-model="form_data.adress_street"
                    label="Logradouro"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="form_data.adress_number"
                    label="Número"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col sm="8" cols="12">
                <v-text-field
                    v-model="form_data.adress_complement"
                    label="Complemento"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="form_data.adress_district"
                    label="Bairro"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col sm="6" cols="12">
                <v-text-field
                    v-model="form_data.city"
                    label="Cidade"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="form_data.state"
                    label="UF"
                    outlined
                    required
                    :rules="non_empty_rule"
                ></v-text-field>
            </v-col>
        </v-row>

        <PasswordForm 
            v-if="!admin"
            :editing="editing" 
            v-on:password_update="password_update"
            v-on:current_password_update="current_password_update"
        ></PasswordForm>
    </v-form>
</template>

<script>
import PasswordForm from './PasswordForm'
import { mapActions, mapState } from "vuex"

    export default {
        data: () => ({
            valid: true,
            form_data:{
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                cpf: '',
                postal_code: '',
                adress_street: '',
                adress_number: '',
                adress_complement: '',
                adress_district: '',
                city: '',
                state: '',
                birth_date: '',
                is_whatsapp: false,
                gender: ''
            },
            dateFormatted: '',
            password: '',
            current_password: '',
            genders: [
                'Masculino',
                'Feminino',
                'Não desejo informar'
            ],
            non_empty_rule: [
                v => !!v || 'Campo Obrigatório'
            ],
            email_rule: [
                v => !!v || 'Campo Obrigatório',
                v => /.+@.+\..+/.test(v) || 'E-mail inválido',
            ],
        }),
        components: {
            PasswordForm
        },
        props: {
            input_form_data: Object,
            editing: Boolean,
            admin: Boolean
        },
        computed: {
            phone_number() {
                return this.form_data.phone_number
            },
            cpf() {
                return this.form_data.cpf
            },
            postal_code() {
                return this.form_data.postal_code
            },
            ...mapState('address', ['address_street', 'address_district', 'city', 'state']),
        },
        watch: {
            input_form_data(){
                this.update_form_data()
            },
            phone_number() {
                this.format_phone_number()
            },
            cpf() {
                this.format_cpf()
            },
            postal_code() {
                this.format_postal_code()
            },
            address_street(){
                this.form_data.adress_street = this.address_street
            },
            address_district(){
                this.form_data.adress_district = this.address_district
            },
            city(){
                this.form_data.city = this.city
            },
            state(){
                this.form_data.state = this.state
            },
            valid(){
                this.$emit('change_validation', this.valid)
            },
            form_data(){
                this.$emit('change_form_data', this.form_data)
            },
            password(){
                this.$emit('change_password', this.password)
            },
            current_password(){
                this.$emit('change_current_password', this.current_password)
            }
        },
        mounted(){
            this.update_form_data()
        },
        methods: {
            ...mapActions("address", ["get_address"]),
            update_form_data(){
                if(this.input_form_data != null){
                    this.form_data = {...this.input_form_data}

                    if(this.input_form_data.birth_date != ""){
                        const [year, month, day] = this.form_data.birth_date.split('-')
                        this.dateFormatted = `${day}/${month}/${year}`
                    }
                }
            },
            validate(){
                return this.$refs.form.validate()
            },
            autocomplete(){
                if(!this.editing){
                    var postal_code = this.form_data.postal_code.replace(/[^0-9]/, "");

                    if(postal_code.length != 8){
                        return false;
                    }

                    this.get_address(postal_code)

                    return true
                }
                else{
                    return false
                }
            },
            check_cpf(cpf) {
                var sum = 0
                var rest

                if(cpf == "") return 'Campo Obrigatório'

                cpf = cpf.replace(/\D/g, '')

                if (/^(.)\1+$/.test(cpf)) return 'CPF Inválido'

                for (var i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
                rest = (sum * 10) % 11;

                if ((rest == 10) || (rest == 11))  rest = 0;
                if (rest != parseInt(cpf.substring(9, 10)) ) return 'CPF Inválido';

                sum = 0;
                for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
                rest = (sum * 10) % 11;

                if ((rest == 10) || (rest == 11))  rest = 0;
                if (rest != parseInt(cpf.substring(10, 11) ) ) return 'CPF Inválido';
                
                return true;
            },
            format_phone_number() {
                var phone_number_length = this.form_data.phone_number.replace(/\D/g, '').length
                var first_number = this.form_data.phone_number.replace(/\D/g, '')[0]
                var four_first_numbers = this.form_data.phone_number.replace(/\D/g, '').slice(0, 4)
                var x
                
                if(four_first_numbers == '0800'){
                    x = this.form_data.phone_number.replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,3})/)
                    this.form_data.phone_number = !x[2] ? x[1] : x[1] + ' ' + x[2] + ' ' + x[3]
                }
                else if ((phone_number_length <= 10)){
                    x = this.form_data.phone_number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/)
                    this.form_data.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
                }
                else if (phone_number_length <= 11 && first_number == '0'){
                    x = this.form_data.phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
                    this.form_data.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
                }
                else if(phone_number_length <= 11){
                    x = this.form_data.phone_number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/)
                    this.form_data.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + ' ' + x[3] + (x[4] ? '-' + x[4] : '')
                }
                else if (phone_number_length <= 12 && first_number == '0'){
                    x = this.form_data.phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,1})(\d{0,4})(\d{0,4})/)
                    this.form_data.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + ' ' + x[3] + (x[4] ? '-' + x[4] : '')
                }
            },
            format_date(){
                var x = this.dateFormatted.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/)
                this.dateFormatted = !x[2] ? x[1] : x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '')

                const [day, month, year] = this.dateFormatted.split('/')
                this.form_data.birth_date = `${year}-${month}-${day}`
            },
            format_cpf(){
                var x = this.form_data.cpf.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)
                this.form_data.cpf = !x[2] ? x[1] : x[1] + (x[2] ? '.' + x[2] : '') + (x[3] ? '.' + x[3] : '') + (x[4] ? '-' + x[4] : '')
            },
            format_postal_code(){
                var x = this.form_data.postal_code.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/)
                this.form_data.postal_code = !x[2] ? x[1] : x[1] + (x[2] ? '-' + x[2] : '')
            },
            password_update(password){
                this.password = password
            },
            current_password_update(current_password){
                this.current_password = current_password
            }
        }
    }
</script>