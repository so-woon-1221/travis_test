export const findButtonAndFill = (
  filterName: string,
  filterArray: Array<string>,
) => {
  const filter = document.getElementById(filterName);
  const buttons = filter?.querySelectorAll("button");
  if (buttons) {
    for (let i = 0; i < buttons.length; i++) {
      if (filterArray.includes(buttons[i].dataset.value as string)) {
        buttons[i].classList.add("bg-gray-200");
      } else {
        buttons[i].classList.remove("bg-gray-200");
      }
    }
  }
};
