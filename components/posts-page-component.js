import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderLikeButtonComponent } from "./like-button-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const getPostsLines = () => {
    return posts.map((post) => {
      return `<li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
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
                <ul class="posts">
                  ${getPostsLines().join("")}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

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
