"use strict";

let arrayOfPageOne = [];

let arrayOfKeywords = [];



function Jason1COnstructor(title, image, descritpion, keyword, horns) {
    this.title = title;
    this.img = image;
    this.description = descritpion;
    this.keyword = keyword;
    this.horn = horns;
    arrayOfPageOne.push(this);
    arrayOfKeywords.push(this.keyword);
}


function filterImage() {
    $("select").on("change", function () {
        $("main").children().not(":first").remove();
        for (let i = 0; i < arrayOfPageOne.length; i++) {
            if (this.value === arrayOfPageOne[i].keyword) {

                arrayOfPageOne[i].render();
            }
            else if (this.value === "all-of-them") {
                arrayOfPageOne[i].render();

            }

        }

    })
}

Jason1COnstructor.prototype.render = function () {
    let divContaioner = $(".img-contaioner").clone();
    divContaioner.removeClass("img-contaioner");
    $("main").append(divContaioner);
    divContaioner.children("h2").html(this.title);
    divContaioner.children("img").attr("src", this.img);
    divContaioner.children("p").html(this.description);
    divContaioner.addClass(".new-container");

}


function addTheOptions() {
    let notDublicatedKeywords = [];
    $.each(arrayOfKeywords, function (i, el) {
        if ($.inArray(el, notDublicatedKeywords) === -1) notDublicatedKeywords.push(el);
    });
    notDublicatedKeywords.forEach(element => {
        $("select").append(`<option value="${element}">${element}</option>`)
    });
}



$(document).ready(function () {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json',
    };

    $.ajax('./data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach((element, i) => {
                new Jason1COnstructor(element.title, element.image_url, element.description, element.keyword, element.horns);

                arrayOfPageOne[i].render();
            });
            addTheOptions();

            filterImage();
        });
})
