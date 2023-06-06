// import { DEFAULT_ROW_COUNT } from "@aws-amplify/ui-react/dist/types/primitives/TextAreaField/TextAreaField.js";
import { Modal } from "./Modal.js";

// The following example creates five accessible and
// focusable markers.
function initMap() {
    // モーダル関数の呼び出し
    // Modal();

    // 地図の初期化
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 35.707575, lng: 139.774468 },
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons:false
    });

    // restaurant配列の定義
    const restaurants = [
      [{ lat: 35.700806, lng: 139.771242 }, "サブウェイ 秋葉原タイムズタワー店"],
      [{ lat: 35.711828, lng: 139.776145 }, "サイゼリヤ 上野広小路店"],
      [{ lat: 35.710439, lng: 139.774596 }, "大地の贈り物 上野店"],
      [{ lat: 35.718653, lng: 139.771261 }, "OKATTE"],
      [{ lat: 35.713768, lng: 139.777254 }, "LACOCORICO上野本店"],
    ];
    
    // markerに表示するinfoWindowの作成
    const infoWindow = new google.maps.InfoWindow();
  
    // restaurantオブジェクトの作成
    restaurants.forEach(([position, title], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        // title: `${i + 1}. ${title}`,
        title: title,
        // label: `${i + 1}`, //labelを削除
        optimized: false,
      });
  
      // // Add a click listener for each marker, and set up the info window.
      // marker.addListener("click", () => {
      //   // 地図の中心をクリックされた店舗に移動
      //   map.setCenter(marker.position);

      //   // モーダル表示
      //   const restaurantName = document.getElementById(`restaurant-name`);
      //   restaurantName.textContent = `店舗名：${marker.getTitle()}`;
      //   const modal = document.getElementById('demo-modal');
      //   modal.style.display = 'block';
      // });


      // オフキャンバス要素
      // document.getElementById("myButton").addEventListener("click", ()=>{
      //   const offcanvasElement = document.getElementById('offcanvasBottom');
      //   const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      //   offcanvas.show();
      // });

      // マーカーをクリックした時Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        // 地図の中心をクリックされた店舗に移動
        map.setCenter(marker.position);
        // オフキャンバスを表示
        const offcanvasElement = document.getElementById('offcanvasBottom');
        const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.show();
        // オフキャンバスに店舗情報を埋め込み
        const restaurantName = document.getElementById(`restaurant-name`);
        restaurantName.textContent = `${marker.getTitle()}`;
      });
    });


    // 現在地に移動機能
    document.getElementById("direction-button").addEventListener("click", function() {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // mapオブジェクトのセンターをHTML5 geolocationで取得したposに移動
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });


    // 場所検索機能（オートコンプリート）
    const input = document.getElementById("location-input");
    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["train_station", "subway_station","transit_station"]
    };  
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      
    });
  }

  window.initMap = initMap;