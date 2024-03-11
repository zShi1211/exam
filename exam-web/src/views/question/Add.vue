<template>
  <div>
    <a-form
      :model="loginForm"
      :style="{ width: '600px' }"
      @submit-success="submit"
    >
      <a-form-item
        label="题目内容"
        width="100px"
        field="content"
        :rules="{ required: true }"
      >
        <a-textarea size="large" v-model="loginForm.content" />
      </a-form-item>

      <a-form-item label="题目类型" field="type" :rules="{ required: true }">
        <a-radio-group v-model="loginForm.type">
          <a-radio value="single" :default-checked="true">单选</a-radio>
          <a-radio value="Q&A">填空</a-radio>
          <a-radio value="judgement">判断</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        field="selection"
        :rules="{ required: true }"
        label="选项"
        v-if="loginForm.type === 'single'"
      >
        <a-textarea size="large" v-model="loginForm.selection" />
      </a-form-item>

      <a-form-item label="答案" field="answer" :rules="{ required: true }">
        <a-input
          size="large"
          v-model="loginForm.answer"
          v-if="loginForm.type !== 'judgement'"
        />
        <a-radio-group v-model="loginForm.answer" v-else>
          <a-radio value="0">对</a-radio>
          <a-radio value="1">错</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="分数" field="score" :rules="{ required: true }">
        <a-input size="large" v-model="loginForm.score" />
      </a-form-item>

      <a-button
        type="primary"
        html-type="sumbit"
        style="height: 44px; font-size: 16px; width: 200px; margin-left: 130px"
        size="large"
        >上传</a-button
      >
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { addQues } from "@/apis/apis.js";
import { useRouter } from "vue-router";
const router = useRouter();
const loginForm = reactive({
  type: "single",
});

const submit = async () => {
  const res = await addQues({
    ...loginForm,
    selection: loginForm.selection?.split(";"),
  });
  if (res.data.status === 0) {
    Message.success("添加成功");
    router.push({
      name: "question-list",
    });
  } else {
    Message.error("添加失败");
  }
};
</script>

<style lang="scss" scoped></style>
