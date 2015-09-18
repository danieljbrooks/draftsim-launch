<!DOCTYPE html>
<html lang="en">
    <head>
    <title>Draftsim - MTG Origings Draft and Sealed Simulator - Drafting</title>
    <?php include 'includes/header.php'; ?>
    <!-- Include cardlists -->
    <script src="assets/js/sets/DTK.js"></script>
    <script src="assets/js/sets/FRF.js"></script>
    <script src="assets/js/sets/FRF_lands.js"></script>
    <script src="assets/js/sets/ORI.js"></script>
    <script src="assets/js/sets/LANDS.js"></script>
    <script src="assets/js/drafting.js"></script>

</head>

<body>

    <?php include 'includes/nav.php'; ?>

    <div class="container">

            <div id="pack_box" class="during_draft" >
                <my_p id="pack_images" class="display"></my_p>
            </div>

            <hr style="height:1px; visibility:hidden;"/>

            <ul id="commands" class="commands">
              <li id= " during_draft" class="during_draft" style="display:none;" onclick=toggle_suggestions()> Suggestions </li>
              <li id = "bot_decks_button" class = "after_draft" style="display:none" onclick=toggle_bot_deck_visibility()> View Bots </li>
              <li id = "build_deck" class = "after_draft" style="display:none" onclick=autobuild(0,draft.players[0].in_color);Print_collection();> Autobuild </li>
              <li id = "clear_deck" class = "after_draft" style="display:none" onclick=clear_deck(0)> Clear Deck </li>
            </ul>

            <div id="pack_text_container" class="display" align="middle" style="display:none;min-height:0px;">
                <table id="pack_text" class="display" align="middle"></table>
            </div>

            <br />

            <div id="collection_container" class="display">
                <p id="collection_img" class="display"></p>
            </div>

            <ul id="sort_deck" class="commands" style="display:none;">
                <br>
                <li id="color_sort" style="display:inline" onclick="sort_collection=1;Print_collection();";> Color Sort </li>
                <!--  <li id="cmc_sort"   style="display:inline" onclick="sort_collection=2;Print_collection();";> CMC Sort </li> -->
                <br>
                <br>
            </ul>

            <div id="lands" class="after_draft" style="display:none">
                <p>Basic lands:</p>
                <img src="assets/img/sets/ORI/Plains.jpg"  onclick="addLand(0, 0); Print_collection();">
                <img src="assets/img/sets/ORI/Island.jpg" onclick="addLand(0, 1); Print_collection();">
                <img src="assets/img/sets/ORI/Swamp.jpg" onclick="addLand(0, 2); Print_collection();">
                <img src="assets/img/sets/ORI/Mountain.jpg" onclick="addLand(0, 3); Print_collection();">
                <img src="assets/img/sets/ORI/Forest.jpg" onclick="addLand(0, 4); Print_collection();">
                <br>
            </div>

            <div id="deck_container" class="display">
                <p id="deck_title"> </p>
                <p id="deck_img" class="display"> </p>
                <p id="basic_land_img" class="display"> </p>
                <p id="deck_text" class="display" style="display:none"> </p><br><br>
            </div>

            <!--
            <br>
            <div id="collection_container" class="display">
              <p id="collection_img" class="display"> </p>
            </div>
            -->

            <div id="bot_collection_container" class="bot_decks" style:"display:none">
                <p id="bot_collection_img" class="display"> </p>
            </div>

            <my_p id="debug"> </my_p>
            <my_p id="debug2"> </my_p>
            <my_p id="debug3"> </my_p>
        </div>

        <div class="container">
            <div class="col-md-6" style="text-align: center;">
                <h3>Manacurve</h3>
                <canvas id="canvas" height="150" width="auto"></canvas>
            </div>
            <div class="col-md-6" style="text-align: center;">
                <h3>Mana distribution</h3>
                <div id="canvas-holder">
                    <canvas id="chart-area" width="auto" height="250"/>
                </div>
            </div>
        </div>

    </div>

    <?php include 'includes/footer.php'; ?>

</body>
</html>


