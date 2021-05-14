import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Recommend from '@/views/recommend.vue'
import Search from '@/views/search.vue'
import Singer from '@/views/singer.vue'
import TopList from '@/views/top-list.vue'
import SingerDetail from "@/views/singer-detail.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/singer'
  }, {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  }, {
    path: "/search",
    name: "search",
    component: Search
  }, {
    path: "/singer",
    name: "singer",
    component: Singer,
    children: [{
      path: ":id",
      component: SingerDetail
    }]
  }, {
    path: "/top-list",
    name: "top-list",
    component: TopList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
