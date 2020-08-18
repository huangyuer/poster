<template>
  <div id="app">
  <router-view></router-view>
      
   
  </div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>

  @import "./assets/css/epui.min.css";
  @import "./assets/css/main.css";
  @import "./assets/css/panel.min.css";
  .pull-left {
  float: left
  }
  .pull-right {
    float:right
  }

    .ep-input.is-disabled .ep-input__inner{
   background-color: transparent;
    border-color: #CFD8DC;
    cursor: not-allowed;
    color:black;
    border-bottom-style: solid;

}
.ep-tabs-default .ep-tabs-item.active, .ep-tabs-default .ep-tabs-item:hover{
  color: rgb(255, 73, 19);
}
  
</style>