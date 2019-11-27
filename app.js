const btn = document.querySelector('#btn');
btn.addEventListener('click', search);

const constants = {
	BASE_URL:
		"https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5&per_page=20&page=2",
	STORAGE_KEY: "flicker_search_queries"
};

async function search() {
    const query = document.querySelector('#query');
    let res = await getPhotos(query.value);

    const urls = res.photos.photo.map(getImageUrl);
    displayResult(urls);


    console.log(res);
    console.log(urls);
}


async function getPhotos(query) {
    const url = constants.BASE_URL + "&text=" + query;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
    
    const data = await response.json()
    return data;
}


function getImageUrl({ farm, server, id, secret }) {
	return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

function displayResult(items = []) {
    const result = document.querySelector('#result');
    const images = items.map(url => `<img src="${url}" />`);
    // const images = items.map(url => "<img src=" + url + " />");
    // [url] -> [img]
    // https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg` => <img src="{url}" />

    result.innerHTML = images;
}