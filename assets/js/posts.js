import { urls } from "./constant.js";

document.addEventListener("DOMContentLoaded", () => {
  const postSection = document.querySelector(".posts");
  const detailSection = document.querySelector(".detail-post");
  const backButton = document.querySelector(".back-button");
  const loaderContainer = document.querySelector(".loader-container");

  // Función para realizar una solicitud HTTP GET para recuperar los artículos
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };

  // Función para mostrar la lista de artículos
  const renderPosts = async () => {
    loaderContainer.classList.remove("hidden");
    const postUrl = urls.post;
    const postsData = await fetchData(postUrl);
    postSection.innerHTML = "";
    postsData.posts.forEach((post) => {
      const article = document.createElement("article");
      article.classList.add("post");
      article.innerHTML = `
        <a class="post-link" data-id="${post.id}">
          <header class="post-header">
            <h3 class="post-title">${post.title}</h3>
          </header>
          <footer class="post-footer">
            <p class="post-content">${post.content.substring(0, 150)}...</p>
            <p class="post-date">${post.date}</p>
          </footer>
        </a>`;
      postSection.appendChild(article);
    });
    loaderContainer.classList.add("hidden");
  };

  // Función para mostrar los detalles de cada artículo
  const renderPostDetail = async (postId) => {
    loaderContainer.classList.remove("hidden");
    const postUrl = urls[postId];
    const postData = await fetchData(postUrl);
    // console.log(postData);

    detailSection.querySelector("h2").innerText = postData.title;
    detailSection.querySelector(".detail-post-content").innerText = postData.content;
    detailSection.querySelector(".detail-post-author").innerText = postData.author;
    detailSection.classList.remove("hidden");
    postSection.classList.add("hidden");
    loaderContainer.classList.add("hidden");
  };

  // Evento para hacer clic en un artículo
  postSection.addEventListener("click", async (event) => {
    const postId = event.target.closest(".post-link").dataset.id;
    await renderPostDetail(postId);
  });

  // Evento para hacer clic en el botón de retroceso
  backButton.addEventListener("click", () => {
    detailSection.classList.add("hidden");
    postSection.classList.remove("hidden");
  });

  // Mostrar todos los artículos cuando se carga la página
  renderPosts();
});
