<script lang="ts" setup>
defineProps<{ email?: string }>();
</script>

<template>
  <header class="site-header">
    <div class="logo-container">
      <h1 class="logo">LOGO</h1>
    </div>

    <nav class="navigation">
      <ul class="nav-list">
        <li class="nav-item">
          <RouterLink class="nav-item-link" to="/">Dashboard</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-item-link" to="/tasks"> Tasks </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  height: 3.75rem;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 0.0625rem solid hsl(var(--border));
  font-size: 0.875rem;
}

.logo-container {
  border: 0.0625rem dashed hsl(var(--border));
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-list {
  height: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  li.nav-item {
    border-radius: 0.25rem;
    overflow: hidden;

    .nav-item-link {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;

      &.active {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .site-header {
    padding: 0.75rem 1.5rem;
  }
}
</style>
