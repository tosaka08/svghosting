var map = L.map('map', {
  center: [40.75, -74.2],
  zoom: 13,
  minZoom: 13,
  maxZoom: 21
});

 svgBounds = [
    [40.712216, -74.22655],
    [40.773941, -74.12544]
  ];

var svgUrlLine = 'https://drive.google.com/uc?export=download&id=1Zw-nV6_sa8irCgiGfhkwXpGphFqmo0ls';
var svgUrlTexts = 'https://drive.google.com/uc?export=download&id=1Fkxeqs-jA8diThH8t4Epj7Qa0bHmlQh7';
var svgUrlJapanMap = 'https://drive.google.com/uc?export=download&id=1pLnUtVkWge6Xhb4WQFnJL9XjOWm2XuRf';
var svgUrlMap50 = 'https://drive.google.com/uc?export=download&id=1pqrAOT6Z65UJmR1jM2paB-zeZAOeP84S';
var svgUrlLineInfo = 'https://drive.google.com/uc?export=download&id=17wpDv6KS-yrK1PwIjVOw3-3Rotu7Ez2B';


var JapanMap = L.imageOverlay(svgUrlJapanMap, svgBounds).addTo(map);
var baseRailLine = L.imageOverlay(svgUrlLine, svgBounds).addTo(map);
var Texts = L.imageOverlay(svgUrlTexts, svgBounds).addTo(map);
var Map50 = L.imageOverlay(svgUrlMap50, svgBounds).addTo(map);
var LineInfo = L.imageOverlay(svgUrlLineInfo, svgBounds).addTo(map);

// UIコントローラー上の表示名とレイヤを紐付け
var overlayLayerControls = {
    '自治境界': JapanMap,
    '路線図': baseRailLine,
    '駅名': Texts,
    'Map50': Map50,
    '路線情報': LineInfo,
};

// オーバーレイレイヤ設定を地図に追加
// ベースレイヤは固定・UI表示不要なため、nullを設定
L.control.layers(null, overlayLayerControls, {collapsed: false}).addTo(map);

// ズームレベルが変更されたときに呼び出される関数
function onZoomEnd() {
  var currentZoom = map.getZoom();

  // ズームレベルが 13 以下の場合は表示、14 以上の場合は非表示にする
  if (currentZoom <= 15) {
    Map50.addTo(map);
    baseRailLine.remove();
  } else {
    Map50.remove();
    baseRailLine.addTo(map);
  }
}

// ズームレベル変更イベントのリスナーを追加
map.on('zoomend', onZoomEnd);
/*
//polylineを描写
 var testa = L.polyline([
//折り返し地点の座標
    [40.736104,-74.14511],
    [40.736104,-74.14478],

//polylineのスタイル
],{ weight: 5.3, color: '#FCB81E', opacity: 1.0 }).addTo(map); 

 //ホバーイベントー上がoverの時、下がoutしたとき
 testa.on('mouseover', function() {
    this.setStyle({
        color: '#0166b3',
        opacity: 1.0,
        weight: 8   //or whatever style you wish to use;
    });
});
 testa.on('mouseout', function() {
    this.setStyle(
      { weight: 5.3, color: '#FCB81E', opacity: 1.0 })
});
 testa.bindPopup("<a><img src='http://www.trbimg.com/img-5963fe7b/turbine/os-1499725431-83gp6q0gs5-snap-image/600' width='100%'/></a><br><strong>テスト架空線</strong><br>JR西日本旅客鉄道"); 

*/
