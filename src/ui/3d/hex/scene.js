import { tools } from './tools';
import * as THREE from 'three';

/*
  Sets up and manages a THREEjs container, camera, and light, making it easy to get going.
  Also provides camera control.

  Assumes full screen.
 */
export class Scene {
  constructor(sceneConfig, controlConfig) {
    const defaultConfig = {
      element: document.body,
      alpha: true,
      antialias: true,
      clearColor: '#fff',
      sortObjects: false,
      fog: null,
      light: new THREE.DirectionalLight(0xffffff),
      lightPosition: null,
      cameraType: 'PerspectiveCamera',
      cameraPosition: null, // {x, y, z}
      orthoZoom: 4,
    };
    const sceneSettings = tools.merge(defaultConfig, sceneConfig);

    const defaultSettings = {
      minDistance: 100,
      maxDistance: 1000,
      zoomSpeed: 2,
      noZoom: false,
    };

    const controlSettings =
      typeof controlConfig !== 'boolean'
        ? tools.merge(defaultSettings, controlConfig)
        : defaultSettings;

    this.renderer = new THREE.WebGLRenderer({
      alpha: sceneSettings.alpha,
      antialias: sceneSettings.antialias,
    });
    this.renderer.setClearColor(sceneSettings.clearColor, 0);
    this.renderer.sortObjects = sceneSettings.sortObjects;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.orthoZoom = sceneSettings.orthoZoom;

    this.container = new THREE.Scene();
    this.container.fog = sceneSettings.fog;

    this.container.add(new THREE.AmbientLight(0xdddddd));

    if (!sceneSettings.lightPosition) {
      sceneSettings.light.position.set(-1, 1, -1).normalize();
    }
    this.container.add(sceneSettings.light);

    if (sceneSettings.cameraType === 'OrthographicCamera') {
      const width = window.innerWidth / this.orthoZoom;
      const height = window.innerHeight / this.orthoZoom;
      this.camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        5000
      );
    } else {
      this.camera = new THREE.PerspectiveCamera(
        50,
        this.width / this.height,
        1,
        5000
      );
    }

    this.contolled = !!controlConfig;
    if (this.contolled) {
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.minDistance = controlSettings.minDistance;
      this.controls.maxDistance = controlSettings.maxDistance;
      this.controls.zoomSpeed = controlSettings.zoomSpeed;
      this.controls.noZoom = controlSettings.noZoom;
    }

    if (sceneSettings.cameraPosition) {
      this.camera.position.copy(sceneSettings.cameraPosition);
    }

    window.addEventListener(
      'resize',
      function onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.camera.type === 'OrthographicCamera') {
          const width = this.width / this.orthoZoom;
          const height = this.height / this.orthoZoom;
          this.camera.left = width / -2;
          this.camera.right = width / 2;
          this.camera.top = height / 2;
          this.camera.bottom = height / -2;
        } else {
          this.camera.aspect = this.width / this.height;
        }
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
      }.bind(this),
      false
    );

    this.attachTo(sceneSettings.element);
  }

  attachTo(element) {
    element.style.width = this.width + 'px';
    element.style.height = this.height + 'px';
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    element.appendChild(this.renderer.domElement);
  }

  add(mesh) {
    this.container.add(mesh);
  }

  remove(mesh) {
    this.container.remove(mesh);
  }

  render() {
    if (this.contolled) this.controls.update();
    this.renderer.render(this.container, this.camera);
  }

  updateOrthoZoom() {
    if (this.orthoZoom <= 0) {
      this.orthoZoom = 0;
      return;
    }
    const width = this.width / this.orthoZoom;
    const height = this.height / this.orthoZoom;
    this.camera.left = width / -2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = height / -2;
    this.camera.updateProjectionMatrix();
  }

  focusOn(obj) {
    this.camera.lookAt(obj.position);
  }
}
