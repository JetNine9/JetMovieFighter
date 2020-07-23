
// This function will pass a config object. This will contain a bunch of reusable code.
//The cofig object will have custom functions to specify how this function works

const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue,fetchData}) => {
root.innerHTML = `
<label><b>Search </b></label>
<input class="input" />
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput = async event => {
    const items = await fetchData(event.target.value);

    // This code below removes the drop-down if the user deletes what he is typing or the search bar goes from having an input to no input.
    if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }


    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    // code below loops over the movies found within the search and displays their poster and movie title. We then add that title in our HTML file via appendchild.
    for (let item of items) {
        const option = document.createElement('a');
        // ternary operator below is basically a shortcut for an if statement

        option.classList.add('dropdown-item')
        option.innerHTML =renderOption(item);

        // code below removes the drop-down & updates the text inside the search bar
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
            onOptionSelect(item);
        });

        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('input', debounce(onInput, 500));

// the code below removes the dropdown widget when we click anywhere else on the page
document.addEventListener('click', event => {
    // event.target will tell us where we are clicking within the page.
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});

};
