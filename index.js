
const api_key = "BJYnMpgpNo6XOtvZ4aN4EnAunG1teJhadYC0mc6X";
const searchUrl = "https://developer.nps.gov/api/v1/parks";


function getParks(searchTerm,maxResults=10) {
    let params = {
        api_key: api_key,
        stateCode: searchTerm,
        limit: maxResults,
    }

    const queryString = $.param(params);
    console.log(queryString);
    const url = `${searchUrl}?${queryString}`;
    fetch(url).then(resp => {
        if(resp.ok){
            console.log("1st",resp);
            return resp.json();
        }
        
        throw new Error(resp.statusText);
    }).then(respJson=>displayResults(respJson))

}

function displayResults(json) {

    $("#results-list").empty();

    console.log(json);
    if (json.total < json.limit) {
        for(let i=0; i<json.total; i++) {
            $("#results-list").append(
                `<li>
                    <h3>${json.data[i].fullName}</h3>
                    <p>${json.data[i].description}</p>
                    <p><a href='${json.data[i].url}' target="_blank">Link to park website.</a></p>`
                )
            }
    }
    else {
        for(let i=0; i<json.limit; i++) {
            $("#results-list").append(
                `<li>
                    <h3>${json.data[i].fullName}</h3>
                    <p>${json.data[i].description}</p>
                    <p><a href='${json.data[i].url}' target="_blank">Link to park website.</a></p>`
                )
            }    
    }
    $("#results").removeClass('hidden');
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $("#search-term").val();
        const maxResults = $("#max-results").val();
        console.log(searchTerm,maxResults);
        getParks(searchTerm,maxResults);
    })

}

$(watchForm);