<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ, PlusIcon } from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const router = useRouter();
const emit = defineEmits(["update-tasks", "update-sort", "update-order"]);

const inputValue = ref();

const updateValue = debounce((value: string) => {
  emit("update-tasks", value);
}, 500);

const handleTyping = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  updateValue(value);
};

const handleOrderChange = (value: unknown) => {
  emit("update-order", value);
};

const handleSortChange = (value: unknown) => {
  emit("update-sort", value);
};
</script>

<template>
  <div class="table-options">
    <h2 class="text-2xl font-medium">Dashboard</h2>

    <div class="flex lg:flex-row flex-col flex-wrapx lg:items-center gap-3">
      <div class="flex items-center gap-2">
        <Input v-model="inputValue" @input="handleTyping" class="lg:w-96 w-full" type="text" placeholder="Search" />

        <ToggleGroup type="single" @update:model-value="handleOrderChange">
          <ToggleGroupItem value="asc" aria-label="Toggle asc">
            <ArrowDownAZ class="h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem value="desc" aria-label="Toggle desc">
            <ArrowUpAZ class="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div class="flex items-center gap-2">
        <p class="text-nowrap">Sort by:</p>

        <Select @update:model-value="handleSortChange">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select an order" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button @click="router.push('/tasks/add')"><PlusIcon /> New</Button>
    </div>
  </div>
</template>

<style scoped>
.table-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

@media screen and (min-width: 1200px) {
  .table-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 0.25rem;
  }
}
</style>
