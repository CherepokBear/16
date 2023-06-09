import { numberLikes } from "./data.js";

const buttonElement = document.getElementById('button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name');
const textInputElement = document.getElementById('textInput');
const dateElement = document.getElementById('date');
const likeAddElement = document.querySelectorAll('.like-button');
const editButton = document.querySelector('.editButton');


const renderComments = () => {
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
renderComments();

const initLikeElement = () => {
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

const reply = () => {
  const comentInput = document.querySelector('.add-form-text');
  const editButton = document.querySelectorAll('.comment');
  for (const button of editButton) {
    button.addEventListener('click', () => {
      comentInput.value = `${button.querySelector('.coment-text').innerHTML}`
    });
  }
}

buttonElement.addEventListener('click', () => {
  const oldListElement = listElement.innerHTML;

  const startAt = Date.now();

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавлятся...";

  fetch('https://wedev-api.sky.pro/api/v1/dima-vorobev/comments',
    {
      method: 'POST',
      body: JSON.stringify(
        {
          text: textInputElement.value,
          name: nameInputElement.value,
        })
    })

    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        return Promise.reject("Сервер упал")
      }
    })
    .then((response) => {
      return response;
    })
    .then((responseData) => {
      return fetch("https://wedev-api.sky.pro/api/v1/dima-vorobev/comments", {
        method: "GET",
      });
    })
    .then((response) => {
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .then((responseData) => {
      const ret = responseData.comments.map((comment, index) => {
        const date = new Date(comment.date)
        return {
          name: comment.author.name,
          date: date.getDate().toString().padStart(2, '0') + '.' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '.' +
            date.getFullYear().toString().slice(-2) + ' ' +
            date.getHours().toString().padStart(2, '0') + ':' +
            date.getMinutes().toString().padStart(2, '0'),
          coments: comment.text,
          likes: comment.likes,
          isActiveLike: false,
        }
      });
      numberLikes = ret;
      nameInputElement.value = "";
      textInputElement.value = "";
      renderComments();
    })
    // .then((response) => {
    //   return response;
    // })
    // .then((responseData) => {
    //   if (response.status === 500) {
    //     throw new Error("Ошибка сервера")
    //   } else {
    //     return response.json();
    //   }

    // })
    .then((data) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";

      alert('Имя и комментарий должн быть не менее трех символов!');
      console.log(error)
    })
});


