const cursor = document.querySelector('a-cursor')
if(AFRAME.utils.device.checkHeadsetConnected()){
 cursor.pause()
 cursor.setAttribute('visible',false) 
}

const scene = AFRAME.scenes[0]

scene.addEventListener('loaded',  e=>{
  
const sky =document.querySelector('a-gradient-sky')  

const slider = document.createElement('cs1-slider')
slider.setAttribute('title','Butteriness')
slider.id = 'Butteriness'
slider.setAttribute('titlecolor','red')
slider.setAttribute('min',1)
slider.setAttribute('max',100)
slider.setAttribute('startvalue',50)
slider.addEventListener('change', e=>{
  console.log(`Butteriness : ${e.detail}`)
  sky.object3D.children[0].material.uniforms.bottomColor.value.x=e.detail/100
  sky.object3D.children[0].material.uniforms.bottomColor.value.y=e.detail/100
  sky.object3D.children[0].material.uniforms.bottomColor.value.z=e.detail/500
})

const slider2 = document.createElement('cs1-slider')
slider2.setAttribute('title','Comfiness')
slider2.id = 'Comfiness'
slider2.setAttribute('titlecolor','green')
slider2.setAttribute('min',0)
slider2.setAttribute('max',100)

slider2.addEventListener('change', e=>{
  console.log(`Comfiness : ${e.detail}`)
  sky.object3D.children[0].material.uniforms.topColor.value.y=e.detail/100
})

 
const particles = document.querySelector('#particles').components['particle-system']
  
const slider3 = document.createElement('cs1-slider')
slider3.setAttribute('title','CS1 Game Engine')
slider3.id = 'CS1GameEngine'
slider3.setAttribute('titlecolor','purple')
slider3.setAttribute('min',1)
slider3.setAttribute('max',20)
slider3.setAttribute('smooth',false) // Doesn't dispatch events on intermittent values,
slider3.addEventListener('change', e=>{
  console.log(`CS1 Game Engine : ${e.detail}`)
  particles.data.maxParticleCount = Math.pow(2,e.detail)
  particles.update()
})
  
const poster = document.querySelector('#poster')

const slider4 = document.createElement('cs1-slider')
slider4.setAttribute('title','Hope')
slider4.id = 'Hope'
slider4.setAttribute('titlecolor','#227ca5')
slider4.setAttribute('min',1)
slider4.setAttribute('max',1000)
slider4.addEventListener('change', e=>{
  console.log(`Hope : ${e.detail}`)
  poster.object3D.children[0].material.opacity = e.detail/1000
})
  
const centerPanel = document.querySelector('#center-panel')

centerPanel.layout(2,2,[
  slider , slider2,
  slider3, slider4
])  
  
  
const button = document.createElement('cs1-button')  
  
const button2 = document.createElement('cs1-button')  

const button3 = document.createElement('cs1-button')  

const button4 = document.createElement('cs1-button')  

const button5 = document.createElement('cs1-button')  

const button6 = document.createElement('cs1-button')  

 
  
const rightPanel = document.querySelector('#right-panel')

rightPanel.layout(2,3,[
  button , button2, button3,
  button4, button5, button6
])    
  
   
  
})



  