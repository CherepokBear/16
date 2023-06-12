import { getMethod  } from "./students.js";
import { postMethod  } from "./students.js";


const listElement = document.getElementById('list');
const buttonElement = document.getElementById('button');
const nameInputElement = document.getElementById('name');
const textInputElement = document.getElementById('textInput');

let numberLikes = []

getMethod ();

export const reply = () => {
  const comentInput = document.querySelector('.add-form-text');
  const editButton = document.querySelectorAll('.comment');
  for (const button of editButton) {
    button.addEventListener('click', () => {
      comentInput.value = `${button.querySelector('.coment-text').innerHTML}`
    });
  }
}

export const initLikeElement = () => {
  const likeAddElement = document.querySelectorAll('.like-button');

  for (const likeElements of likeAddElement) {
    likeElements.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = likeElements.dataset.index;
      if (numberLikes[index].isActiveLike) {
        numberLikes[index].likes--
      } else {
        numberLikes[index].likes++
      }
      numberLikes[index].isActiveLike = !numberLikes[index].isActiveLike;
      renderComments();
    });
  };
};

export const renderComments = () => {
  const likeHTML = numberLikes.map((comment, index) => {

    return `<li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body ">
        <div  class="coment-text">
          ${comment.coments}
        </div>

      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button  class="like-button "  data-index='${index}'></button>
        </div>
      </div>
    </li>`
  })
    .join("");
  listElement.innerHTML = likeHTML;
  reply();
  initLikeElement();
};

buttonElement.addEventListener('click', () => {
  const oldListElement = listElement.innerHTML;
  const startAt = Date.now();

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавлятся...";

  postMethod();

});

renderComments();

