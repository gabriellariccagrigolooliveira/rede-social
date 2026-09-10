document.addEventListener("DOMContentLoaded", () => {
  // Seleção dos elementos do DOM
  const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
  if (!likeBtn) return;

  const likeSvg = likeBtn.querySelector("svg");
  const postMedia = document.querySelector(".post-media");
  const likesDetails = document.querySelector(".post-details .likes");

  // O contador inicia em 0 a cada carregamento da página
  let totalLikes = 0;
  let isLiked = false;

  // Localiza o nó de texto dentro do botão
  let textNode = Array.from(likeBtn.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
  );

  // Formatação para números grandes (ex: 1000 -> 1K)
  function formatLikes(num) {
    if (num >= 1000) {
      const formatted = (num / 1000).toFixed(1);
      return formatted.endsWith(".0") ? `${Math.floor(num / 1000)}K` : `${formatted}K`;
    }
    return num.toString();
  }

  // Atualiza a interface gráfica
  function updateUI() {
    // Atualiza o texto numérico do botão
    if (textNode) {
      textNode.textContent = ` ${formatLikes(totalLikes)}`;
    }

    // Atualiza o texto do rodapé
    if (likesDetails) {
      if (totalLikes === 0) {
        likesDetails.innerHTML = "Seja o primeiro a curtir";
      } else {
        likesDetails.innerHTML = `Curtido por <strong>${totalLikes} ${totalLikes === 1 ? 'pessoa' : 'pessoas'}</strong>`;
      }
    }

    // Estilização do ícone do coração
    if (isLiked) {
      likeBtn.classList.add("liked");
      likeSvg.style.fill = "#ef4444";
      likeSvg.style.stroke = "#ef4444";
      likeSvg.style.color = "#ef4444";
    } else {
      likeBtn.classList.remove("liked");
      likeSvg.style.fill = "none";
      likeSvg.style.stroke = "currentColor";
      likeSvg.style.color = "#1c1e21";
    }

    // Animação do botão
    likeSvg.style.transform = "scale(1.3)";
    setTimeout(() => {
      likeSvg.style.transform = "scale(1)";
    }, 150);
  }

  // Clique no botão de coração (soma continuamente)
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    totalLikes++;
    isLiked = true;
    updateUI();
  });

  // Clique na foto (também soma ao contador)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      totalLikes++;
      isLiked = true;
      updateUI();
    });
  }

  // Define o estado inicial da tela (0 likes)
  updateUI();
});