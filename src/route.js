const switchComponent = (container, component) => {
	container.innerHTML = '';
	container.appendChild(component);
};

export {switchComponent};