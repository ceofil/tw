function set_county_color(county_id, color) {
    console.assert(county_id > 0 && county_id <= 42, `invalid county_id: ${county_id}`)
    var element_id = `JUDET_SVG_${county_id}`

    var element = document.getElementById(element_id)
    console.assert(element, `element with id ${element_id} not found`)

    element.style.fill = color;
}


function map_value_to_color(value) {
    max_value = 10000;
    value = Math.min(max_value, value)
    color_value = value / max_value * 255
    r = color_value
    g = 255 - color_value
    b = 255 - color_value
    return `rgb(${r}, ${g}, ${b})`
}


function myfunc(API_URL, TABLE_NAME) {
    fetch(`${API_URL}/${TABLE_NAME}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let array = [];

            for (let row of data) {

                if (row.luna == 1) { //hardcoded
                    set_county_color(row.id_judet, map_value_to_color(row.total));
                    array.push(row.total);//also to be changed
                }
            }
            let tooltip = document.getElementById('tooltip');
            let triggers = document.getElementsByClassName('tooltip-trigger');
            for (let i = 0; i < triggers.length; i++) {
                triggers[i].addEventListener('mousemove', function (event) {
                    let CTM = svg.getScreenCTM();
                    let x = (event.clientX - CTM.e + 6) / CTM.a;
                    let y = (event.clientY - CTM.f + 20) / CTM.d;
                    tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
                    tooltip.setAttributeNS(null, "visibility", "visible");
                    let tooltipText = tooltip.getElementsByTagName('text')[0];
                    tooltipText.firstChild.data = "Numarul total de someri: " + array[i];
                    let tooltipRects = tooltip.getElementsByTagName('rect');
                    let length = tooltipText.getComputedTextLength();
                    for (let i = 0; i < tooltipRects.length; i++) {
                        tooltipRects[i].setAttributeNS(null, "width", length + 8);
                    }



                });
                triggers[i].addEventListener('mouseout', function (event) {

                    tooltip.setAttributeNS(null, "visibility", "hidden");

                });
            }


            let svg = document.getElementById('romanian_map');


        })
        .then((fetched_data) => {


        });
}


url = 'https://arcane-sierra-19327.herokuapp.com'
myfunc(url, 'rata')


/*
            for (let i =1 ; i <= 42 ; i++) {
                let country = document.getElementById(`JUDET_SVG_${i}`);
                const currentColor=country.style.fill;
                country.addEventListener("mouseenter", function (event) {
                    event.target.style.fill = "";
                    event.target.style.text= "pwla";
                    event.target.style.text.display = true;

                }, false);
                country.addEventListener("mouseout", function (event) {
                    event.target.style.fill = currentColor;

                }, false);
          }

*/