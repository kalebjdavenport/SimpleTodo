
class TodoItem {
    constructor(id, name, description) {
        this.id = id
        this.name = name
        this.description = description
    }
}

const state = {
    curr_id: 1,
    completeTodos: [],
    incompleteTodos: [],
}


const list = document.getElementById('todo-list')
const todoBtn = document.querySelector('#inactive')
const todoFormDiv = document.querySelector('#active')
const todoFormSubmit = document.querySelector('#todoFormSubmit')
const newTodoContainer = document.querySelector('.todo-new-container')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Form Fields
const nameField = document.querySelector('#name')
const descriptionField = document.querySelector('#description')

// Enter handling
const input = document.getElementById("description")
input.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault()
    document.getElementById("todoFormSubmit").click()
  }
})

// Show form to add new todo
todoBtn.addEventListener('click', () => {
    todoBtn.style.display = "none"
    todoFormDiv.style.display = "block"
    
})

// Hide form when submitted and display updated todo list
todoFormSubmit.addEventListener('click', () => {
    let name = nameField.value
    let description = descriptionField.value
    
    state.incompleteTodos.push(new TodoItem(state.curr_id, name, description))

    nameField.value = ''
    descriptionField.value = ''

    state.curr_id += 1
    document.dispatchEvent(new Event('submitFinished'))
})

function deleteTask(todo_id) {
    for (let i = 0; i < state.incompleteTodos.length; i++) {
        if (state.incompleteTodos[i].id == todo_id) {
            state.incompleteTodos.splice(i, 1)
            break
        }
    }
    rerenderDOM()
}

function completeTask(todo_id) {
    for (let i = 0; i < state.incompleteTodos.length; i++) {
        if (state.incompleteTodos[i].id == todo_id) {
            state.completeTodos.push(state.incompleteTodos.splice(i, 1))
            break
        }
    }
    rerenderDOM()
}

document.addEventListener('submitFinished', rerenderDOM)

function rerenderDOM() {
    todoFormDiv.style.display = "none"
    todoBtn.style.display = "block"

    list.innerHTML = ''
    for (todo of state.incompleteTodos) {
        let todoHTML = `
          <div class="todo-container bg-white mb-4 rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="flex justify-between font-bold text-xl mb-2">

                <div class="todo-title">
                  ${todo.name}
                </div>
                
                <div class="todo-btns">
                  <button class="bg-gray-100 px-2 hover:bg-gray-300 rounded-lg" onClick="deleteTask(${todo.id})">
                    <i class="fa text-red-600 fa-times"></i>
                  </button>
                  <button class="bg-gray-100 px-2 hover:bg-gray-300 rounded-lg" onClick="completeTask(${todo.id})">
                    <i class="fa text-green-600 fa-check"></i>
                  </button>
                </div>

              </div>
              <p class="todo-description text-gray-700 text-base">
                ${todo.description}
              </p>
            </div>
          </div>`
        list.innerHTML += todoHTML
    }
    itemCountSpan.innerText = state.incompleteTodos.length + state.completeTodos.length
    uncheckedCountSpan.innerText = state.incompleteTodos.length
}