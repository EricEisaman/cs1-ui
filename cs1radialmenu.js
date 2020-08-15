AFRAME.registerSystem('radialmenu', {
  schema: {},  

  init: function () {
 
  },


});


AFRAME.registerComponent('radialmenu', {

	schema: {
    
    labels: {
      type: 'array',
      default: [
        'first','second','third','fourth', 'fifth'
      ]},
    icons: {default: [
      
    ]},
    callbacks: {type:'array',default:[]},
    centercolor: {default: '#bf6020'},
    bgcolors: {default: []},
    margin: {default:6},
    hoversound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fmid_deep_click.mp3?v=1597180139874'},
    clicksound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Factivate_menu_item.mp3?v=1597181468111'},
    menuopensound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fopen_menu.mp3?v=1597180945028'},
    menuclosesound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fmenu_close.mp3?v=1597181370606'},
    radiusinner: {default: 0.2},
    radiusouter: {default: 0.5},
    textscale: {default: 1}
    
	},
  
  init: function(){
    
    
  
    
  },
  
  update: function () {
    
    this.slices = []
    this.slicesContainer = document.createElement('a-entity')
    this.slicesContainer.setAttribute('position', '0 0 -0.02')
    this.slicesContainer.setAttribute('scale','0 0 0')
    this.el.appendChild(this.slicesContainer)
    this.createSounds()
    this.createCenter()
    this.createSlices()
    this.el.setAttribute('rotation', '-30 0 0')
    this.isOpen = true
    this.isAnimating = false

 
  },
  
  createSounds: function(){
    const hse = document.createElement('a-sound')
    hse.setAttribute('src', this.data.hoversound)
    hse.addEventListener('sound-loaded', e=>{
      this.hoverSound = hse.components.sound
    })
    const cse = document.createElement('a-sound')
    cse.setAttribute('src', this.data.clicksound)
    cse.addEventListener('sound-loaded', e=>{
      this.clickSound = cse.components.sound
    })
    const mos = document.createElement('a-sound')
    mos.setAttribute('src', this.data.menuopensound)
    mos.addEventListener('sound-loaded', e=>{
      this.openSound = mos.components.sound
    })
    const mcs = document.createElement('a-sound')
    mcs.setAttribute('src', this.data.menuclosesound)
    mcs.addEventListener('sound-loaded', e=>{
      this.closeSound = mcs.components.sound
    })
    this.el.appendChild(mos)
    this.el.appendChild(mcs)
    this.el.appendChild(hse)
    this.el.appendChild(cse)
    
  },
  
  createCenter: function(){
    
    let center = document.createElement('a-circle')
    
    center.setAttribute('radius' , this.data.radiusinner-0.05)
    center.setAttribute('color', this.data.centercolor)
    const color = new THREE.Color()
    center.color = color.setStyle(this.data.centercolor)
    center.hoverColor = color.clone()
    center.hoverColor.multiplyScalar(1.4)
    center.className = 'clickable'
    
    center.addEventListener('animationcomplete__scaleup', e=>{
      center.removeAttribute('animation__scaleup')
      center.removeAttribute('animation__scaledown')
    })
        
    center.addEventListener('animationcomplete__scaledown', e=>{
      center.removeAttribute('animation__scaleup')
      center.removeAttribute('animation__scaledown')
    })
    
    center.addEventListener('mouseenter', e=>{ 
      center.setAttribute('animation__scaleup', 'property:scale; from:1 1 1; to:1.1 1.1 1.1; dur:140; autoplay:true') 
      center.object3D.children[0].material.color.set(center.hoverColor)
      this.hoverSound.playSound()
    })
    center.addEventListener('mouseleave', e=>{
      center.setAttribute('animation__scaledown', 'property:scale; from:1.1 1.1 1.1; to:1 1 1; dur:140; autoplay:true')
      center.object3D.children[0].material.color.set(center.color)
    })
    center.addEventListener('click', e=>{
      //console.log('this.isAnimating', this.isAnimating)
      //console.log('this.isOpen', this.isOpen)
      if(this.isAnimating)return
      this.isAnimating = true
      if(this.isOpen){
        this.slicesContainer.setAttribute('animation__open', 'property:scale; from:0 0 0; to:1 1 1; dur:600; autoplay:true') 
        this.openSound.playSound()
      }else{
        this.slicesContainer.setAttribute('animation__close', 'property:scale; from:1 1 1; to:0 0 0; dur:600; autoplay:true')
        this.closeSound.playSound()
      }
    })
    this.el.appendChild(center)
    this.slicesContainer.addEventListener('animationcomplete__open',e=>{
      //console.log('animationcomplete__open')
      this.isAnimating = false
      this.isOpen = !this.isOpen
    })
    this.slicesContainer.addEventListener('animationcomplete__close',e=>{
      //console.log('animationcomplete__close')
      this.isAnimating = false
      this.isOpen = !this.isOpen
      //console.log('setting isOpen to true')
      this.slicesContainer.removeAttribute('animation__open')
      this.slicesContainer.removeAttribute('animation__close')
    })
    
  },
  
  createSlices: function(){
    if(this.data.icons.length){
      
    }else{
      const thetalength = (360-this.data.labels.length*this.data.margin)/this.data.labels.length
      this.data.labels.forEach(  (label,index)=>{
        let slice = document.createElement('a-ring')
        slice.setAttribute('radius-inner', this.data.radiusinner)
        slice.setAttribute('radius-outer', this.data.radiusouter)
        slice.setAttribute('theta-start', -thetalength/2)
        slice.setAttribute('theta-length', thetalength)
        slice.id = `slice${index+1}`
        slice.className = 'clickable'
        slice.setAttribute('scale', '1 1 1')
        const rotZ = index*(360/this.data.labels.length)
        slice.setAttribute('rotation', `0 0 ${rotZ}`)
        const color = new THREE.Color()
        if(this.data.bgcolors && this.data.bgcolors[index]){
          color.setStyle(this.data.bgcolors[index])
          slice.color = color
          slice.hoverColor = color.clone()
          slice.hoverColor.multiplyScalar(1.4)
          slice.setAttribute('color', this.data.bgcolors[index])
        }else{
          color.setStyle(this.data.centercolor)
          slice.color = color
          slice.hoverColor = color.clone()
          slice.hoverColor.multiplyScalar(1.4)
          slice.setAttribute('color', this.data.centercolor)
        }
          
        
        slice.addEventListener('animationcomplete__scaleup', e=>{
          slice.removeAttribute('animation__scaleup')
          slice.removeAttribute('animation__scaledown')
        })
        
        slice.addEventListener('animationcomplete__scaledown', e=>{
          slice.removeAttribute('animation__scaleup')
          slice.removeAttribute('animation__scaledown')
        })
        
        slice.addEventListener('click', e=>{
          this.clickSound.playSound()
        })
      
        slice.addEventListener('mouseenter', e=>{
          //console.log(e)
          slice.setAttribute('animation__scaleup', 'property:scale; from:1 1 1; to:1.1 1.1 1.1; dur:140; autoplay:true') 
          slice.object3D.children[1].material.color.set(slice.hoverColor)
          this.hoverSound.playSound()
        })
    
        slice.addEventListener('mouseleave', e=>{
          //console.log(e)
          slice.setAttribute('animation__scaledown', 'property:scale; from:1.1 1.1 1.1; to:1 1 1; dur:140; autoplay:true')
          slice.object3D.children[1].material.color.set(slice.color)
        })
        
        const labelText = document.createElement('a-text')
        labelText.setAttribute('value', label)
        labelText.setAttribute('align', 'center')
        labelText.setAttribute('rotation',`0 0 ${-rotZ}`)
        labelText.setAttribute('width', 7*this.data.textscale*(this.data.radiusouter-this.data.radiusinner) )
        labelText.setAttribute('position',`${this.data.radiusinner + (this.data.radiusouter-this.data.radiusinner)/2 } 0 0`)
        
        slice.appendChild(labelText)
        this.slices.push(slice)
        this.slicesContainer.appendChild(slice)
      })
    }
    
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('cs1-radial-menu', {
  defaultComponents: {
    radialmenu:{}
  },

  mappings: {
    labels: 'radialmenu.labels',
    icons: 'radialmenu.icons',
    centercolor: 'radialmenu.centercolor',
    bgcolors: 'radialmenu.bgcolors',
    margin: 'radialmenu.margin',
    hoversound: 'radialmenu.hoversound',
    clicksound: 'radialmenu.clicksound',
    openmenusound: 'radialmenu.openmenusound',
    closemenusound: 'radialmenu.closemenusound'
  }
});
  
  
