import './style.css'
import gsap from 'gsap'
import * as THREE from 'three'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// Clear Scroll Memory
window.history.scrollRestoration = 'manual'

// Header
const greenButtons = document.querySelectorAll('.greenButton')

for (let i = 0; i < greenButtons.length; i ++) {
    greenButtons[i].addEventListener('mouseenter', () => {
        gsap.to(greenButtons[i], {duration: 0.25, color: '#FFFFFF', backgroundColor: '#68C242'})
    })
    
    greenButtons[i].addEventListener('mouseleave', () => {
        gsap.to(greenButtons[i], {duration: 0.25, color: '#68C242', backgroundColor: '#D9F0D0'})
    })
}

// Hero Section
const zoomInHeroBanner = () => {
    gsap.to('.heroImage', {duration: 4, transform: 'scale(1.1)', ease: 'Power1.easeInOut'})
}

const zoomOutHeroBanner = () => {
    gsap.to('.heroImage', {duration: 4, delay: 5, transform: 'scale(1)', ease: 'Power1.easeInOut'})
}

zoomInHeroBanner()
zoomOutHeroBanner()

// Artist
const artistRightSide = document.querySelector('.artistRightSide')
let artistImageHeight = artistRightSide.clientHeight
const artistImage = document.querySelector('.artistImage')
const artistImageRatio = 666/456
gsap.to(artistImage, {duration: 0, height: artistImageHeight + 'px', width: artistImageHeight * artistImageRatio + 'px'})

// Releases
const leftControl = document.querySelector('#leftControl')
const rightControl = document.querySelector('#rightControl')

const cardCount = document.querySelectorAll('.newReleaseCard').length
let currentCardNumber = 0
let additionalSlide = 0

let cardWidth = document.querySelector('.newReleaseCardDiv').clientWidth

// If Even number of cards
if (cardCount%2 == 0) {
    gsap.fromTo('.releasesSlider', {x: 0}, {duration: 0, x: cardWidth/2, ease: 'none'})
    currentCardNumber = cardCount/2 - 1
    additionalSlide = cardWidth/2
}
else {
    currentCardNumber = (cardCount-1)/2
}

let currentSliderPosition = 0
let isSliderSliding = false

leftControl.addEventListener('click', () => {
    if (isSliderSliding == false && currentCardNumber > 0) {
        currentSliderPosition += cardWidth
        gsap.to('.releasesSlider', {duration: 1, x: currentSliderPosition  + additionalSlide, ease: 'Power1.easeOut'})
        isSliderSliding = true
        setTimeout(() => {
            isSliderSliding = false
        }, 1000)
        currentCardNumber -= 1
        gsap.to('#leftControl', {duration: 0.1, scale: 0.75})
        gsap.to('#leftControl', {duration: 0.1, delay: 0.1, scale: 1})
        gsap.to('#rightControlImage', {opacity: 1})
        if (currentCardNumber == 0) {
            gsap.to('#leftControlImage', {opacity: 0.5})
            gsap.to('#leftControl', {duration: 0})
        }
    }
})

rightControl.addEventListener('click', () => {
    if (isSliderSliding == false && currentCardNumber < (cardCount - 1)) {
        currentSliderPosition -= cardWidth
        gsap.to('.releasesSlider', {duration: 1, x: currentSliderPosition  + additionalSlide, ease: 'Power1.easeOut'})
        isSliderSliding = true
        setTimeout(() => {
            isSliderSliding = false
        }, 1000)
        currentCardNumber += 1
        gsap.to('#rightControl', {duration: 0.1, scale: 0.75})
        gsap.to('#rightControl', {duration: 0.1, delay: 0.1, scale: 1})
        gsap.to('#leftControlImage', {opacity: 1})
        if (currentCardNumber == (cardCount - 1)) {
            gsap.to('#rightControlImage', {opacity: 0.5})
        }
    }
})

// Forms
const forms = document.querySelector('.formsActual')
forms.addEventListener('submit', (e) => {
    e.preventDefault()
})

