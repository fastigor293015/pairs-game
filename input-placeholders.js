let input = document.querySelectorAll('.form__input'),
    placeholder = document.querySelectorAll('.placeholder');

input.forEach((item) => {
  item.onfocus = () => {
    let path = event.currentTarget.dataset.path;
    placeholder.forEach((active) => {
      let target = active.dataset.target,
          placeholderWidth = active.offsetWidth;
      if (path.localeCompare(target) === 0) {
        active.style.transform = `translate(-${placeholderWidth * 0.18}px, -16px) scale(60%)`;
      }
    })
  };
  item.onblur = () =>  {
    let curTarget = event.currentTarget,
        path = curTarget.dataset.path;
    placeholder.forEach((active) => {
      let target = active.dataset.target,
      placeholderWidth = active.offsetWidth;
      if (path.localeCompare(target) === 0) {
        if (curTarget.value !== "") {
          active.style.transform = `translate(-${placeholderWidth * 0.18}px, -16px) scale(60%)`;
        } else {
          active.style.transform = 'none';
        }
      }
    })
  };
})
