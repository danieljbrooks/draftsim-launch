
// change visibility
 function draft_start_visibility(){
  var display_element = document.getElementsByClassName('during_draft'), i;
  for (i = 0; i < display_element.length; i += 1) {
      display_element[i].style.display = 'inline';
  }
  document.getElementById('pack_box').style.display = 'block'; //pack_box needs block formatting
  document.getElementById("bot_decks_button").innerHTML="View Bots"; //special case


  var display_element = document.getElementsByClassName('after_draft'), i;
  for (i = 0; i < display_element.length; i += 1) {
      display_element[i].style.display = 'none';
  }


}

 function draft_end_visibility(){
  var display_element = document.getElementsByClassName('during_draft'), i;
  for (i = 0; i < display_element.length; i += 1) {
      display_element[i].style.display = 'none';
  }

  var display_element = document.getElementsByClassName('after_draft'), i;
  for (i = 0; i < display_element.length; i += 1) {
      display_element[i].style.display = 'inline';
  }


  if (num_players<=1){
     document.getElementById('bot_decks_button').style.display='none';
  }


}


 function toggle_bot_deck_visibility(){
  if(show_bot_decks==0){

    //document.body.scrollTop = document.documentElement.scrollTop = 0;

    show_bot_decks=1;
    Print_collection();
    var target = document.getElementById('bot_collection_img');
    target.scrollIntoView(true);
    document.getElementById("bot_decks_button").innerHTML="Hide Bots";
    //var x = elmnt.scrollTop;
    //location.hash = "#bot_collection_container";
  } else {
    show_bot_decks=0;
    document.getElementById("bot_decks_button").innerHTML="View Bots";
  }
  Print_collection();
}

 function toggle_suggestions(){
  var display_element = document.getElementById('pack_text_container'), i;
  if(display_element.style.display == 'none'){
    display_element.style.display = 'inline';
    display_element.style.minHeight= '200px';
    $(".card_overlay").toggle();//jQuery call that shows overlays
  } else {
    display_element.style.display= 'none';
    display_element.style.minHeight= '0px';
    $(".card_overlay").toggle();//jQuery call that shows overlays
  }
}

//add land to deck, no Print_collection step
function addLand(pn, land_num){
  //maximum number of basic lands
  var max_lands=40;
  if(draft.players[pn].basiclands.length<max_lands){
    draft.players[pn].basiclands.push(LANDS[land_num]);
  }

  //autosort deck on 40 cards
  var total_cards=draft.players[pn].deck.length+draft.players[pn].basiclands.length
  if (total_cards==40){
    //draft.players[pn].deck=draft.players[pn].deck.sort(sort_two( "creaturesort", {name:"cmc", primer: parseFloat, reverse:false}));
    draft.players[pn].deck= sortByMultiple ( draft.players[pn].deck, ["creaturesort", "cmc", "name"]);
  }
  //update the deck_text
  if(pn==0){
    deck_text();
  }

return;
}


//Initialize
 var draft = "...";
 var pack_size=14;
 var rating_thresh=2.0;

function Pack(card_list){
  this.pack_contents=[];

  //Define card contents
  var common=0;
  var uncommon=0;
  var rare=0;
  var mythic=0;
  var common_colors=[0,0,0,0,0,0,0]; //WUBRG, artifacts, multi

  //Determine number of cards in set
  var cards_in_set=card_list.length

  //figure out if mythic or rare
  mythic_roll=Math.floor((Math.random() * 121) + 1);
  if (mythic_roll>15){
    mythic=1;
  } else {
    rare=1;
  }

  //add cards without duplication
  var its=0; //prevent infinite loops
  max_its=10000;
  while(this.pack_contents.length<pack_size && its<max_its){
    its=its+1;

    //choose a random card in the current set
    var card_roll=Math.floor((Math.random() * cards_in_set));
    var new_card = card_list[card_roll];

    //Check if card in pack contents
    var card_in_pack=0;
    if (this.pack_contents.length>0){
      for (var i = 0; i < this.pack_contents.length; i++) {
        if ( new_card.name==this.pack_contents[i].name){
          card_in_pack=1;
        }
      }
    }

    //No more than 3 commons of a color
    too_many=0;
    var color_index = parseInt( card_list[card_roll].colorsort );
    if (color_index < 5 && common_colors[color_index] > 2 && its<max_its/2){
      too_many=1;
    }

    //count unused colors
    num_zeros=0;
    for (var i=0; i<5; i++){
      if (common_colors[i]==0){
        num_zeros=num_zeros+1;
      }
    }

    //cards remaining (including this one)
    num_cards_to_add = pack_size - this.pack_contents.length;

    //reroll if needed to ensure at least 1 common of each color in pack
    if (num_cards_to_add<=num_zeros && ( (common_colors[color_index]!==0) || (color_index>4) ) && (its<(max_its/2)) ) {
     // document.getElementById("debug").innerHTML="too many of: " + color_index + " its:" + its + " pack_length:" + this.pack_contents.length
      too_many=1;
    }



    //Determine card rarity and add new card to pack if possible, in rarity order
    rarity_nc=new_card.rarity
    if (card_in_pack<1 && too_many<1){
      if (rarity_nc=="M" && mythic < 1){
      	this.pack_contents.push(card_list[card_roll]);
      	mythic=mythic+1;
      } else if (rarity_nc=="R" && rare < 1 && mythic==1){
      	this.pack_contents.push(card_list[card_roll]);
      	rare=rare+1;
      } else if (rarity_nc=="U" && uncommon < 3 && rare==1 && mythic==1){
      	this.pack_contents.push(card_list[card_roll]);
      	uncommon=uncommon+1;
      } else if (rarity_nc=="C" && common < pack_size-4 && uncommon==3){
      	this.pack_contents.push(card_list[card_roll]);
        var color_index = parseInt( card_list[card_roll].colorsort );
	common_colors[color_index] = common_colors[color_index] + 1 ;
	common=common+1;
      }
   }
  }

  //Special case, FRF, add dual-lands
  if(card_list[0].name=="Citadel_Siege"){
    //remove the last common
    this.pack_contents.splice(pack_size-1,1);

    //And add a land
    var land_roll = Math.floor((Math.random() * 10));
    this.pack_contents.push(FRF_lands[land_roll]);
  }
}

