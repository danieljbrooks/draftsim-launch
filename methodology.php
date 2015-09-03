<!DOCTYPE html>
<html lang="en">
    <head>
    <title>Draftsim - MTG Origins Draft and Sealed Simulator</title>
    <?php include 'includes/header.php'; ?>
</head>

<body>

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