// Reload
window.addEventListener('load', () => {
    // Clear Scroll Memory
    window.history.scrollRestoration = 'manual'

    // Image Height
    artistImageHeight = artistRightSide.clientHeight
    gsap.to(artistImage, {duration: 0, height: artistImageHeight + 'px', width: artistImageHeight * artistImageRatio + 'px'})

    // Card Width
    cardWidth = document.querySelector('.newReleaseCardDiv').clientWidth

    // Current Card Number
    if (cardCount%2 == 0) {
        gsap.fromTo('.releasesSlider', {x: 0}, {duration: 0, x: cardWidth/2, ease: 'none'})
        currentCardNumber = cardCount/2 - 1
        additionalSlide = cardWidth/2
    }
    else {
        currentCardNumber = (cardCount-1)/2
    }

    // Animation Reset
    gsap.set('.artistImage', {duration: 0, x: 100, opacity: 0})
    gsap.to('.menuLogo', {duration: 0, scaleX: 1})
    gsap.to('.menuLogoWhite', {duration: 0, scaleX: 1})
    gsap.to('.menuSubDivs', {duration: 0.5, x: 0})
})

let currentInnerWidth = window.innerWidth
let prevInnerWidth = 0

// Resize
window.addEventListener('resize', () => {
    prevInnerWidth = currentInnerWidth
    currentInnerWidth = window.innerWidth

    // Slider Adjust
    if ((prevInnerWidth > 1080 && currentInnerWidth <= 1080) || (prevInnerWidth <= 1080 && currentInnerWidth > 1080)) {
        currentSliderPosition = Math.floor(currentSliderPosition / cardWidth)
        cardWidth = document.querySelector('.newReleaseCardDiv').clientWidth
        currentSliderPosition = currentSliderPosition * cardWidth
        if (cardCount%2 == 0) {
            additionalSlide = cardWidth/2
        }
        else {
            additionalSlide = 0
        }
        gsap.to('.releasesSlider', {duration: 0, x: currentSliderPosition + additionalSlide, ease: 'none'})
    }

    // Image Height
    artistImageHeight = artistRightSide.clientHeight
    gsap.to(artistImage, {duration: 0, height: artistImageHeight + 'px', width: artistImageHeight * artistImageRatio + 'px'})

    // Gain Scroll Back
    if (window.innerWidth > window.innerHeight) {
        gsap.to(document.body, {duration: 0, overflowY: 'scroll'})
    }

    // Animation Reset
    if (isMenuIn == false) {
        gsap.to('.menuModal', {duration: 0, x: window.innerWidth})
    }

    // Three.js -----
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// GSAP Animations
const allUnderlines = document.querySelectorAll('.underlineDiv')
const allLinkTexts = document.querySelectorAll('.linkText')

for (let i = 0; i < allUnderlines.length; i++) {
    gsap.to(allUnderlines[i], {duration: 0, transform: 'scaleX(0)'})
    allLinkTexts[i].addEventListener('mouseenter', () => {
        gsap.to(allUnderlines[i], {duration: 0.25, transformOrigin: 'left', transform: 'scaleX(1)'})
    })
    allLinkTexts[i].addEventListener('mouseleave', () => {
        gsap.to(allUnderlines[i], {duration: 0.25, transformOrigin: 'right', transform: 'scaleX(0)'})
    })
}

// Hero CTA
const playButton = document.querySelector('.watchVideo')
const watchVideoText = document.querySelector('.watchVideoText')

playButton.addEventListener('click', () => {
    gsap.to('.watchVideo', {duration: 0.1, scale: 0.75})
    gsap.to('.watchVideo', {duration: 0.1, delay: 0.1, scale: 1})
})

watchVideoText.addEventListener('click', () => {
    gsap.to('.watchVideo', {duration: 0.1, scale: 0.75})
    gsap.to('.watchVideo', {duration: 0.1, delay: 0.1, scale: 1})
})

playButton.addEventListener('mouseenter', () => {
    gsap.to('#watchUnderline', {duration: 0.25, transformOrigin: 'left', transform: 'scaleX(1)'})
})

playButton.addEventListener('mouseleave', () => {
    gsap.to('#watchUnderline', {duration: 0.25, transformOrigin: 'right', transform: 'scaleX(0)'})
})

gsap.fromTo('.heroCTA', {opacity: 0, pointerEvents: 'none'}, {duration: 0.5, delay: 2, opacity: 1, pointerEvents: 'auto'})
gsap.to('#watchUnderline', {duration: 0.25, delay: 2.25, transformOrigin: 'left', transform: 'scaleX(1)'})
gsap.to('#watchUnderline', {duration: 0.25, delay: 2.5, transformOrigin: 'right', transform: 'scaleX(0)'})


// Forms Image
const mouse = {
    x: 0,
    y: 0
}

// Mouse Move
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5
    mouse.y = - (e.clientY / window.innerHeight - 0.5)
    gsap.to('.formsImage', {delay: 0.25, x: mouse.x * 10})
    
    // Cursor Follower
    gsap.to('.cursorFollowerBig', {duration: 0, x: e.clientX - 9, y: e.clientY - 9})
    gsap.to('.cursorFollowerMid', {duration: 0.2, x: e.clientX - 7, y: e.clientY - 7})
    gsap.to('.cursorFollowerSmall', {duration: 0.4, x: e.clientX - 5, y: e.clientY - 5})
})

