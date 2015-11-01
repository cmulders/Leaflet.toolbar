!function(a,b,c){"use strict";L.Toolbar=(L.Layer||L.Class).extend({statics:{baseClass:"leaflet-toolbar"},includes:L.Mixin.Events,options:{className:"",filter:function(){return!0},actions:[]},initialize:function(a){L.setOptions(this,a),this._toolbar_type=this.constructor._toolbar_class_id},addTo:function(a){return this._arguments=[].slice.call(arguments),a.addLayer(this),this},onAdd:function(a){var b=a._toolbars[this._toolbar_type];0===this._calculateDepth()&&(b&&a.removeLayer(b),a._toolbars[this._toolbar_type]=this)},onRemove:function(a){0===this._calculateDepth()&&delete a._toolbars[this._toolbar_type]},appendToContainer:function(a){var b,c,d,e,f=this.constructor.baseClass+"-"+this._calculateDepth(),g=f+" "+this.options.className;for(this._container=a,this._ul=L.DomUtil.create("ul",g,a),L.DomEvent.disableScrollPropagation(this._ul),L.DomEvent.disableClickPropagation(this._ul),d=0,e=this.options.actions.length;e>d;d++)b=this._getActionConstructor(this.options.actions[d]),c=new b,c._createIcon(this,this._ul,this._arguments)},_getActionConstructor:function(a){var b=this._arguments,c=this;return a.extend({initialize:function(){a.prototype.initialize.apply(this,b)},enable:function(b){c._active&&c._active.disable(),c._active=this,a.prototype.enable.call(this,b)}})},_hide:function(){this._ul.style.display="none"},_show:function(){this._ul.style.display="block"},_calculateDepth:function(){for(var a=0,b=this.parentToolbar;b;)a+=1,b=b.parentToolbar;return a}}),L.toolbar={};var d=0;L.Toolbar.extend=function(a){var b=L.extend({},a.statics,{_toolbar_class_id:d});return d+=1,L.extend(a,{statics:b}),L.Class.extend.call(this,a)},L.Map.addInitHook(function(){this._toolbars={}}),L.ToolbarAction=L.Handler.extend({statics:{baseClass:"leaflet-toolbar-icon"},options:{toolbarIcon:{html:"",className:"",tooltip:""},subToolbar:new L.Toolbar},initialize:function(a){var b=L.ToolbarAction.prototype.options.toolbarIcon;L.setOptions(this,a),this.options.toolbarIcon=L.extend({},b,this.options.toolbarIcon)},enable:function(a){a&&L.DomEvent.preventDefault(a),this._enabled||(this._enabled=!0,this.addHooks&&this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks&&this.removeHooks())},_createIcon:function(a,b,c){var d=this.options.toolbarIcon;this.toolbar=a,this._icon=L.DomUtil.create("li","",b),this._link=L.DomUtil.create("a","",this._icon),this._link.innerHTML=d.html,this._link.setAttribute("href","#"),this._link.setAttribute("title",d.tooltip),L.DomUtil.addClass(this._link,this.constructor.baseClass),d.className&&L.DomUtil.addClass(this._link,d.className),L.DomEvent.on(this._link,"click",this.enable,this),this._addSubToolbar(a,this._icon,c)},_addSubToolbar:function(a,b,c){var d=this.options.subToolbar,e=this.addHooks,f=this.removeHooks;d.parentToolbar=a,d.options.actions.length>0&&(c=[].slice.call(c),c.push(this),d.addTo.apply(d,c),d.appendToContainer(b),this.addHooks=function(a){"function"==typeof e&&e.call(this,a),d._show()},this.removeHooks=function(a){"function"==typeof f&&f.call(this,a),d._hide()})}}),L.toolbarAction=function(a){return new L.ToolbarAction(a)},L.ToolbarAction.extendOptions=function(a){return this.extend({options:a})},L.Toolbar.Control=L.Toolbar.extend({statics:{baseClass:"leaflet-control-toolbar "+L.Toolbar.baseClass},initialize:function(a){L.Toolbar.prototype.initialize.call(this,a),this._control=new L.Control.Toolbar(this.options)},onAdd:function(a){this._control.addTo(a),L.Toolbar.prototype.onAdd.call(this,a),this.appendToContainer(this._control.getContainer())},onRemove:function(a){L.Toolbar.prototype.onRemove.call(this,a),this._control.remove?this._control.remove():this._control.removeFrom(a)}}),L.Control.Toolbar=L.Control.extend({onAdd:function(){return L.DomUtil.create("div","")}}),L.toolbar.control=function(a){return new L.Toolbar.Control(a)},L.Toolbar.Popup=L.Toolbar.extend({statics:{baseClass:"leaflet-popup-toolbar "+L.Toolbar.baseClass},options:{anchor:[0,0]},initialize:function(a,b){L.Toolbar.prototype.initialize.call(this,b),this._marker=new L.Marker(a,{icon:new L.DivIcon({className:this.options.className,iconAnchor:[0,0]})})},onAdd:function(a){this._map=a,this._marker.addTo(a),L.Toolbar.prototype.onAdd.call(this,a),this.appendToContainer(this._marker._icon),this._setStyles()},onRemove:function(a){a.removeLayer(this._marker),L.Toolbar.prototype.onRemove.call(this,a),delete this._map},setLatLng:function(a){return this._marker.setLatLng(a),this},_setStyles:function(){for(var a,b,d,e=this._container,f=this._ul,g=L.point(this.options.anchor),h=f.querySelectorAll(".leaflet-toolbar-icon"),i=[],j=0,k=0,l=h.length;l>k;k++)h[k].parentNode.parentNode===f&&(i.push(parseInt(L.DomUtil.getStyle(h[k],"height"),10)),j+=Math.ceil(parseFloat(L.DomUtil.getStyle(h[k],"width"))));f.style.width=j+"px",this._tipContainer=L.DomUtil.create("div","leaflet-toolbar-tip-container",e),this._tipContainer.style.width=j+"px",this._tip=L.DomUtil.create("div","leaflet-toolbar-tip",this._tipContainer),a=Math.max.apply(c,i),b=parseInt(L.DomUtil.getStyle(this._tip,"width"),10),d=new L.Point(j/2,a+.7071*b),e.style.marginLeft=g.x-d.x+"px",e.style.marginTop=g.y-d.y+"px"}}),L.toolbar.popup=function(a){return new L.Toolbar.Popup(a)}}(window,document);