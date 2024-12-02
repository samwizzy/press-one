<script setup lang="ts">
import { RouterView } from "vue-router";

import Navbar from "./components/Navbar.vue";
import SidePane from "./components/SidePane.vue";
import ProfileMenu from "./components/ProfileMenu.vue";
</script>

<template>
  <div class="site-layout">
    <aside class="sidebar-pane">
      <SidePane>
        <!-- demonstrate the use of slot -->
        <template #user-profile>
          <ProfileMenu />
        </template>
      </SidePane>
    </aside>

    <div class="main-container">
      <Navbar />

      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.site-layout {
  --sidebarWidth: 14.125rem;

  display: flex;

  .sidebar-pane {
    position: fixed;
    width: var(--sidebarWidth);
    height: 100vh;
    border-right: 0.0625rem solid #ddd;
  }

  .main-container {
    width: calc(100% - var(--sidebarWidth));
    margin-left: var(--sidebarWidth);
  }
}
</style>