// Cursor Follower Appears
document.body.addEventListener('mouseenter', () => {
    gsap.to('.cursorFollowerBig', {duration: 0.5, delay: 0.5, opacity: 1})
    gsap.to('.cursorFollowerMid', {duration: 0.5, delay: 0.5, opacity: 1})
    gsap.to('.cursorFollowerSmall', {duration: 0.5, delay: 0.5, opacity: 1})
})

// Click
window.addEventListener('click', () => {
    gsap.to('.cursorFollowerBig', {duration: 0.1, scale: 1.5})
    gsap.to('.cursorFollowerMid', {duration: 0.1, scale: 1.5})
    gsap.to('.cursorFollowerSmall', {duration: 0.1, scale: 1.5})
    gsap.to('.cursorFollowerBig', {duration: 0.2, delay: 0.1, scale: 1})
    gsap.to('.cursorFollowerMid', {duration: 0.2, delay: 0.1, scale: 1})
    gsap.to('.cursorFollowerSmall', {duration: 0.2, delay: 0.1, scale: 1})
})

const mapFrame = document.querySelector('.mapFrame')

mapFrame.addEventListener('mouseenter', () => {
    gsap.to('.cursorFollowerBig', {duration: 0.25, opacity: 0})
    gsap.to('.cursorFollowerMid', {duration: 0.25, opacity: 0})
    gsap.to('.cursorFollowerSmall', {duration: 0.25, opacity: 0})
})

mapFrame.addEventListener('mouseleave', () => {
    gsap.to('.cursorFollowerBig', {duration: 0.5, opacity: 1})
    gsap.to('.cursorFollowerMid', {duration: 0.5, opacity: 1})
    gsap.to('.cursorFollowerSmall', {duration: 0.5, opacity: 1})
})

// Scroll Triggers
gsap.registerPlugin(ScrollTrigger)

gsap.to('.heroImage', {
    scrollTrigger: {
        trigger: '.heroSection',
        start: () =>  window.innerHeight*1 + ' bottom',
        end: () =>  window.innerHeight*1 + ' top',
        scrub: true,
        markers: false
    },
    y: 200
})

gsap.fromTo('.artistImage', {x: 100}, {
    scrollTrigger: {
        trigger: '.artistSection',
        start: () =>  window.innerHeight*0.3 + ' bottom',
        markers: false
    },
    duration: 1,
    x: 0,
})

gsap.fromTo('.artistImage', {opacity: 0}, {
    scrollTrigger: {
        trigger: '.artistSection',
        start: () =>  window.innerHeight*0.3 + ' bottom',
        markers: false
    },
    duration: 1,
    delay: 0.25,
    opacity: 1
})

gsap.fromTo('.formsImage', {y: -200}, {
    scrollTrigger: {
        trigger: '.formsSection',
        start: () =>  window.innerHeight*0 + ' bottom',
        end: () =>  window.innerHeight*0 + ' top',
        scrub: true,
        markers: false
    },
    y: 0
})

// Nav States
const navs = document.querySelectorAll('.nav')
const navSVGs = document.querySelectorAll('.navSvg')

const menuModalNavButtons = document.querySelectorAll('.menuModalNavButton')
const menuNavSVGs = document.querySelectorAll('.menuNavSvg')
const menuSubDivLists = document.querySelectorAll('.menuSubDivList')

let currentMenuModalNav = 0

