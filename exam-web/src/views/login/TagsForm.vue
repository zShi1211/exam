<template>
  <div class="tags_from">
    <!-- 登录表单 -->
    <div class="tag_login" v-if="loginType == 0">
      <a-form :model="loginForm" @submit-success="submit">
        <a-form-item
          field="username"
          :hide-label="true"
          :rules="form_rules.username"
        >
          <a-input
            size="large"
            v-model="loginForm.username"
            placeholder="输入用户名"
          />
        </a-form-item>
        <a-form-item
          field="password"
          :hide-label="true"
          :rules="form_rules.password"
        >
          <a-input-password
            size="large"
            v-model="loginForm.password"
            placeholder="输入密码（6~18个字符）"
          />
        </a-form-item>

        <a-form-item field="type" :hide-label="true">
          <a-radio-group v-model="loginForm.type">
            <a-radio value="0" :default-checked="true">学生</a-radio>
            <a-radio value="1">管理员</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-button
          type="primary"
          html-type="sumbit"
          style="height: 44px; font-size: 16px"
          size="large"
          :loading="loading"
          >{{ tagList[loginType].name }}</a-button
        >
      </a-form>
    </div>
    <!-- 注册表单 -->
    <div class="tag_login" v-if="loginType == 1">
      <a-form :model="registerForm" ref="register" @submit-success="submit">
        <a-form-item
          field="username"
          :hide-label="true"
          :rules="{ required: true, message: '账号不能为空' }"
        >
          <a-input
            size="large"
            v-model="registerForm.username"
            placeholder="输入登录账号"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          field="nickname"
          :hide-label="true"
          :rules="{ required: true, message: '昵称不能为空' }"
        >
          <a-input
            size="large"
            v-model="registerForm.nickname"
            placeholder="输入昵称"
          >
          </a-input>
        </a-form-item>
        <a-form-item field="gender" :hide-label="true">
          <a-radio-group v-model="registerForm.gender">
            <a-radio :value="true">女</a-radio>
            <a-radio :value="false">男</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          field="age"
          :hide-label="true"
          :rules="{ required: true, message: '年龄不能为空' }"
        >
          <a-input
            size="large"
            v-model="registerForm.age"
            placeholder="输入年龄"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :hide-label="true"
          :rules="form_rules.password"
        >
          <a-input-password
            size="large"
            v-model="registerForm.password"
            placeholder="输入密码（6~18个字符）"
          />
        </a-form-item>
        <a-form-item
          field="checkPass"
          :hide-label="true"
          :rules="form_rules.checkPass"
        >
          <a-input-password
            size="large"
            v-model="registerForm.checkPass"
            placeholder="确认密码（6~18个字符）"
          />
        </a-form-item>

        <a-button
          type="primary"
          html-type="sumbit"
          style="height: 44px; font-size: 16px"
          size="large"
          :loading="loading"
          >{{ tagList[loginType].name }}</a-button
        >
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";

import { fetchRegister, stuLogin, teaLogin } from "@/apis/apis.js";
import useUserStore from "../../sotre/user-store";
import { useRouter } from "vue-router";
const app_url = location.origin;
const emailLoading = ref(false);
const props = defineProps({
  loginType: Number,
  tagList: Array,
});
const loading = ref(false);
const register = ref(null);
const forget = ref(null);
const loginForm = reactive({
  username: "",
  password: "",
  type: "0",
});
const registerForm = reactive({
  username: "",
  password: "",
  checkPass: "",
  gender: true,
});

const userStore = useUserStore();
const router = useRouter();

