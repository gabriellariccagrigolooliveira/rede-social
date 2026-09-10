document.addEventListener("DOMContentLoaded", () => {
  // Seleção dos elementos do DOM
  const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
  if (!likeBtn) return;

  const likeSvg = likeBtn.querySelector("svg");
  const postMedia = document.querySelector(".post-media");

  // Estado inicial das curtidas e controle
  let isLiked = false;
  let baseLikes = 1200; // Valor inicial correspondente a "1.2K"

  // Localiza o texto com o número de curtidas dentro do botão
  let textNode = Array.from(likeBtn.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
  );

  // Função para formatar o número (ex: 1201 ou 1.2K se for muito grande)
  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // Atualiza a interface gráfica do botão (Texto, Cor e Animação)
  function updateLikeUI() {
    // Atualiza o número no texto
    if (textNode) {
      textNode.textContent = ` ${formatLikes(baseLikes)}`;
    }

    // Altera a cor do coração e classe
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

    // Efeito de pulso/animação no ícone
    if (likeSvg) {
      likeSvg.style.transition = "transform 0.15s ease, fill 0.15s ease, stroke 0.15s ease";
      likeSvg.style.transform = "scale(1.3)";
      setTimeout(() => {
        likeSvg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Evento de clique no BOTÃO DE CORAÇÃO (Alterna curtir e descurtir)
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isLiked) {
      // Se já estava curtido, descurte (-1)
      isLiked = false;
      baseLikes = Math.max(0, baseLikes - 1);
    } else {
      // Se não estava curtido, adiciona curtida (+1)
      isLiked = true;
      baseLikes++;
    }

    updateLikeUI();
  });

  // Evento de clique na IMAGEM PRINCIPAL (Sempre adiciona curtidas a cada clique)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      baseLikes++;
      isLiked = true;
      updateLikeUI();
    });
  }
});