//sorting function, from:
//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
//var homes = [{
//   "h_id": "3",
//   "city": "Dallas",
//   "state": "TX",
//   "zip": "75201",
//   "price": "162500" ...
//usage:
//homes.sort(sort_by('price', true, parseInt));
//homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}

//N-d Sorter
//USAGE:    var sorted = sortByMultiple(patients, ["roomNumber", "name"]);
function sortByMultiple(sequence, keys) {
  var copy = copySequence(sequence);
  copy.sort(function(x, y) {
    var comparison = 0;
    for (var i = 0; i < keys.length; ++i) {
      comparison = compareBy(x, y, keys[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return comparison;
  });
  return copy;
}

function compareBy(x, y, key) {
  if (x[key] === y[key]) {
    return 0;
  }
  return x[key] > y[key] ? 1 : -1;
}

function copySequence(sequence) {
  var copy = [];
  for (var i = 0; i < sequence.length; ++i) {
    copy.push(sequence[i]);
  }
  return copy;
}

//2d Sorter
//http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
//homes.sort(sort_by('city', {name:'price', primer: parseInt, reverse: true}));
var sort_two = function() {
   var fields = [].slice.call(arguments),
       n_fields = fields.length;
   return function(A,B) {
       var a, b, field, key, primer, reverse, result, i;
       for(i = 0; i < n_fields; i++) {
           result = 0;
           field = fields[i];
           key = typeof field === 'string' ? field : field.name;
           a = A[key];
           b = B[key];
           if (typeof field.primer  !== 'undefined'){
               a = field.primer(a);
               b = field.primer(b);
           }
           reverse = (field.reverse) ? -1 : 1;
           if (a<b) result = reverse * -1;
           if (a>b) result = reverse * 1;
           if(result !== 0) break;
       }
       return result;
   }
};






 function Draft(s1, s2, s3, n_players){
  num_players=n_players; //make global variable

  //Create an array of players
  this.players=[];
  this.set1=s1;
  this.set2=s2;
  this.set3=s3;

  //Add players
  for (i = 0; i < num_players; i++) {
    var pack_i=new Pack(this.set1);
    var drafter_i= {pack:pack_i,collection:[], deck:[], basiclands:[], color_commit:[0,0,0,0,0],in_color:[1,1,1,1,1]};
    this.players.push(drafter_i);
  }
}

 function update_in_color(p_index){

  //define color commiting threshold
  color_commit_threshold=3.5;

  //reset in_color
  draft.players[p_index].in_color=[0,0,0,0,0];

  //create temp_color_commit
  var temp_color_commit=[0,0,0,0,0];
  for (k=0;k<5;k++){
    temp_color_commit[k]=draft.players[p_index].color_commit[k];
  }

  //find the maximum value
  max_index=0;
  second_index=0;
  max_value=temp_color_commit[0];
  for(k=1;k<5;k++){
    var cur_commit=temp_color_commit[k];
    if (cur_commit>max_value){
      max_index=k;
      max_value=cur_commit;
    }
  }

  //if we are commited to at least 1 color
  if (max_value>color_commit_threshold){
    draft.players[p_index].in_color[max_index]=1;    //mark max as in_color

    temp_color_commit[max_index]=-10;     //don't repeat the maximum value

    //find the second_max value
    second_index=0;
    second_value=temp_color_commit[0];
    for(k=1;k<5;k++){
      var cur_commit=temp_color_commit[k];
      if (cur_commit>second_value){
	  second_index=k;
        second_value=cur_commit;
      }
    }

   if (second_value>color_commit_threshold) {
     draft.players[p_index].in_color[second_index]=1; //mark second_max as in_color
   }
  } else {
    draft.players[p_index].in_color=[0,0,0,0,0];
  }

  //commit to archetype later in the draft
  total_cards=draft.players[p_index].deck.length+draft.players[p_index].collection.length
  time_to_commit=1*pack_size+3;

  if(total_cards>time_to_commit){
     draft.players[p_index].in_color[max_index]=1; //mark second_max as in_color
     draft.players[p_index].in_color[second_index]=1; //mark second_max as in_color
  }

  top_colors = [max_index, second_index];

  return top_colors;
}


//always call this function before using this value
 function update_bias_pack(player_i){

  //update which cards on are color
  top_colors=update_in_color(player_i);
  pack_length=draft.players[player_i].pack.pack_contents.length;

  //figure out how many colors the player is commited to
  player_colors=0;
  for (var j=0; j<5; j++){
    if(draft.players[player_i].color_commit[j]>color_commit_threshold){
      player_colors=player_colors+1;
    }
  }

  //For each card in the pack
  for (i = 0; i < pack_length; i++) {

    //grab the card
    this_card=draft.players[player_i].pack.pack_contents[i];
    cur_bias=0;

    //check if card is on color
    var on_color_card=1;
    var off_color_amount=0;
    for (xx=0; xx<5;xx++){
      if(this_card.colors[xx] > 0 && draft.players[player_i].in_color[xx]==0){
        on_color_card=0;
        off_color_amount+=this_card.colors[xx];
      }
    }

    //check number of colors
    var num_colors=0;
      for (var kk=0;kk<5;kk++){
        if (draft.players[player_i].in_color[kk]==1){
          num_colors+=1;
      }
    }

    denom=color_commit_threshold / .9; //maximum .6 bonus during speculation phase

     //First, handle committed to 2 colors case
     if(num_colors==2){
       if (on_color_card==1){
	cur_bias=2.0; //single color bias
       } else {
       cur_bias=-1.0*(off_color_amount-1); //bigger bias for off color cards later
       }

     } else {
       //Speculation phase, 4 cases:
       //mono-colored card 0 color
       //mono-colored card 1 color (cap bonus)
       //artifact (set at max bonus)
       //multicolored - sum of max 2 bonus - sum of other colors

       //dummy initialize
       cur_bias=-.2;

       //get number of colors of card
       var num_card_colors=0;
       for (var ii=0; ii<5; ii++){
         if (this_card.colors[ii]>0){
	   num_card_colors+=1;
         }
       }


       //check number of colors
       num_player_colors=0;
       for (var kk=0;kk<5;kk++){
         if (draft.players[player_i].color_commit[kk]>0){
           num_player_colors+=1;
         }
       }


       //0-color (artifact) case
       if (num_card_colors==0){


         //get maximum color commitment
         max_value=draft.players[player_i].color_commit[0];
         for(var k=1;k<5;k++){
           var cur_commit=draft.players[player_i].color_commit[k];
           if (cur_commit>max_value){
             max_value=cur_commit;
           }
         }

         //set current bias to maximum current bias
	 if (num_player_colors>1){
           cur_bias = Math.min(color_commit_threshold/(1.0*denom), max_value/(1.0*denom));
         } else {
           cur_bias=0;
	 }

       }

       //1-color (mono-colored) case
       if (num_card_colors==1){

	 //figure out which color the card is in
	 color_index=0;
	 for (var jj=0; jj<5; jj++){
           if(this_card.colors[jj]>0){
             color_index=jj;
	   }
	 }

	 //set the current bias as capped bonus
	 cur_bias = Math.min( color_commit_threshold/(1.0*denom),  draft.players[player_i].color_commit[color_index]/(1.0*denom));
	 //if committed to only one color, reduce bias by factor of 2
       	 if (num_player_colors==1){
           cur_bias=cur_bias/2.0;
	 }


	 //if committed to one color, give a bonus to the best second color
	 second_color_frac=.80;
	 if (player_colors==1 && (color_index==top_colors[1]) && draft.players[player_i].color_commit[color_index]>0){
           cur_bias=Math.max( second_color_frac*color_commit_threshold/(1.0*denom), cur_bias);
	 }

       }

       //2-3 color (multicolored)
       if (num_card_colors==2 || num_card_colors==3){

	 //compute (on-color commit)-(off-color commit)
         on_color_amount=0;
	 for (var k=0; k<5; k++){
	   var color_commit_amount=Math.min(draft.players[player_i].color_commit[k], color_commit_threshold);
           if(this_card.colors[k]>0){
             on_color_amount=on_color_amount+color_commit_amount;
	   } else {
             on_color_amount=on_color_amount-color_commit_amount;
	   }
	 }

         //subtract .4 from the commitment amount
	 cur_bias=on_color_amount/(1.0*denom) - .6;
       }

       //4-5 color (multicolored)
       if (num_card_colors>=4){
         //set bias=0
         cur_bias=0;
       }
     }


     //update color bias
     this_card.color_bias=cur_bias;
     //Changing value from my_rating to myrating
     this_card.value=parseFloat(this_card.color_bias)+parseFloat(this_card.myrating);
  }
  return;
}

function move_2_deck(p, col_index){
  //pick the card and remove it from the pack
  draft.players[p].deck.push(draft.players[p].collection[col_index]);
  draft.players[p].collection.splice(col_index,1)

  //autosort deck
  var total_cards=draft.players[p].deck.length+draft.players[p].basiclands.length
  //if (total_cards==40){
//    draft.players[p].deck=draft.players[p].deck.sort(sort_two( "creaturesort", {name:"cmc", primer: parseFloat, reverse:false}));
      draft.players[p].deck= sortByMultiple ( draft.players[p].deck, ["creaturesort", "cmc", "name"]);

 //}
 //
  //update player deck text
  if(p==0){
    deck_text();
  }

  //Print_collection(); add after function
}

function move_2_collection(p, deck_index){
  //move from deck to collection
  draft.players[p].collection.push(draft.players[p].deck[deck_index]);
  draft.players[p].deck.splice(deck_index,1)

  //update player deck text
  if(p==0){
    deck_text();
  }
}

 function remove_land(p, land_index){
  draft.players[p].basiclands.splice(land_index,1)
  if(p==0){
    deck_text();
  }
 }

 function get_color_code(vec){

//count colors in the card
var num_colors=0;
for(var x=0; x<5; x++){
  if(vec[x]>0){
    num_colors++;
  }
}

//return color for mono-colored, brown otherwise
if (num_colors<1){
  return '#E0D6CC';  //opaque
} else if (num_colors>1){
  return '#CCB299';  //brown
} else if (vec[0]>0) {
  return '#FFFFBF';  //white
} else if (vec[1]>0) {
  return '#94DBFF';  //blue
} else if (vec[2]>0) {
  return '#AAAAAA';  //black
} else if (vec[3]>0) {
  return '#FFAAAA';  //red
} else if (vec[4]>0) {
  return '#99E699';  //green
}

//safety
return '#CCB299';  //brown

}

 function check_oncolor(card_colors, player_colors){
  //check if card is on color
  var on_color_card=1;
  //var off_color_amount=0;
  for (var xx=0; xx<5;xx++){
    if(card_colors[xx] > 0 && player_colors[xx]==0){
      on_color_card=0;
      //off_color_amount+=this_card.colors[xx];
    }
  }
  return on_color_card;
}

 function seventeen_lands(pn){

  //clear lands
  draft.players[pn].basiclands=[];

  //determine colors of cards in deck
  deck_colors=[0,0,0,0,0];
  deck_length = draft.players[pn].deck.length;
  for (var i = 0; i < deck_length; i++) {
    card_colors=draft.players[pn].deck[i].colors;
    for (var j=0; j<5; j++){
      deck_colors[j]+=card_colors[j];
    }
  }

  //evenly as possible on lands
  lands_to_add=40-draft.players[pn].deck.length

  //determine top color in deck
  max_index=0;
  for (var y=1; y<5; y++){
    if(deck_colors[y]>deck_colors[max_index]){
      max_index=y;
    }
  }

  //determine secondary color
  second_max_index=0;
  if (max_index==0){second_max_index=1;}

  for (var z=0; z<5; z++){
    if(deck_colors[z]>deck_colors[second_max_index] && z!=max_index){
      second_max_index=z;
    }
  }

  //Add lands primary color
  lands_color1=Math.ceil(lands_to_add/2.0);
  for (var i=0; i<lands_color1; i++){
    addLand(pn, max_index);
  }
  //Add lands secondary color
  lands_color2=Math.floor(lands_to_add/2.0);
  for (var i=0; i<lands_color2; i++){
    addLand(pn, second_max_index);
  }

}

function clear_deck(pn){
  //clear deck
  var it=0;

  //clear lands
  draft.players[pn].basiclands=[]

  //clear deck
  while(draft.players[pn].deck.length>0 && it<300){
    move_2_collection(pn, 0);
    it++;
  }


  draft.players[0].collection= sortByMultiple ( draft.players[0].collection, ["colorsort", "creaturesort", "cmc", "name"]);

  //draft.players[0].collection=draft.players[0].collection.sort(sort_two( "colorsort", {name:"cmc", primer: parseFloat, reverse:false}));
  Print_collection();

  //sort collection


  return;
}


function autobuild(pn, colors){

  //define colors of cards in deck
  var deck_colors=[0,0,0,0,0];

  //check colors of card in deck
  deck_length=draft.players[pn].deck.length
  for (var j=0; j<deck_length; j++){
    var deck_card=draft.players[pn].deck[j];
    for (var i = 0; i < 5; i++) {
      if(deck_card.colors[i]>0){
        deck_colors[i]+=1;
      }
    }
  }

  //check number of colors
  var num_colors =0;
  for (var i=0; i<5; i++){
    if(deck_colors[i]>0){
      num_colors+=1;
    }
  }

  //if exactly two colors in deck, use these colors
  if (num_colors==2){
    colors=deck_colors;
  }

  //clear deck
  var it=0;
  while(draft.players[pn].deck.length>0 && it<300){
    move_2_collection(pn, 0);
    it++;
  }

  //add cards to deck
  var cont = 1;
  num_lands=0;
  while(draft.players[pn].deck.length<(23+num_lands) && cont>0){

    //best card
    var max_rating=0;
    var max_index=0;

    //check each card in collection
    collection_length = draft.players[pn].collection.length;
    for (i = 0; i <collection_length; i++) {

      //compute and update ratings here;
      var card_rating=parseFloat(draft.players[pn].collection[i].myrating);
      card_colors=draft.players[pn].collection[i].colors;

      //update best card
      //if (card_rating>max_rating && !isNaN(card_rating)){

      if (card_rating>max_rating && !isNaN(card_rating) && (check_oncolor(card_colors, colors)>0)){
        max_rating=card_rating;
        max_index=i;
      }
    }

    //add the best card if possible
    if (max_rating > 0){
      //account for lands
      if(draft.players[pn].collection[max_index].type=="Land" || draft.players[pn].collection[max_index].type=="land"){
        num_lands++;
      }

      move_2_deck(pn, max_index);
    }else{
      cont=0;
    }

   }


  //now add lands, non-basics not addressed
  seventeen_lands(pn);

  //sort deck (done in move_2_deck)
  //draft.players[pn].deck=draft.players[pn].deck.sort(sort_two( "creaturesort", {name:"cmc", primer: parseFloat, reverse:false}))

  //Show the cards, if human player
  if (pn==0){
    Print_collection();
    var target = document.getElementById('deck_container');
    target.scrollIntoView(true);
  }

}

//slow to display
function autobuild_bots(){
  for (var pn=1; pn<num_players; pn++){
    autobuild(pn,draft.players[pn].in_color);
  }
  Print_collection();
}

//Function that gives unique array elements
function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

//print deck text
function deck_text(){

  var total_cards=draft.players[0].deck.length+draft.players[0].basiclands.length
  if(total_cards<40){
    document.getElementById("deck_text").innerHTML="";
    document.getElementById("deck_text").style.display="none"
    return;
  }

  //if visible
  document.getElementById("deck_text").style.display="inline-block"


  //create an array of card names
  deck_names=[];
  deck_length=draft.players[0].deck.length;
  for (var i=0; i<deck_length; i++){
    deck_names.push(draft.players[0].deck[i].name);
  }
  lands_length=draft.players[0].basiclands.length;
  for (var i=0; i<lands_length; i++){
    deck_names.push(draft.players[0].basiclands[i].name);
  }

  //store deck_names in your_array
  your_array=deck_names;

  //function that stores counts of each element
  var counts = {};
  your_array.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

  //get a unique array
  unique_array=uniq(your_array);

  //for element in array
  cur_html="//Deck from draftsim.com<br>";
  array_length=unique_array.length;
  for (var i=0; i<array_length; i++){
    cur_html=cur_html+ counts[unique_array[i]].toString() + " " + unique_array[i].replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ')  + "  " + "<br>";
  }
  document.getElementById("deck_text").innerHTML=cur_html
  return;
}

function Print_collection(){

 //update the biases FIRST
 update_bias_pack(0); //update bias for just the player, add bots later

 //Clear images
 pack_length = draft.players[0].pack.pack_contents.length;
 document.getElementById("pack_images").innerHTML = "";

 //Set visibilities properly
 var cards_picked = draft.players[0].collection.length + draft.players[0].deck.length;
 if (cards_picked==0){
   show_bot_decks=0;
 }

 if (cards_picked>=3*pack_size){
  draft_end_visibility();
 } else {
  draft_start_visibility();
 }


// HEAD
// Set up pack card images properly
//=======
// Set up pack card images properly
// origin/master


 for (i = 0; i < pack_length; i++) {
   var cur_html = document.getElementById("pack_images").innerHTML;

   var card = draft.players[0].pack.pack_contents[i];
   var card_name = card.name.replace(/_/g, " ");
   
   //Old 
   //var extra_html = "<img src=" + card.image +  " alt=\"" + card_name + "\" title=\"" + card_name + "\" "+ "id=card_" + i + " onclick=make_pick(" + i + ") />";
   //document.getElementById("pack_images").innerHTML = cur_html + extra_html;

   //New 
   //the following creates a wrapper <div> around each item item in id=pack_images that contains the <img> as well as another <div> that is set to overlay the <img>
   // each <img> and overlay <div> have "id="" created based on card name(since each card is unique in a pack) that allows them to be addressable for other functions.  
   

   //opens outer wrapper <div>. Named after the position in the array card_'i'
   var c_wrapper_open = "<div id=\"card_" + i + "\" class=\"card_wrapper\">"; 
  
   //creates the <img>, assigns id=img_card-s_name. Note that single quote(') is converted to dash(-) in addition to spaces( ) being underscores(_). 
   //This is to help mitigate interpreation issues when finding IDs. 
   //these <img>s belong to the card_img CSS class
   var c_image =  "<img src=" + card.image +  " alt=\"" + card_name + "\" title=\"" + card_name + "\" "+ "id=\"img_" + card.name.replace(/'/g,"-") + "\" class= \"card_img\" onclick= make_pick(" + i + ") />"; 

   //creates the overlay <div>, assigns id=overlay_card-s_name. Note that single quote(') is converted to dash(-) in addition to spaces( ) being underscores(_). 
   //This is to help mitigate interpreation issues when finding IDs.
   //These <div>s belond to the card_overlay CSS class
   var c_overlay = "<div id=\"overlay_" + card.name.replace(/'/g,"-") + "\" class=\"card_overlay\">" + "<p id=rating_" + card.name.replace(/'/g,"-") +" class=\"card_rating_text\">" + (parseFloat(card.myrating) + parseFloat(card.color_bias)).toFixed(1) + "</p>" + "</div>";
    
   //Closes the wrapper
   var c_wrapper_close = "</div>";
   
   //write the wrapper <div>s, <img>s, and overlay <div>s to the page 
   document.getElementById("pack_images").innerHTML = cur_html + c_wrapper_open + c_image + c_overlay + c_wrapper_close;
   //document.getElementById("overlay_" + card.name.replace(/'/g,"-")).innerHTML = "<p id=rating_" + card.name.replace(/'/g,"-") +" class=\"card_rating_text\">" + (parseFloat(card.myrating) + parseFloat(card.color_bias)).toFixed(1) + "</p>";

 }

 if(document.getElementById('pack_text_container').style.display == 'none'){
    $(".card_overlay").toggle(); //jQuery if suggestions are turned off this will hide the overlay
 }

 //Load next bot images when current ones are finished loading
 tmp_pass_amount=-1;
 var cards_picked = draft.players[0].collection.length + draft.players[0].deck.length
 if (cards_picked <= pack_size-1 || cards_picked >= 2*pack_size ){
   tmp_pass_amount=+1;
 }
 var next_bot_index = (num_players - tmp_pass_amount) % num_players;
 if (num_players>1){
   document.getElementById("pack_images").onload=preload_bot_images(draft.players[next_bot_index])
 }


// Find a <table> element
var tablep = document.getElementById("pack_text");
tablep.innerHTML=""; //clear the table

//create an array of values
var values=[];
for (k=0;k<pack_length; k++){
  cur_card=draft.players[0].pack.pack_contents[k];
	values.push((parseFloat(cur_card.myrating) + parseFloat(cur_card.color_bias)));
}

//Sort values and get the indices (from stack exchange)
var test = values;
var test_with_index = [];
for (var i in test) {
    test_with_index.push([test[i], i]);
}
test_with_index.sort(function(left, right) {
return left[0] > right[0] ? -1 : 1;
});
var indexes = [];
test = [];
for (var j in test_with_index) {
    test.push(test_with_index[j][0]);
    indexes.push(test_with_index[j][1]);
}

//add the card data
var rows_2_show = Math.min(pack_length, 15); //no min

 for (i = 0; i < rows_2_show; i++) {
   var row = tablep.insertRow(i);
   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
   var cell4 = row.insertCell(3);


   row.onclick="make_pick(" + i + ")";


   // Add some text to the new cells:
   var cur_card = draft.players[0].pack.pack_contents[indexes[i]];
   var cur_color = get_color_code(cur_card.colors);

   cell1.innerHTML = "<li style='min-width:400px;background-color:" +cur_color+ "'; onclick=make_pick(" + indexes[i] + ")>" + cur_card.name.replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ') + "</li>";
   cell2.innerHTML = cur_card.myrating;
   if (cur_card.hasOwnProperty('color_bias')){

     if (cur_card.color_bias>=0){
       cell3.innerHTML = "+" + cur_card.color_bias.toFixed(1).replace(/^0+/, '');
     } else {
       cell3.innerHTML = cur_card.color_bias.toFixed(1).replace(/^0+/, '');
     }

   } else {
     cell3.innerHTML="0";
    }
   cell4.innerHTML =  (parseFloat(cur_card.myrating) + parseFloat(cur_card.color_bias)).toFixed(1);

 }
  // var cur_html = document.getElementById("pack_images").innerHTML;
  // var extra_html = "<img src=" + draft.players[0].pack.pack_contents[i].image +  " id=card_" + i + " onclick=make_pick(" + i + ") />";
  // document.getElementById("pack_images").innerHTML = cur_html + extra_html;


 //create the header text
 var header = tablep.createTHead();
 var row = header.insertRow(0);
 // Create an empty <tr> element and add it to the 1st position of the table:
 // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
 var head1 = row.insertCell(0);
 var head2 = row.insertCell(1);
 var head3 = row.insertCell(2);
 var head4 = row.insertCell(3);
 head1.innerHTML = "<b>  Name  </b>";
 head2.innerHTML = "<b>Base Rating</b>";
 head3.innerHTML = "<b>Color</b>";
 head4.innerHTML = "<b>Overall</b>";

//no table for small pack sizes
if(draft.players[0].pack.pack_contents.length==0){
  tablep.innerHTML="";
}

 //set visibility of sorting buttons, (one time use button)
 if (draft.players[0].collection.length>0 && num_players>1 && (typeof sort_collection == "undefined")){
   document.getElementById("sort_deck").style.display="inline";
 } else {
   document.getElementById("sort_deck").style.display="none";
 }

 //sort player collection, as needed
 if (typeof sort_collection !== "undefined"){
   //sort by color
   if (sort_collection == 1){
     draft.players[0].collection= sortByMultiple ( draft.players[0].collection, ["colorsort", "creaturesort", "cmc", "name"]);
   }
   //sort by CMC
   //if (sort_collection == 2){
   //  draft.players[0].collection= sortByMultiple ( draft.players[0].collection, ["creaturesort", "cmc", "name"]);
   //}
 }

 //display player collection properly
 collection_length=draft.players[0].collection.length;
 document.getElementById("collection_img").innerHTML = "";
 for (i = 0; i < collection_length; i++) {
   var cur_html = document.getElementById("collection_img").innerHTML;
   var extra_html = "<img src=" + draft.players[0].collection[i].image +  " id=coll_0_" + i + " onclick=move_2_deck(0," + i + ");Print_collection();>";
   document.getElementById("collection_img").innerHTML = cur_html + extra_html;
 }


 //display decks here
 if (draft.players[0].deck.length>0 || draft.players[0].basiclands.length>0){
   cards_in_deck= parseFloat(draft.players[0].deck.length) + parseFloat(draft.players[0].basiclands.length);
   document.getElementById("deck_title").innerHTML = "<p>Deck " + cards_in_deck + "</p>";
 } else {
   document.getElementById("deck_title").innerHTML = "<p>Deck</p>"
 }

 document.getElementById("deck_img").innerHTML = "";
 for (var pn=0; pn<num_players; pn++){

   deck_length=draft.players[pn].deck.length
   for (var i = 0; i < deck_length; i++) {
     var cur_card = draft.players[pn].deck[i];
     cur_card.id = "deck_"+pn+"_" +i;

     //card images
     if (typeof cur_card != "undefined"){ //make sure card isnt undefined
       var cur_html = document.getElementById("deck_img").innerHTML;
       var extra_html = "<img src=" + draft.players[pn].deck[i].image + " id=deck_" + pn + "_" + i + " onclick=move_2_collection(" + pn + "," + i + ");Print_collection();>";
       document.getElementById("deck_img").innerHTML = cur_html + extra_html;
     }
   }
 }

 //display lands in the deck here
 for (var pn=0; pn<num_players; pn++){
   lands_length=draft.players[pn].basiclands.length
   for (var i = 0; i < lands_length; i++) {
     var cur_card = draft.players[pn].basiclands[i];

     //card images
     if (typeof cur_card != "undefined"){ //make sure card isnt undefined
       var cur_html = document.getElementById("deck_img").innerHTML;
       var extra_html = "<img src=" + draft.players[pn].basiclands[i].image + " onclick=remove_land(" + pn + "," + i + ");Print_collection();>";
       document.getElementById("deck_img").innerHTML = cur_html + extra_html;
     }
   }
 }


 //display bot collection
 document.getElementById("bot_collection_img").innerHTML="";
 if ( (typeof show_bot_decks != "undefined") && show_bot_decks==1){
   for (var bot_num=1; bot_num<num_players; bot_num++){
     bot_collection_length=draft.players[bot_num].collection.length

     document.getElementById("bot_collection_img").innerHTML = document.getElementById("bot_collection_img").innerHTML + "<br>" + "Bot" + bot_num + ":" + "<br>";
     for (var i = 0; i < bot_collection_length; i++) {
       var cur_card = draft.players[bot_num].collection[i];
       //card images
       if (typeof cur_card != "undefined"){ //make sure card isnt undefined
         var img = document.createElement("img");
         img.src = cur_card.image;
         document.getElementById("bot_collection_img").appendChild(img);
         //document.getElementById("bot_collection_img").innerHTML = document.getElementById("bot_collection_img").innerHTML + cur_card.name.replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ').replace("_", ' ') + "<br>";
       }
     }
     document.getElementById("bot_collection_img").innerHTML = document.getElementById("bot_collection_img").innerHTML + "<br>";
   }
 }
}


//Download images for next pack
var ImagePreloader = function() {
    this.images = {};
};

ImagePreloader.prototype.preload_image = function(image_url) {
    var image = new Image();
    image.src = image_url;
    this.images[image_url] = image;
}

var image_preloader = new ImagePreloader();


function make_pick(card_index){

//player picks
 pack_length=draft.players[0].pack.pack_contents.length
 if(card_index >= pack_length){
  return 0;
} else {

  //update color commitment
  for (i = 0; i < 5; i++) {
    if(draft.players[0].pack.pack_contents[card_index].colors[i]>0){
      draft.players[0].color_commit[i]+=Math.max(0,draft.players[0].pack.pack_contents[card_index].myrating-rating_thresh);
    }
  }

  //pick the card and remove it from the pack
  draft.players[0].collection.push(draft.players[0].pack.pack_contents[card_index]);
  draft.players[0].pack.pack_contents.splice(card_index,1);

//bots make picks
for (jj = 1; jj < num_players; jj++) {
  bot_pick(jj);
}

//now pass the remaining cards
var cards_picked = draft.players[0].collection.length + draft.players[0].deck.length
if (cards_picked <= pack_size-1){   //pass left
  pass_cards(+1);
} else if (cards_picked == pack_size) { //generate pack 2
 for (i = 0; i < num_players; i++) {
  var pack_2=new Pack(draft.set2);
  draft.players[i].pack=pack_2;
 }
} else if (cards_picked <= 2*pack_size-1) {  //pass right
  pass_cards(-1);
} else if (cards_picked == 2 * pack_size) {   //generate pack 3
 for (i = 0; i < num_players; i++) {
  var pack_3=new Pack(draft.set3);
  draft.players[i].pack=pack_3;
 }
} else if (cards_picked <= 3*pack_size-1) { //pass left
  pass_cards(+1);
} else if (cards_picked == 3*pack_size) { //end draft
  //end draft
}

//Go to the next pick
Print_collection();

}}

//Preload the images in the next bot's pack
function preload_bot_images(bot) {
  for (var i = 0; i < bot.pack.pack_contents.length; i++) {
    var card = bot.pack.pack_contents[i];
    image_preloader.preload_image(card.image);
  }
};

//Pass cards to left or right (+1,-1)
function pass_cards(pass_amount){
  var tmp_packs=['1', '2', '3', '4', '5', '6', '7', '8']; //dummy initialization

  //don't pass for now

  //put cards in tmp_packs
  for (i=0; i<num_players; i++){
   var p_index = ((i+pass_amount)+ num_players) % num_players;
   tmp_packs[p_index] = draft.players[i].pack;
  }

  //return packs to the draft
  for (i=0; i<num_players; i++){
    draft.players[i].pack=tmp_packs[i];
  }

  //Bot images loaded when current pack is done loading
  //The bot that's going to pass to the player next
  //var next_bot_index = (num_players - pass_amount) % num_players;
  //preload_bot_images(draft.players[next_bot_index]);

}

 function bot_pick(bot_index){

 //update biases for bot
 update_bias_pack(bot_index);

 //output to screen
 var pack_length=draft.players[bot_index].pack.pack_contents.length;

 //determine the highest rated card
 var best_rating=0;
 var best_index=0;
 for (var i = 0; i < pack_length; i++) {
   //define the current card
   this_card=draft.players[bot_index].pack.pack_contents[i];

   //define the current card value
   this_card.value=parseFloat(this_card.myrating)+parseFloat(this_card.color_bias);
   var cur_rating = parseFloat(this_card.value);

   //sort by best rating
   if (cur_rating > best_rating){
    best_rating=cur_rating;
    best_index=i;
   }
 }

  //get the picked card
  var picked_card=draft.players[bot_index].pack.pack_contents[best_index];

  //update color commitment
  for (i = 0; i < 5; i++) {
    if(picked_card.colors[i]>0){
      draft.players[bot_index].color_commit[i]+=Math.max(0,picked_card.myrating-rating_thresh);
    }
  }

 //choose the card
  draft.players[bot_index].collection.push(draft.players[bot_index].pack.pack_contents[best_index]); //pick the card
  draft.players[bot_index].pack.pack_contents.splice(best_index,1); //remove from pack

}

 function Draft_DTK(){
  draft = new Draft(DTK, DTK, FRF, 8);
  Print_collection();
}

 function Sealed_ORI(){
  draft = new Draft(ORI, ORI, ORI, 1);
  draft.players[0].pack.pack_contents=[];

  for (var i=0; i<6; i++){
    cur_pack=new Pack(ORI);
    while(cur_pack.pack_contents.length>0){
      //pick the card and remove it from the pack
      draft.players[0].collection.push(cur_pack.pack_contents[0]);
      cur_pack.pack_contents.splice(0,1);
    }
  }

  //update color commitment
  collection_length=draft.players[0].collection.length;
  for (var j = 0; j<collection_length; j++){
    //update color commitment
    cur_card=draft.players[0].collection[j];
    for (i = 0; i < 5; i++) {
      if(cur_card.colors[i]>0){
        draft.players[0].color_commit[i]+=Math.max(0,cur_card.myrating-rating_thresh);
      }
    }
  }
  //update best colors
  update_in_color(0);

  //sort the pool
//  draft.players[0].collection=draft.players[0].collection.sort(sort_two( "colorsort", {name:"cmc", primer: parseFloat, reverse:false}));
  //draft.players[0].collection=draft.players[0].collection.sort(sort_two( "colorsort", {name:"cmc", primer: parseFloat, reverse:false}));
  draft.players[0].collection= sortByMultiple ( draft.players[0].collection, ["colorsort", "creaturesort", "cmc", "name"]);



  //Print the deck
  Print_collection();

}

 function Draft_ORI(){
  draft = new Draft(ORI, ORI, ORI, 8);
  Print_collection();
}


function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

window.onload = function(){
  //begin the draft on page load
  var mode = getParameterByName('mode');
  if(mode=='Draft_DTK'){
    Draft_DTK();
    window.location.href.replace(window.location.search, '')
  } else if (mode == 'Draft_ORI'){
    Draft_ORI();
  } else if (mode == 'Sealed_ORI') {
    Sealed_ORI();
  } else {
    document.getElementById("debug").innerHTML="Use the navigation bar above";
  }
            var md = document.getElementById("chart-area").getContext("2d");
            window.myPie = new Chart(md).Pie(pieData);

            var mc = document.getElementById("canvas").getContext("2d");
            window.myBar = new Chart(mc).Bar(barChartData, {
                responsive : true
            });

};



