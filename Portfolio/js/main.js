const links = [{
        label: "Week1 notes",
        url: "./weeks/week01.html"
    },

    {
        label: "Week2 notes",
        url: "./weeks/week02.html"
    }
]

function newIlElement(links) { 
    for (var i = 0; i < links.length; i++){
        let link = links[i]

        let url = document.createElement("a");
        url.setAttribute("href", link.url);
        let list = document.querySelector(".url-list");
        let li = document.createElement("li");
        url.textContent = link.label
        li.appendChild(url);
        list.appendChild(li);


    }

}

newIlElement(links)