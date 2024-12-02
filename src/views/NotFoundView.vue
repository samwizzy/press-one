<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <section class="h-[calc(100vh-6.75rem)] grid place-content-center text-center">
    <h2 class="text-4xl font-bold mb-4">404 Not found</h2>

    <p class="text-lg text-gray-600 mb-6">This page does not exist</p>

    <RouterLink to="/">
      <Button variant="outline" class="w-full">Go Home</Button>
    </RouterLink>
  </section>
</template>

<style scoped></style>
