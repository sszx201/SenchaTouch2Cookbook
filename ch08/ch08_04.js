Ext.application({
	name : 'MyApp',

	launch: function() {
		
 	Ext.define('Flower', {
 		extend: 'Ext.data.Model',
 		config: {
		    fields: [
		    	'id','album','url','title', 'about'
		    ],
		    proxy: {
	        type: 'ajax',
	        url : 'ch08/flowers.json',
	        reader: {
	            type: 'json',
	            rootProperty: 'flowers',
	            totalProperty: 'totalRecords',
	            successProperty: 'success'
	        },
	        timeout: 2000,
			listeners: {
			    exception:function (proxy, response, operation) {
			        var dv = Ext.getCmp('dataview-id');
		    			dv.setStore(offlineStore);
			        offlineStore.load();
			    }
			}
	    }
    	},
    	setUrl: function() {
            var script = document.createElement("script");
            script.setAttribute("src",
                "http://src.sencha.io/data.setPhotoUrl-" + this.getId() +
                "/" + this.get('url')
            );
            script.setAttribute("type","text/javascript");
            document.body.appendChild(script);
        }
	});
	
	setPhotoUrl = function (id, dataUrl) {
        var flower = this.offlineStore.getById(id);
        flower.set('url', dataUrl);
        offlineStore.sync();
    };
	
	onlineStore = Ext.create('Ext.data.Store', {
	    model: 'Flower'
	});
	
	onlineStore.addListener('load', function (store, records, successful) {
		if (successful) {
		    offlineStore.getProxy().clear();
	        this.each(function (record) {
	            var flower = offlineStore.add(record.data)[0];
	            flower.setUrl();
	        });
		    offlineStore.sync();
		    var dv = Ext.getCmp('dataview-id');
		    dv.setStore(offlineStore);
		}
	});
	
	offlineStore = Ext.create('Ext.data.Store', {
	    model: 'Flower',
	    proxy: {
	        type: 'localstorage',
	        id: 'yapps-02'
	    }	    
	});
				
	var tpl = new Ext.XTemplate(
	    '<tpl for=".">',
	        '<div class="thumb-wrap" id="{title}">',
	        '<div class="thumb"><img src="{url}" title="{title}"></div>',
	        '<span>{about}</span></div>',
	    '</tpl>',
	    '<div class="x-clear"></div>'
	);
	
	
	var filter = function(criteria) {
	var dv = Ext.getCmp('dataview-id');
	var store = dv.getStore();
	store.clearFilter();
	return store.filterBy(function(record, id){
	                    		if (record.get('album') === criteria || Ext.isEmpty(criteria))
	                    			return true;
	                    		else
	                    			return false;
	                    	});
	}

		
	var pnl = Ext.create('Ext.Panel', {
		id:'images-view',
	    fullscreen: true,
	    scroll: false,
	    	monitorOrientation: true,
	    	layout: 'card',
	    defaults: {
	        border: false
	    },
	    items: [Ext.create('Ext.DataView', {
		        id: 'dataview-id',
		        store: onlineStore,
		        scroll: 'vertical',
		        itemTpl: tpl,
		        autoHeight:true,
		        singleSelect: true,
		        overItemCls:'x-view-over',
		        itemSelector:'div.thumb-wrap',
		        emptyText: 'No images to display',
		        monitorOrientation: true,
		        listeners: {
		        	selectionchange: function(model, recs) {
		        		if (recs.length > 0) {
		        			Ext.getCmp('detail-panel').setHtml('<img src="' + recs[0].data.url + '" title="' + recs[0].data.title + '">');
		        			Ext.getCmp('images-view').setActiveItem(1);
		        			Ext.getCmp('back-button').show();
		        			Ext.getCmp('rose-button').hide();
		        			Ext.getCmp('daffodil-button').hide();
		        			Ext.getCmp('hibiscus-button').hide();
			            }
		        	},
		        	orientationchange: function(pnl, orientation, width, height){
		        		pnl.refresh();
		        	}
		        }
		    }), Ext.create('Ext.Panel', {
						id: 'detail-panel',
			            styleHtmlContent: true,
			            scroll: 'vertical',
			            cls: 'htmlcontent'
			        }), 
			        {
		                xtype: 'toolbar',
		                docked: 'top',
		                items: [
		                    {
		                        text: 'Rose',
		                        id: 'rose-button',
		                        handler: function() {
		                            filter('rose');
		                        }
		                    },
		                    {
		                        text: 'Daffodil',
		                        id: 'daffodil-button',
		                        handler: function() {
		                        	filter('daffodil');
		                        }
		                    },{
		                        text: 'Hibiscus',
		                        id: 'hibiscus-button',
		                        handler: function() {
		                            filter('hibiscus');
		                        }
		                    },{
		                        text: 'Reset',
		                        id: 'reset-button',
		                        ui: 'decline-round',
		                        handler: function() {
			                        	Ext.getCmp('images-view').setActiveItem(0);
			                        filter('');
		                        }
		                    }, {
		                        text: 'Back',
		                        id: 'back-button',
		                        ui: 'back',
		                        hidden: true,
		                        handler: function() {
		                            Ext.getCmp('images-view').setActiveItem(0);
		                            this.hide();
		                            Ext.getCmp('rose-button').show();
				        				Ext.getCmp('daffodil-button').show();
				        				Ext.getCmp('hibiscus-button').show();
		                        }
		                    }
		                ]
		            }]
	});
	
	onlineStore.load();
	
	}							
});