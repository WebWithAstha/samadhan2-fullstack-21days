# Samadhan 2.0 – 21 Day Full-Stack Journey

The Golus is building full-stack skills in **21 days** by creating one project every day.  
Each day has its own folder, and this README serves as the main progress log.

---

## Daily Progress

### Day 01 – JS Basics
- Folder: [`/day-01-js-basics`](./day-01-js-basics)
- Learned: Variables, data types, operators, basic console apps

### Day 02 – JS Fundamentals
- Folder: [`/day-02`](./day-02)
- Learned: Conditionals, functions, loops, mini tasks

### Day 03 – JS Advanced Concepts
- Folder: [`/day-03`](./day-03)
- Learned: Array methods, student results calculator

### Day 04 – Node.js Introduction
- Folder: [`/day-04`](./day-04)
- Learned: Node.js basics, npm init, basic HTTP server
- Mini-task: API returning "Hello, World!"

### Day 05 – Express.js Basics
- Folder: [`/day-05`](./day-05)
- Learned: Installing Express, creating routes (GET, POST)
- Mini-task: API returning a list of students (JSON)

### Day 06 – HTML & CSS Basics
- Folder: [`/day-06`](./day-06)
- Learned: HTML structure, CSS styling, responsive design basics
- Mini-task: Static student profile page

**Instructions:**  
```bash
cd day-06
# Open index.html in browser
open index.html
```

### Day 07 – React.js Setup
- Folder: [`/day-07`](./day-07)
- Learned: React installation, components, JSX, props
- Mini-task: Student card component

**Instructions:**  
```bash
cd day-07/react-app
npm install
npm run dev
```

---

### Day 08 – Lists & Events
- Folder: [`/day-08`](./day-08)
- Learned: Rendering lists with `.map`, handling events (`onClick`, `onChange`)
- Mini-task: To-Do List (local state only)

**Instructions:**  
```bash
cd day-08/react-app
npm install
npm run dev
```

---

### Day 09 – useEffect & Fetch API
- Folder: [`/day-09`](./day-09)
- Learned: useEffect basics, fetching data from Node backend
- Mini-task: Student Directory (backend + frontend)

**Instructions:**  
1. Start backend (Day 5 Express server):  
    ```bash
    cd day-05
    npm install
    node index.js
    ```

2. Start frontend:
    ```bash
    cd day-09/react-app
    npm install
    npm run dev
    ```

---


---

### Day 11 – Backend CRUD
- Folder: [`/day-11`](./day-11)
- Learned: Express routes (GET, POST, PUT, DELETE) with modular structure
- Mini Task: Student CRUD API

**Instructions:**  
```bash
cd day-11
npm install express
node index.js
```

Test API Endpoints:

GET all students → GET http://localhost:3000/students
GET one student → GET http://localhost:3000/students/:id
Add student → POST http://localhost:3000/students with JSON body
Update student → PUT http://localhost:3000/students/:id with JSON body
Delete student → DELETE http://localhost:3000/students/:id


---

