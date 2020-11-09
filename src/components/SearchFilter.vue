<template>
    <v-card flat>
        <v-card-title>Filtros</v-card-title>

        <v-row class="mr-2 ml-2">
            <v-col cols="6" v-if="type != 'hearing'">
                <v-text-field
                    label="Nome"
                    outlined
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="4" v-if="type == 'hearing'">
                <v-select
                    label="Tipo de audiência"
                    outlined
                ></v-select>
            </v-col>
            <v-col v-if="type == 'hearing'">
                <v-select
                    label="Esfera"
                    outlined
                ></v-select>
            </v-col>
            <v-col v-if="type == 'company'">
                <v-text-field
                    label="CNPJ"
                    outlined
                    required
                ></v-text-field>
            </v-col>
            <v-col v-if="type == 'user'">
                <v-text-field
                    label="Empresa"
                    outlined
                    required
                ></v-text-field>
            </v-col>
            <v-col v-if="type == 'hearing'">
                <v-select
                    label="Tribunal"
                    outlined
                ></v-select>
            </v-col>
            <v-col v-if="type == 'proxy'">
                <v-select
                    label="Esferas"
                    outlined
                ></v-select>
            </v-col>
        </v-row>

        <v-row class="mr-2 ml-2">
            <v-col cols="6" v-if="type == 'user' || type == 'proxy'">
                <v-text-field
                    label="Email"
                    outlined
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="4" v-if="type == 'hearing'">
                <v-text-field
                    label="Empresa"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col v-if="type == 'hearing'">
                <v-select
                    label="Comarca"
                    outlined
                ></v-select>
            </v-col>
            <v-col v-if="type == 'user' || type == 'proxy'">
                <v-text-field
                    label="CPF"
                    outlined
                    required
                ></v-text-field>
            </v-col>
            <v-col v-if="type == 'hearing'">
                <v-select
                    label="Foro"
                    outlined
                ></v-select>
            </v-col>
        </v-row>

        <v-row align="center">
            <v-col cols="6" v-if="type == 'user'">
                <v-row justify="center">
                    <v-checkbox label="Cliente" class="mr-2"></v-checkbox>
                    <v-checkbox label="Ponto Focal"></v-checkbox>
                </v-row>
            </v-col>
            <v-col cols="4" v-if="type == 'hearing'" class="pl-8">
                <v-select
                    label="Vara"
                    outlined
                ></v-select>
            </v-col>
            <v-col cols="4" v-if="type == 'hearing'" class="pr-8">
                <v-text-field
                    label="Status"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="4" v-if="type == 'hearing'" class="pr-8">
                <DatePicker 
                    :type="'day month year'" 
                    label="Data da Audiência"
                ></DatePicker>
                <!--v-on:change_date="change_date"-->
            </v-col>
            <v-col v-if="type == 'hearing'" class="pl-8">
                <v-row justify="center">
                    <v-checkbox label="Online" class="mr-2"></v-checkbox>
                    <v-checkbox label="Presencial" class="mr-2"></v-checkbox>
                </v-row>
            </v-col>
            <v-col>
                <v-row justify="center">
                    <v-btn color="primary">
                        <v-icon>fas fa-search</v-icon>
                        PESQUISAR
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import DatePicker from '../components/DatePicker'

export default {
    props: {
        type: String
    },
    components: {
        DatePicker
    }
}
</script>