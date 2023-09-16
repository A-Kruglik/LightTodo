const countActive = document.querySelector("[data-count-active]");
const countComplete = document.querySelector("[data-count-complete]");


export function count() {
    if (localStorage.getItem("todos") != null) {
      const count = JSON.parse(localStorage.getItem("todos"));
      countActive.textContent = count.length;
    }
  }

export function countCheck() {
    document.addEventListener("click", function () {
      let checked = document.querySelectorAll("input:checked");
      countComplete.textContent = checked.length;
    });
  }




