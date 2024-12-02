<script lang="ts" setup>
import { PentagonIcon, ListIcon, PlusIcon, SettingsIcon } from "lucide-vue-next";
</script>

<template>
  <div class="sidepane">
    <div class="logo-container">
      <h1 class="logo">LOGO</h1>
    </div>

    <nav class="py-4">
      <ul class="menu-list">
        <li class="menu-item">
          <RouterLink to="/" class="menu-item-link">
            <PentagonIcon :size="20" />

            <p>Dashboard</p>
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/tasks" class="menu-item-link">
            <ListIcon :size="20" />

            <p>Tasks</p>
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/tasks/add" class="menu-item-link">
            <PlusIcon :size="20" />

            <p>Add Task</p>
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/settings" class="menu-item-link">
            <SettingsIcon :size="20" />

            <p>Settings</p>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="mt-auto p-4 border-t">
      <slot name="user-profile"></slot>
    </div>
  </div>
</template>

<style scoped>
.sidepane {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo-container {
    height: 3.75rem;
    border-bottom: 0.0625rem solid hsl(var(--border));
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-list {
    display: flex;
    flex-direction: column;

    .menu-item {
      border-bottom: 0.0625rem solid hsl(var(--border));

      &:last-child {
        border-bottom: none;
      }
    }

    .menu-item-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      padding: 0.75rem;

      &:is(.active, :hover) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
    }
  }
}
</style>
