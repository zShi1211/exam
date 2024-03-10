<template>
  <div class="header-wrap">
    <div class="header">
      <!-- logo -->
      <div style="height: 100%; display: flex">
        <router-link to="/" class="header-logo">
          <img src="../assets/svg/logo.svg" style="height: 30px" />
          <h1 class="name">竞赛系统</h1>
        </router-link>
        <!-- 导航区 -->
        <!-- <ul class="header-nav">
                    <li>
                        <router-link to="/home">
                            首页
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/course/student">
                            课程中心
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home">
                            题库查询
                        </router-link>
                    </li>
                </ul> -->
      </div>
      <!-- 信息区 -->
      <ul class="header-info">
        <li class="header-search">
          <!-- <a-input-search :style="{width:'320px'}" placeholder="搜索一下吧~~~" search-button /> -->
        </li>
        <li>
          <a-tooltip
            :content="
              theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
            "
          >
            <a-button
              class="nav-btn"
              type="outline"
              :shape="'circle'"
              @click="handleToggleTheme"
            >
              <template #icon>
                <icon-moon-fill v-if="theme === 'dark'" />
                <icon-sun-fill v-else />
              </template>
            </a-button>
          </a-tooltip>
        </li>
        <li>
          <a-tooltip
            :content="isFullscreen ? '点击退出全屏模式' : '点击切换全屏模式'"
          >
            <a-button
              class="nav-btn"
              type="outline"
              :shape="'circle'"
              @click="toggleFullScreen"
            >
              <template #icon>
                <icon-fullscreen-exit v-if="isFullscreen" />
                <icon-fullscreen v-else />
              </template>
            </a-button>
          </a-tooltip>
        </li>

        <li>
          <a-dropdown trigger="hover">
            <div class="user-info">
              你好，
              <p class="user-name">
                {{
                  userStore.userInfo?.nickname ||
                  userStore.userInfo?.username ||
                  "未登录"
                }}
              </p>
            </div>
            <template #content>
              <a-doption v-if="userStore.userInfo?.type == 0">
                <a-space @click="visible = true">
                  <icon-user />
                  <span> 修改信息 </span>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space @click="logout">
                  <icon-export />
                  <span> 退出登录 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </li>
      </ul>
    </div>
    <a-drawer
      :width="340"
      :visible="visible"
      @cancel="visible = false"
      @ok="submit"
      unmountOnClose
      :footer="false"
    >
      <template #title> 修改个人信息 </template>
      <div>
        <a-form :model="registerForm" ref="register" @submit-success="submit">
          <a-form-item field="username" :hide-label="false" label="账号">
            <a-input
              size="large"
              v-model="registerForm.username"
              placeholder="输入登录账号"
            >
            </a-input>
          </a-form-item>
          <a-form-item field="nickname" :hide-label="false" label="昵称">
            <a-input
              size="large"
              v-model="registerForm.nickname"
              placeholder="输入昵称"
            >
            </a-input>
          </a-form-item>
          <a-form-item field="gender" :hide-label="false" label="性别">
            <a-radio-group v-model="registerForm.gender">
              <a-radio :value="true">女</a-radio>
              <a-radio :value="false">男</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="age" :hide-label="false" label="年龄">
            <a-input
              size="large"
              v-model="registerForm.age"
              placeholder="输入年龄"
            >
            </a-input>
          </a-form-item>
          <!-- <a-form-item
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
          </a-form-item> -->

          <a-button
            type="primary"
            html-type="sumbit"
            style="height: 44px; font-size: 16px"
            size="large"
            :loading="loading"
            >提交</a-button
          >
        </a-form>
      </div>
    </a-drawer>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import useUserStore from "../sotre/user-store";
import AuthCard from "./auth/AuthCard.vue";
import { computed, ref, watchEffect, reactive } from "vue";
import { useDark, useToggle, useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
import { Message } from "@arco-design/web-vue";
import { updateStudent, getSInfo } from "@/apis/apis.js";
const visible = ref(false);
const userStore = useUserStore();
const router = useRouter();
const registerForm = ref({});
const theme = computed(() => {
  return userStore.theme;
});
const loading = ref(false);
const submit = async () => {
  try {
    loading.value = true;

    const { data } = await updateStudent({
      gender: registerForm.value.gender,
      age: registerForm.value.age,
      nickname: registerForm.value.nickname,
      username: registerForm.value.username,
      id: userStore.userInfo._id,
    });
    if (data.status == 0) {
      Message.success("修改成功");
      const r = await getSInfo({
        id: userStore.userInfo._id,
      });
      console.log(r.data.data);
      userStore.userInfo = r.data.data;
      // userInfo = r.data.data;
      visible.value = false;
    } else {
      Message.error("修改失败");
    }
  } catch (error) {
    Message.error("修改失败");
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const logout = () => {
  router.push({ name: "Login" });
  userStore.logOut();
};
watchEffect(() => {
  registerForm.value = {
    ...userStore.userInfo,
  };
});
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
const isDark = useDark({
  selector: "body",
  attribute: "arco-theme",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "arco-theme",
  onChanged(dark) {
    // overridden default behavior
    userStore.toggleTheme(dark);
  },
});
const toggleTheme = useToggle(isDark);
const handleToggleTheme = () => {
  toggleTheme();
};
</script>
<style lang="less" scope>
:deep(.arco-trigger-popup) {
  padding: 10px;
}
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
a {
  text-decoration: none;
  color: inherit;
}
.header-wrap {
  background-color: var(--color-bg-1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  color: var(--color-text-2);
  padding: 0 30px;
  z-index: 99;
  .header {
    display: flex;
    height: 100%;
    justify-content: space-between;

    .header-logo {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .name {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        margin-left: 10px;
        color: var(--color-text-2);
      }
    }

    .header-nav {
      display: flex;
      align-items: center;

      li {
        padding: 10px 15px;
        margin: 0 2px;
        border-radius: 4px;
        transition: all 0.3s;

        &:hover {
          background-color: var(--color-fill-2);
        }
      }
    }

    .header-info {
      display: flex;
      align-items: center;
      .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
        font-size: 16px;
      }
      li {
        margin: 0 10px;
      }
      .user-info {
        display: flex;
        align-items: center;
        .avatar {
          flex-shrink: 0;
        }
        .user-name {
          margin-left: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
