document.addEventListener("DOMContentLoaded", () => {
  // Seleção dos elementos do DOM
  const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
  if (!likeBtn) return;

  const likeSvg = likeBtn.querySelector("svg");
  const postMedia = document.querySelector(".post-media");
  const bookmarkBtn = document.querySelector(".post-actions > .action-btn:last-child");

  // Estado inicial das curtidas
  let isLiked = false;
  let baseLikes = 1200; // Valor base equivalente ao "1.2K" inicial

  // Localiza o nó de texto dentro do botão para atualizar o número
  let textNode = Array.from(likeBtn.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
  );

  // Função para formatar números grandes (ex: 1200 -> 1.2K)
  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // Atualiza o texto do botão
  function updateLikesDisplay() {
    if (textNode) {
      textNode.textContent = ` ${formatLikes(baseLikes)}`;
    }
  }

  // Animação de pulso no coração
  function triggerHeartAnimation() {
    if (likeSvg) {
      likeSvg.style.transition = "transform 0.15s ease, fill 0.15s ease, stroke 0.15s ease";
      likeSvg.style.transform = "scale(1.3)";
      setTimeout(() => {
        likeSvg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Aplica os estilos de curtido/não-curtido
  function updateHeartStyle() {
    if (isLiked) {
      likeSvg.style.fill = "#ef4444";
      likeSvg.style.stroke = "#ef4444";
      likeSvg.style.color = "#ef4444";
    } else {
      likeSvg.style.fill = "none";
      likeSvg.style.stroke = "currentColor";
      likeSvg.style.color = "#1c1e21";
    }
  }

  // Função para adicionar uma curtida
  function addLike() {
    if (!isLiked) {
      baseLikes++;
      isLiked = true;
      updateHeartStyle();
      updateLikesDisplay();
      triggerHeartAnimation();
    }
  }

  // Clique no botão de curtida (Alterna entre curtir e descurtir)
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isLiked) {
      isLiked = false;
      baseLikes = Math.max(0, baseLikes - 1);
    } else {
      isLiked = true;
      baseLikes++;
    }

    updateHeartStyle();
    updateLikesDisplay();
    triggerHeartAnimation();
  });

  // Clique na imagem principal do post (Sempre curte)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Clique no botão de salvar (Bookmark)
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;

      const bookmarkSvg = bookmarkBtn.querySelector("svg");
      if (bookmarkSvg) {
        bookmarkSvg.style.transition = "transform 0.15s ease, fill 0.15s ease";
        bookmarkSvg.style.fill = isBookmarked ? "#1c1e21" : "none";
        bookmarkSvg.style.transform = "scale(1.2)";
        setTimeout(() => {
          bookmarkSvg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }

  // Exibição inicial
  updateLikesDisplay();
});