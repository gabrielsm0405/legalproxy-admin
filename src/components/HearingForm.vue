<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row class="ml-2 mr-2">
            <v-col sm="6" cols="12">
                <v-select
                    v-model="hearingType"
                    :items="itemsHearingTypes"
                    label="Tipo de Audiência"
                    outlined
                    :rules="regraNaoVazio"
                ></v-select>
            </v-col>
            <v-col sm="6" cols="12">
                <v-select
                    v-model="company"
                    :items="itemsCompanies"
                    label="Empresa"
                    outlined
                    :rules="regraNaoVazio"
                ></v-select>
            </v-col>
        </v-row>

        <v-row class="ml-5 mr-5">
            <v-select
                v-model="esfera"
                :items="itemsEsferas"
                label="Esfera"
                outlined
                :rules="regraNaoVazio"
                @change="get_tribunais(esferas.find(element => element.name==esfera).id)"
            ></v-select>
        </v-row>
        <v-row class="ml-5 mr-5">
            <v-select
                v-model="tribunal"
                :items="itemsTribunais"
                label="Tribunal"
                outlined
                :rules="regraNaoVazio"
                @change="get_comarcas(tribunais.find(element => element.name==tribunal).id)"
                :disabled="itemsTribunais.length == 0"
            ></v-select>
        </v-row>
        <v-row class="ml-5 mr-5">
            <v-select
                v-model="comarca"
                :items="itemsComarcas"
                label="Comarca"
                outlined
                :rules="regraNaoVazio"
                @change="get_foros(comarcas.find(element => element.name==comarca).id)"
                :disabled="itemsComarcas.length == 0"
            ></v-select>
        </v-row>
        <v-row class="ml-5 mr-5">
            <v-select
                v-model="foro"
                :items="itemsForos"
                label="Foro"
                outlined
                :rules="regraNaoVazio"
                @change="get_varas(foros.find(element => element.name==foro).id)"
                :disabled="itemsForos.length == 0"
            ></v-select>
        </v-row>

        <v-row class="ml-2 mr-2">
            <v-col sm="8" cols="12">
                <v-select
                    v-model="vara"
                    :items="itemsVaras"
                    label="Vara"
                    outlined
                    :rules="regraNaoVazio"
                    :disabled="itemsVaras.length == 0"
                ></v-select>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="npu"
                    label="NPU"
                    outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="ml-2 mr-2">
            <v-col sm="3" cols="12">
                <v-text-field
                    v-model="postal_code"
                    label="CEP"
                    outlined
                    required
                    :rules="regraNaoVazio"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col sm="5" cols="12">
                <v-text-field
                    v-model="hearing_address_street"
                    label="Logradouro"
                    outlined
                    required
                    :rules="regraNaoVazio"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="address_number"
                    label="Número"
                    outlined
                    required
                    :rules="regraNaoVazio"
                    disabled
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="ml-2 mr-2">
            <v-col sm="8" cols="12">
                <v-text-field
                    v-model="address_complement"
                    label="Complemento"
                    outlined
                    disabled
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="hearing_address_district"
                    label="Bairro"
                    outlined
                    required
                    :rules="regraNaoVazio"
                    disabled
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="ml-2 mr-2">
            <v-col sm="6" cols="12">
                <v-text-field
                    v-model="hearing_city"
                    label="Cidade"
                    outlined
                    required
                    :rules="regraNaoVazio"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="hearing_state"
                    label="UF"
                    outlined
                    required
                    :rules="regraNaoVazio"
                    disabled
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="ml-6 mr-6">
            <v-switch
                v-model="online"
                inset
                label="Online"
            ></v-switch>
            <v-text-field
                class="ml-2"
                v-model="link"
                label="Link da vídeo conferência"
                outlined
                required
                :rules="[ link_rule ]"
                :disabled="!online"
            ></v-text-field>
        </v-row>

        <v-row class="ml-2 mr-2">
            <v-col sm="6" cols="12">
                <DatePicker 
                    :type="'day month year'" 
                    label="Data da Audiência"
                    :input_date="date"
                    v-on:change_date="change_date"
                ></DatePicker>
            </v-col>
            <v-col sm="6" cols="12">
                <v-menu
                    ref="menu_time"
                    v-model="menuTime"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="time"
                            label="Horário da Audiência"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="regraNaoVazio"
                            outlined
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuTime"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu_time.save(time)"
                        format="24hr"
                    ></v-time-picker>
                </v-menu>
            </v-col>
        </v-row>
        <v-row class="ml-5 mr-5">
            <v-textarea
                outlined
                label="Resumo"
                v-model="summary"
                :rules="regraNaoVazio"
            ></v-textarea>
        </v-row>

        <v-row justify="center">
            <v-btn
                color="primary"
                class="white--text ma-2"
                @click="emit_data_form"
                :disabled="!valid"
            >
                Salvar
            </v-btn>
        </v-row>
    </v-form>
