<!DOCTYPE html>
<html lang="en">
<<<<<<< HEAD
    <head>
    <title>Draftsim - MTG Origins Draft and Sealed Simulator</title>
    <?php include 'includes/header.php'; ?>
</head>

<body>
=======
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
>>>>>>> master

    <?php include 'includes/nav.php'; ?>

    <div class="container">

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

    </div>

    <?php include 'includes/footer.php'; ?>

</body>