const submit = async () => {
  loading.value = true;
  let loginType = props.loginType;

  if (loginType == 0) {
    try {
      let res;
      if (loginForm.type == 0) {
        res = await stuLogin(loginForm);
      } else {
        res = await teaLogin(loginForm);
      }
      userStore.userInfo = res.data.data;
      if (res.data.status == 0) {
        Message.success("登录成功");
        router.push("/home");
      } else {
        Message.error("登录失败");
      }
    } catch (error) {
      Message.error("登录失败");
    } finally {
      loading.value = false;
    }
  } else if (loginType == 1) {
    try {
      const { data } = await fetchRegister(registerForm);
      if (data.status == 0) {
        Message.success("注册成功");
        props.loginType = 0;
      } else {
        Message.error("注册失败");
      }
    } catch (error) {
      Message.error("注册失败");
    } finally {
      loading.value = false;
    }
  }
};
const send_btn_text = ref("获取验证码");
let interval_time = 60;

const sendEmailCode = (refName) => {
  let form;
  if (refName == "forgetForm") {
    form = forget.value;
  } else {
    form = register.value;
  }
  form.validateField("email", (errors) => {
    emailLoading.value = true;
    if (errors == undefined) {
      if (interval_time == 60) {
        sendEmailCodeRequest(
          props.loginType == 1 ? "register" : "forget",
          props.loginType == 1 ? registerForm.email : forgetForm.email
        )
          .then((res) => {
            emailLoading.value = false;
            intervalCharge();
          })
          .catch((err) => {
            console.log(err);
            emailLoading.value = false;
          });
      }
    } else {
      Message.error(errors.email.message);
    }
  });
};
const intervalCharge = () => {
  send_btn_text.value = interval_time + "s后重新获取";
  const interId = setInterval(() => {
    if (interval_time > 0) {
      interval_time--;
      send_btn_text.value = interval_time + "s后重新获取";
    } else {
      interval_time = 60;
      send_btn_text.value = "发送验证码";
      clearInterval(interId);
    }
  }, 1000);
};
const valiPass = (field, callback) => {
  console.log(field);
};
const form_rules = {
  username: [{ required: true, message: "用户名不能为空~" }],
  password: [
    { required: true, message: "密码不能为空~" },
    { maxLength: 18, message: "密码不能超过18个字符~" },
    { minLength: 6, message: "密码至少6个字符~" },
    // { match: /^[a-zA-Z]\w{5,17}$/, message: "密码以字母开头，只能包含字母、数字和下划线" },
  ],
  checkPass: [
    { required: true, message: "确认密码不能为空~" },
    { maxLength: 18, message: "确认密码不能超过18个字符~" },
    { minLength: 6, message: "确认密码至少6个字符~" },
    // { match: /^[a-zA-Z]\w{5,17}$/, message: "密码以字母开头，只能包含字母、数字和下划线" },
    {
      validator: (val, callback) => {
        if (val != registerForm.password) {
          callback("两次密码不一致~");
        }
      },
    },
  ],
  email: [
    { required: true, message: "邮箱不能为空~" },
    {
      match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: "邮箱格式不正确~",
    },
  ],
  verifiCode: [
    { required: true, message: "验证码不能为空~" },
    { maxLength: 4, message: "验证码长度为4个字符~" },
    { minLength: 4, message: "验证码长度为4个字符~" },
  ],
  verfiName: [
    { required: true, message: "个人博客地址/邮箱不能为空~" },
    {
      validator: (val, callback) => {
        let reg;
        if (val.indexOf("@") > 0) {
          reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(val)) {
            callback("邮箱格式不正确~");
          }
        } else {
          reg = /^[a-zA-Z][a-zA-Z0-9_ ]{4,15}$/;
          if (!reg.test(val)) {
            callback("必须以字母开头，只允许字母数字下划线~");
          }
        }
        return false;
      },
    },
    // { maxLength: 16, message: "个人博客地址/邮箱不能超过16个字符~"},
    // { minLength: 5, message: "个人博客地址/邮箱至少5个字符~" },
    // { match: /^\w+([-+.]\w+)*(@\w+([-.]\w+)*\.\w+([-.]\w+)*)?$/, message: "邮箱格式不正确~" },
  ],
};
</script>
<style lang="less" scoped>
:deep(.arco-input-prepend),
:deep(.arco-input-append) {
  padding: 0;
}
</style>
