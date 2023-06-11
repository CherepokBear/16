import { numberLikes } from "./data.js";

const postMethod = () => {
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

  .then((data) => {
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
  })
}
postMethod ()

const getMethod = () => {

const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/dima-vorobev/comments", {
  method: "GET",
});

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((responseData) => {

    const aapComents = responseData.comments.map((comment) => {
      const dateComment = new Date(comment.date);
      return {
        name: comment.author.name,
        date: dateComment.getDate().toString().padStart(2, '0') + '.' +
          (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
          dateComment.getFullYear().toString().slice(-2) + ' ' +
          dateComment.getHours().toString().padStart(2, '0') + ':' +
          dateComment.getMinutes().toString().padStart(2, '0'),
        coments: comment.text,
        likes: comment.likes,
        isActiveLike: false,
      };
    });

    numberLikes = aapComents;
    renderComments();
  });
});
}
getMethod ()

renderComments()