"use strict";

const tagContainer = document.querySelector('.tag-container'),
			input = document.querySelector('.tag-container .tag-input'),
			addBtn = document.querySelector('.button'),
			readOnlyBtn = document.querySelector('.read-only-button');
let tags = [];

// Create tag
function createTag(label) {
	const div = document.createElement('div');
	div.setAttribute('class', 'tag')
	const span = document.createElement('span');
	span.setAttribute('class', 'tag-name');
	span.innerHTML = label;
	const closeBtn = document.createElement('span');
	closeBtn.setAttribute('class', 'tag-close');
	closeBtn.setAttribute('data-item', label);

	div.appendChild(span);
	span.append(closeBtn);

	return div;
}

// Fixinng problem with dublicate input value
function reset() {
	document.querySelectorAll('.tag').forEach(tag => {
		tag.parentElement.removeChild(tag);
	})
}

function addTags() {
	reset();
	tags.slice().reverse().forEach( tag => {
		const input = createTag(tag);
		tagContainer.prepend(input);
	});
	localStorage.getItem(tags);
	localStorage.setItem('text', tags);
}

// Button to add tag
addBtn.addEventListener('click', (e) =>  {
	tags.push(input.value);
	addTags();
	input.value = '';
});

// Right order to close tags
document.addEventListener('click', (e) =>  {
	if (e.target.className === 'tag-close') {
		const value = e.target.getAttribute('data-item');
		const index = tags.indexOf(value);
		tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
		addTags();
	}
});

// readonly btn
readOnlyBtn.addEventListener('click', () => {
	addBtn.setAttribute('disabled', 'button');
	input.setAttribute('disabled', 'input');
	tagContainer.style.pointerEvents = 'none';
});
