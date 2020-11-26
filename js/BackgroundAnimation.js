import * as THREE from "./three.module.js"
import { GLTFLoader } from "./GLTFLoader.js"

function BackgroundAnimation(window, document) {
  let camera, scene, renderer, objectMesh

  init()
  animate()

  function init() {
    const container = document.querySelector(".canvas-container")

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    )
    camera.position.set(4, 2, 4)
    camera.lookAt(2, 0, 2)
    camera.aspect = window.innerWidth / window.innerHeight

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)

    scene = new THREE.Scene()

    scene.background = new THREE.Color(0xffffff)

    const pointLight = new THREE.PointLight(0xffffff, 0.4)
    camera.add(pointLight)
    scene.add(camera)

    const light = new THREE.AmbientLight(0x404040, 1)

    scene.add(light)

    const loader = new GLTFLoader()

    loader.load(
      "../models/laptop/Laptop_01.gltf",
      function (gltf) {
        scene.add(gltf.scene)
        objectMesh = gltf.scene.children[0]
        camera = gltf.cameras[0]
        camera.aspect = window.innerWidth / window.innerHeight
        camera.position.x *= 3
        camera.position.y *= 1.3
        camera.position.z *= 3
        camera.updateProjectionMatrix()
        render()
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
      },
      function (error) {
        console.log("An error happened", error)
      }
    )

    window.addEventListener("resize", onWindowResize, false)
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  }

  function animate() {
    requestAnimationFrame(animate)

    if (objectMesh) {
      objectMesh.rotation.y = objectMesh.rotation.y + Math.PI / 180
    }

    render()
  }

  function render() {
    renderer.render(scene, camera)
  }
}

export default BackgroundAnimation
