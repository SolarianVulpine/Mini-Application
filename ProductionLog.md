# Production Log

## 1. Project Planning and Scope

### Date: `9-23-26`

- [x] Decide on App Functionality
- [x] Wireframe Pages

App will be the queue for previous project's custom products

![Wireframes](code/start/BuildAMiniApplication/public/images/wireframes.png)

## 2. Reconcile the Product Vision with the Exercise Requirements

- [ ] Keep the existing workshop storefront, dynamic light/dark theme, and `workshop.jpg` hero image
- [ ] Define the authenticated queue as the worker-only workflow, replacing the README's generic todo list with workshop order items.
- [ ] Map the README deliverables to the queue: React Query for server state, MSW for API behavior, Vitest and Testing Library for coverage, and Tailwind CSS for responsive styling.
- [x] Keep Home, About, Cart, and Products public; restrict only the queue route to authenticated workshop workers.
- [x] Scaffold files and directories

## 3. Establish the Queue Data Contract

- [ ] Define an order item type with an id, title, description, status, created date, and completion metadata where needed.
- [ ] Define the supported statuses and permitted transitions, including the completed state.
- [ ] Add paginated list, detail, create, update, status update, complete, and delete request shapes.

## 4. Add Mocked Worker Authentication

- [ ] Build a workshop worker login screen that matches the existing theme and uses the current visual language.
- [ ] Add a mocked authentication response and a persisted worker session for local development.
- [ ] Protect the queue route and redirect unauthenticated visitors to login without exposing queue data in the public navigation.
- [ ] Add logout behavior and clear the worker session when requested.

## 5. Build the React Query and MSW Data Layer

- [ ] Configure a global React Query client.
- [ ] Add MSW handlers for authentication and queue CRUD operations.
- [ ] Implement paginated queue queries with caching and `keepPreviousData` behavior.
- [ ] Invalidate or update the relevant queries after create, edit, status, completion, and delete mutations.
- [ ] Add loading, error, retry, empty, and mutation-feedback states.

## 6. Implement the Worker Queue Experience

- [ ] Create a responsive two-pane queue page with the item list on the left and selected-item details on the right.
- [ ] Show the selected item's title, description, and order status using the existing cards, buttons, badges, spacing, and theme tokens.
- [ ] Add edit controls for title and description.
- [ ] Add status updates and a clear mark-as-complete action.
- [ ] Add an accessible confirmation step requiring the worker to acknowledge that deletion cannot be reversed.
- [ ] Add an always-visible action to open the new-item form.
- [ ] Preserve the workshop hero image and dynamic theme behavior where they support the queue experience without overwhelming the work-focused layout.

## 7. Cover Responsive and Accessible Workflows

- [ ] Make the queue usable on narrow screens by stacking the list and detail views without losing selection context.
- [ ] Support keyboard navigation, visible focus states, labeled form controls, and screen-reader-friendly status and confirmation messaging.
- [ ] Verify light and dark themes across login, queue, forms, dialogs, loading states, and errors.

## 8. Add Automated Tests

- [ ] Add Vitest and Testing Library configuration and scripts.
- [ ] Test worker login, protected-route behavior, logout, and session persistence.
- [ ] Test queue pagination, selection, loading, error, retry, and empty states.
- [ ] Test create, edit, status update, completion, and irreversible-delete confirmation flows.
- [ ] Test responsive-critical rendering and accessible names for the primary controls.

## 9. Document and Verify the Deliverables

- [ ] Update the README with setup, development, test, mock API, authentication, queue, and theming instructions.
- [ ] Capture screenshots of the worker login, populated queue, loading/error states, light/dark themes, and responsive layouts.
- [ ] Run lint, type-check, production build, and the full test suite.
- [ ] Confirm Home, About, Cart, and Products remain accessible publicly while the queue remains worker-only before submission.
