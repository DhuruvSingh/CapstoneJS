const counter = (container, title, text) => {
  const count = container.children.length - 1;
  title.textContent = `${text} (${count})`;
};

export default counter;