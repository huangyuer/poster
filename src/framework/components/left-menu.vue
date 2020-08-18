<template>
  <div
    class="panel-left panel-light"
    :class="menuStyle !== 'light' ? 'panel-' + $parent.theme : null"
    :style="{ width: stateWidth }"
  >
    <div class="panel-personal" :class="'panel-' + $parent.theme">
      <h3 v-html="word" ></h3>
    </div>
    <div class="menu-shadow-left panel-personal-content" :style="{ top: isNarrow ? '60px' : null }">
      <div class="panel-nav">
        <ep-menu is-router :no-back="menuStyle === 'light'" :narrow="isNarrow" :theme="menuStyle">
          <muti-menu style="font-size:15px" :menus="menus"></muti-menu>
        </ep-menu>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import dark from "../../assets/frame/home-dark.png";
import blue from "../../assets/frame/home-blue.png";
import darkBlue from "../../assets/frame/home-dark-blue.png";
import green from "../../assets/frame/home-green.png";
import pupple from "../../assets/frame/home-pupple.png";
import orange from "../../assets/frame/home-orange.png";
import settings from "src/settings";
import mutiMenu from "./muti-menu";
import leftmenu from "./leftMenu"
import leftmenuAdmin from "./leftMenuAdmin"
import menusJson from "src/menus";
export default {
  name: "left-menu",

  props: {
    changeWidth: Number
  },

  components: { mutiMenu },

  data() {
    return {
      // menus: [],
      //径行提发货菜单
     
      imgs: {
        dark: dark,
        blue: blue,
        "dark-blue": darkBlue,
        green: green,
        pupple: pupple,
        orange: orange
      }
    };
  },

  computed: {
    hideMenu(){
        if(this.$store.getters.getType=="2"){
            return leftmenu.menu
        }else{
            return leftmenuAdmin.menu
        }
    },
 
    word() {
      if (this.isNarrow) {
        return settings.smName;
      }
      return settings.name;
    },
    stateWidth() {
      return this.$parent.menuLeft;
    },
    isNarrow() {
      if (this.$store.getters.getChangeWidth === 1) {
        return true;
      } else {
        return false;
      }
    },
    menuStyle() {
      if (this.$store.getters.getDark === "1") {
        return this.$parent.theme;
      } else {
        return "light";
      }
    },
    menus() {
        return this.hideMenu;
    }
  },

  watch: {
    $route(to, from) {
      this.$nextTick(() => {
        this.$emit("change", to, from);
      });
    }
  }
};
</script>

<style>
.panel-personal {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}
.panel-personal > h3 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.panel-personal > h3 > i {
  margin-right: 14px;
}
.panel-personal-content {
  position: absolute;
  top: 55px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-transition: top 0.3s;
  transition: top 0.3s;
}
.reload-menu {
  cursor: pointer;
  font-size: 12px;
}
.reload-menu:hover {
  background: #eee;
}
</style>
