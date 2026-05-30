export type ProjectScreenshotManifestItem = {
  required: string[]
  optional?: string[]
  folder: string
}

export const projectScreenshotManifest: Record<string, ProjectScreenshotManifestItem> = {
  'portfolio-website': {
    folder: 'portfolio-website/screenshots',
    required: [
      'home-hero-desktop.png',
      'projects-archive-desktop.png',
      'taskflow-case-study-desktop.png',
      'home-mobile.png',
      'projects-mobile.png',
    ],
    optional: [
      'blog-desktop.png',
      'contact-section-desktop.png',
      'featured-projects-desktop.png',
    ],
  },
  'spring-employee-management-api': {
    folder: 'spring-employee-management-api/screenshots',
    required: [
      'swagger-overview.png',
      'employees-list-response.png',
      'departments-list-response.png',
      'positions-list-response.png',
      'employees-filtered-response.png',
      'docker-containers-running.png',
    ],
    optional: [
      'postman-collection.png',
      'validation-error-response.png',
      'standard-error-response.png',
      'pagination-example.png',
    ],
  },
  'spring-security-jwt-auth': {
    folder: 'spring-security-jwt-auth/screenshots',
    required: [
      'swagger-auth-overview.png',
      'register-success-response.png',
      'login-success-response.png',
      'refresh-token-response.png',
      'protected-endpoint-success.png',
      'admin-endpoint-success.png',
    ],
    optional: [
      'unauthorized-response.png',
      'role-based-endpoints.png',
      'docker-containers-running.png',
    ],
  },
  'python-automation-toolkit': {
    folder: 'python-automation-toolkit/screenshots',
    required: [
      'file-organizer-terminal.png',
      'readme-starter-terminal.png',
      'csv-cleaner-terminal.png',
      'file-organizer-before-after.png',
      'generated-readme-example.png',
    ],
    optional: [
      'csv-input-output-example.png',
      'tests-passing.png',
      'folder-structure.png',
    ],
  },
  'taskflow-fullstack': {
    folder: 'taskflow-fullstack/screenshots',
    required: [
      'login-page.png',
      'register-page.png',
      'dashboard-overview.png',
      'dashboard-analytics.png',
      'projects-list.png',
      'project-create-form.png',
      'board-overview.png',
      'board-task-create.png',
      'board-drag-drop.png',
      'board-member-management.png',
      'board-assignee-flow.png',
      'mobile-dashboard.png',
    ],
    optional: [
      'board-my-tasks-toggle.png',
      'board-filtered-view.png',
      'board-empty-state.png',
      'backend-swagger-overview.png',
      'local-run-workflow.png',
    ],
  },
  'commercecore-admin': {
    folder: 'commercecore-admin/screenshots',
    required: [
      'dashboard-live-api.png',
      'products-crud-table.png',
      'product-edit-form.png',
      'customers-create-list.png',
      'orders-create-form.png',
      'orders-status-update.png',
      'stock-movements-table.png',
      'swagger-overview.png',
    ],
    optional: [
      'docker-containers-running.png',
      'mobile-dashboard.png',
      'product-validation-error.png',
      'low-stock-state.png',
    ],
  },
}
