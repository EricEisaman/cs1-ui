AFRAME.registerSystem('cs1panel', {
  schema: {},  

  init: function () {
 
  },


});


AFRAME.registerComponent('cs1panel', {

	schema: {
		width: {type: 'number', default: 2},
    height: {type: 'number', default: 1},
    radius: {type: 'number', default: 0.05},
    topleftradius: {type: 'number', default: 0.03},
    bottomrightradius: {type: 'number', default: 0.03},
    toprightradius: {type: 'number', default: 0.08},
    bottomleftradius: {type: 'number', default: 0.08},
    color: {type: 'color', default: 'orange'},
    opacity: {type: 'number', default: 1},
    margin: {default: 0.07},
    bordercolor: {default: 'blue'},
    borderwidth: {default: 0},
    voffset: {default: 0},
    hoffset: {default: 0}
	},
  
  init: function(){
    
    this.panel = document.createElement('a-rounded')
    this.el.appendChild(this.panel)
    
    this.backpanel = document.createElement('a-rounded')
    this.el.appendChild(this.backpanel)
    
    this.el.setBorderColor = this.setBorderColor.bind(this)
    this.el.setColor = this.setColor.bind(this)
    
  },
  
  setBorderColor: function(color){
    this.backpanel.setAttribute('color',color)
  },
  
  setColor: function(color){
    this.panel.setAttribute('color',color)
  },
  
  update: function () {
    
    this.margin = this.data.margin * this.data.width
    
    
    this.panel.className = 'clickable'
    this.panel.setAttribute('height',this.data.height) 
    this.panel.setAttribute('width', this.data.width)
    this.panel.setAttribute('position',`${-this.data.width/2} ${-this.data.height/2} 0`)
    this.panel.setAttribute('topleftradius', this.data.topleftradius) 
    this.panel.setAttribute('toprightradius', this.data.toprightradius) 
    this.panel.setAttribute('bottomleftradius', this.data.bottomleftradius) 
    this.panel.setAttribute('bottomrightradius', this.data.bottomrightradius) 
    this.panel.setAttribute('color', this.data.color)
    this.panel.setAttribute('opacity', this.data.opacity)
    
    
    if(this.data.borderwidth){
      
    
    this.backpanel.className = 'clickable'
    this.backpanel.setAttribute('height',this.data.height+2*this.data.borderwidth) 
    this.backpanel.setAttribute('width', this.data.width+2*this.data.borderwidth)
    this.backpanel.setAttribute('position',`${-this.data.width/2 - this.data.borderwidth} ${-this.data.height/2 - this.data.borderwidth} -0.01`)
    this.backpanel.setAttribute('topleftradius', this.data.topleftradius) 
    this.backpanel.setAttribute('toprightradius', this.data.toprightradius) 
    this.backpanel.setAttribute('bottomleftradius', this.data.bottomleftradius) 
    this.backpanel.setAttribute('bottomrightradius', this.data.bottomrightradius) 
    this.backpanel.setAttribute('color', this.data.bordercolor)
    this.backpanel.setAttribute('opacity', this.data.opacity)
    
   
      
    }
    
    
    this.el.layout = this.layout.bind(this)
    
    if(this.items) this.layout()
    
  },
  /*
  
  arr = [ numRows , numCols, el1, el2, el3, el4 , ...]
  
  ____________________________________________________
  |                         |                         |
  |                         |                         |
  |                         |                         |
  | margin  item     margin | margin   item   margin  |
  |                         |                         |
  |                         |                         |
  |                         |                         |
  ____________________________________________________
  
  
  */
  layout: function(rows,cols,items){
    if(!this.items) this.items = items 
    if(!this.numRows) this.numRows = rows
    if(!this.numCols) this.numCols = cols
    this.colWidth = this.data.width/cols 
    this.rowHeight = this.data.height/rows 
    this.itemWidth = this.colWidth - 2 * this.margin
    this.items.forEach( (item,index)=>{
      item.setAttribute('width', this.itemWidth)
      item.column = index%(cols) + 1
      item.row = Math.floor(1+index/cols)
      item.row = (this.numRows-1) + item.row //transform to preserve visual represention
      //set position
      const a = (item.nodeName=='CS1-BUTTON')?this.itemWidth/2:0
      const x = this.colWidth * ( (1-this.numCols)/2  +  (item.column - 1.5) ) + this.margin + a + this.data.hoffset
      const y = -this.rowHeight * ( (1-this.numRows)/2  +  (item.row - 2.1) ) - this.margin + this.data.voffset
      item.setAttribute('position',`${x} ${y} 0.01`)
      this.el.appendChild(item)
    })
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('cs1-panel', {
  defaultComponents: {
    cs1panel:{}
  },

  mappings: {
    width: 'cs1panel.width',
    height: 'cs1panel.height',
    radius: 'cs1panel.radius',
    topleftradius: 'cs1panel.topleftradius',
    toprightradius: 'cs1panel.toprightradius',
    bottomleftradius: 'cs1panel.bottomleftradius',
    bottomrightradius: 'cs1panel.bottomrightradius',
    color: 'cs1panel.color',
    opacity: 'cs1panel.opacity',
    borderwidth: 'cs1panel.borderwidth',
    bordercolor: 'cs1panel.bordercolor',
    voffset: 'cs1panel.voffset',
    hoffset: 'cs1panel.hoffset'
  }
});


AFRAME.registerComponent('rounded', {
  schema: {
    enabled: {default: true},
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    radius: {type: 'number', default: 0.3},
    topLeftRadius: {type: 'number', default: 0},
    topRightRadius: {type: 'number', default: 0},
    bottomLeftRadius: {type: 'number', default: 0},
    bottomRightRadius: {type: 'number', default: 0},
    color: {type: 'color', default: "#F0F0F0"},
    opacity: {type: 'number', default: 1}
  },
  init: function () {
    this.rounded = new THREE.Mesh( this.draw(), new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } ) );
    this.updateOpacity();
    this.el.setObject3D('mesh', this.rounded)
  },
  update: function () {
    if (this.data.enabled) {
      if (this.rounded) {
        this.rounded.visible = true;
        this.rounded.geometry = this.draw();
        this.rounded.material.color = new THREE.Color(this.data.color);
        this.updateOpacity();
      }
    } else {
      this.rounded.visible = false;
    }
  },
  updateOpacity: function() {
    if (this.data.opacity < 0) { this.data.opacity = 0; }
    if (this.data.opacity > 1) { this.data.opacity = 1; }
    if (this.data.opacity < 1) {
      this.rounded.material.transparent = true;
    } else {
      this.rounded.material.transparent = false;
    }
    this.rounded.material.opacity = this.data.opacity;
  },
  tick: function () {},
  remove: function () {
    if (!this.rounded) { return; }
    this.el.object3D.remove( this.rounded );
    this.rounded = null;
  },
  draw: function() {
    var roundedRectShape = new THREE.Shape();
    function roundedRect( ctx, x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius ) {
      if (!topLeftRadius) { topLeftRadius = 0.00001; }
      if (!topRightRadius) { topRightRadius = 0.00001; }
      if (!bottomLeftRadius) { bottomLeftRadius = 0.00001; }
      if (!bottomRightRadius) { bottomRightRadius = 0.00001; }
      ctx.moveTo( x, y + topLeftRadius );
      ctx.lineTo( x, y + height - topLeftRadius );
      ctx.quadraticCurveTo( x, y + height, x + topLeftRadius, y + height );
      ctx.lineTo( x + width - topRightRadius, y + height );
      ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - topRightRadius );
      ctx.lineTo( x + width, y + bottomRightRadius );
      ctx.quadraticCurveTo( x + width, y, x + width - bottomRightRadius, y );
      ctx.lineTo( x + bottomLeftRadius, y );
      ctx.quadraticCurveTo( x, y, x, y + bottomLeftRadius );
    }

    var corners = [this.data.radius, this.data.radius, this.data.radius, this.data.radius];
    if (this.data.topLeftRadius != 0) { corners[0] = this.data.topLeftRadius; }
    if (this.data.topRightRadius != 0) { corners[1] = this.data.topRightRadius; }
    if (this.data.bottomLeftRadius != 0) { corners[2] = this.data.bottomLeftRadius; }
    if (this.data.bottomRightRadius != 0) { corners[3] = this.data.bottomRightRadius; }

    roundedRect( roundedRectShape, 0, 0, this.data.width, this.data.height, corners[0], corners[1], corners[2], corners[3] );
    return new THREE.ShapeBufferGeometry( roundedRectShape );
  },
  pause: function () {},
  play: function () {}
});

AFRAME.registerPrimitive('a-rounded', {
  defaultComponents: {
    rounded: {}
  },
  mappings: {
    enabled: 'rounded.enabled',
    width: 'rounded.width',
    height: 'rounded.height',
    radius: 'rounded.radius',
    topleftradius: 'rounded.topLeftRadius',
    toprightradius: 'rounded.topRightRadius',
    bottomleftradius: 'rounded.bottomLeftRadius',
    bottomrightradius: 'rounded.bottomRightRadius',
    color: 'rounded.color',
    opacity: 'rounded.opacity'
  }
});
  
  
