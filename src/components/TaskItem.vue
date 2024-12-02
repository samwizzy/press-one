<script setup lang="ts">
import { ref, computed } from "vue";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "vee-validate";
import { toDate } from "radix-vue/date";
import { toTypedSchema } from "@vee-validate/zod";

import { Task } from "@/lib/types/task.type";
import { PriorityEnum } from "@/lib/enums/priority.enum";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, EditIcon, TrashIcon } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const isOpen = ref(false);

const { task } = defineProps<{ task: Task }>();
const emit = defineEmits(["revalidate-task"]);

const editTaskDetails = (task: Task) => {
  task;
  isOpen.value = true;
};

const deleteTaskDetails = async (task: Task) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks/${task.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    emit("revalidate-task");
  }
};

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const placeholder = ref();

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    priority: z.enum([PriorityEnum.Low, PriorityEnum.Medium, PriorityEnum.High]),
    dueDate: z.string().date(),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: task.title,
    description: task.description,
    priority: task.priority as PriorityEnum,
    dueDate: task.dueDate,
  },
});

const value = computed({
  get: () => (form.values.dueDate ? parseDate(form.values.dueDate) : undefined),
  set: (val) => val,
});

const onSubmit = form.handleSubmit(async (values) => {
  const payload = { ...values, status: task.status };
  const id = parseInt(task.id);

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    isOpen.value = false;
    emit("revalidate-task");
  }
});
</script>

<template>
  <TableCell class="font-medium">{{ task.title }}</TableCell>
  <TableCell>
    <Badge>{{ task.status }}</Badge>
  </TableCell>
  <TableCell>{{ task.priority }}</TableCell>
  <TableCell>{{ task.dueDate }}</TableCell>

  <TableCell class="text-right">
    <div class="flex items-center gap-6">
      <Button variant="outline" size="icon" @click.stop="editTaskDetails(task)">
        <EditIcon />
      </Button>

      <Button
        class="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        variant="outline"
        size="icon"
        @click.stop="deleteTaskDetails(task)"
      >
        <TrashIcon />
      </Button>
    </div>
  </TableCell>

  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription> Make changes to your profile here. Click save when you're done. </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>

            <FormControl>
              <Input data-testid="title" type="text" placeholder="Complete my assessment" v-bind="componentField" />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>

            <FormControl>
              <Textarea data-testid="description" placeholder="Type your message here." v-bind="componentField" />
            </FormControl>

            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="priority">
          <FormItem>
            <FormLabel>Priority</FormLabel>

            <Select data-testid="priority" v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="dueDate">
          <FormItem class="flex flex-col mt-4">
            <FormLabel>Due date</FormLabel>

            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    data-testid="dueDate"
                    variant="outline"
                    :class="cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground')"
                  >
                    <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>

              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-bind="componentField"
                  v-model:placeholder="placeholder"
                  v-model="value"
                  calendar-label="Due date"
                  initial-focus
                  :min-value="new CalendarDate(1900, 1, 1)"
                  :max-value="today(getLocalTimeZone())"
                  @update:model-value="(v: unknown) => {
                    if (v) {
                      form.setFieldValue('dueDate', v.toString())
                    }
                    else {
                      form.setFieldValue('dueDate', undefined)
                    }
                  }"
                />
              </PopoverContent>
            </Popover>

            <FormDescription> Your date of birth is used to calculate your age. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="mt-8">Submit</Button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
