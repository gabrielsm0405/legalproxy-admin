<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="form_data.valid" lazy-validation @keyup.native.enter="save">
        <v-row class="ma-0">
          <v-text-field
            v-model="form_data.name"
            label="Nome Fantasia"
            outlined
            required
            :rules="regraNaoVazio"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-col sm="8" cols="12">
            <v-text-field
              v-model="form_data.razao_social"
              label="Razão Social"
              outlined
              required
              :rules="regraNaoVazio"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form_data.cnpj"
              label="CNPJ"
              outlined
              required
              :rules="[ validarCNPJ ]"
              @input="formatarCNPJ"
              :disabled="disableCNPJ"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-text-field
            v-model="form_data.fone"
            label="Telefone"
            outlined
            required
            :rules="regraNaoVazio"
            @input="formatarTelefone"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-col sm="3" cols="12">
            <v-text-field
              v-model="form_data.postal_code"
              label="CEP"
              outlined
              required
              :rules="regraNaoVazio"
              @change="autocomplete"
              @input="formatarCEP"
              class="ma-0"
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field
              v-model="form_data.address_street"
              label="Logradouro"
              outlined
              required
              :rules="regraNaoVazio"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form_data.address_number"
              label="Número"
              outlined
              required
              :rules="regraNaoVazio"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="8" cols="12">
            <v-text-field v-model="form_data.address_complement" label="Complemento" outlined></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form_data.address_district"
              label="Bairro"
              outlined
              required
              :rules="regraNaoVazio"
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
              :rules="regraNaoVazio"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form_data.state"
              label="UF"
              outlined
              required
              :rules="regraNaoVazio"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-btn
            color="primary"
            class="white--text"
            @click="save"
            :disabled="!form_data.valid"
          >SALVAR</v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "formEmpresa",
  data: () => ({
    regraNaoVazio: [(v) => !!v || "Campo Obrigatório"],
    form_data: {
      valid: true,
      name: "",
      razao_social: "",
      fone: "",
      postal_code: "",
      address_street: "",
      address_number: "",
      address_complement: "",
      address_district: "",
      city: "",
      state: "",
      cnpj: "",
    },
  }),
  props: {
    title: String,
    edit_form_data: Object,
    disableCNPJ: Boolean,
  },
  computed: {
    ...mapState('address', ['address_street', 'address_district', 'city', 'state'])
  },
  mounted() {
    if (this.edit_form_data != null) {
      this.form_data = { ...this.edit_form_data };
    }
  },
  watch: {
    address_street(){
        this.form_data.address_street = this.address_street
    },
    address_district(){
        this.form_data.address_district = this.address_district
    },
    city(){
        this.form_data.city = this.city
    },
    state(){
        this.form_data.state = this.state
    }
  },
  methods: {
    //...mapActions("companies", ["new_company", "update_company"]),
    ...mapActions("address", ["get_address"]),
    validate() {
      return this.$refs.form.validate();
    },
    autocomplete() {
      var cep = this.form_data.postal_code.replace(/[^0-9]/, "");

      if (cep.length != 8) {
        return false;
      }

      this.get_address(cep)

      return true
    },
    Get(yourUrl) {
      var Httpreq = new XMLHttpRequest(); // a new request
      Httpreq.open("GET", yourUrl, false);
      Httpreq.send(null);
      return Httpreq.responseText;
    },
    formatarTelefone() {
      var telefoneLength = this.form_data.fone.replace(/\D/g, "").length;
      var firstNumber = this.form_data.fone.replace(/\D/g, "")[0];
      var forFirstNumbers = this.form_data.fone.replace(/\D/g, "").slice(0, 4);
      var x;

      if (forFirstNumbers == "0800") {
        x = this.form_data.fone
          .replace(/\D/g, "")
          .match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
        this.form_data.fone = !x[2] ? x[1] : x[1] + " " + x[2] + " " + x[3];
      } else if (telefoneLength <= 10) {
        x = this.form_data.fone
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        this.form_data.fone = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      } else if (telefoneLength <= 11 && firstNumber == "0") {
        x = this.form_data.fone
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
        this.form_data.fone = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      } else if (telefoneLength <= 11) {
        x = this.form_data.fone
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
        this.form_data.fone = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + " " + x[3] + (x[4] ? "-" + x[4] : "");
      } else if (telefoneLength <= 12 && firstNumber == "0") {
        x = this.form_data.fone
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,1})(\d{0,4})(\d{0,4})/);
        this.form_data.fone = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + " " + x[3] + (x[4] ? "-" + x[4] : "");
      }
    },
    formatarCEP() {
      var x = this.form_data.postal_code
        .replace(/\D/g, "")
        .match(/(\d{0,5})(\d{0,3})/);
      this.form_data.postal_code = !x[2]
        ? x[1]
        : x[1] + (x[2] ? "-" + x[2] : "");
    },
    formatarCNPJ() {
      var x = this.form_data.cnpj
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
      this.form_data.cnpj = !x[2]
        ? x[1]
        : x[1] +
          (x[2] ? "." + x[2] : "") +
          (x[3] ? "." + x[3] : "") +
          (x[4] ? "/" + x[4] : "") +
          (x[5] ? "-" + x[5] : "");
    },
    validarCNPJ(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, "");

      if (cnpj == "") return "Campo Obrigatório";

      if (cnpj.length != 14) return "CNPJ Inválido";

      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return "CNPJ Inválido";

      // Valida DVs
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return "CNPJ Inválido";

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return "CNPJ Inválido";

      return true;
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.edit_form_data != null) {
            //var id = this.form_data.id

            delete this.form_data.valid
            delete this.form_data.id

            //this.update_company([id, this.form_data])
        } 
        else {
          delete this.form_data.valid;

          //this.new_company(this.form_data);
        }

        this.$emit("close");
      }
    },
  },
};
</script>