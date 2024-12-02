<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Task } from "@/lib/types/task.type";
import { Badge } from "@/components/ui/badge";

const route = useRoute();

const task = ref<Task>();

const fetchTaskById = async (id: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks/${id}`);
    const data = await response.json();
    task.value = data;
  } catch (error) {
    console.error(error);
  }
};

const id = route.params.id as string;

onMounted(async () => await fetchTaskById(id));
</script>

<template>
  <h2 class="text-2xl font-bold mb-6">Task details</h2>

  <div>
    <dl class="detail-list">
      <div class="detail-item">
        <dt>Title</dt>
        <dd>{{ task?.title }}</dd>
      </div>

      <div class="detail-item">
        <dt>Description</dt>
        <dd>
          {{ task?.description }}
        </dd>
      </div>

      <div class="detail-item">
        <dt>Status</dt>
        <dd>
          <Badge>{{ task?.status }}</Badge>
        </dd>
      </div>

      <div class="detail-item">
        <dt>Priority</dt>
        <dd>{{ task?.priority}}</dd>
      </div>

      <div class="detail-item">
        <dt>Due date</dt>
        <dd>{{ task?.dueDate}}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.detail-list {
  .detail-item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    justify-content: space-between;
    gap: 1.5rem;
    border-bottom: 0.0625rem solid hsl(var(--border));
    padding: 1.5rem;

    dt {
      font-weight: 600;
    }

    dd {
      font-stretch: condensed;
      text-wrap: balance;
    }
  }
}
</style>
