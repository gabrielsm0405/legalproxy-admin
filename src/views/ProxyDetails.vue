<template>
    <v-card flat>
        <v-row class="ml-2 mr-2">
            <v-col sm="6">
                <v-row justify="start" class="ml-5">
                    <h1>Preposto X</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>
            <v-col sm="6">
                <v-row justify="end" align="center" class="mr-10">
                    <v-spacer></v-spacer>
                    <v-btn color="red white--text" @click="open_confirm_desativation_dialog=true">DESATIVAR</v-btn>
                    <v-btn x-small text @click="open_confirm_delete_dialog=true">Exlcuir</v-btn>
                </v-row>
            </v-col>
        </v-row>

        <!-- Box de confirmação de desativação -->
        <v-dialog v-model="open_confirm_desativation_dialog" max-width="500">
            <ConfirmBox
                title="Desativar preposto?"
                v-if="open_confirm_desativation_dialog"
                v-on:cancel="open_confirm_desativation_dialog = false"
            ></ConfirmBox>
            <!--v-on:yes="erase_company"-->
        </v-dialog>
        
        <!-- Box de confirmação de exlusão -->
        <v-dialog v-model="open_confirm_delete_dialog" max-width="500">
            <ConfirmBox
                title="Excluir preposto?"
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

                    <ProxyForm
                        class="ml-2 mr-2"
                        ref="user_form" 
                        :input_form_data="user_form_data" 
                        :editing="true"
                    ></ProxyForm>
                    <!--v-on:change_form_data="change_form_data"-->

                    <v-row justify="center">
                        <v-btn
                            color="primary"
                            class="white--text pr-15 pl-15"
                        >
                            Salvar
                        </v-btn>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card height="500" class="mb-5 scroll">
                    <v-col sm="3" cols="12">
                        <v-row justify="start" class="ml-5">
                            <h5>Audiências</h5>
                        </v-row>
                        <v-divider></v-divider>
                    </v-col>

                    <Table type="hearing" :demonstrating="true"></Table>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import ConfirmBox from '../components/ConfirmBox'
import Table from '../components/Table'
import ProxyForm from '../components/ProxyForm'

export default {
    data: () => ({
        open_confirm_desativation_dialog: false,
        open_confirm_delete_dialog: false,
        user_form_data: {
            first_name: 'Gabriel',
            last_name: 'Souza Marques',
            phone_number: '(81) 97112-7523',
            email: 'gabriel3@email.com',
            cpf: '061.590.55-26',
            postal_code: '50740-110',
            adress_street: 'João Sales de Menezes',
            adress_number: '437',
            adress_complement: '',
            adress_district: 'Várzea',
            city: 'Recife',
            state: 'Pernambuco',
            birth_date: '1998-05-04',
            is_whatsapp: true,
            gender: 'Masculino',
            linkedin: '',
            foros_attended: ''
        },
    }),
    components: {
        ConfirmBox,
        Table,
        ProxyForm
    }
}
</script>