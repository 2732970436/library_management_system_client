<template>
  <div  class="tab_bar">
  <div class="tab_bar_prefix" @click="$emit('tabClick', 'prefix')">
    <slot name="prefix">
      <el-image fit="contain" class="tab_bar_logo" :src="require('@/assets/img/logo.jpg')" />
  </slot> 
  </div>

  <div class = "tab_bar_title" @click="$emit('tabClick', 'title')">
      <slot name="title">
        <h4 style="margin: auto;">{{lang? '工资管理系统': 'salary management system'}}</h4>
      </slot>
  </div>

  <div class="tab_bar_suffix" @click="$emit('tabClick', 'suffix')">
    <slot name="suffix">
     <div style="margin: auto;">
        <el-avatar :size="62" :src="avatarUrl"/>
    </div>
    </slot>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from '@/interface/User';
import router from '@/router';
import { store } from '@/store';
import { ElMessage } from 'element-plus';
import url from "@/network/network_url"
import { computed, ref } from 'vue'

const lang = computed(() => store.state.config.lang)

const emit = defineEmits();

const user = ref<User>(JSON.parse(JSON.stringify(store.state.profile.user!)))
let avatarUrl = `${url}/salary/api/profile/avatar/img/${user.value?.id}`
const suffixClick = () => {

}


</script>

<style scoped>

.tab_bar {
  height: 62px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.tab_bar_logo {
  width: 62px;
  height: 62px;
  margin: auto;
}

.tab_bar_prefix {
  display: flex;
  flex: 1;
}



.tab_bar_title {
  display: flex;
  flex: 1;
}

.tab_bar_suffix {
  min-width: 60px;
  display: flex;
  flex: 1;
}
</style>