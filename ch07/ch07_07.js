Ext.application({
	name: 'MyApp',

	launch: function() {
	 var store = Ext.create('Ext.data.Store', {
	        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
	        data: [
	            {'name':'House Rent', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
	            {'name':'Books', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
	            {'name':'Petrol', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
	            {'name':'Grocery', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
	            {'name':'Loans & Deposits', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}                                                
	        ]
	    });
	 
	 var chart = Ext.create('Ext.chart.CartesianChart', {
	        store: store,
//	        legend: {
//	        	docked: 'bottom'
//	        },
	        axes: [{ 
		        	type: 'numeric', 
		        	position: 'left', 
		        	fields: ['data1', 'data2'], 
	        		title: 'Expense Amount', 
	        		grid: true, 
	        		minimum: 0 
	        	}, { 
	        		type: 'category', 
	        		position: 'bottom', 
	        		fields: 'name', 
	        		title: 'Categories',
		        label: {
	                rotate: {
	                    degrees: 315
	                }
	            } 
	        	}], 
	        	series: [{ 
	        		type: 'bar', 
	    	        stacked: false,
	        		title: ['House Rent', 'Books', 'Petrol', 'Grocery', 'Loans & Deposits'],
	        		xField: 'name', 
	        		yField: ['data1', 'data2'],
	        		colors: ['blue', 'crimson'],
//	        		subStyle: {
//			       fill: ['blue', 'crimson']
//			    },
	        		style: {
	        			inGroupGapWidth: 0
	        		},
			    highlightCfg: {
		    			strokeStyle: "green",
		    			lineWidth: 3
			    }
	        	}],
	        interactions: [
                {
                    type: 'iteminfo',
                    gesture: 'itemtaphold',
                    panel: {
                    	height: 150, 
                    	items: [{
                    		docked: 'top', 
                    		xtype: 'toolbar', 
                    		title: 'Info'
                    		}]
                    },
                    listeners: {
                        show: function(me, item, panel) {
	                        	var rec = item.record;
	                        	
	                        	var str = '<ul><li><span style="font-weight: bold">Name: </span>' + rec.get('name') + '</li>';
	                        str += '<li>Value: ' + rec.get(item.field) + '</li></ul>';
	                        	
	                    	    panel.setHtml([str].join(''));	
                        }
                    }
                },
                'itemhighlight'
                ] 
	});
	    Ext.Viewport.setLayout('fit');
    		Ext.Viewport.add(chart);
	 
    }
});