<template>
  <!-- Default form login -->
  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
         <form>
           <p class="h4 text-center mb-4"><b>Sign in</b></p>
           <label for="defaultFormLoginEmailEx" class="grey-text">Email</label>
           <input type="email" id="defaultFormLoginEmailEx" class="form-control"/>
           <br/>
           <label for="defaultFormLoginPasswordEx" class="grey-text">Password</label>
           <input type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
           <div class="text-center mt-4">
             <button class="btn btn-primary" @click="$router.push('sell')">Login</button>
           </div>
         </form>
      </div>
    </div>
  </div>
 
  <!-- Default form login -->
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      activeUser: null
    }
  },
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
