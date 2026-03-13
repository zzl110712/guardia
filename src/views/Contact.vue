<template>
  <div class="contact">
    <a-card title="联系我们" class="card">
      <a-form
        :model="form"
        :rules="rules"
        @finish="onFinish"
      >
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="form.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="form.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="消息" name="message">
          <a-textarea v-model:value="form.message" placeholder="请输入消息" rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  message: [{ required: true, message: '请输入消息', trigger: 'blur' }]
}

const onFinish = (values: any) => {
  console.log('提交成功:', values)
}
</script>

<style scoped>
.contact {
  padding: 24px;
}

.card {
  margin-bottom: 24px;
}
</style>