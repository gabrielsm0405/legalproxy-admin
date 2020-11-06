<template>
    <v-card flat>
        <v-row class="ml-2 mr-2">
            <v-col sm="6">
                <v-row justify="start" class="ml-5">
                    <h1>{{'Dell'}}</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>
            <v-col sm="6">
                <v-row justify="end" align="center" class="mr-10">
                    <v-btn color="red white--text" @click="open_confirm_desativation_dialog=true">DESATIVAR</v-btn>
                    <v-btn x-small text @click="open_confirm_delete_dialog=true">Exlcuir</v-btn>
                </v-row>
            </v-col>
        </v-row>

        <!-- Box de confirmação de desativação de usuário -->
        <v-dialog v-model="open_confirm_desativation_dialog" max-width="500">
            <ConfirmBox
                title="Desativar usuário?"
                v-if="open_confirm_desativation_dialog"
                v-on:cancel="open_confirm_desativation_dialog = false"
            ></ConfirmBox>
            <!--v-on:yes="erase_company"-->
        </v-dialog>
        
        <!-- Box de confirmação de exlusão de usuário -->
        <v-dialog v-model="open_confirm_delete_dialog" max-width="500">
            <ConfirmBox
                title="Excluir usuário?"
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

                    <CompanyForm title="" :edit_form_data="edit_company_data"></CompanyForm>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card height="500" class="mb-5 scroll">
                    <v-col sm="3" cols="12">
                        <v-row justify="start" class="ml-5">
                            <h5>Usuários</h5>
                        </v-row>
                        <v-divider></v-divider>
                    </v-col>

                    <Table type="user" :demonstrating="true"></Table>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="ml-1 mr-1">
            <v-col cols="12">
                <v-card class="scroll" height="300">
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
import CompanyForm from '../components/CompanyForm'
import Table from '../components/Table'

export default {
    data: () => ({
        edit_company_data:{
            name: "Dell",
            razao_social: "Dell",
            fone: "(81) 9 7112-7523",
            postal_code: "50740-110",
            address_street: "Rua João Sales de Menezes",
            address_number: "123",
            address_complement: "",
            address_district: "Várzea",
            city: "Recife",
            state: "Pernambuco",
            cnpj: "72.381.189/0001-10",
        },
        open_confirm_desativation_dialog: false,
        open_confirm_delete_dialog: false
    }),
    components: {
        CompanyForm,
        Table
    }
}
</script>