for (let i = 0; i < navs.length; i++) {
    navs[i].addEventListener('click', () => {
        for (let j = 0; j < navs.length; j++) {
            if (i !== j) {
                navs[j].classList.remove('currentNavButton')
                navSVGs[j].classList.remove('currentNavLogo')
                navSVGs[j].classList.add('navLogo')
                menuSubDivLists[j].classList.remove('currentMenuSubDivList')
                // Mobile State
                menuModalNavButtons[j].classList.remove('menuCurrentNav')
                menuNavSVGs[j].classList.remove('menuCurrentNavLogo')
                menuNavSVGs[j].classList.add('navLogo')
                menuSubDivLists[j].classList.remove('currentMenuSubDivList')
            }
            else {
                navs[j].classList.add('currentNavButton')
                navSVGs[j].classList.add('currentNavLogo')
                navSVGs[j].classList.remove('navLogo')
                menuSubDivLists[j].classList.add('currentMenuSubDivList')
                // Mobile State
                menuModalNavButtons[j].classList.add('menuCurrentNav')
                menuNavSVGs[j].classList.add('menuCurrentNavLogo')
                menuNavSVGs[j].classList.remove('navLogo')
                menuSubDivLists[j].classList.add('currentMenuSubDivList')
            }
        }
        if (i !== currentMenuModalNav){
            currentMenuModalNav = i
            gsap.fromTo('.menuSubDivs', {x: 20, opacity: 0}, {duration: 0.5, x: 0, opacity: 1})
        }
    })
}

// Menu Modal Nav States
for (let i = 0; i < menuModalNavButtons.length; i++) {
    menuModalNavButtons[i].addEventListener('click', () => {
        for (let j = 0; j < menuModalNavButtons.length; j++) {
            if (i !== j) {
                menuModalNavButtons[j].classList.remove('menuCurrentNav')
                menuNavSVGs[j].classList.remove('menuCurrentNavLogo')
                menuNavSVGs[j].classList.add('navLogo')
                menuSubDivLists[j].classList.remove('currentMenuSubDivList')
                // Desktop State
                navs[j].classList.remove('currentNavButton')
                navSVGs[j].classList.remove('currentNavLogo')
                navSVGs[j].classList.add('navLogo')
                menuSubDivLists[j].classList.remove('currentMenuSubDivList')
            }
            else {
                menuModalNavButtons[j].classList.add('menuCurrentNav')
                menuNavSVGs[j].classList.add('menuCurrentNavLogo')
                menuNavSVGs[j].classList.remove('navLogo')
                menuSubDivLists[j].classList.add('currentMenuSubDivList')
                // Desktop State
                navs[j].classList.add('currentNavButton')
                navSVGs[j].classList.add('currentNavLogo')
                navSVGs[j].classList.remove('navLogo')
                menuSubDivLists[j].classList.add('currentMenuSubDivList')
            }
        }
        if (i !== currentMenuModalNav){
            currentMenuModalNav = i
            gsap.fromTo('.menuSubDivs', {x: 20, opacity: 0}, {duration: 0.5, x: 0, opacity: 1})
        }
    })
}

// Portrait Animations
const menuButton = document.querySelector('.menuLogo')

let isMenuIn = false
let isModalAnimating = false

gsap.to('.menuLogoWhite', {duration: 0, rotationZ: 90})
gsap.to('.menuModal', {duration: 0, x: window.innerWidth, zIndex: 9000})
gsap.to('.menuSubDivs', {duration: 0, x: 20, opacity: 0})

menuButton.addEventListener('click', () => {
    if (isModalAnimating == false) {
        isModalAnimating = true
        if (isMenuIn == false) {
            gsap.to('.menuLogo', {duration: 0.25, rotationZ: 90})
            gsap.to('.menuLogo', {duration: 0.35, delay: 0.25, scaleX: 150})
            gsap.to('.menuLogoWhite', {duration: 0.35, delay: 0.25, scaleX: 150})
            gsap.to('.menuModal', {duration: 0.25, x: 0})
            isMenuIn = true
            gsap.to(document.body, {duration: 0, overflowY: 'hidden'})
            gsap.fromTo('.menuSubDivs', {x: 20, opacity: 0}, {duration: 0.5, delay: 0.25, x: 0, opacity: 1})
        }
        else {
            gsap.to('.menuLogo', {duration: 0.35, scaleX: 1})
            gsap.to('.menuLogo', {duration: 0.25, delay: 0.35, rotationZ: 0})
            gsap.to('.menuLogoWhite', {duration: 0.35, scaleX: 1})
            gsap.to('.menuModal', {duration: 0.25, delay: 0.35, x: window.innerWidth})
            isMenuIn = false
            gsap.to(document.body, {duration: 0, overflowY: 'scroll'})
        }
        setTimeout(() => {
            isModalAnimating = false
        }, 600)
    }
})

