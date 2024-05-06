import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
          <div class="form-inputs">
            <h3 class="form-title">Добавьте пост</h3>
            <div class="upload-image-container"></div>
            <textarea class="input textarea" id="description-input" rows="4" placeholder="Описание картинки"></textarea>
            <button class="button" id="add-button">Добавить</button>
          </div>
        </div>
      </div>
    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      if (imageUrl === "") {
        alert("Выберите изображение")
        return
      }

      const descriptionInput = document.getElementById("description-input");
      const text = descriptionInput.value
        .trim()
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

      if (text === "") {
        descriptionInput.classList.add("error");

        descriptionInput.addEventListener("keyup", () => {
          if (descriptionInput.value.trim() === "")
            descriptionInput.classList.add("error");
          else
            descriptionInput.classList.remove("error");
        });

        alert("Введите описание картинки");
        return;
      }

      onAddPostClick({
        description: text,
        imageUrl: imageUrl,
      });

      // renderUploadImageComponent({ element, onImageUrlChange });
    });
  };

  render();
}
