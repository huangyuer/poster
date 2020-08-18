import cookie from 'utils/cookie'
import settings from 'src/settings'

const color = 'blue,dark-blue,green,pupple,orange'

function getTheme () {
  const theme = cookie.getCookie('theme')
  if (theme !== '' && color.indexOf(theme) !== -1) {
    return theme
  } else {
    cookie.setCookie('theme', 'dark')
    return 'dark'
  }
}

function getDark () {
  const dark = cookie.getCookie('dark')
  if (dark !== '') {
    return dark
  } else {
    cookie.setCookie('dark', '1')
    return '1'
  }
}

// ENV为配置
function urlFindExist () {
  let url = global.location.href
  let res = false
  global.NOT_HIDE_MENU.every((item) => {
    let $index = url.indexOf(item)
    if ($index !== -1) {
      res = true
      return false
    }
    return true
  })
  return res
}

const app = {
  state: {
    routerJson: [],
    changeWidth: 0,
    theme: getTheme(),
    dark: getDark(),
    menuTabs: [ settings.homeRoute ],
    nowPath: '/',
    showMenu: true,
    noPermissionPage: '',
    menuTabInstance: null,
    power:[]
  },

  mutations: {
    SETROUTERJSON (state, newRouterJson) {
      state.routerJson = newRouterJson
    },
    SETCHANGEWIDTH (state, newChangeWidth) {
      state.changeWidth = newChangeWidth
    },
    SETTHENE (state, newTheme) {
      state.theme = newTheme
    },
    SETDARK (state, newDark) {
      state.dark = newDark
    },
    SETMENUTABS (state, newTabs) {
      state.menuTabs = newTabs
    },
    SETNOWPATH (state, nowPath) {
      state.nowPath = nowPath
    },
    SETSHOWMENU (state, nowMenu) {
      state.showMenu = nowMenu
    },
    SETNOPERMISSIONPAGE (state, newPageName) {
      state.noPermissionPage = newPageName
    },
    SETMENUTABINSTANCE (state, newMenuTab) {
      state.menuTabInstance = newMenuTab
    },
    SETBESTPOWER(state,newPower){
      state.power = newPower
    }
  },

  actions: {
    setRouterJson ({commit}, routerJson) {
      commit('SETROUTERJSON', routerJson)
    },
    setChangeWidth ({commit}, changeWidth) {
      commit('SETCHANGEWIDTH', changeWidth)
    },
    setTheme ({commit}, theme) {
      let style = ''
      if (color.indexOf(theme) !== -1) {
        style = theme
      } else {
        style = blue
      }
      cookie.setCookie('theme', style)
      commit('SETTHENE', style)
    },
    setDark ({commit}, dark) {
      if (dark === '1' || dark === '0') {
        cookie.setCookie('dark', dark)
        commit('SETDARK', dark)
      }
    },
    setMenuTabs ({commit}, newTabs) {
      commit('SETMENUTABS', newTabs)
    },
    setNowPath ({commit}, nowPath) {
      commit('SETNOWPATH', nowPath)
    },
    setBestPower({commit},power){
      commit('SETBESTPOWER', power)
    },
    /**
     * 嵌套iframe策略
     */
    setNowShowPath ({commit}) {
      if (global.parent !== global &&
        !urlFindExist()) {
        commit('SETSHOWMENU', false)
      }
    },
    setNoPermissionPage ({commit}, pageName) {
      commit('SETNOPERMISSIONPAGE', pageName)
    },
    setMenuTabInstance ({commit}, menuTabInstance) {
      commit('SETMENUTABINSTANCE', menuTabInstance)
    }
  }
}

export default app
