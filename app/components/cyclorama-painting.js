import Component from '@ember/component';
import {
  get,
  set,
  setProperties
} from '@ember/object';
import { A } from '@ember/array';
import UIkit from 'uikit';
/* global L */

export default Component.extend({
  bounds: null,
  crs: null,
  L: null,
  _map: null,
  activeHotSpot: null,
  panel: null,

  didInsertElement() {
    set(this, 'bounds', L.latLngBounds([
      [-55, 170],
      [55, -170]
    ]));
    set(this, 'crs', L.CRS.EPSG3857);
  },

  didRender() {
    let panel = UIkit.offcanvas(document.getElementById('panel'), {
      mode: 'push',
      bgClose: false
    });
    set(this, 'panel', panel);

    // UIkit.util.on('#panel', 'close', this.send('reCenter'));
  },

  painting: A([[-55, 170],[-55, -170],[55, -170],[55, 170]]),

  hotSpots: A ([
    {
      name: 'troupHurt',
      polygon: [
        [-31.143186436611305, -158.342342376709],
        [-33.77571856629529, -149.45508956909183],
        [-32.86039675413942, -147.97725677490237],
        [-34.17291465549036, -144.20122146606448],
        [-31.162787300454557, -128.80645751953128],
        [-17.915187628523576, -128.64990234375003],
        [-17.402626406330427, -128.17585945129397],
        [-15.239769858999802, -133.1027984619141],
        [-14.068804409645564, -133.1228828430176],
        [-14.068055329467676, -134.75761413574222],
        [-14.729187642739229, -134.92163658142093],
        [-11.641643596413946, -141.92602157592776],
        [-15.041305107732564, -148.72612953186038],
        [-13.960482188913415, -148.8113594055176],
        [-13.974025998820942, -150.41373252868655],
        [-16.071264130580843, -150.49604415893558],
        [-17.671180832560726, -153.5481405258179],
        [-18.089464552321907, -153.1096315383911],
        [-18.580598546165398, -153.12823534011844],
        [-19.885501281090864, -158.19025039672854]
      ],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/troup.png',
      title: 'Troup Hurt House'
    },
    {
      name: 'kennesaw',
      polygon: [
        [-6.486060407323228, -37.767562866210945],
        [-4.9726978221939175, -31.1982536315918],
        [-5.399409657756098, -28.8032341003418],
        [-4.512853243556263, -26.4851188659668],
        [-7.236192400403567, -13.249511718750002]
      ],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/kennesaw.png',
      title: 'Kennesaw Mountain',
      description: `<p><img src='https://battleofatlanta.s3.amazonaws.com/mountainNow.jpg'></p>`
    },
    {
      title: 'Federal Lt. Edward Jonas',
      polygon: [
        [-44.67872383310619, 20.41491508483887],
        [-44.104782937534665, 15.602045059204103],
        [-40.42266026978339, 16.566095352172855],
        [-39.2712861738095, 15.795507431030275],
        [-38.55633943739255, 15.717658996582033],
        [-38.046326213009955, 15.347042083740236],
        [-37.762554980009426, 16.268777847290043],
        [-37.117886967550724, 17.45264053344727],
        [-38.009053993129434, 20.005588531494144],
        [-36.41255318108509, 21.12173080444336],
        [-35.02665128919486, 22.222251892089847],
        [-35.5965712060579, 23.26380729675293],
        [-38.66826451152081, 23.38637351989746],
        [-39.12474303035226, 25.02934455871582],
        [-39.766266533380346, 27.111682891845707],
        [-42.06734788723392, 28.36850166320801],
        [-42.34386324675034, 27.119064331054688],
        [-44.554026032095756, 25.786886215209964],
        [-44.79334817513584, 23.879384994506836]
      ],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/jonas.png'
    }
  ]),

  actions: {
    initMap(event) {
      let map = event.target;
      map.zoomControl.setPosition('topright');
      map.setZoom(3);
      set(this, '_map', map);
    },

    highlight(hotSpot) {
      let hotSpots = get(this, 'hotSpots');
      set(this, 'activeHotSpot', hotSpot);
      hotSpots.forEach(h => {
        setProperties(h, { fillOpacity: 0 });
      });

      get(this, '_map').flyToBounds(hotSpot.polygon, {
        paddingBottomRight: [0,0]
      });

      get(this, 'panel').show();

      setProperties(hotSpot, { fillOpacity: .6});
    },

    reCenter() {
      if (get(this, '_map')) {
        let hotSpots = get(this, 'hotSpots');
        hotSpots.forEach(h => {
          setProperties(h, { fillOpacity: 0 });
        });
        get(this, '_map').flyToBounds(get(this, 'bounds'), {
          padding: [500,0]
        });
        get(this, '_map').setZoom(3);
      }
    }
  }
});
