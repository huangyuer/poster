/**
 * [Bug]
 * Muti File Cache Mixin
 * Duplicate Error Fix later
 * 强制刷新策略，已弃用，勿继承！
 */
import { cloneObj } from 'utils'
import { warn } from 'src/base/base'

/***
 * Cache Page Logic
 * @param {Object} componentName
 * @param {cachePage} cachePageObject
 * Key: tempName: { Key: ?CACHE_PAGE }
 */
let cache = {}
// VNode and data Cache
function generateCacheSnapshot (vnode, _data) {
  return {
    vnode,
    data: cloneObj(_data)
  }
}

/**
 * Find Id to Cache
 * @param {Vue Component} vm Vue Instance
 */
export function findCacheId (vm, route) {
  let cache,
      locRoute = route || vm.$route
  if (locRoute) {
    if (locRoute.params && locRoute.params.id) {
      cache = vm.$options.mutiId = locRoute.params.id
    } else if (locRoute.query && locRoute.query.id) {
      cache = vm.$options.mutiId = locRoute.query.id
    }
  }
  return cache
}

function findCache (vm, route) {
  let cacheId = findCacheId(vm, route)
  console.log(cacheId)
  if (cacheId) {
    return cache[vm.$options.name][cacheId]
  }
}

export function delCache (name, id) {
  if (cache.hasOwnProperty(name)
    && cache[name].hasOwnProperty(id)) {
    delete(cache[name][id])
  }
}

export default {

  beforeCreate () {
    let componentName = this.$options.name
    if (process.env.NODE_ENV !== 'production') {
      if (!componentName) {
        warn('Name is undefined!', 'common/mutiPage.js')
      }
    }
    this.$options.mutiPage = true
    if (!cache.hasOwnProperty(componentName)) {
      cache[componentName] = {}
    }
  },

  mounted () {
    let cachePage = findCache(this)
    if (cachePage) {
      // this._vnode = cachePage.vnode
      // this._watcher.update()

      this._vnode = null
      // this.__patch__(this._vnode, cachePage.vnode, true, true)
      this._update(cachePage.vnode, true)

      this.$mount()
    }
  },

  watch: {
    '$route' (to, from) {
      let componentName = this.$options.name
      this.mutiPageSnapshot(from)
      let cachePage = findCache(this, to)
      if (cachePage) {
        let data = cloneObj(cachePage.data)
        for (let item in data) {
          this[item] = data[item]
        }
        this.$nextTick(_ => {
          this._vnode = null
          this._update(cachePage.vnode, true)
          this.$mount()
        })
      } else {
        this._data = cloneObj(cache[componentName].define)
      }
    }
  },

  methods: {
    // 初始化数据时调用
    mutiPageDataCache (data) {
      let componentName = this.$options.name
      if (!cache[componentName].hasOwnProperty('define')) {
        cache[componentName].define = cloneObj(data)
      }
      let cachePage = findCache(this)
      return cachePage ? cloneObj(cachePage.data) : data
    },
    // VNode快照
    mutiPageSnapshot (route) {
      let cacheId = findCacheId(this, route),
          componentName = this.$options.name
      if (cacheId) {
        cache[componentName][cacheId] = generateCacheSnapshot(this._vnode, this._data)
      }
    }
  },

  // 暂时存放在此，未考虑keep-alive策略，因此不支持缓存策略
  beforeRouteLeave (to, from, next) {
    this.mutiPageSnapshot()
    next()
  }
}
