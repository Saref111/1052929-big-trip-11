export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, component, place) => {
  console.log(container, component, place);
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    default:
      container.parentNode.insertBefore(component.getElement(), container);
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;
  const newElement = newComponent.getElement();

  const isExist = !!(oldElement && parentElement && newElement);

  if (isExist) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