</template>

<script>
import DatePicker from '../components/DatePicker'
import { mapActions, mapState } from 'vuex';

export default {
    data: () => ({
        valid: true,
        itemsHearingTypes: [],
        itemsCompanies: [],
        itemsEsferas: [],
        itemsTribunais: [],
        itemsComarcas: [],
        itemsForos: [],
        itemsVaras: [],
        hearingType: '',
        company: '',
        esfera: '',
        tribunal: '',
        comarca: '',
        foro: '',
        vara: '',
        postal_code: '',
        hearing_address_street: '',
        address_number: '',
        address_complement: '',
        hearing_address_district: '',
        hearing_city: '',
        hearing_state: '',
        summary: '',
        date: '',
        time: '',
        npu: '',
        regraNaoVazio: [
            v => !!v || 'Campo Obrigatório'
        ],
        menuTime: false,
        form_filled: false,
        online: false,
        link: ''
    }),
    props: {
        edit_data: Object
    },
    computed: {
        ...mapState('hearings', ['hearing_types', 'esferas', 'tribunais', 'comarcas', 'foros', 'varas']),
        ...mapState('companies', ['companies_short']),
        ...mapState('address', ['address_street', 'address_district', 'city', 'state']),
    },
    components: {
        DatePicker
    },
    mounted() {
        this.get_esferas()
        this.get_hearing_types()
        this.get_companies_short()

        if(this.edit_data != null){
            this.init_hearing()
        }
    },
    watch: {
        edit_data(){
            if(this.edit_data != null){
                this.get_esferas()
                this.get_hearing_types()
                this.get_companies_short()

                this.init_hearing()

                this.form_filled = false
            }
        },
        hearing_types(){
            this.hearing_types.forEach(hearingType => {
                this.itemsHearingTypes.push(hearingType.name)
            })
        },
        companies_short(){
            this.companies_short.forEach(company => {
                this.itemsCompanies.push(company.name)
            })
        },
        esferas(){
            this.esferas.forEach(esfera => {
                this.itemsEsferas.push(esfera.name)
            });

            if(this.edit_data != null && !this.form_filled){
                this.get_tribunais(this.esferas.find(element => element.name==this.esfera).id)
            }
        },
        tribunais(){
            this.itemsTribunais = []
            this.tribunal = ''
            this.itemsComarcas = []
            this.comarca = ''
            this.itemsForos = []
            this.foro = ''
            this.itemsVaras = []
            this.vara = ''
            this.clearAddress()

            this.tribunais.forEach(tribunal => {
                this.itemsTribunais.push(tribunal.name)
            });

            if(this.edit_data != null && !this.form_filled){
                this.tribunal = this.edit_data.tribunal
                this.get_comarcas(this.tribunais.find(element => element.name==this.tribunal).id)
            }
        },
        comarcas(){
            this.itemsComarcas = []
            this.comarca = ''
            this.itemsForos = []
            this.foro = ''
            this.itemsVaras = []
            this.vara = ''
            this.clearAddress()

            this.comarcas.forEach(comarca => {
                this.itemsComarcas.push(comarca.name)
            });

            if(this.edit_data != null && !this.form_filled){
                this.comarca = this.edit_data.comarca
                this.get_foros(this.comarcas.find(element => element.name==this.comarca).id)
            }
        },
        foros(){
            this.itemsForos = []
            this.foro = ''
            this.itemsVaras = []
            this.vara = ''
            this.clearAddress()

            this.foros.forEach(foro => {
                this.itemsForos.push(foro.name)
            });

            if(this.edit_data != null && !this.form_filled){
                this.foro = this.edit_data.foro
                this.get_varas(this.foros.find(element => element.name==this.foro).id)
            }
        },
        varas(){
            this.itemsVaras = []
            this.vara = ''
            this.clearAddress()
            
            this.varas.forEach(vara => {
                this.itemsVaras.push(vara.name)
            });

            if(this.edit_data != null && !this.form_filled){
                this.vara = this.edit_data.vara
                this.form_filled = true
            }
        },
        vara(){
            if(this.vara != ''){
                this.postal_code = this.varas.find(element => element.name==this.vara).postal_code
                this.hearing_address_street = this.varas.find(element => element.name==this.vara).address_street
                this.address_number = this.varas.find(element => element.name==this.vara).address_number
                this.address_complement = this.varas.find(element => element.name==this.vara).address_complement
                this.hearing_address_district = this.varas.find(element => element.name==this.vara).address_district
                this.hearing_city = this.varas.find(element => element.name==this.vara).city
                this.hearing_state = this.varas.find(element => element.name==this.vara).state
            }
        },
        postal_code() {
            this.format_postal_code()
        },
        address_street(){
            this.hearing_address_street = this.address_street
        },
        address_district(){
            this.hearing_address_district = this.address_district
        },
        city(){
            this.hearing_city = this.city
        },
        state(){
            this.hearing_state = this.state
        }
    },
    methods: {
        ...mapActions('hearings', ['get_hearing_types', 'get_esferas', 'get_tribunais', 'get_comarcas', 'get_foros', 'get_varas']),
        ...mapActions('companies', ['get_companies_short']),
        ...mapActions("address", ["get_address"]),
        init_hearing(){
            this.esfera = this.edit_data.esfera
            this.hearingType = this.edit_data.hearing_type
            this.company = this.edit_data.company
            this.summary = this.edit_data.summary
            this.date = this.edit_data.date
            this.time = this.edit_data.time
            this.online = this.edit_data.online
            this.link = this.edit_data.link
        },
        change_date(date){
            this.date = date
        },
        emit_data_form(){
            if(this.$refs.form.validate()){
                var data_form = {
                    "summary":              this.summary,
                    "date":                 this.date,
                    "time":                 this.time+':00',
                    "company":              this.companies_short.find(element => element.name==this.company).id,
                    "hearing_type":         this.hearing_types.find(element => element.name==this.hearingType).id,
                    "esfera":               this.esferas.find(element => element.name==this.esfera).id,
                    "tribunal":             this.tribunais.find(element => element.name==this.tribunal).id,
                    "comarca":              this.comarcas.find(element => element.name==this.comarca).id,
                    "foro":                 this.foros.find(element => element.name==this.foro).id,
                    "vara":                 this.varas.find(element => element.name==this.vara).id,
                    "postal_code":          this.postal_code.replace(/\D/g, ''),
                    "address_street":       this.hearing_address_street,
                    "address_number":       this.address_number,
                    "address_complement":   this.address_complement,
                    "address_district":     this.hearing_address_district,
                    "city":                 this.hearing_city,
                    "state":                this.hearing_state,
                    "online":               this.online,
                    "link":                 this.link
                }

                this.$emit('emit_data_form', data_form)
            }
        },
        clearAddress(){
            this.postal_code = ''
            this.hearing_address_street = ''
            this.address_number = ''
            this.address_complement = ''
            this.hearing_address_district = ''
            this.hearing_city = ''
            this.hearing_state = ''
        },
        autocomplete(){
            if(!this.edicao){
                var postal_code = this.postal_code.replace(/[^0-9]/, "");

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
        format_postal_code(){
            var x = this.postal_code.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/)
            this.postal_code = !x[2] ? x[1] : x[1] + (x[2] ? '-' + x[2] : '')
        },
        link_rule(link){
            if(link=='' && this.online){
                return 'Campo Obrigatório'
            }
            else{
                return true
            }
        }
    }
}
</script>