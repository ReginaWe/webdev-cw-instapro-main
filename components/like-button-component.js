import { toggleLike } from "../api.js";
import { user, getToken } from "../index.js";

export function renderLikeButtonComponent({ element, post }) {
  let imageUrl = "";

  const render = (post) => {
    element.innerHTML = `
      <button data-post-id="${post.id}" data-like="${Number(
      post.isLiked
    )}" class="like-button">
        <img src="./assets/images/${
          post.isLiked ? "like-active" : "like-not-active"
        }.svg">
      </button>
      <p class="post-likes-text">
        Нравится: <strong>${post.likes.length}</strong>
      </p>`;

    const likeButton = element.querySelector(".like-button");

    likeButton?.addEventListener("click", () => {
      if (!user || !user.token) {
        alert("Авторизуйтесь, чтобы ставить лайк");
        return;
      }

      toggleLike({
        token: getToken(),
        postId: likeButton.dataset.postId,
        isLiked: likeButton.dataset.like !== "1",
      }).then((post) => {
        render(post);
      });
    });
  };

  render(post);
}
