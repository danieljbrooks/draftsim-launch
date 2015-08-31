    <footer class="container">
        <p>The copyright for Magic: the Gathering and all associated card names and card images is held by Wizards of the Coast</p>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="assets/js/Chart.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script>
        // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        // ga('create', 'UA-56289140-2', 'auto');
        // ga('send', 'pageview');
    </script>






    <!-- CHART.JS dummydata -->
    <script>
        var barChartData = {
            labels : ["1","2","3","4","5","6","7"],
            datasets : [
                {
                    fillColor : "#EC512B",
                    strokeColor : "#EC512B",
                    highlightFill: "#EC512B",
                    highlightStroke: "#EC512B",
                    data : [1,7,6,3,2,1,0]
                }
            ]
        }
        var pieData = [
            {
                value: 60,
                color:"#DAC6A4",
                highlight: "#E2D1B6",
                label: "White"
            },
            {
                value: 140,
                color: "#409BBC",
                highlight: "#75AEC9",
                label: "Blue"
            },
            {
                value: 60,
                color: "#35302A",
                highlight: "#554D48",
                label: "Black"
            },
            {
                value: 40,
                color: "#BD3D2D",
                highlight: "#CB624B",
                label: "Red"
            },
            {
                value: 100,
                color: "#779A65",
                highlight: "#95AC81",
                label: "Green"
            },
            {
                value: 60,
                color: "#7B9CA7",
                highlight: "#97AEB8",
                label: "Artifacts"
            },
            {
                value: 80,
                color: "#A39C8E",
                highlight: "#B5AEA3",
                label: "Lands"
            }
        ];
    </script>