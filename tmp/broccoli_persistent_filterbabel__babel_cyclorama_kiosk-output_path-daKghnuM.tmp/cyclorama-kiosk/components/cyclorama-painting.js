define('cyclorama-kiosk/components/cyclorama-painting', ['exports', 'uikit'], function (exports, _uikit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    // classNames: ['uk-width-1-1'],
    bounds: null,
    crs: null,
    L: null,
    _map: null,
    activeHotSpot: null,
    panel: null,
    showThumbNav: true,
    miniMap: null,
    crs: L.CRS.Simple,

    didInsertElement() {
      Ember.set(this, 'bounds', new L.latLngBounds([new L.LatLng(-99.625, 0.25), new L.LatLng(-0.26318359375, 239.77783203125)]));
      // set(this, 'crs', L.CRS.Simple);
    },

    didRender() {
      let panel = _uikit.default.offcanvas(document.getElementById('panel'), {
        mode: 'push',
        bgClose: false
      });
      Ember.set(this, 'panel', panel);

      // if (get(this, '_map') && get(this, 'miniMap') === null) {
      //   // console.log(get(this, '_map'));
      //   var osmUrl='https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms';
      //   var osm2 = new L.tileLayer.wms(
      //     osmUrl,
      //     {
      //       crs: get(this, 'crs'),
      //       minZoom: 0,
      //       maxZoom: 0,
      //       layers: 'ECDS_Projects:kioskexample_geo',
      //       format: 'image/png'
      //     }
      //   );
      //   let miniMap = new L.Control.MiniMap(
      //     osm2,
      //     {
      //       zoomLevelFixed: true,
      //       centerFixed: L.latLng(0,0),
      //       width: 250,
      //       height: 100,
      //       aimingRectOptions: {
      //         stroke: '#688EAB'
      //       }
      //     }
      //   );
      //   set(this, 'miniMap', miniMap);
      //   miniMap.addTo(get(this, '_map'));
      // }

      // https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms?service=WMS&request=GetMap&layers=ECDS_Projects%3Akioskexample_geo&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=512&height=512&srs=EPSG%3A3857&bbox=0,-10018754.171394622,10018754.171394622,0
      // https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms?service=WMS&request=GetMap&layers=&styles=&format=image%2Fpng&transparent=false&version=1.1.1&layer=ECDS_Projects%3Akioskexample_geo&width=512&height=512&srs=EPSG%3A3857&bbox=-20037508.342789244,-20037508.34278071,60112525.02836774,20037508.34278071

      // UIkit.util.on(document.getElementById('panel'), 'show', () => {
      //   document.getElementsByClassName('leaflet-container')[0].style.width = '67vw';
      // });

      // UIkit.util.on(document.getElementById('panel'), 'hide', () => {
      //   document.getElementsByClassName('leaflet-container')[0].style.width = '100%';
      // });
    },

    paintingBounds: Ember.A([[-55, 170], [-55, -170], [55, -170], [55, 170]]),

    hotSpots: Ember.A([{
      name: 'troupHurt',
      polygon: [[-31.143186436611305, -158.342342376709], [-33.77571856629529, -149.45508956909183], [-32.86039675413942, -147.97725677490237], [-34.17291465549036, -144.20122146606448], [-31.162787300454557, -128.80645751953128], [-17.915187628523576, -128.64990234375003], [-17.402626406330427, -128.17585945129397], [-15.239769858999802, -133.1027984619141], [-14.068804409645564, -133.1228828430176], [-14.068055329467676, -134.75761413574222], [-14.729187642739229, -134.92163658142093], [-11.641643596413946, -141.92602157592776], [-15.041305107732564, -148.72612953186038], [-13.960482188913415, -148.8113594055176], [-13.974025998820942, -150.41373252868655], [-16.071264130580843, -150.49604415893558], [-17.671180832560726, -153.5481405258179], [-18.089464552321907, -153.1096315383911], [-18.580598546165398, -153.12823534011844], [-19.885501281090864, -158.19025039672854]],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/troup.png',
      title: 'Troup Hurt House',
      description: `
          <iframe src="//www.youtube.com/embed/hEsWz_LfFWE?autoplay=0&amp;showinfo=0&amp;rel=0&amp;modestbranding=0&amp;playsinline=1" width="560" height="415" frameborder="0" allowfullscreen uk-responsive uk-video="autoplay: false"></iframe>
          <p>The Troup Hurt House, no longer standing, is featured prominently in the Battle of Atlanta Cyclorama paintingBounds on high ground north of the Georgia Railroad (now the right of way for the MARTA commuter line and CSX railroad). The site is now occupied by a privately owned home, a converted church that was originally built in 1907.</p>
          <p>The most famous moments in the Battle of Atlanta occurred at this site: a mid-afternoon Confederate assault on the entrenched Federal 15th Corps, followed shortly by a Union counterattack. The Cyclorama paintingBounds depicts the decisive moment, at approximately 4:30 p.m., when Federal Major General John A. Logan rallied his troops to restore the broken Union line and turn back the attacking Confederates.</p>
          <img src='https://battleofatlanta.s3.amazonaws.com/troupHurt.JPG' />
          <p>Brigadier General Arthur M. Manigault's brigade had spearheaded the mid-afternoon Confederate assault. Manigault's troops, followed by Colonel Jacob H. Sharp's brigade of Brown's Confederate Division, drove a wedge through the Union line at the railroad cut near the present-day Inman Park MARTA station, poured through the opening, and forced the Yankee defenders to retreat. Manigault's troops fanned out to the north and captured the Troup Hurt House and Captain Francis De Gress's 20-pound Parrott battery of four guns.</p>
          <p>A historic marker at the north end of Degress Avenue, before it turns sharply east, indicates the location of the De Gress battery. Together, the combined action of Manigault's brigade and other elements of Brown's and Clayton's Confederate Divisions opened a half-mile gap in the Union line that if further exploited could have turned the tide of the battle. However, the Rebel successes were short-lived, and they were soon driven back by a ferocious Union counterattack. General Sherman, observing the battlefield action from his position three-fourths of a mile north of the Troup Hurt House, directed cannon fire against the Rebel front and behind it, thwarting further gains and preventing reinforcements.</p>
          <p>Union Major General John A. Logan, who earlier that afternoon had replaced the fallen Major General James B. McPherson as commander of the Army of the Tennessee, gathered reinforcements and led the successful infantry counteroffensive. The Federal troops did not pursue their retreating foes, and fighting in the vicinity of the Troup Hurt House came to a close. Combat continued until dark at Leggett's Hill.</p>
        `
    }, {
      name: 'kennesaw',
      polygon: [[-6.486060407323228, -37.767562866210945], [-4.9726978221939175, -31.1982536315918], [-5.399409657756098, -28.8032341003418], [-4.512853243556263, -26.4851188659668], [-7.236192400403567, -13.249511718750002]],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/kennesaw.png',
      title: 'Kennesaw Mountain',
      description: `
        <div class='uk-inline'>
          <img src='https://battleofatlanta.s3.amazonaws.com/mountainNow.jpg'>
          <div class='uk-overlay uk-overlay-default uk-position-bottom'>
            <p>Present view of Kennesaw Mountain from painter's perspective.</p>
          </div>
        </div>
        <p>Kennesaw Mountain was the site of the Battle of Kennesaw Mountain during the 1864 Atlanta Campaign of the American Civil War, in which the Union forces of General William Tecumseh Sherman launched a bloody frontal attack on the Confederate Army of Tennessee, which was commanded by General Joseph E. Johnston. Federal judge Kenesaw Mountain Landis, the first commissioner of Major League Baseball, was named after the battle, in which his father nearly lost his left leg.</p>
        <p>The nearby city of Kennesaw, founded as Big Shanty, was renamed for the mountain after the war, although the mountain lies outside city limits. Kennesaw Mountain High School is another namesake.</p>
        <p>The Kennesaw Mountain National Battlefield Park was created on June 26, 1935. It was formerly a Civilian Conservation Corps camp.</p>
      `
    }, {
      title: 'US Lt. Edward Jonas',
      polygon: [[-44.67872383310619, 20.41491508483887], [-44.104782937534665, 15.602045059204103], [-40.42266026978339, 16.566095352172855], [-39.2712861738095, 15.795507431030275], [-38.55633943739255, 15.717658996582033], [-38.046326213009955, 15.347042083740236], [-37.762554980009426, 16.268777847290043], [-37.117886967550724, 17.45264053344727], [-38.009053993129434, 20.005588531494144], [-36.41255318108509, 21.12173080444336], [-35.02665128919486, 22.222251892089847], [-35.5965712060579, 23.26380729675293], [-38.66826451152081, 23.38637351989746], [-39.12474303035226, 25.02934455871582], [-39.766266533380346, 27.111682891845707], [-42.06734788723392, 28.36850166320801], [-42.34386324675034, 27.119064331054688], [-44.554026032095756, 25.786886215209964], [-44.79334817513584, 23.879384994506836]],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/jonas.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      title: 'mersy',
      polygon: [[-54.11647727425323, 25.715217590332035], [-52.04275835476807, 26.46589279174805], [-51.746052334387244, 26.83341979980469], [-50.8688423494703, 26.811790466308594], [-50.88854714752065, 28.163108825683597], [-51.37321406626208, 28.289451599121097], [-51.9031207012013, 30.5280876159668], [-52.53491563086364, 30.43418884277344], [-52.94639290120846, 29.75852966308594], [-54.15695220856629, 30.653743743896488], [-54.16609472446145, 30.653743743896488]],
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/mersy.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      title: 'General Willam Sherman',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/sherman.png',
      polygon: [[-10.466045921889902, 71.33772611618043], [-10.118540265803556, 71.51550292968751], [-10.391427372816182, 72.00900793075563], [-9.757868260465745, 72.06048488616945], [-9.796236206672129, 72.43535041809083], [-10.42590138203846, 72.3986577987671], [-10.504582323708354, 72.71133899688722], [-10.946422015779348, 72.96363830566408], [-11.231149903095146, 72.92786836624147], [-11.46119436855246, 71.8195152282715], [-10.913986883334644, 71.77881002426149], [-10.705349047151419, 71.67521238327028]],
      fillOpacity: 0,
      fillColor: '#444444',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      polygon: [[-7.047633726660754, 87.37581253051759], [-7.247194560278631, 91.66829109191896], [-9.816775902944814, 91.62280082702638], [-10.919899584143728, 88.17515373229982], [-10.371777569936171, 85.48195838928224], [-8.884895495710655, 86.04560852050783], [-8.599945045689799, 86.590633392334], [-7.615262926459679, 86.56239509582521]],
      title: 'Agustus Hurt House',
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/agustus.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      polygon: [[-32.327176741061116, 45.55137634277344], [-28.504739109745543, 43.48182678222656], [-24.62298745896278, 48.32199096679688], [-23.088568820634734, 52.87479400634766], [-21.67541775375162, 68.34354400634767], [-18.497349755337066, 109.4341278076172], [-21.913107990091564, 121.06178283691408], [-26.438298852177628, 126.24973297119142], [-32.75696353626707, 130.5495071411133], [-38.05241677186484, 123.76338958740236], [-37.68745775711509, 93.69037628173828], [-34.78946956741607, 59.96646881103516], [-34.155394504078366, 49.829521179199226]],
      title: 'US 15th Army Corps',
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/15th.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      polygon: [[-46.137143879065015, 135.5424499511719], [-45.5055649099945, 135.49095153808597], [-44.71179309681501, 137.058219909668], [-43.31007846890812, 138.971643447876], [-42.884832247501826, 139.44602966308597], [-41.86547012230937, 139.61717605590823], [-41.65646092192357, 138.0777168273926], [-41.909750855349955, 137.24378585815433], [-41.54751414961561, 136.3499450683594], [-40.76546147212545, 135.90568542480472], [-39.841641707404705, 136.21973991394046], [-38.94869348466107, 137.3134803771973], [-37.8670295242039, 137.7422904968262], [-37.890298948095236, 138.34774017333987], [-38.07137758032473, 138.92426490783694], [-38.39596639609307, 139.0270042419434], [-38.70172154765305, 141.56141281127933], [-38.40363064120208, 142.04549789428714], [-37.56682189032967, 141.91846847534183], [-36.041389289470516, 140.1307010650635], [-35.84375546490172, 139.32629585266116], [-35.30195724628881, 139.19883728027347], [-34.8281331589652, 139.59563255310061], [-34.53498513228951, 140.269832611084], [-34.541065593582196, 141.0854816436768], [-35.06639464680183, 141.23714447021487], [-35.42911146909181, 140.80103874206546], [-36.39505373741135, 141.94499015808108], [-35.779524727359764, 142.1072101593018], [-35.30729630311757, 142.62562751770022], [-35.79720931423237, 143.6474418640137], [-36.67482277467355, 143.68434906005862], [-36.84894072784125, 144.46532249450686], [-38.26956527552983, 144.85198974609378], [-37.84419874388814, 145.76934814453128], [-38.6511983322995, 146.30570411682132], [-39.45296727155886, 146.400203704834], [-39.665380480060705, 147.22546577453616], [-38.741393999628514, 148.0917549133301], [-38.981763574515846, 149.8239898681641], [-39.68842822852525, 151.12338066101077], [-40.89002830179659, 151.44859313964847], [-41.5367891915188, 151.14389419555667], [-42.07977299531719, 149.89703178405765], [-43.492533740417976, 150.52102088928225], [-44.04552463793709, 150.02337455749515], [-44.304512195362804, 149.1988849639893], [-45.951184906005736, 140.63117980957034], [-45.47054464091784, 139.5703983306885], [-44.66834766432111, 139.14699554443362], [-45.02215788288518, 138.27452659606936], [-45.779137120616426, 137.5595569610596], [-46.22777618841882, 136.11322402954104]],
      fillOpacity: 0,
      fillColor: '#444444',
      title: 'US Major General John Logan',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/logon.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      polygon: [[-40.12627613547526, 156.39836311340335], [-39.99134184527316, 156.1909532546997], [-40.157852450577295, 155.9258222579956], [-40.344696115640076, 155.74197292327884], [-40.34490872062465, 155.38480997085574], [-40.28482935546321, 155.06431818008426], [-40.058842390726284, 154.97876644134524], [-39.803524865869385, 154.91722583770752], [-39.69487073602442, 154.63977813720706], [-39.447560777045744, 154.46545600891116], [-38.883900972836344, 154.51839208602908], [-38.406253794852674, 154.50605392456058], [-38.00745753030867, 154.41284179687503], [-37.61518326591251, 154.43161725997928], [-37.40652257258259, 154.30156230926517], [-37.07594617873334, 154.33806180953982], [-36.67711013691629, 154.0847969055176], [-36.43921544506181, 154.1471099853516], [-36.270279311571024, 154.54422712326053], [-36.30632404542499, 154.77238655090335], [-36.58396984040138, 155.2376747131348], [-36.41843343271532, 155.46969652175906], [-36.331237753298204, 155.77338695526126], [-36.27195738694016, 156.01135253906253], [-36.243205355983605, 156.2484169006348], [-36.549017709742884, 157.03357458114627], [-36.747515796110854, 157.7478361129761], [-36.6905150607117, 158.01526308059695], [-36.41867517103437, 157.94717788696292], [-36.12938294073768, 157.76952981948855], [-35.982156839380075, 157.83671379089355], [-35.91720717055725, 158.0391025543213], [-35.94090697675444, 158.22076320648196], [-36.04014646571285, 158.29191684722903], [-36.159810444640144, 158.3400893211365], [-36.41796722097507, 158.50492715835574], [-36.185896611526886, 158.65540981292725], [-35.89824568779287, 158.81494760513309], [-35.60813256796543, 158.75505924224856], [-35.287613656097164, 158.68667364120486], [-34.96049250104014, 158.7759590148926], [-34.71228457996009, 159.2654514312744], [-34.84422225773395, 159.52300786972046], [-35.30463653628077, 159.91823673248294], [-35.63059918592886, 159.83708381652832], [-35.793623977856704, 159.72722053527835], [-35.951503564620516, 159.7237873077393], [-35.98397932960088, 159.97741699218753], [-36.153382838098736, 160.37361145019534], [-36.770500193404864, 160.92818498611453], [-37.47031113792933, 161.17123603820804], [-37.7688659002153, 161.06137275695804], [-38.72459267451239, 161.25374078750613], [-39.316188117195054, 161.6033506393433], [-39.40633961100039, 162.30945825576785], [-39.917784329635644, 163.14860343933108], [-39.82575917167839, 163.37796449661258], [-39.61046577957147, 163.64903926849368], [-39.36507747567679, 164.37589645385745], [-39.55832416519747, 164.91684436798099], [-39.801348784691186, 165.27926445007327], [-40.210916777383595, 165.66232681274417], [-41.11736710019748, 165.86789131164554], [-41.37426449794255, 166.02594852447513], [-41.56861429846272, 166.3742280006409], [-42.34274935964332, 166.98461294174197], [-42.56049324655868, 167.04257011413574], [-42.77163642654131, 166.66126728057864], [-42.80993186318435, 165.90022802352908], [-43.21297999873513, 165.29617309570315], [-43.67113103712811, 165.05342245101932], [-44.165290253823436, 165.1929616928101], [-44.42372770603864, 165.3375005722046], [-44.615003170445654, 165.585572719574], [-44.802879797526266, 165.70161581039432], [-45.02456938454798, 165.6908440589905], [-45.18850979036391, 165.5419707298279], [-45.2926411372489, 165.185022354126], [-44.43397903259379, 162.018256187439], [-44.32020980564865, 161.7166900634766], [-44.15148175175231, 161.52595281600955], [-43.26984683864035, 158.9259481430054], [-43.30469411639204, 158.37403535842898], [-43.422286802370316, 158.2430148124695], [-43.506526645230664, 158.09534311294559], [-43.47371058300455, 157.74777173995975], [-43.375514154037106, 157.65855073928836], [-43.1662181853417, 157.62726545333865], [-43.028447220348475, 157.49572992324832], [-42.97961335160892, 157.2870755195618], [-43.082759058664955, 157.08949327468875], [-43.283375763474766, 156.8059301376343], [-42.86884036068377, 156.29251241683963], [-42.50455031032057, 156.01684570312503], [-42.17911575623785, 155.73873281478882], [-41.99774183148413, 155.56657791137698], [-41.899961258549794, 155.3766989707947], [-41.6485769238389, 155.257523059845], [-41.36893451442819, 155.26947498321536], [-41.19706276873217, 155.50400733947757], [-41.18863412011928, 155.7717561721802], [-41.15561954291093, 156.31414175033572], [-40.77547182732, 156.34051322937015]],
      fillOpacity: 0,
      fillColor: '#444444',
      title: 'US Col. Francis De Gress',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/DeGress.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }, {
      polygon: [[-27.906337800712453, 150.61796665191653], [-27.83531913439265, 149.46423053741458], [-28.35635935404671, 148.22556495666507], [-28.60777047861997, 147.77873039245608], [-28.745198345527967, 147.42133140563968], [-28.281934362775516, 147.00127601623538], [-27.335175050009422, 146.68700695037845], [-26.788295275599594, 146.58177852630618], [-26.32334485229612, 146.40715599060061], [-25.20645549030058, 146.1282062530518], [-24.595246132384027, 146.03151798248294], [-24.323322420243212, 145.78230857849124], [-23.785580427152805, 145.90873718261722], [-23.27411073292554, 145.7192659378052], [-22.821282687956252, 146.12348556518558], [-22.14857597624664, 146.47981166839602], [-21.728885873951484, 146.7538690567017], [-21.320440769020266, 147.02882766723636], [-21.15207593239171, 147.7944374084473], [-21.255941642701917, 148.58068943023684], [-21.30832684876138, 149.7399187088013], [-22.184543853741147, 150.77786922454837], [-22.99213572691422, 151.51815891265872], [-23.353760987073255, 151.33576869964602], [-23.80878702317736, 151.2203693389893], [-24.336383149030077, 151.29555702209475], [-25.19915543720738, 151.14522457122806], [-27.269125970618926, 151.77032947540286], [-28.31911559120763, 151.24886512756348]],
      title: 'US Brigadier Gen. Manning Force',
      fillOpacity: 0,
      fillColor: '#444444',
      thumbnail: 'https://battleofatlanta.s3.amazonaws.com/force.png',
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.</p>
      `
    }]),

    actions: {
      initMap(event) {
        let map = event.target;
        map.zoomControl.setPosition('topright');
        // map.setZoom(3);
        map.fitBounds(Ember.get(this, 'bounds'));
        Ember.set(this, '_map', map);
      },

      paintingLoaded() {
        // get(this, _map).fitBounds(get(this, 'bounds'));
      },

      highlight(hotSpot, index) {
        Ember.set(hotSpot, 'index', index);
        const map = Ember.get(this, '_map');

        document.getElementsByClassName('leaflet-container')[0].style.width = '67vw';
        // document.getElementsByClassName('leaflet-container')[0].style.height = '100vh';
        document.getElementsByClassName('leaflet-container')[0].style.top = '0';

        _uikit.default.util.on(document.getElementById('panel'), 'hide', () => {
          document.getElementsByClassName('leaflet-container')[0].style.width = '100%';
          // document.getElementsByClassName('leaflet-container')[0].style.height = '90vh';
          document.getElementsByClassName('leaflet-container')[0].style.top = '10vh';
        });

        let hotSpots = Ember.get(this, 'hotSpots');
        Ember.set(this, 'activeHotSpot', hotSpot);

        hotSpots.forEach(h => {
          Ember.setProperties(h, { fillOpacity: 0 });
        });

        map.flyToBounds(hotSpot.polygon, {
          paddingBottomRight: [0, 0]
        });

        Ember.get(this, 'panel').show();

        Ember.setProperties(hotSpot, { fillOpacity: .6 });
      },

      next(index) {
        const next = index + 1;
        this.send('highlight', Ember.get(this, 'hotSpots')[next], next);
      },

      previous(index) {
        const prev = index - 1;
        this.send('highlight', Ember.get(this, 'hotSpots')[prev], prev);
      },

      reCenter() {
        if (Ember.get(this, '_map') && Ember.get(this, 'panel').isToggled()) {
          let hotSpots = Ember.get(this, 'hotSpots');

          Ember.get(this, 'panel').hide();

          document.getElementsByClassName('leaflet-container')[0].style.width = '100%';

          hotSpots.forEach(h => {
            Ember.setProperties(h, { fillOpacity: 0 });
          });

          Ember.get(this, '_map').flyToBounds(Ember.get(this, 'bounds'), {
            padding: [0, 0]
          });

          Ember.get(this, '_map').setZoom(3);
        }
      },

      reSize() {
        // console.log('oh hi');
      }
    }
  });
});