import { numberLikes } from "./data.js";

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

renderComments()