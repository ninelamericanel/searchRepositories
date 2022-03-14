function createElement(tag, className, parent, type, placeholder) {
    let parentBlock = document.querySelector(parent);
    let newElement = document.createElement(tag);
    if (type) newElement.type = type;
    if (className) newElement.className = className;
    if(placeholder) newElement.placeholder = placeholder;
    parentBlock.append(newElement);

    return document.querySelector(`.${className}`)
}

createElement('div', "search", '.root');
createElement('input', "search__input", '.search', 'text', 'Type to search...');

let input = document.querySelector('.search__input');

input.addEventListener('input', () => {
        let value = input.value;
        if (value) {
            getRepositories(value)
                .then(result => createListOfAutocomplete(result.items));
        } else {
            createListOfAutocomplete();
        }
    }
);

function createListOfAutocomplete(items) {
    if (items) {
        createElement('ul', 'search__autocomplete', '.search');
        items.forEach((item, i) => {
            let nodeElement = createElement('li', `search__item--${i}`, '.search__autocomplete')
            nodeElement.innerHTML = item.name;
        })
    } else {
        let list = document.querySelector('.search__autocomplete');
        list.remove()
    }
}

function createListOfAddedRepositories () {

}


async function getRepositories(text) {
    let response = await fetch(`https://api.github.com/search/repositories?q=${text}&per_page=5`);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        return `Error ${response.status}`;
    }
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn.apply(this, args), delay);
    }
}


