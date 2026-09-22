# Exercise: Building a Mini-Application 


## Introduction
In this exercise, we will build a **React application** that demonstrates modern data-fetching patterns using **React Query** and **TypeScript**. The app will feature a paginated todo list with loading/error states, API mocking with **Mock Service Worker (MSW)**, and comprehensive tests using **Vitest** and **Testing Library**. Additionally, you'll optimize performance using query caching and pagination while styling components with **Tailwind CSS** for responsiveness. This exercise emphasizes state management, data fetching, and testing in React applications. By the end of this exercise, you'll have a fully functional todo application with robust error handling, pagination, and a polished user interface.


## Starter Files  

The initial code is available inside the `start` folder under the `code` folder associated with this exercise. 

---

## Requirements

We'll be working with React, React Query, Tailwind CSS, and MSW to develop our web application. Here's what we need to accomplish:


### Set Up the Development Environment

We need to:

- Initialize a React project using **Vite**.
- Install necessary dependencies, including **React Query** for data fetching, **MSW** for API mocking, **Vitest** and **Testing Library** for testing, and **Tailwind CSS** for styling.
- Configure **React Query** globally for efficient state management.
- Set up **MSW** to intercept and mock API requests during testing.
- Integrate **Tailwind CSS** for responsive and accessible design.


### Build the Core Features

We need to implement the following functionalities:

1. **Data Fetching with Pagination:**

   - Use **React Query** to fetch paginated todo data from an external API.
   - Implement pagination controls to navigate between pages seamlessly.

2. **Loading/Error States:**

   - Display loading indicators while data is being fetched.
   - Handle errors gracefully with retry functionality and clear error messages.

3. **API Mocking:**
   - Use **MSW** to mock API responses for reliable testing scenarios.

4. **Comprehensive Testing:**

   - Write unit and integration tests using **Vitest** and **Testing Library**.
   - Ensure all components and hooks are thoroughly tested.

5. **Performance Optimizations:**
   - Implement query caching and pagination to enhance performance.
   - Use `keepPreviousData` to maintain a smooth user experience during page transitions.

6. **Styling with Tailwind CSS:**

   - Style the application using **Tailwind CSS** for a clean, modern, and responsive design.
   - Add hover states, animations, and visual hierarchy to improve usability.

### Test the Application

We need to verify:

- The **React Query** setup efficiently manages server state and handles pagination.
- The **MSW** mocks simulate real API responses accurately during testing.
- The **Vitest** and **Testing Library** tests cover all critical components and functionalities.
- The responsive layouts adapt to various screen sizes without breaking the UI.
- All components render properly and maintain accessibility standards.


---


## Deliverables

The deliverable of this exercise is a working React application that meets all the requirements above. We need to submit:
- The public GitHub repository containing the source code.
- Screenshots showing:
  - The app running locally with paginated todos.
  - Error handling and loading states in action.
  - Responsive layouts on different screen sizes.
- A brief README file explaining how to set up and run the app locally.
- Simple documentation for the app's functionality, testing process, and theming approach.


---

## Conclusion
Building a todo application with React Query, Tailwind CSS, and MSW is an excellent way to practice creating efficient data-fetching patterns, implementing dynamic state management, and leveraging modern testing techniques. By completing this activity, you've learned how to create a functional React app with robust error handling, pagination, and a polished user interface. These skills form the foundation for developing more complex and scalable React applications in the future.