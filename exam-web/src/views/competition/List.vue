<template>
  <div>
    <a-input
      placeholder="关键词查询"
      v-model="search"
      style="width: 400px; margin-bottom: 10px"
    />
    <a-table :columns="columns" :data="data">
      <template #optional="{ record }">
        <a-button @click="ondelete(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getPaperAll, deletePaper } from "@/apis/apis.js";
import { Message } from "@arco-design/web-vue";
const search = ref("");

const data = ref([]);
const columns = [
  {
    title: "竞赛题目",
    dataIndex: "name",
  },

  {
    title: "考试时长(分)",
    dataIndex: "time",
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
  },
  //   {
  //     title: "操作",
  //   },
  {
    title: "总分",
    dataIndex: "totalPoints",
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
  const res = await getPaperAll({
    content: search.value,
  });
  //   console.log(res);
  data.value = res.data.data;
}

async function ondelete(record) {
  //   console.log(record);
  const res = await deletePaper({
    id: record._id,
  });
  Message.success("成功");
  //   console.log(res);
  getTable();
}
</script>

<style lang="scss" scoped></style>
