<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowDownAZ, ArrowUpAZ, PlusIcon } from "lucide-vue-next";

const router = useRouter();
const emit = defineEmits(["update-tasks", "update-sort"]);

const inputValue = ref();

const updateValue = debounce((value: string) => {
  emit("update-tasks", value);
}, 500);

const handleTyping = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  updateValue(value);
};

const handleSortChange = (value: unknown) => {
  emit("update-sort", value);
};
</script>

<template>
  <div class="table-options">
    <h2 data-testid="heading" class="text-2xl font-medium">Dashboard</h2>

    <div class="flex items-center gap-3">
      <Input v-model="inputValue" @input="handleTyping" class="lg:w-96 sm:w-auto" type="text" placeholder="Search" />

      <ToggleGroup type="single" @update:model-value="handleSortChange">
        <ToggleGroupItem value="asc" aria-label="Toggle asc">
          <ArrowDownAZ class="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem value="desc" aria-label="Toggle desc">
          <ArrowUpAZ class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Button @click="router.push('/tasks/add')"><PlusIcon /> New</Button>
    </div>
  </div>
</template>

<style scoped>
.table-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 0.25rem;
  margin-bottom: 1.5rem;
}
</style>
