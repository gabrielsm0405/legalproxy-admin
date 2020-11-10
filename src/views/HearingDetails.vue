<template>
    <v-card flat>
        <v-row class="ml-2 mr-2">
            <v-col sm="6">
                <v-row justify="start" class="ml-5">
                    <h1>Audiência X</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>
            <v-col sm="6">
                <v-row justify="end" align="center" class="mr-10">
                    <v-spacer></v-spacer>
                    <v-btn color="red white--text" @click="open_confirm_cancel_dialog=true">CANCELAR</v-btn>
                    <v-btn x-small text @click="open_confirm_delete_dialog=true">Exlcuir</v-btn>
                </v-row>
            </v-col>
        </v-row>

        <!-- Box de confirmação de desativação de usuário -->
        <v-dialog v-model="open_confirm_cancel_dialog" max-width="500">
            <ConfirmBox
                title="Cancelar audiência?"
                v-if="open_confirm_cancel_dialog"
                v-on:cancel="open_confirm_cancel_dialog = false"
            ></ConfirmBox>
            <!--v-on:yes="erase_company"-->
        </v-dialog>
        
        <!-- Box de confirmação de exlusão de usuário -->
        <v-dialog v-model="open_confirm_delete_dialog" max-width="500">
            <ConfirmBox
                title="Excluir audiência?"
                v-if="open_confirm_delete_dialog"
                v-on:cancel="open_confirm_delete_dialog = false"
            ></ConfirmBox>
            <!--v-on:yes="erase_company"-->
        </v-dialog>

        <v-row class="ml-1 mr-1">
            <v-col cols="6">
                <v-card class="scroll" height="500">
                    <v-col sm="3" cols="12">
                        <v-row justify="start" class="ml-5">
                            <h5>Dados</h5>
                        </v-row>
                        <v-divider></v-divider>
                    </v-col>

                    <HearingForm :edit_data="hearing"></HearingForm>
                    <!--v-on:emit_data_form="salve_hearing"-->
                </v-card>
            </v-col>
            <v-col cols="6" align-self="center">
                <v-row justify="center">
                    <v-btn 
                        x-large 
                        color="primary" 
                        @click="$router.push({ name: 'CompanyDetails', params:{id: 1} })"
                    >
                        Empresa
                    </v-btn>
                </v-row>
                <v-row justify="center" class="mt-16 mb-16">
                    <v-btn 
                        x-large 
                        color="primary" 
                        @click="$router.push({ name: 'UserDetails', params:{id: 1} })"
                    >
                        Cliente
                    </v-btn>
                </v-row>
                <v-row justify="center">
                    <v-btn 
                        x-large 
                        color="primary"
                        @click="$router.push({ name: 'ProxyDetails', params:{id: 1} })"
                    >
                        Preposto
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import ConfirmBox from '../components/ConfirmBox'
import HearingForm from '../components/HearingForm'

export default {
    data: () => ({
        open_confirm_cancel_dialog: false,
        open_confirm_delete_dialog: false,
        hearing: {
            id: 1,
            hearing_type: 'Conciliação',
            company: 'AMD',
            esfera: 'Cível',
            tribunal: 'TJSP',
            comarca: 'São Paulo',
            foro: 'Default',
            vara: '1 VARA DO JUIZADO ESPECIAL CÍVEL CENTRAL',
            date: '2020-11-21',
            time: '14:30',
            summary: 'resumo',
            status: 0
        }
    }),
    components: {
        ConfirmBox,
        HearingForm
    }
}
</script>