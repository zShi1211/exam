<template>
  <div>
    <a-input
      placeholder="关键词查询"
      v-model="search"
      style="width: 400px; margin-bottom: 10px"
    />
    <a-table :columns="columns" :data="data">
      <template #gender="{ record }">
        <span> {{ record.gender ? "女" : "男" }}</span>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-popconfirm content="确定要删除吗？" @ok="ondelete(record)">
            <a-button status="danger">删除</a-button>
          </a-popconfirm>

          <a-button status="warning" @click="onEdit(record)">编辑</a-button>
        </a-space>
      </template>
    </a-table>
    <a-drawer
      :width="340"
      :visible="visible"
      @cancel="visible = false"
      @ok="submit"
      unmountOnClose
      :footer="false"
    >
      <template #title> 修改用户信息 </template>
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
import { ref, watchEffect } from "vue";
import { getStuAll, deleteStu, updateStudent } from "@/apis/apis.js";
import { Message } from "@arco-design/web-vue";
const search = ref("");
const visible = ref(false);
const registerForm = ref({});

const data = ref([]);
const columns = [
  {
    title: "用户昵称",
    dataIndex: "nickname",
  },

  {
    title: "用户账号",
    dataIndex: "username",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  //   {
  //     title: "操作",
  //   },
  {
    title: "性别",
    slotName: "gender",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
watchEffect(() => {
  getTable();
});

async function getTable() {
  const res = await getStuAll({
    content: search.value,
  });
  //   console.log(res);
  data.value = res.data.data;
}

async function ondelete(record) {
  //   console.log(record);
  const res = await deleteStu({
    id: record._id,
  });
  Message.success("删除成功");
  //   console.log(res);
  getTable();
}
const loading = ref(false);

async function onEdit(record) {
  visible.value = true;
  registerForm.value = { ...record };
}
const submit = async () => {
  try {
    loading.value = true;

    const { data } = await updateStudent({
      gender: registerForm.value.gender,
      age: registerForm.value.age,
      nickname: registerForm.value.nickname,
      username: registerForm.value.username,
      id: registerForm.value._id,
    });
    if (data.status == 0) {
      Message.success("修改成功");
      getTable();

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
</script>

<style lang="scss" scoped></style>
