<template>
  <Title>
    <template #title>
     <h4 style="margin: auto;">{{lang? '注册界面': 'Register'}}</h4>
    </template>
    <template #suffix>
        <el-button style="margin: auto;" type="primary" size="large" @click="backLogin()">{{lang? '登录': 'Sign In'}}</el-button>
    </template>
  </Title>
  <div style="margin: 20px" />
  <div class="register_warp">
  <el-form
    :label-position="'right'"
    label-width="100px"
    :model="user"
    style="max-width: 460px"
    :rules="rule"
    @validate = "validate"
  >
    <el-form-item :label="lang? '账户名': 'Account'" prop="account">
      <el-input v-model="user.account" maxlength="18" minlength="2" clearable class="input_item"/>
    </el-form-item>
    <el-form-item :label="lang? '密码' : 'Password'" prop="password">
      <el-input v-model="user.password" type="password" maxlength="18" minlength="6" clearable class="input_item"/>
    </el-form-item>
    <el-form-item :label="lang? '确认密码': 'ConfirmPassword'" prop="ensurePassword">
      <el-input  type="password" v-model="user.ensurePassword" clearable></el-input>
    </el-form-item>
    <el-form-item :label="lang? '邮箱地址': 'Email'" prop="email">
      <el-input v-model="user.email"  clearable></el-input>
    </el-form-item>
    <el-form-item :label="lang? '电话号码': 'Phone'" prop="phone">
      <el-input v-model="user.phone" :placeholder="lang? '你可以选择是否填写该字段': 'You can choose not to fill in this field'" clearable></el-input>
    </el-form-item>
    <el-form-item :label="lang? '部门编号': 'dept'" prop="dept">
      <el-input v-model="user.phone" :placeholder="lang? '部门号': 'dept'" clearable></el-input>
    </el-form-item>
    <!-- <el-form-item :label="lang? '身份': 'Identity'">
      <el-select v-model="user.role" class="select" :placeholder="lang? '选择你的身份': 'choose your identity'" size="large" :collapse-tags="true">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  </el-form-item> -->
  <el-button type="primary" @click="register()" :disabled ="!registerButtonFlag" >{{lang? '注册': 'Register'}}</el-button>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import Title from '@/components/common/tab_bar.vue';

import { getRegister } from '@/network/profile';
import router from '@/router';
import { ms } from '@/tools/message';
import { store } from '@/store';
import { RegisterUser, User } from '@/interface/User';

const lang = computed(() => store.state.config.lang)


const user = reactive<RegisterUser>(new RegisterUser())

const accountFlag = ref(false);
const passwordFlag = ref(false);
const ensurePasswordFlag = ref(false);
const emailFLag = ref(true)
const registerButtonFlag = ref(false);

const options = [
  {
    value: 0,
    label: lang? '员工': 'Student',
  },
  {
    value: 1,
    label: lang? '管理员': 'Admin',
  }
]

const register = () => {
  getRegister(user).then((res) => {
    const {message, messageE, code, data} = res.data;
    switch(code) {
      case 200: ms(message, messageE, "s");
      backLogin()
      break;
      default:ms(message, messageE, "w");
      break;
    }
  }).catch((err) => {
    ms("发生了一些错误", "There is soething wrong", "e")
  })
}


const backLogin = () => {
  router.push("/")
}



const checkAccount = (rule:any,value:string,callback:any) => {
  if (!value.match("^[a-zA-Z0-9|#|@|\.]+$")) {
    accountFlag.value = false;
    callback(new Error(lang? '请输入字母或数字': "Please Input Letter"));
  } else if (value.length < 2) {
    accountFlag.value = false;
    callback(new Error(lang? '用户名最短为2位': "please input more than 2 letter"))
  } else {
    accountFlag.value = true;
    callback();
  }
}

const checkPassword = (rule:any,value:string,callback:any) => {
  if (!value.match("^[0-9A-Za-z|\.|#|!|%|^|&|*|\(|\)|\?|+|-|\/]+$")) {
    passwordFlag.value = false;
    callback(new Error(lang? '密码只能包含数组字母和某些特殊字符' : 'content must contain only letter or digital'))
  } else if (value.length < 6) {
    passwordFlag.value = false;
    callback(new Error(lang? '密码必须大于6位': "passwrod length must greater than six"))
  } else {
    passwordFlag.value = true;
    callback();
  }
}

const checkEnsurePassword = (rule:any,value:string,callback:any) => {
  if (value === user.password) {
    ensurePasswordFlag.value = true;
    callback()
  } else {
    ensurePasswordFlag.value = false;
    callback(lang? '密码不同': "Not the same as password")
  }
}

const  checkEmail = (rule:any,value:string,callback:any) => {
  let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (value.match(pattern)) {
    emailFLag.value = true
      callback();
  } else if (value) {
    emailFLag.value = false
    callback(new Error(lang? '错误的邮件格式': "The email format is wrong"));
  } else if (!value) {
    callback(new Error(lang? '邮箱必须填写': "The email is required"));
  }
  else{
    emailFLag.value = true;
    callback();
  }
}

const rule = reactive({
  account:[{ validator:checkAccount, trigger:'blur'}],
  password:[{validator:checkPassword, trigger:"blur"}],
  ensurePassword:[{validator:checkEnsurePassword,trigger:"blur"}],
  email:[{validator:checkEmail,trigger:"blur"}]
})


const validate = () => {
  if (accountFlag.value && passwordFlag.value && ensurePasswordFlag.value && emailFLag.value) {
    registerButtonFlag.value = true;
  } else {
    registerButtonFlag.value = false
  }
}
</script>

<style scoped>
  .select {
    width: 360px;
    max-width: 360px;
  }
  .register_warp {
    width: 100vw;
    display: flex;
    justify-content:center
  }
</style>