// Three.js Part -------------------------------

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
       
    },
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {

    }
)

const images = []

// Texture loader
const textureLoader = new THREE.TextureLoader()
images[0] = textureLoader.load('./images/album1.jpg')
images[1] = textureLoader.load('./images/album2.jpg')
images[2] = textureLoader.load('./images/album3.jpg')

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Mesh
const parameters = {
    width: 4,
    height: 4,
    sectionDistance: 15,
    rotationAngle: 0
}

const g = new THREE.PlaneGeometry(parameters.width, parameters.height, parameters.width, parameters.height)
const m1 = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTexture: {value: images[0]},
        uAlpha: {value: 0},
        uOffset: {value: new THREE.Vector2(0,0)},
        uTime: {value: 0}
    },
    transparent: true,
    side: THREE.DoubleSide
})
const p1 = new THREE.Mesh(g, m1)
p1.position.set(15, 1, -7)
p1.rotation.set(0,0,Math.PI*5/180)
scene.add(p1)

const m2 = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTexture: {value: images[1]},
        uAlpha: {value: 0},
        uOffset: {value: new THREE.Vector2(0,0)},
        uTime: {value: 0}
    },
    transparent: true,
    side: THREE.DoubleSide
})
const p2 = new THREE.Mesh(g, m2)
p2.position.set(8, -2, 3)
p2.rotation.set(0,0,-Math.PI*10/180)
scene.add(p2)

const m3 = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTexture: {value: images[2]},
        uAlpha: {value: 0},
        uOffset: {value: new THREE.Vector2(0,0)},
        uTime: {value: 0}
    },
    transparent: true,
    side: THREE.DoubleSide
})
const p3 = new THREE.Mesh(g, m3)
p3.position.set(9, 5, -2)
p3.rotation.set(0,0,Math.PI*10/180)
scene.add(p3)

// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.CineonToneMapping

// Parallax Camera Group
const cameraGroup = new THREE.Group
cameraGroup.add(camera)
cameraGroup.position.set(0,15,15)
scene.add(cameraGroup)

// Animate
const clock = new THREE.Clock()

// Random Rotation Values
const rotationValues = []

for (let i = 0; i < 9; i++) {
    rotationValues[i] = Math.random()*0.1 - 0.05
}

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Mesh Movements
    p1.rotation.x = Math.sin(elapsedTime*rotationValues[0]*20)*rotationValues[0]
    p1.rotation.y = Math.cos(elapsedTime*rotationValues[1]*20)*rotationValues[1]
    p1.rotation.z = Math.sin(elapsedTime*rotationValues[2]*20)*rotationValues[2] + Math.PI*5/180
    p2.rotation.x = Math.sin(elapsedTime*rotationValues[3]*20)*rotationValues[3]
    p2.rotation.y = Math.cos(elapsedTime*rotationValues[4]*20)*rotationValues[4]
    p2.rotation.z = Math.sin(elapsedTime*rotationValues[5]*20)*rotationValues[5] + -Math.PI*10/180
    p3.rotation.x = Math.sin(elapsedTime*rotationValues[6]*20)*rotationValues[6]
    p3.rotation.y = Math.cos(elapsedTime*rotationValues[7]*20)*rotationValues[7]
    p3.rotation.z = Math.sin(elapsedTime*rotationValues[8]*20)*rotationValues[8] + Math.PI*10/180
    p1.position.y = Math.sin(elapsedTime + 2)*0.1 + 1
    p2.position.y = Math.sin(elapsedTime + 1)*0.1 + -2
    p3.position.y = Math.sin(elapsedTime)*0.1 + 5

    // Camera Parallax
    camera.rotation.y = -(mouse.x) * 0.01
    camera.rotation.x = (mouse.y) * 0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

gsap.fromTo(cameraGroup.position, {y: 15}, {
    scrollTrigger: {
        trigger: '.heroSection',
        start: () =>  window.innerHeight*1.25 + ' bottom',
        end: () =>  window.innerHeight*3 + ' top',
        scrub: true,
        markers: false
    },
    y: -15
})

tick()
