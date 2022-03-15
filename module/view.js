export class View {
    constructor() {
        this.root = document.getElementById('root');
        this.wrapper = this.createElement('div', 'wrapper');
        this.root.append(this.wrapper);

        this.searchBlock = this.createElement('div', 'search');
        this.repositoriesBlock = this.createElement('div', 'repositories');
        this.wrapper.append(this.searchBlock);
        this.wrapper.append(this.repositoriesBlock);

        this.input = this.createElement('input', 'search__input');
        this.searchBlock.append(this.input);

        this.autocompleteBlock = this.createElement('ul', 'search__autocomplete');
        this.searchBlock.append(this.autocompleteBlock);

        this.repositoriesList = this.createElement('ul', 'repositories__list');
        this.repositoriesBlock.append(this.repositoriesList);
    }

    createElement(tag, className) {
        let newElement = document.createElement(tag);
        if (className) newElement.className = className;
        return newElement;
    }

    viewAutocomplete(repository) {
        let autocompletedItem = this.createElement('li', 'search__item');
        autocompletedItem.innerHTML = `<p>${repository.name}</p>`;
        autocompletedItem.addEventListener('click', () => this.viewRepository(repository))
        this.autocompleteBlock.append(autocompletedItem);
    }

    viewRepository(repository) {
        let repositoryItem = this.createElement('li', 'repositories__item');

        repositoryItem.innerHTML = `<div class="repositories__info">
                                      <p>Name: ${repository.name}</p>
                                      <p>Owner: ${repository.owner.login}</p>
                                      <p>Stars: ${repository.stargazers_count}</p>
                                    </div>`

        let iconDelete = this.createElement('button', 'repositories__icon');
        repositoryItem.append(iconDelete);

        iconDelete.innerHTML = `<img class="icon" src="icons/delete-icon.svg" alt="Delete favourite repository">`
        iconDelete.type = 'button';
        iconDelete.addEventListener('click', () => this.deleteRepository(repositoryItem));

        this.repositoriesList.append(repositoryItem);
        this.input.value = '';
        this.deleteAutocompletedNodes();

    }

    deleteRepository(repository) {
        repository.remove();
    }

    deleteAutocompletedNodes() {
        let autocompletedNodes = [...this.autocompleteBlock.childNodes];
        autocompletedNodes.forEach(node => node.remove());
    }
}