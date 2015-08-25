<!DOCTYPE html>
<html lang="en">
<head>
<title> draftsim - Methodology - Magic Origins Draft and Sealed Simulator MTG </title>
<meta name="description" content="Draftsim - Methodology - Magic Origins draft and sealed simulator. Pick suggestions and automatic deckbuilding.">
<meta name="keywords" content="MTG", "draftsim","draft","sealed generator", "methodology","magic","ORI","Magic Origins","dragons","DTK","DDF", "booster", "draft simulator">
<meta name="author" content="Daniel Brooks">

<?php include 'css.html'; ?>

<!-- google analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-56289140-2', 'auto');
  ga('send', 'pageview');
</script>


</head>

<body>
<?php include 'header.html'; ?>
<br>

<div id="methodology_text" class="methodology" align="left" style="width:70%;margin-left: auto; margin-right:auto;">

<h3> Methodology </h3><hr>

Draftsim AI uses the following concepts to evaluate each card:<br>
<br>
<h4 style="display:inline">Power:&nbsp;&nbsp;</h4>Each card has a base rating of 0-5<br><br>
<h4 style="display:inline">Color:&nbsp;&nbsp;&nbsp;</h4>Cards that fit into a two-color deck are given a bonus<br><br>
<h4 style="display:inline">Curve:&nbsp;&nbsp;</h4>Coming soon! <br>
<br>
<br><h3> Drafting </h3><hr>
<h4>Stage 1: Speculation</h4>
<p>At the beginning of a draft, the bots pick the highest rated card out of each pack. On-color cards are given a small bonus, which ranges from +0 to +.9</p>

<br><h4>Stage 2: Commitment</h4>
<p>After the bots have taken some strong cards, they commit to drafting a two-color deck. A +2.0 bonus is given to on-color cards. </p>

<br><h4>Stage 3: Deck Construction</h4>
<p> During deck construction, automatically construct a deck with the most powerful 23 cards in two colors and 17 lands </p>
<br>

<!-- <h4>Curve:</h4><p>On-curve cards are given a bonus. The ideal curve contains 3+ two-drops, 4+ three drops, 1-3 tricks and 2+ removal spells. To be implemented.</p><br> -->
</div>
<br><br>

<!---
<br>
<br>
<br>

<div id="methodology_text" class="methodology" align="left" style="width:70%;margin-left: auto; margin-right:auto;">
<h3> Methodology </h3><hr>

<p> Each card is assigned an intrinsic quality rating, which ranges from 0.0 to 5.0.  
The current model selects the 'best' card, with a bonus given to on-color cards. 
In the future, I hope to implement a bonus based on mana curve.</p>

<p>There are three stages to the drafting process: speculation, commitment, and deck construction.</p>

<br><h4>Stage 1: Speculation</h4>
<p>Take the highest rated card out of every pack. Taking a card increases the drafter's commitment to that color, from 0 to .6. Colorless cards are given the maximum bonus of any one color and multicolored cards are given a penalty. 
</p>

<br><h4>Stage 2: Commitment</h4>
<p> When color_commit>=threshold for two or more colors, the draft enters stage 2.  
A +2.0 bonus is given to on-color cards, defined as cards castable from the two colors of maximum color_commit.
  Off-color cards are assigned a penalty based on how splashable they are.
<br><h4>Stage 3: Deck Construction</h4>
<p>First, the two colors with the greatest color_commit are identified. Then the 23 best cards in these colors are added to the deck. </p>
<p>Basic lands are then added, split as evenly as possible across colors, up to a total of 17 lands. If there is an odd number of basics, the color with the most colored symbols in the deck is given the additional land.</p>
<p>In sealed, the same procedure is used to generate a deck. If you would like to build a deck of another color combination, add a few cards from that two-color pair to the deck before selecting autobuild.</p>

<br><h4>Model Limitations</h4>
<p>In summary, the current model constructs two-color decks wtih the 'best' cards that are available. While card quality is the driving factor behind
many limited decisions, this approach has several limitations.</p>
<p>First, mana curve is not considered. Decks need a mix of creatures, tricks, and removal, as well as a mix of cheap and expensive spells in order to function optimally. Sometimes
 it is correct to add a weaker card to a deck if it fills a hole in the curve. I hope to implement a model for curve in the coming months.</p>
<p>Secondly, in practice, card ratings do not exist in a vacuum. Synergies between different cards can make them more or less powerful in different decks. This model does
not account for this synergy. In order to keep the site maintainable, I do not plan to account for synergy at the current time. Beside, that's much of the fun of drafting!</p>

<p> I've been interested in developing a quantitative model for Magic: the Gathering booster draft that selects the best </p>
</div>
<br><br><br>

<div id="sample_header" class="methodology" align="left" style="width:70%;margin-left: auto; margin-right:auto;">
<h3> This is a sample header </h3>
<br>
<p> And this is some sample text. I am going to keep typing so that we can see what the formatting looking like.  The formatting actually looks quite interesting.
 OK. That is enough text for now.</p>
<br>
</div>

<br>
<br>
<br>

<div id="page2" class="methodology" align="left" style="width:70%;margin-left: auto; margin-right:auto;">
<br>
<h3> This is another page </h3><hr>

<p> And there is some more text on it </p>

<br>
</div>
<br>
<br>
<br>
--->
</body>

