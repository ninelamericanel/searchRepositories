class View {
    constructor() {
        this.root = document.getElementById('root');
        this.searchBlock = this.createElement('div', 'search');
        this.root.append(this.searchBlock);

        this.searchInput = this.createElement('input', 'search__input');
        this.searchBlock.append(this.searchInput);



    }

    createElement(tag, className) {
        let newElement = document.createElement(tag);
        if (className) newElement.className = className;
        return newElement;
    }

}

new View();

//
// createElement('div', "search", '.root');
// createElement('input', "search__input", '.search', 'text', 'Type to search...');
//
//
// input.addEventListener('input', () => {
//         let value = input.value;
//         if (value) {
//             getRepositories(value)
//                 .then(result => createListOfAutocomplete(result.items));
//         } else {
//             createListOfAutocomplete();
//         }
//     }
// );
//
// function createListOfAutocomplete(items) {
//     if (items) {
//         createElement('ul', 'search__autocomplete', '.search');
//         items.forEach((item, i) => {
//             let nodeElement = createElement('li', `search__item--${i}`, '.search__autocomplete')
//             nodeElement.innerHTML = item.name;
//         })
//     } else {
//         let list = document.querySelector('.search__autocomplete');
//         list.remove()
//     }
// }
//
// function createListOfAddedRepositories() {
//
// }
//
//
// async function getRepositories(text) {
//     let response = await fetch(`https://api.github.com/search/repositories?q=${text}&per_page=5`);
//     if (response.ok) {
//         let json = await response.json();
//         return json;
//     } else {
//         return `Error ${response.status}`;
//     }
// }
//
// function debounce(fn, delay) {
//     let timer;
//     return function (...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(fn.apply(this, args), delay);
//     }
// }
//
//
