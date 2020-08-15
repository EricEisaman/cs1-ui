AFRAME.registerSystem('cs1slider', {
  schema: {},  

  init: function () {
 
  },


});


AFRAME.registerComponent('cs1slider', {

	schema: {
		width: {default:0.5},
    color: {default:'blue'},
    groovecolor: {default:'black'},
    min: {default:0},
    max: {default:1},
    precision: {default:0},
    textwidth: {default:3},
    title: {default:'CS1 Slider'},
    titlecolor: {default: 'blue'},
    slidesound: {default:'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fshort_buttery.mp3?v=1597354739575'},
    clicksound: {default: 'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fvinyl_click.mp3?v=1597355292158'},
    extremasound: {default: 'https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2Fextrema_chime.mp3?v=1597355564629'},
    smooth: {default: true},
    startvalue: {default: 0}
	},
  
  init: function(){
   
    this.el.setValue = this.setValue.bind(this)
    this.el.getValue = this.getValue.bind(this)
   
  },
  
  createSounds: function(){
    const ss = document.createElement('a-sound')
    ss.setAttribute('src', this.data.slidesound)
    ss.addEventListener('sound-loaded', e=>{
      this.slideSound = ss.components.sound
    })
    const cs = document.createElement('a-sound')
    cs.setAttribute('src', this.data.clicksound)
    cs.addEventListener('sound-loaded', e=>{
      this.clickSound = cs.components.sound
    })
    const es = document.createElement('a-sound')
    es.setAttribute('src', this.data.extremasound)
    es.addEventListener('sound-loaded', e=>{
      this.extremaSound = es.components.sound
    })
    
    this.el.appendChild(es)
    this.el.appendChild(cs)
    this.el.appendChild(ss)

    
  },
  
  update: function () {
    
    
    this.createSounds()
    
    this.handleWidth = 0.03
    
    this.grooveWidth = 0.8 * this.data.width
    //triangle width is 0.1 , .01 is padding
    this.grooveStart = 0.1 + this.handleWidth/2 + .01
    this.groove = document.createElement('a-rounded')
    this.groove.className = 'clickable'
    this.groove.setAttribute('height', 0.02) 
    this.groove.setAttribute('width', this.grooveWidth)
    this.groove.setAttribute('position',`${this.grooveStart} 0 0`)
    this.groove.setAttribute('topleftradius', 0.01) 
    this.groove.setAttribute('toprightradius', 0.01) 
    this.groove.setAttribute('bottomleftradius', 0.01) 
    this.groove.setAttribute('bottomrightradius', 0.01) 
    this.groove.setAttribute('color', this.data.groovecolor)
    this.el.appendChild(this.groove)
    
   
    this.handle = document.createElement('a-rounded')
    this.handle.setAttribute('height', 0.1) 
    this.handle.setAttribute('width', this.handleWidth)
    this.handle.setAttribute('position',`${this.grooveStart- this.handleWidth/2} -0.04 0.01`)
    this.handle.setAttribute('topleftradius', 0.01) 
    this.handle.setAttribute('toprightradius', 0.01) 
    this.handle.setAttribute('bottomleftradius', 0.01) 
    this.handle.setAttribute('bottomrightradius', 0.01) 
    this.handle.setAttribute('color', this.data.color)
    this.el.appendChild(this.handle)
    
    this.minlabel = document.createElement('a-text')
    this.minlabel.setAttribute('value', this.data.min)
    this.minlabel.setAttribute('width' , this.data.textwidth)
    this.minlabel.setAttribute('position',`${this.grooveStart-this.data.textwidth/40} .15 0`)
    this.el.appendChild(this.minlabel)
    
    this.maxlabel = document.createElement('a-text')
    this.maxlabel.setAttribute('value', this.data.max)
    this.maxlabel.setAttribute('width' , this.data.textwidth)
    this.maxlabel.setAttribute('position',`${-this.grooveStart+this.data.width-this.data.textwidth/40} .15 0`)
    this.el.appendChild(this.maxlabel)
    
    this.value = this.data.min
    this.valuelabel = document.createElement('a-text')
    this.valuelabel.setAttribute('value', this.value)
    this.valuelabel.setAttribute('color', this.data.titlecolor)
    this.valuelabel.setAttribute('width' , this.data.textwidth)
    this.valuelabel.setAttribute('position',`${this.grooveStart-this.data.textwidth/40} -.15 0`)
    this.el.appendChild(this.valuelabel)
    
    this.titlelabel = document.createElement('a-text')
    this.titlelabel.setAttribute('value', this.data.title)
    this.titlelabel.setAttribute('font','exo2bold')
    this.titlelabel.setAttribute('color', this.data.titlecolor)
    this.titlelabel.setAttribute('width' , this.data.textwidth)
    this.titlelabel.setAttribute('position',`${this.grooveStart-this.data.textwidth/40} .3 0`)
    this.el.appendChild(this.titlelabel)
    
    const color = new THREE.Color()
    color.setStyle(this.data.color)
    
    this.decrementer = document.createElement('a-triangle')
    this.decrementer.className = 'clickable'
    this.decrementer.setAttribute('color',this.data.color)
    this.decrementer.hoverColor = color.clone()
    this.decrementer.hoverColor.multiplyScalar(1.4)
    this.decrementer.setAttribute('width',4)
    this.decrementer.setAttribute('height',2)
    this.decrementer.setAttribute('scale','.1 .1 .1')
    this.decrementer.setAttribute('rotation','0 0 90')
    this.decrementer.setAttribute('position',`0.048 .015 0`)
    this.el.appendChild(this.decrementer)
    
    this.incrementer = document.createElement('a-triangle')
    this.incrementer.className = 'clickable'
    this.incrementer.setAttribute('color',this.data.color)
    this.incrementer.hoverColor = color.clone()
    this.incrementer.hoverColor.multiplyScalar(1.4)
    this.incrementer.setAttribute('width',4)
    this.incrementer.setAttribute('height',2)
    this.incrementer.setAttribute('scale','.1 .1 .1')
    this.incrementer.setAttribute('rotation','0 0 -90')
    this.incrementer.setAttribute('position',`${this.grooveStart+this.grooveWidth+0.05+0.01+this.handleWidth/2} .015 0`)
    this.el.appendChild(this.incrementer)
    
    this.incrementer.addEventListener('mouseenter',e=>{ 
       
       this.incrementer.setAttribute('scale','.11 .11 .11')
       this.incrementer.components.material.material.color.set(this.incrementer.hoverColor)
     
     })
    
    this.incrementer.addEventListener('mouseleave',e=>{ 
       
       this.incrementer.setAttribute('scale','.1 .1 .1')
       this.incrementer.setAttribute('color',this.data.color)
     
     })
    
    this.decrementer.addEventListener('mouseenter',e=>{ 
       
       this.decrementer.setAttribute('scale','.11 .11 .11')
       this.decrementer.components.material.material.color.set(this.decrementer.hoverColor)
     
     })
    
    this.decrementer.addEventListener('mouseleave',e=>{ 
       
       this.decrementer.setAttribute('scale','.1 .1 .1')
       this.decrementer.setAttribute('color',this.data.color)
     
     })
   
    
    this.range = (this.data.max - this.data.min)/this.grooveWidth
    this.isDragging = false
    
    this.incrementer.addEventListener('click',e=>{
      this.value = Math.min(this.value+Math.pow(10,this.data.precision),this.data.max)
      this.valuelabel.setAttribute('value', this.value)
      this.handle.object3D.position.x = this.grooveStart+(this.value - this.data.min)/this.range - this.handleWidth/2
      if(this.clickSound)this.clickSound.playSound()
      if(this.value==this.data.max)this.extremaSound.playSound()
      const event = new CustomEvent('change', { detail: this.value })
      this.el.dispatchEvent(event)
    })
    
    this.decrementer.addEventListener('click',e=>{
      this.value = Math.max(this.value-Math.pow(10,this.data.precision),this.data.min)
      this.valuelabel.setAttribute('value', this.value)
      this.handle.object3D.position.x = this.grooveStart + (this.value - this.data.min)/this.range - this.handleWidth/2
      if(this.clickSound)this.clickSound.playSound()
      if(this.value==this.data.min)this.extremaSound.playSound()
      const event = new CustomEvent('change', { detail: this.value })
      this.el.dispatchEvent(event)
    })
  
    this.groove.addEventListener('mouseenter', e=>{
      if(e.detail.intersection){
        const pv = this.value
        this.value = this.round(this.data.min + this.range * e.detail.intersection.uv.x , this.data.precision)
        //this.valuelabel.setAttribute('value', this.value)
        this.valuelabel.setAttribute('animation', `property:value; from:${pv}; to:${this.value}; dur:400; autoplay:true; round:true`) 
        if(this.data.smooth){
          const u = this.valuelabel.components.animation.animation['update']
          this.valuelabel.components.animation.animation['update']= e=>{  
            if(typeof u==='function')u(e)
            const event = new CustomEvent('change', { detail: Number(this.valuelabel.getAttribute('value')) })
            this.el.dispatchEvent(event)
          }  
        }
        
        const p = this.handle.object3D.position
        const tx = this.grooveStart + e.detail.intersection.uv.x - this.handleWidth/2 
        this.handle.setAttribute('animation', `property:position; from:${p.x} ${p.y} ${p.z}; to:${tx} ${p.y} ${p.z}; dur:400; autoplay:true`) 
        if(this.slideSound)this.slideSound.playSound()
        if(this.value==this.data.min || this.value==this.data.max)this.extremaSound.playSound()
   
      }
    })
    
    this.handle.addEventListener('animationcomplete', e=>{
      const event = new CustomEvent('change', { detail: this.value })
      this.el.dispatchEvent(event)
    })
    
    this.groove.addEventListener('mouseleave', e=>{
      this.handle.removeAttribute('animation')
      this.valuelabel.removeAttribute('animation')
      this.value = Number(this.valuelabel.getAttribute('value'))
      const event = new CustomEvent('change', { detail: this.value })
      this.el.dispatchEvent(event)
    })
    
    if(!this.data.startvalue)this.data.startvalue = this.data.min
    setTimeout(e=>{this.setValue(this.data.startvalue)},1000)
    
  },
  
  setValue: function(value){
    this.value = value
    this.valuelabel.setAttribute('value',value)
    this.handle.object3D.position.x = 0.11 + this.groove.components.rounded.data.width * (value-this.data.min)/(this.data.max-this.data.min)
    const event = new CustomEvent('change', { detail: this.value })
    this.el.dispatchEvent(event)
  },
  
  getValue: function(){
    return this.value
  },
  
  round: function(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('cs1-slider', {
  defaultComponents: {
    cs1slider:{}
  },

  mappings: {
    min: 'cs1slider.min',
    max: 'cs1slider.max',
    precision: 'cs1slider.precision',
    width: 'cs1slider.width',
    groovecolor: 'cs1slider.groovecolor', 
    title: 'cs1slider.title',
    titlecolor: 'cs1slider.titlecolor',
    smooth: 'cs1slider.smooth',
    startvalue: 'cs1slider.startvalue'
  }
});
  
  
