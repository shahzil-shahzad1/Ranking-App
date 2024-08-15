let a = 0;
let b = 2;
let seletedcard = []

async function getimgs() {
    let a = await fetch("http://127.0.0.1:3000/imgs/")
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)
    let images = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.includes("imgs/")) {
            images.push(element.href.split("/imgs/")[1])
        }
    }
    return images;
}

function showingimgs(images, a, b) {
    let cardlist = document.querySelector(".cardlist")
    cardlist.innerHTML = ""
    for (i = a; i < b; i++) {
        let name = images[i].replaceAll("%20", " ").split("!")[0];
        let paragraphtext = images[i].replaceAll("%20", " ").split("!")[1];
        let pdata = paragraphtext.split("$")[0]
        cardlist.innerHTML = cardlist.innerHTML + `<div class="card borderradius">
    <img src = imgs/${images[i]} class="borderradius" alt="">
    <h3>${name}</h3>
     <p>${pdata}</p>
     <a href="Info/${name}.json">Information about ${name}</a>
    </div>`
    }
}

function gettingcards() {
    let cards = Array.from(document.querySelector(".cardlist").getElementsByTagName("div"))
    return cards;
}

function imgmain(images) {
    console.log(images)
    showingimgs(images, 0, 2)
    seletedcard = []
    let a = 0;
    let b = 2;
    replacingcards(images, a, b);
}

function mosthandsome(images, a, b){
     let heading = document.querySelector(".heading")
    heading.innerHTML = ""
    for (i = a; i < b; i++) {
        let name = images[i].replaceAll("%20", " ").split("!")[0];
         heading.innerHTML = heading.innerHTML + `<h2>The most handsome is ${name}</h2>`
    }
}
function replacingcards(images, a, b) {
    gettingcards().forEach(element => {
        element.addEventListener("click", (e) => {
            console.log(element)
            // console.log(e.srcElement.src.split("3000/")[1])
            // seletedcard.push(e.srcElement.src)
            seletedcard.push(e.srcElement.src.split("/imgs/")[1])
            console.log(seletedcard)
            element.style.backgroundColor = "gray"
            if (b <= images.length) {
                showingimgs(images, a += 2, b += 2)
            }
            console.log(gettingcards());
            console.log("The next value of b is ", b)
            console.log(images.length)
        })
    })
    gettingcards().forEach(element => {
        element.addEventListener("click", () => {
            if (b <= images.length) {
                replacingcards(images, a, b);
                console.log(seletedcard)
            }
            else {
                if (seletedcard.length >= 2) {
                    console.log("the length of array is ", seletedcard.length)
                    imgmain(seletedcard)
                }
                else {
                    console.log("the length of array is ", seletedcard.length)
                    showingimgs(seletedcard, 0, 1)
                    mosthandsome(seletedcard, 0, 1);
                }
            }
        })
    })
}

async function main() {
    let images = await getimgs();
    console.log(images)
    showingimgs(images, a, b);
    gettingcards().forEach(element => {
        element.addEventListener("click", (e) => {
            console.log(element)
            seletedcard.push(e.srcElement.src.split("imgs/")[1])
            // console.log(images.length)
            element.style.backgroundColor = "gray"
            showingimgs(images, a += 2, b += 2)
            replacingcards(images, a, b);
        })
    })

}
main();