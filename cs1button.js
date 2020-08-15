AFRAME.registerSystem('cs1button', {
  schema: {},  

  init: function () {
 
  },


});


AFRAME.registerComponent('cs1button', {

	schema: {
		width: {type: 'number', default: 0.3},
    height: {type: 'number', default: 0.3},
    radius: {type: 'number', default: 0.04},
    topleftradius: {type: 'number', default: 0.0},
    bottomrightradius: {type: 'number', default: 0.0},
    toprightradius: {type: 'number', default: 0.0},
    bottomleftradius: {type: 'number', default: 0.0},
    color: {type: 'color', default: '#aab7f7'},
    opacity: {type: 'number', default: 1},
    bordercolor: {default: 'blue'},
    borderwidth: {default: 0.03},
    label: {default: ''},
    labelcolor: {default: 'blue'},
    icon: {default: ''},
    hoversound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fmid_deep_click.mp3?v=1597180139874'},
    clicksound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Factivate_menu_item.mp3?v=1597181468111'},
    onclick: {}
	},
  
  init: function(){
    
  
    
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
    
    this.el.appendChild(hse)
    this.el.appendChild(cse)
    
  },
  
  update: function () {
    
    this.createSounds()
    this.el.isButton = true
    this.el.className = 'clickable'
 
    const color = new THREE.Color()
    
    this.front = document.createElement('a-rounded')
    this.front.className = 'clickable'
    this.front.setAttribute('height',this.data.height) 
    this.front.setAttribute('width', this.data.width)
    this.front.setAttribute('position',`${-this.data.width/2} ${-this.data.height/2} 0.015`)
    this.front.setAttribute('radius', this.data.radius)
    this.front.setAttribute('topleftradius', this.data.topleftradius) 
    this.front.setAttribute('toprightradius', this.data.toprightradius) 
    this.front.setAttribute('bottomleftradius', this.data.bottomleftradius) 
    this.front.setAttribute('bottomrightradius', this.data.bottomrightradius) 
    this.front.setAttribute('color', this.data.color)
    this.front.setAttribute('opacity', this.data.opacity)
    this.el.appendChild(this.front)
    

    this.back = document.createElement('a-rounded')
    this.back.className = 'clickable'
    this.back.setAttribute('height',this.data.height+2*this.data.borderwidth) 
    this.back.setAttribute('width', this.data.width+2*this.data.borderwidth)
    this.back.setAttribute('position',`${-this.data.width/2 - this.data.borderwidth} ${-this.data.height/2 - this.data.borderwidth} 0.01`)
    this.back.setAttribute('radius', this.data.radius)
    this.back.setAttribute('topleftradius', this.data.topleftradius) 
    this.back.setAttribute('toprightradius', this.data.toprightradius) 
    this.back.setAttribute('bottomleftradius', this.data.bottomleftradius) 
    this.back.setAttribute('bottomrightradius', this.data.bottomrightradius) 
    this.back.setAttribute('color', this.data.bordercolor)
    this.back.setAttribute('opacity', this.data.opacity)
    
    this.back.color = color.setStyle(this.data.bordercolor).clone()
    this.back.hoverColor = color.setStyle(this.data.color)
    this.back.hoverColor.multiplyScalar(1.4) 
    
    this.el.appendChild(this.back)

    
    this.el.addEventListener('mouseenter', e=>{ 
      this.el.setAttribute('animation__scaleup', 'property:scale; from:1 1 1; to:1.1 1.1 1.1; dur:140; autoplay:true') 
      this.back.object3D.children[0].material.color.set(this.back.hoverColor)
      this.hoverSound.playSound()
    })
    this.el.addEventListener('mouseleave', e=>{
      this.el.setAttribute('animation__scaledown', 'property:scale; from:1.1 1.1 1.1; to:1 1 1; dur:140; autoplay:true')
      this.back.object3D.children[0].material.color.set(this.back.color)
    })
    
    
    this.el.addEventListener('animationcomplete__scaleup', e=>{
      this.el.removeAttribute('animation__scaleup')
      this.el.removeAttribute('animation__scaledown')
    })
        
    this.el.addEventListener('animationcomplete__scaledown', e=>{
      this.el.removeAttribute('animation__scaleup')
      this.el.removeAttribute('animation__scaledown')
    })
    
    this.el.addEventListener('click', e=>{ 
      this.front.setAttribute('color','white')
      setTimeout(e=>{
        this.front.setAttribute('color',this.data.color)
      },400)
      this.clickSound.playSound()
    })
    
    
    
    
    
    
    
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('cs1-button', {
  defaultComponents: {
    cs1button:{}
  },

  mappings: {
    width: 'cs1button.width',
    height: 'cs1button.height',
    radius: 'cs1button.radius',
    topleftradius: 'cs1button.topleftradius',
    toprightradius: 'cs1button.toprightradius',
    bottomleftradius: 'cs1button.bottomleftradius',
    bottomrightradius: 'cs1button.bottomrightradius',
    color: 'cs1button.color',
    opacity: 'cs1button.opacity',
    borderwidth: 'cs1button.borderwidth',
    bordercolor: 'cs1button.bordercolor'
  }
});
  
  
