
var sets = [
	[
	{ id: "A", start: 30, end: 150 }, //An event that starts at 9:30 am and ends at 11:30 am
	{ id: "B", start: 540, end: 600 }, //An event that starts at 6:00 pm and ends at 7:00pm
	{ id: "C", start: 560, end: 620 }, //An event that starts at 6:20pm and ends at 7:20pm
	{ id: "D", start: 610, end: 670 },  //An event that starts at 7:10pm pm and ends at 8:10 pm
	], //set 0 (as per PART II of the puzzle)
	
	[
	{ id: "G", start: 310, end: 400 },
	{ id: "E", start: 95, end: 250 },
	{ id: "A", start: 0, end: 60 },
	{ id: "D", start: 65, end: 110 },
	{ id: "C", start: 50, end: 500 },
	{ id: "B", start: 30, end: 90 },
	{ id: "F", start: 200, end: 305 },
	{ id: "H", start: 550, end: 600 },
	{ id: "I", start: 550, end: 600 },
	{ id: "J", start: 670, end: 800}
	] , //set 1
	[
	{ id: "E", start: 250, end: 320 },
	{ id: "A", start: 0, end: 500 },
	{ id: "D", start: 600, end: 900 },
	{ id: "C", start: 505, end: 600 },
	{ id: "B", start: 0, end: 700 },
	{ id: "F", start: 270, end: 600 }
	], //set 2
	[
	{id : 1, start : 60, end : 120},  // an event from 10am to 11am
	{id : 2, start : 100, end : 240}, // an event from 10:40am to 1pm
	{id : 3, start : 700, end : 720} // an event from 8:40pm to 9pm 
	] //set 3
	];

var container_width = 600;

jQuery(document).ready(function ($) {
	//generates the time scale
	load_time();
	//generates the default schedule
	draw(layOutDay(sets[0]));
	//function to select and display new schedule
	$("#set li").click(function(){
		$("#event_list").empty();
		var num = this.id.charAt(this.id.length-1)
		draw(layOutDay(sets[num-1]));

	})
});



/**
* Lays out events for a single  day
*
* @param array  events   An array of event objects. Each event object consists of a start and end
*                                     time  (measured in minutes) from 9am, as well as a unique id. The
*                                     start and end time of each event will be [0, 720]. The start time will 
*                                     be less than the end time.
*
* @return array  An array of event objects that has the width, the left and top positions set, in addition to the id,
*                        start and end time. The object should be laid out so that there are no overlapping
*                        events.
*/
function layOutDay(events) {
	//if there is only one event
	if (events.length === 1){
		events[0].width = 1;
		events[0].top = events[0].start;
		return events
	}
	//sort the input by starting time
	events.sort(function compare(a, b) {
		return a.start - b.start;
		});
		
	var done = { }, 
		next = 0, 
		columns = [] ;

	//generates column set
	do {
		var target = events[next];
		next = 0;
		
		columns.push(events.filter(function(current, i) {
			if (done[current.id])
				//skip if the event is visited
				return false;
			if (disjoint(current, target))
				//if current is not overlapped with target, add to the column
				return done[current.id] = target = current;
			//set i to be the start of next column
			else next = i;	
			return false;	
		}));
	} while(next);
			
	var max_columns = columns.length, rows = [];
	//generates row set based on the first column
	columns[0].forEach(function (event, i) {
		rows.push([[event]])
		for (var j = 1; j < max_columns; j++){
			rows[i].push([]);
			columns[j].forEach(function(e) {
				//if overlaps, add to the set
				if (overlaps(event,e)){
					rows[i][j].push(e);
				}	
			

		})
		}
			
	})
	
	
	//loop thru row set to determine width and left
	rows.forEach(function(row){	
		var row_min = findmin(row);
		var event_per_row = row.filter(function(c){
				return c.length!== 0
				})
		row.forEach(function(column, i){
			column.forEach(function(event){
				if (!event.width){
					if (row_min !== 1){
						//if overlaps with other event, set width to be the minimum
						event.width = row_min;
					}
					else {
						//else calculate column width
						var width = 1/(event_per_row.length);
						event.width = width;
					}
					//the left distance is width * column index
					event.left = event.width*i;
					}
				})
			})
		}) 
		return events; 
	} 


//boolean function to check whether two event overlaps
function overlaps(a, b) {
	if (a.id === b.id)
		return false;
	if (a.start > b.start)
		return !(b.end <= a.start);
	else return !(a.end <= b.start);
}

//boolean function to check if two events are not overlapping with each other
function disjoint(a, b) {
	return !overlaps(a,b);
}

//helper function to find minimum width in a row
function findmin(row){
	//default max min to 1
	var min = 1;
	row.forEach(function(column){
		column.forEach(function(event){
			if (event.width){
				if ( event.width < min){
					min = event.width;
				}
			}	
		})
	}) 
	return min; 
}

//takes the new event list and displays the events accordingly
function draw(events){
	events.forEach(function(event) {
		//jQuery to help adding and styling event blocks to the calendar
		$('#event_list').append('<div id=event_' + event.id + ' class="events"> <div class="event_box"> ' + event.id + '</div></div>' );
		$('#event_' + event.id).css({
			'top' : (event.start),
			'height' :((event.end) - (event.start)),
			'width' : event.width*container_width, 
			'left' : event.left*container_width,
			'background-color' : rancolor()
			})
		})
	}

//to load the time labels
function load_time() {
	for (i=9; i<21; i++){
		$('#timeline_list').append('<li class="hours"> ' + i + ':00' + '</li>' )
		$('#timeline_list').append('<li class="half_hours"> ' + i + ':30' + '</li>' )
	}}

//to generate random colors (in the mid rgb range)
function rancolor(){
	   var red = Math.floor(Math.random() * 100 + 100);
	   var green = Math.floor(Math.random() * 100 + 100);
	   var blue = Math.floor(Math.random() * 100 + 100);
	   return 'rgba('+red+','+green+','+blue+',0.6)';
	 }