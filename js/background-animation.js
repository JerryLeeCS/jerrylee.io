import * as THREE from "./three.module.js"
import Vec3 from "./Vec3.js"

function backgroundAnimation(window, document) {
  let camera, scene, renderer
  let mesh
  const amount = 14
  const maxVelocity = 1.5
  const maxForce = 0.3
  var start = undefined
  const meshCount = Math.pow(amount, 3)
  const object3D = new THREE.Object3D()
  let cubeDistanceMultipler = 12
  const dots = []
  let targetIndices = Array(meshCount)
    .fill(1)
    .map((v, i) => i)
    .sort(() => Math.random() - 0.5)

  const canvasHeightWindowCoverage = 0.75

  init()
  animate(0)

  function init() {
    const aspect =
      window.innerWidth / (window.innerHeight * canvasHeightWindowCoverage)
    console.log("init aspect ", aspect)
    camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 10000)

    camera.position.set(
      amount * cubeDistanceMultipler,
      amount * cubeDistanceMultipler,
      amount * cubeDistanceMultipler
    )
    camera.lookAt(0, 0, 0)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const color = 0x111111
    const geometry = new THREE.SphereBufferGeometry(1, 0.3, 0.3)
    const material = new THREE.MeshMatcapMaterial({ color })

    mesh = new THREE.InstancedMesh(geometry, material, meshCount)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage) // will be updated every frame

    //Cube formation
    let i = 0
    let offset = (amount - 1) / 2
    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        for (let z = 0; z < amount; z++) {
          const position = new Vec3(
            ...[x, y, z].map((v) => (offset - v) * cubeDistanceMultipler)
          )
          const velocity = new Vec3(
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3
          )
          object3D.position.set(...position.getAttributes())

          object3D.updateMatrix()
          mesh.setMatrixAt(i++, object3D.matrix)

          dots.push({
            position,
            velocity,
          })
        }
      }
    }

    scene.add(mesh)

    scene.add(new THREE.AmbientLight(0x111111))

    const canvas = document.querySelector("#c")
    renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    console.log(window.devicePixelRatio)
    renderer.setSize(
      window.innerWidth,
      window.innerHeight * canvasHeightWindowCoverage
    )

    window.addEventListener("resize", onWindowResize, false)
  } // end init

  function onWindowResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / (height * canvasHeightWindowCoverage)
    camera.updateProjectionMatrix()
    console.log("onWindowResize")
    console.log(camera.aspect)

    renderer.setSize(width, height * canvasHeightWindowCoverage)
  }

  function animate(timestamp) {
    requestAnimationFrame(animate)

    var time = Date.now() * 0.001

    mesh.rotation.x = Math.sin(time / 4)
    mesh.rotation.y = Math.sin(time / 2)

    let tempMatrix = new THREE.Matrix4()
    if (timestamp === 0 || timestamp > 200) {
      for (let i = 0; i < meshCount; i++) {
        const targetIndex = targetIndices[i]
        const targetPosition = dots[targetIndex].position.clone()
        const currentDot = dots[i]

        const desiredVelocity = targetPosition
          .subtract(currentDot.position)
          .normalize()
          .scale(maxVelocity)

        const steering = desiredVelocity
          .subtract(currentDot.velocity)
          .truncate(maxForce)

        currentDot.velocity.add(steering).truncate(maxVelocity)
        dots[i] = currentDot
      }

      for (let i = 0; i < meshCount; i++) {
        const currentDot = dots[i]

        const boundary = cubeDistanceMultipler * amount
        if (
          currentDot.position.x + currentDot.velocity.x >= boundary ||
          currentDot.position.x + currentDot.velocity.x <= -boundary
        ) {
          currentDot.velocity.x = -currentDot.velocity.x
        }

        if (
          currentDot.position.y + currentDot.velocity.y >= boundary ||
          currentDot.position.y + currentDot.velocity.y <= -boundary
        ) {
          currentDot.velocity.y = -currentDot.velocity.y
        }

        if (
          currentDot.position.z + currentDot.velocity.z >= boundary ||
          currentDot.position.z + currentDot.velocity.z <= -boundary
        ) {
          currentDot.velocity.z = -currentDot.velocity.z
        }

        currentDot.position.add(currentDot.velocity)
        object3D.position.set(...currentDot.position.getAttributes())
        object3D.updateMatrix()
        mesh.setMatrixAt(i, object3D.matrix)
        dots[i] = currentDot
      }
    }

    mesh.instanceMatrix.needsUpdate = true

    render()
  }

  function render() {
    renderer.render(scene, camera)
  }
}

export default backgroundAnimation
