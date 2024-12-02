<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Task } from "@/lib/types/task.type";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/TaskItem.vue";
import TaskHeader from "@/components/TaskHeader.vue";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

const router = useRouter();

const tasks = ref<Task[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(0);

const orderAs = ref("asc");
const sortBy = ref("title");

const fetchTasks = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/tasks?_page=${currentPage.value}&_limit=${itemsPerPage.value}&_sort=${
        sortBy.value
      }&_order=${orderAs.value}`
    );
    const data = await response.json();
    tasks.value = data;

    const total = response.headers.get("X-Total-Count") ?? "0";
    totalItems.value = parseInt(total, 10);
  } catch (error) {
    console.error(error);
  }
};

const viewTaskDetails = (task: Task) => {
  router.push(`/tasks/${task.id}`);
};

const filterTasks = (value: string) => {
  if (!value) {
    fetchTasks();
    return;
  }

  const reg = new RegExp(value.toLowerCase(), "gi");

  tasks.value = tasks.value.filter((task) => {
    return reg.test(task?.title?.toLowerCase());
  });
};

const updateSort = (value: string) => {
  sortBy.value = value;
  fetchTasks();
};

const updateOrder = (value: string) => {
  orderAs.value = value;
  fetchTasks();
};

const onPaginate = (page: number) => {
  const pages = Math.ceil(totalItems.value / itemsPerPage.value);
  if (page >= 1 && page <= pages) {
    currentPage.value = page;
    fetchTasks();
  }
};

onMounted(fetchTasks);
</script>

<template>
  <TaskHeader @update-tasks="filterTasks" @update-sort="updateSort" @update-order="updateOrder" />

  <div v-if="tasks?.length">
    <Table>
      <TableCaption>A list of your recent tasks.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead class="w-[250px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow data-testid="task" v-for="task in tasks" :key="task.title" @click.stop="viewTaskDetails(task)">
          <TaskItem :task="task" @revalidate-task="fetchTasks" />
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
      @update:page="onPaginate"
      v-slot="{ page }"
      :total="totalItems"
      :items-per-page="itemsPerPage"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>

  <div v-else class="h-[calc(100vh-20rem)] grid place-content-center">
    <p class="text-2xl font-medium">No tasks found</p>
  </div>
</template>

<style scoped></style>
