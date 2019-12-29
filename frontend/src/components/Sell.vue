<template>
  <div class="container-fluid mt-2">
    <!-- <h6 class="h6 pull-left">Sell Manager</h6> -->
    <br>
    <!-- <b-alert :show="loading" variant="info">Loading...</b-alert> -->
    <b-row>
      <b-col lg="12">
        <div class="center">
            <h4> <span v-on:click="activeTab('create');resetModel()"> Add Sell </span> |  <span v-on:click="activeTab('list')">List Sell</span></h4>
        </div>
        <br>
      </b-col>
      <b-col lg=12 v-if="viewType == 'list'">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>DT</th>
              <th>DA</th>
              <th>%Ach</th>
              <th>Bills</th>
              <th>Qty</th>
              <th>DOS</th>
              <th>DOC</th>
              <th>MTD Sale</th>
              <th>MTD Con</th>
            </tr>
          </thead>
          <tbody>
            <!-- <pre>{{sells}}</pre> -->
            <tr v-for="stat in sells">
              <td>{{ stat.strSellDate }}</td>
              <td>{{ stat.dt }}</td>
              <td>{{ stat.da }}</td>
              <td>{{ stat.achPer }}</td>
              <td>{{ stat.bills }}</td>
              <td>{{ stat.qty }}</td>
              <td>{{ stat.dayOnlineSale }}</td>
              <td>{{ stat.dayConsultations }}</td>
              <td>{{ stat.mtdOnlineSale }}</td>
              <td>{{ stat.mtdConsultations }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3"></b-col>
      <b-col lg="6" v-if="viewType == 'create'"> 
        <div class="alert alert-success" v-if="successFlag">
          <strong>Stats saved Successfully!</strong>
        </div>
        <div class="alert alert-error" v-if="errorFlag">
          <strong>Error while saving record. Please re-try</strong>
        </div>
        <!-- title="(model.id ? 'Edit Sell ID#' + model.id : 'New Sell')" -->
        <b-card>
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                  <li v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
          <form @submit.prevent="saveSell">
            <b-form-group label="Date">
              <b-form-input type="date" v-model="model.sellDate" required></b-form-input>
            </b-form-group>
            <b-form-group label="DT">
              <b-form-input type="number" v-model="model.dt" required></b-form-input>
            </b-form-group>
            <b-form-group label="DA">
              <b-form-input type="number" v-model="model.da" required></b-form-input>
            </b-form-group>
            <b-form-group label="FF">
              <b-form-input type="number" v-model="model.ff" required></b-form-input>
            </b-form-group>
            <b-form-group label="Bills">
              <b-form-input type="number" v-model="model.bills" required></b-form-input>
            </b-form-group>
            <b-form-group label="Qty">
              <b-form-input type="number" v-model="model.qty" required></b-form-input>
            </b-form-group>
            </b-form-group>
            <b-form-group label="Day Online Sale">
              <b-form-input type="number" v-model="model.dayOnlineSale" required></b-form-input>
            </b-form-group>
            <b-form-group label="Day Consultations">
              <b-form-input type="number" v-model="model.dayConsultations" required></b-form-input>
            </b-form-group>
            </b-form-group>
              <b-btn type="submit" class="btn btn-success btn-big"variant="success">Submit</b-btn>
          </form>
        </b-card>
        <br>
      </b-col>
      <b-col lg=12 v-if="viewType == 'block'">
        <div class='m-10' style="text-align:left">
          <span>Store Name: {{ model.storeName }}</span><br/>
          <span>DT: {{ model.dt }}</span><br/>
          <span>DA: {{ model.da }}</span><br/>
          <span>% Ach: {{ model.achPer }}</span><br/>
          <span>FF: {{ model.ff }}</span><br/>
          <span>Bills: {{ model.bills }}</span><br/>
          <span>Qty: {{ model.qty }}</span><br/>
          <span>AOV: {{ model.aov }}</span><br/>
          <span>UPT: {{ model.upt }}</span><br/>
          <span>ASP: {{ model.asp }}</span><br/>
          <span>MTDT: {{ model.mtdt }}</span><br/>
          <span>MTDA: {{ model.mtda }}</span><br/>
          <span>% Ach: {{ model.mAchPer }}</span><br/>
          <span>DOS: {{ model.dayOnlineSale }}</span><br/>
          <span>DC  : {{ model.dayConsultations}}</span><br/>
          <span>MTD OS: {{ model.mtdOnlineSale }}</span><br/>
          <span>MTD C: {{ model.mtdConsultations }}</span><br/>
        </div>
        
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
import _ from 'lodash'
import moment from 'moment'
export default {  
  data () {
    return {
      loading: false,
      sells: [],
      model: {
        sellDate:'',
        dt: 0,
        da: 0,
        ff: 0,
        bills: 0,
        qty: 0,
        dayOnlineSale: 0,
        dayConsultations: 0
      },
      activeUser:true,
      errors:[],
      extensions:[],
      viewType:'create',
      errorFlag:false,
      successFlag: false,
    }
  },
  async created () {
    this.refreshSells()
  },
  methods: {
    async activeTab(viewType) {
        this.viewType = viewType;
        this.successFlag = false;
        this.errorFlag = false;
    },
    // pushExtension: function(ext) {
    //     this.model.extensions.push(ext);
    // },
    //  async pushPath(path) {
    //     this.model.latestPaths.push(path);
    // },
    async resetModel() {
        this.model = {
           sellDate:'',
           dt: 0,
           da: 0,
           ff: 0,
           bills: 0,
           qty: 0,
           dayOnlineSale: 0,
           dayConsultations: 0
          }
    },
    async refreshSells () {
      this.loading = true
      var response = await api.getSells();
      if(response.statusCode == 200) {
        this.sells = response.data.docs;
        console.log("sells ",this.sells);
      } else {
        console.log("Error while loading sells");
      }
      this.loading = false
    },
    async saveSell () {
      var prevDate = moment(new Date(this.model.sellDate)).subtract(1, 'days').format('YYYY-MM-DD')
      console.log(" Previous day :", prevDate);
      var day = moment(this.model.sellDate).format('D');
      console.log(" Day :", day);

      this.model.storeName = 'L&T Punjagutta',
      this.model.strSellDate = this.model.sellDate;
      this.model.sellDate = new Date(moment(this.model.sellDate).add(5, 'hours').add(30, 'minutes'));

      // this.model.sellDate = 
      this.model.dt = parseInt(this.model.dt);
      this.model.da = parseInt(this.model.da);
      this.model.ff = parseInt(this.model.ff);
      this.model.bills = parseInt(this.model.bills);
      this.model.qty = parseInt(this.model.qty);
      this.model.dayOnlineSale = parseInt(this.model.dayOnlineSale);
      this.model.dayConsultations = parseInt(this.model.dayConsultations);

       if(day == 1){
        this.model.mtdt = this.model.dt;
        this.model.mtda = this.model.da;
        this.model.mtdOnlineSale = this.model.dayOnlineSale;
        this.model.mtdConsultations = this.model.dayConsultations;
      } else {
        var prevDayData = await api.getPrevDaySell({ prevDate:prevDate });
        console.log("  prevDayData ",prevDayData);
        if(prevDayData.statusCode == 200) {
          if(_.isEmpty(prevDayData.data)) {
            console.log(" There is no prev day data found ... !")
          } else {
            this.model.mtdt = _.round(prevDayData.data.mtdt + this.model.dt);
            this.model.mtda = _.round(prevDayData.data.mtda + this.model.da);
            this.model.mtdOnlineSale = _.round(prevDayData.data.mtdOnlineSale + this.model.dayOnlineSale);
            this.model.mtdConsultations = _.round(prevDayData.data.mtdConsultations + this.model.dayConsultations);
          }
        
        } else {
          console.log("Error while getting prev sell sells");
        }
      }

      this.model.achPer = _.round((this.model.dt / this.model.da ) * 100);
      this.model.aov = _.round(this.model.da / this.model.bills);
      this.model.upt = _.round(this.model.qty / this.model.bills);
      this.model.asp = _.round(this.model.da / this.model.qty);
      this.model.mAchPer = _.round( (this.model.mtdt / this.model.mtda) * 100 );
      console.log('-- Model : ',this.model);

      var respo = await api.createSell(this.model);
      console.log(" Respo :", respo);
      this.viewType = 'block';
      this.successFlag = true;
      // await this.resetModel()
      await this.refreshSells()
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
