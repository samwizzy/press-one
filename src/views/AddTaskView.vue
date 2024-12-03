<script setup lang="ts">
import { ref, computed } from "vue";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toDate } from "radix-vue/date";
import { toTypedSchema } from "@vee-validate/zod";

import { StatusEnum } from "@/lib/enums/status.enum";
import { PriorityEnum } from "@/lib/enums/priority.enum";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const router = useRouter();

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
});

const value = computed({
  get: () => (form.values.dueDate ? parseDate(form.values.dueDate) : undefined),
  set: (val) => val,
});

const onSubmit = form.handleSubmit(async (values) => {
  const payload = { ...values, status: StatusEnum.Todo };

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    router.push("/tasks");
  }
});
</script>

<template>
  <h2 class="text-2xl font-medium mb-6">Add Task</h2>

  <section class="grid grid-cols-12 gap-6">
    <div class="lg:col-span-7 col-span-12 lg:border-r lg:pr-6">
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>

            <FormControl>
              <Input type="text" placeholder="Complete my assessment" v-bind="componentField" />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>

            <FormControl>
              <Textarea placeholder="Type your message here." v-bind="componentField" />
            </FormControl>

            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="priority">
          <FormItem>
            <FormLabel>Priority</FormLabel>

            <Select v-bind="componentField">
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

            <FormDescription> Your due date is used to calculate escalation. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="mt-8">Submit</Button>
      </form>
    </div>

    <div class="lg:col-span-5 col-span-12"></div>
  </section>
</template>

<style scoped></style>
