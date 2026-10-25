import { getTodayDate } from "./utils/dateFormater.js";

const today_date = document.getElementById("title");
const hidden_value = document.querySelector("#hidden-value");
const saveEdit = document.querySelector('.save-edit')
const edit_form = document.querySelector('.edit-form')
const close = document.querySelector('#close-icon')

const date = getTodayDate();

hidden_value.value = date;

today_date.innerText = "Todo-Today" + "(" + date + ")";

document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task')
    tasks.forEach(task => {
        const finished = task.querySelector('.finished').innerHTML
        if(finished === 'true') {
            task.classList.add('done')
        } else {
            task.classList.remove('done')
        }
    })
})

// handle check feature
document.querySelectorAll(".check-btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // handle frontend
    const task = event.target.closest(".task");
    const finished = task.querySelector('.finished')
    if (finished.innerText === 'false') {
      task.classList.add("done");
    } else {
      task.classList.remove("done");
    }
    console.log(finished.innerText)
    finished.innerText = (finished.innerText === 'true' ? 'false' : 'true')
    // handle backend
    const task_order = task.querySelector(".task-order");
    fetch("http://localhost:5173/check", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_order: task_order.innerText,
        date: date,
        finished: finished.innerText,
      }),
    }).then((res) => {
      res.text().then(message => console.log(message))
    })
  });
});

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const task = event.target.closest(".task");
    const task_order = task.querySelector(".task-order");
    const res = await fetch("http://localhost:5173", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_order: task_order.innerText,
        date: date,
      }),
    });
    if (res.ok) {
      task.remove();
    } else {
      console.log("Delete was not successful");
    }
  });
});

document.querySelectorAll('.edit-btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const task = event.target.closest('.task')
    const title = task.querySelector('.task-name')
    const require = task.querySelector('.task-description')
    const nameEdit = document.getElementById('name-edit')
    const requireEdit = document.getElementById('require-edit')
    const task_order = task.querySelector('.task-order')
    const task_order_edit = document.querySelector('.task-order_edit')
    task_order_edit.innerText = task_order.innerText
    nameEdit.value = title.innerText
    requireEdit.value = require.innerText
    const modal = document.querySelector('#edit-modal')
    modal.show()
  })
})

edit_form.addEventListener('submit', (e) => {
  e.preventDefault()
  const task_order = document.querySelector('.task-order_edit').innerText
  const task_name = document.querySelector('#name-edit').value
  const require = document.querySelector('#require-edit').value
  fetch('http://localhost:5173/update', {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        task_order: task_order,
        task_name: task_name,
        require: require
      })
  })
  .then(window.location.reload())
})

close.addEventListener('click', () => {
  const modal = document.querySelector('#edit-modal')
    modal.close()
})
