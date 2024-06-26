import { renderHeaderComponent } from "./header-component.js";
import { renderLikeButtonComponent } from "./like-button-component.js";
import { posts } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderUserPostsPageComponent({ appEl }) {

  const getUserInfo = () => {
    const post = posts[0];

    return `<div class="user-post-header">
      <p>Страница постов пользователя:</p>
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
      </div>
    </div>`;
  };

  const getPostsLines = () => {
    return posts.map((post) => {
      return `<li class="post">
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes" data-post-id="${post.id}"></div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
        ${formatDistanceToNow(new Date(post.createdAt), { locale: ru })} назад
        </p>
      </li>`;
    });
  };

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                ${getUserInfo()}
                <ul class="posts">
                  ${getPostsLines().join("")}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  document.querySelectorAll(".post-likes").forEach((element) => {
    const filteredPosts = posts.filter(
      (post) => post.id === element.dataset.postId
    );

    if (!filteredPosts) {
      return;
    }

    renderLikeButtonComponent({ element, post: filteredPosts[0] });
  });
}
