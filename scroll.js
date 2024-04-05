const content = document.getElementById('content');
const textBlocks = content.querySelectorAll('.text-block');

content.addEventListener('scroll', () => {
  const contentHeight = content.clientHeight;

  textBlocks.forEach((block, index) => {
    const blockTop = block.getBoundingClientRect().top;
    const blockHeight = block.clientHeight;

    if (  blockTop  < contentHeight * 0.25 && blockTop + blockHeight > 0) {
      block.classList.add('show'); // Добавляем класс для анимации
      block.classList.remove('fade-out-bck'); 

    } else {
      block.classList.remove('show'); 
      block.classList.add('fade-out-bck'); // Добавляем класс для анимации

    }
  });
});