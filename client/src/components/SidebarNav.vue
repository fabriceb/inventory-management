<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="sidebar-logo" v-if="!isCollapsed">
        <h1>{{ t('nav.companyName') }}</h1>
        <span class="sidebar-subtitle">{{ t('nav.subtitle') }}</span>
      </div>
      <span v-else class="sidebar-logo-icon">CC</span>
      <button
        class="collapse-toggle"
        @click="toggleCollapse"
        :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Chevron left icon; CSS rotates it 180deg when collapsed -->
          <path d="M12.5 5L7.5 10L12.5 15" />
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <!-- Overview / Dashboard -->
      <router-link to="/" class="nav-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- 4-square grid / dashboard icon -->
          <rect x="2" y="2" width="7" height="7" rx="1" />
          <rect x="11" y="2" width="7" height="7" rx="1" />
          <rect x="2" y="11" width="7" height="7" rx="1" />
          <rect x="11" y="11" width="7" height="7" rx="1" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">{{ t('nav.overview') }}</span>
      </router-link>

      <!-- Inventory -->
      <router-link to="/inventory" class="nav-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Box / package with open top -->
          <path d="M3 7L10 3L17 7V15L10 19L3 15V7Z" />
          <path d="M10 3V19" />
          <path d="M3 7L10 11L17 7" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">{{ t('nav.inventory') }}</span>
      </router-link>

      <!-- Orders -->
      <router-link to="/orders" class="nav-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Clipboard with lines -->
          <rect x="4" y="3" width="12" height="15" rx="1.5" />
          <path d="M7.5 3.5V2.5C7.5 2 7.8 1.5 8.5 1.5H11.5C12.2 1.5 12.5 2 12.5 2.5V3.5" />
          <path d="M7 9H13" />
          <path d="M7 12H13" />
          <path d="M7 15H10" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">{{ t('nav.orders') }}</span>
      </router-link>

      <!-- Finance / Spending -->
      <router-link to="/spending" class="nav-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Dollar sign inside circle -->
          <circle cx="10" cy="10" r="7.5" />
          <path d="M10 6V7M10 13V14" />
          <path d="M8 8.5C8 7.7 8.9 7 10 7C11.1 7 12 7.7 12 8.5C12 9.3 11.1 10 10 10C8.9 10 8 10.7 8 11.5C8 12.3 8.9 13 10 13C11.1 13 12 12.3 12 11.5" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">{{ t('nav.finance') }}</span>
      </router-link>

      <!-- Demand Forecast -->
      <router-link to="/demand" class="nav-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Trending-up line with arrowhead -->
          <path d="M2 14L7 9L11 12L17 6" />
          <path d="M13 6H17V10" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">{{ t('nav.demandForecast') }}</span>
      </router-link>

      <!-- Reports -->
      <router-link to="/reports" class="nav-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Three vertical bars of different heights (bar chart) -->
          <path d="M3 17V10" />
          <path d="M3 10H7V17H3" />
          <path d="M8 17V5" />
          <path d="M8 5H12V17H8" />
          <path d="M13 17V8" />
          <path d="M13 8H17V17H13" />
          <path d="M2 17H18" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">{{ t('nav.reports') }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <LanguageSwitcher :compact="isCollapsed" :dark-theme="true" />
      <ProfileMenu
        :compact="isCollapsed"
        :dark-theme="true"
        @show-profile-details="$emit('show-profile-details')"
        @show-tasks="$emit('show-tasks')"
      />
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ProfileMenu from './ProfileMenu.vue'

const { t } = useI18n()

const STORAGE_KEY = 'sidebar-collapsed'
const MOBILE_BREAKPOINT = 768

const isCollapsed = ref(localStorage.getItem(STORAGE_KEY) === 'true')

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem(STORAGE_KEY, isCollapsed.value)
}

// Auto-collapse on narrow viewports only if no stored preference
const checkMobile = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null && window.innerWidth < MOBILE_BREAKPOINT) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

defineEmits(['show-profile-details', 'show-tasks'])
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background: #0f172a;
  color: #94a3b8;
  border-right: 1px solid #1e293b;
  transition: width 0.2s ease, min-width 0.2s ease;
  z-index: 100;
  overflow: visible;
}

.sidebar.collapsed {
  width: 72px;
  min-width: 72px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #1e293b;
  min-height: 64px;
  gap: 0.5rem;
}

.sidebar-logo h1 {
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  white-space: nowrap;
  letter-spacing: -0.025em;
  line-height: 1.3;
}

.sidebar-subtitle {
  font-size: 0.688rem;
  color: #64748b;
  display: block;
  white-space: nowrap;
}

.sidebar-logo-icon {
  font-size: 1.125rem;
  font-weight: 700;
  color: #f8fafc;
  white-space: nowrap;
}

.collapse-toggle {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.375rem;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.collapse-toggle:hover {
  background: #1e293b;
  color: #f8fafc;
}

.collapse-toggle svg {
  transition: transform 0.2s ease;
}

/* Rotate chevron when sidebar is collapsed so it points right */
.sidebar.collapsed .collapse-toggle svg {
  transform: rotate(180deg);
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  overflow-y: auto;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 8px;
  transition: all 0.15s ease;
  white-space: nowrap;
  position: relative;
}

.sidebar.collapsed .sidebar-nav a {
  justify-content: center;
  padding: 0.625rem;
}

.sidebar-nav a:hover {
  background: #1e293b;
  color: #f8fafc;
}

/* Active state via Vue Router's exact-active class */
.sidebar-nav a.router-link-exact-active {
  background: #1e293b;
  color: #f8fafc;
  font-weight: 600;
}

.sidebar-nav a.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25rem;
  bottom: 0.25rem;
  width: 3px;
  background: #3b82f6;
  border-radius: 0 2px 2px 0;
}

.sidebar-nav a svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-label {
  overflow: hidden;
}

.sidebar-footer {
  padding: 0.75rem;
  border-top: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 200;
  }
}
</style>
