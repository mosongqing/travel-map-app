require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/widgets/Search",
    "esri/widgets/ScaleBar",
    "esri/Basemap",
  ], function (Map, SceneView, Search, ScaleBar,) {
    // 创建地图
    var map = new Map({
      basemap: "hybrid",// 可选: "topo-vector", "satellite", 等
      ground: "world-elevation"
    });
  
    // 创建3D场景视图
    var view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [110.1746, 25.1630, 500], // 添加高程值
      zoom: 10,
      camera: { // 设置初始相机角度
        position: [110.1423, 25.1640, 2500],
        tilt: 10,
      }
    });
  
    let searchWidget = new Search({
      view: view
    });
    view.ui.add(searchWidget, "top-right");
  
    // 添加比例尺
    let scaleBar = new ScaleBar({
      view: view,
      unit: "metric"
    });
    view.ui.add(scaleBar, { position: "bottom-right", index: 0 });
  
  
  });
  
  //侧边栏控制
  function toggleSidebar() {
    const sidebar = document.querySelector('.glass-sidebar');
    const knobIcon = document.querySelector('.knob-icon');
    sidebar.classList.toggle('active');
    knobIcon.style.transform = sidebar.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
  }
  
  // 点击外部区域关闭
  document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.glass-sidebar');
    const knob = document.querySelector('.control-knob');
  
    if (!sidebar.contains(e.target) && !knob.contains(e.target)) {
      sidebar.classList.remove('active');
      document.querySelector('.knob-icon').style.transform = 'rotate(0)';
    }
  });
  
  