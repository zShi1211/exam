<template>
  <div>
    <a-form :model="loginForm" @submit-success="submit">
      <a-form-item
        label="竞赛题目"
        field="name"
        :style="{ width: '450px' }"
        :rules="{ required: true }"
      >
        <a-input size="large" v-model="loginForm.name" />
      </a-form-item>

      <a-form-item
        label="考试时长"
        field="time"
        :rules="{ required: true }"
        :style="{ width: '450px' }"
      >
        <a-input-number size="large" v-model="loginForm.time" :step="10">
          <template #append> 分钟 </template>
        </a-input-number>
      </a-form-item>

      <a-form-item
        label="开始时间"
        field="startTime"
        :rules="{ required: true }"
        :style="{ width: '450px' }"
      >
        <a-date-picker show-time size="large" v-model="loginForm.startTime" />
      </a-form-item>
      <a-form-item
        label="总分"
        :rules="{ required: true }"
        :style="{ width: '450px' }"
      >
        <a-input-number
          show-time
          size="large"
          :step="10"
          v-model="loginForm.totalPoints"
        />
      </a-form-item>
      <a-input
        placeholder="题目关键词查询"
        v-model="search"
        style="width: 400px; margin-bottom: 10px"
      />
      <a-form-item
        field="_questions"
        :rules="{ required: true }"
        :hide-label="true"
      >
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
import { useRouter } from "vue-router";
const router = useRouter();
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
  if (loginForm._questions.length <= 0) {
    Message.error("请添加题目");
    return;
  }
  const res = await addPaper(loginForm);

  if (res.data.status === 0) {
    Message.success("添加成功");
    router.push({
      name: "competition-list",
    });
  } else {
    Message.error(res.data.msg);
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
const search = ref("");

watchEffect(() => {
  getTable();
});
async function getTable() {
  const res = await getQuestionAll({
    content: search.value,
  });
  //   console.log(res);
  data.value = res.data.data;
}
</script>

<style lang="scss" scoped></style>
