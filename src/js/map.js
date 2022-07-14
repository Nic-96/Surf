let myMap;

const init = () => {
    myMap = new ymaps.Map("map__block", {
        center: [55.752464, 37.599563],
        zoom: 13, 
        controls: []
    });

    let myPlacemark = new ymaps.Placemark([55.749991, 37.605004], {}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./svg/Mapicon.svg",
        iconImageSize: [58, 73],
        iconImageOffset: [-35, -52]
    })

    myMap.geoObjects.add(myPlacemark);
}

ymaps.ready(init);