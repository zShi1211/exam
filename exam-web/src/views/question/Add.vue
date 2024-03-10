<template>
  <div>
    <a-form
      :model="loginForm"
      :style="{ width: '600px' }"
      @submit-success="submit"
    >
      <a-form-item label="题目内容" width="100px">
        <a-textarea size="large" v-model="loginForm.content" />
      </a-form-item>

      <a-form-item label="题目类型">
        <a-radio-group v-model="loginForm.type">
          <a-radio value="single" :default-checked="true">单选</a-radio>
          <a-radio value="Q&A">填空</a-radio>
          <a-radio value="judgement">判断</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="选项" v-if="loginForm.type === 'single'">
        <a-textarea size="large" v-model="loginForm.selection" />
      </a-form-item>

      <a-form-item label="答案">
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
      <a-form-item label="分数">
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
const loginForm = reactive({
  type: "single",
});

const submit = async () => {
  const res = await addQues({
    ...loginForm,
    selection: loginForm.selection.split(";"),
  });
  Message.success("成功");

  console.log(res);
};
</script>

<style lang="scss" scoped></style>
