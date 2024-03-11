<template>
  <div>
    <a-form :model="loginForm" @submit-success="submit">
      <a-form-item
        label="竞赛题目"
        :style="{ width: '400px' }"
        :rules="{ require: true }"
      >
        <a-input size="large" v-model="loginForm.name" />
      </a-form-item>

      <a-form-item
        label="考试时长"
        :rules="{ require: true }"
        :style="{ width: '400px' }"
      >
        <a-input-number size="large" v-model="loginForm.time" :step="10">
          <template #append> 分钟 </template>
        </a-input-number>
      </a-form-item>

      <a-form-item
        label="开始时间"
        :rules="{ require: true }"
        :style="{ width: '400px' }"
      >
        <a-date-picker show-time size="large" v-model="loginForm.startTime" />
      </a-form-item>
      <a-form-item
        label="总分"
        :rules="{ require: true }"
        :style="{ width: '400px' }"
      >
        <a-input-number
          show-time
          size="large"
          :step="10"
          v-model="loginForm.totalPoints"
        />
      </a-form-item>

      <a-form-item :rules="{ require: true }" :hide-label="true">
        <a-table
          :row-selection="rowSelection"
          v-model:selectedKeys="loginForm._questions"
          :columns="columns"
          :data="data"
          row-key="_id"
        >
        </a-table>
      </a-form-item>

      <a-button
        type="primary"
        html-type="sumbit"
        style="height: 44px; font-size: 16px; width: 200px"
        size="large"
        >上传</a-button
      >
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
import { addPaper, getQuestionAll } from "@/apis/apis.js";
import { Message } from "@arco-design/web-vue";
import { addQues } from "@/apis/apis.js";
const loginForm = reactive({
  type: "single",
  _questions: [],
});
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});
const submit = async () => {
  const res = await addPaper(loginForm);
  if (res.data.status === 0) {
    Message.success("添加成功");
  } else {
    Message.error("添加失败");
  }
  // console.log(res);
};

const data = ref([]);
const columns = [
  {
    title: "题目内容",
    dataIndex: "content",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "分值",
    dataIndex: "score",
  },
  {
    title: "类型",
    dataIndex: "type",
  },
  {
    title: "选项",
    dataIndex: "selection",
  },
  //   {
  //     title: "操作",
  //   },
];
watchEffect(() => {
  getTable();
});

async function getTable() {
  const res = await getQuestionAll();
  //   console.log(res);
  data.value = res.data.data;
}
</script>

<style lang="scss" scoped></style>
