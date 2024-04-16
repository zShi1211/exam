<template>
  <div>
    <a-input
      placeholder="关键词查询"
      v-model="search"
      style="width: 400px; margin-bottom: 10px"
    />
    <a-table :columns="columns" :data="data">
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            @click="
              router.push({ name: 'question-add', query: { id: record._id } })
            "
            >编辑</a-button
          >
          <a-button @click="ondelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getQuestionAll, deleteQuestion } from "@/apis/apis.js";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
const router = useRouter();

console.log(router);
const data = ref([]);
const search = ref("");
const columns = [
  {
    title: "题目内容",
    dataIndex: "content",
  },
  {
    title: "类型",
    dataIndex: "type",
  },
  {
    title: "选项",
    dataIndex: "selection",
  },
  {
    title: "分值",
    dataIndex: "score",
  },

  {
    title: "答案",
    dataIndex: "answer",
  },
  //   {
  //     title: "操作",
  //   },
  {
    title: "操作",
    slotName: "optional",
  },
];
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

async function ondelete(record) {
  //   console.log(record);
  const res = await deleteQuestion({
    id: record._id,
  });
  Message.success("成功");
  //   console.log(res);
  getTable();
}
</script>

<style lang="scss" scoped></style>
