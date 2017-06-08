/* IIFE for the donut pie chart*/
(function() {

    var width = 500,
        height = 500,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#00aef7", "#00385d", "#5a595f", "#71d2fd"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {

            return d.timesClicked;
        });

    var div = d3.select(".container").append("div").attr("class", "tooltip");

    var svg = d3.select('body').select("#donut-charts").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("js/data.csv", type, function(error, data) {
        if (error) throw error;
        var counts = [];
        compiledData = data;
        var g = svg.selectAll(".arc")
            .data(pie(getCount(arr)))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .on('mouseenter', function(d) {
                div[0][0].innerHTML = '<span class="tooltiptext" style="visibility: visible; opacity: 1">' + d.data.timesClicked + '</span>';
                div.style('visibility', 'visible');
            })
            .style("fill", function(d) { return color(d.data.Country); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35rem")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.data.Country; });
    });
    var arr = [];

    function type(data) {

        if (data.Clicked === "Clicked") {
            arr.push({
                "Country": data.Country,
                "count": ''
            });
        }

        return data;
    }

    function getCount(array) {
        var count = {};
        array.forEach(function(a) {
            count[a.Country] = (count[a.Country] || 0) + 1;
        });
        return Object.keys(count).map(function(k) {
            return { Country: k, timesClicked: +count[k] };
        });
    }

})();

/* IIFE for the horizontal bar chart*/
(function() {

    var margin = { top: 20, right: 30, bottom: 40, left: 130 },
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], 0.1);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(0)
        .tickPadding(6);

    var svg = d3.select('body').select("#bar-graphs").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("js/data.csv", type, function(error, data) {
        x.domain(d3.extent(data, function(d) { return d.Age; })).nice();
        y.domain(data.map(function(d) {
            if ((d.Campaign).toLowerCase() !== "unknown") {
                return d.Campaign;
            }
        }));


        svg.selectAll(".bar")
            .data(getCount(resultArr))
            .enter().append("rect")
            .attr("class", function(d) { return "bar bar--" + (d.campaignCount < 0 ? "negative" : "positive"); })
            .attr("x", function(d) { return x(Math.min(0, d.campaignCount)); })
            .attr("y", function(d) {
                if ((d.Campaign).toLowerCase() !== "unknown") {
                    return y(d.Campaign);
                }
            })
            .attr("width", function(d) { return Math.abs(x(d.campaignCount) - x(0)); })
            .attr("height", y.rangeBand());

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + x(0) + ",0)")
            .call(yAxis);
    });
    var resultArr = [];

    function type(d) {
        d.Age = +d.Age;
        if (d.Clicked === "Clicked" && (d.Campaign).toLowerCase() !== "unknown") {
            resultArr.push({
                "Campaign": d.Campaign,
                "campaignCount": ''
            });
        }

        return d;
    }

    function getCount(array) {
        var count = {};
        array.forEach(function(a) {
            count[a.Campaign] = (count[a.Campaign] || 0) + 1;
        });
        return Object.keys(count).map(function(k) {
            return { Campaign: k, campaignCount: +count[k] };
        });
    }

})();


/* IIFE for the Line chart */

(function() {

    var margin = { top: 50, right: 0, bottom: 70, left: 70 },
        width = 900,
        height = 600;


    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) {
            return x(d.Campaign);
        })
        .y(function(d) {

            return y(d.campaignCount);
        })
        .interpolate("basis");



    var svg = d3.selection("line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("js/data.csv", type, function(error, data) {
        var filteredData = getCount(lineArr);
        // x.domain(data.map(function(d) {
        //     if ((d.Campaign).toLowerCase() !== "unknown") {
        //         var formatDate = d["Click Date"].split("/");

        //         return x(d3.time.format('%b %d')(new Date(formatDate[2], formatDate[1], formatDate[0])));
        //         //return d.Age;
        //     }
        // }));
        x.domain(data.map(function(d) {
            if (d.Clicked == "Clicked") {
                var formatDate = d["Click Date"].split("/");

                return x(d3.time.format('%b %d')(new Date(formatDate[2], formatDate[1], formatDate[0])));
            }

        }));
        // y.domain(d3.extent(data, function(d) {
        //     debugger;
        //     //if (d.Clicked == "Clicked")
        //     // lineArr.forEach(function(result, i) {
        //     //     return this.campaignCount;
        //     // })
        //     return d.Age;

        // }));
        y.domain(lineArr.map(function(d) {
            return d.campaignCount;
        }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Count Clicked");

        svg.append("path")
            .datum(filteredData)
            .attr("class", "line")
            .attr("d", line)
            .style({ "stroke": "steelblue", "stroke-width": "1.5px", "fill": "none" });
    });

    var lineArr = [];

    function type(d) {
        d.Age = +d.Age;

        if (d.Clicked === "Clicked" && (d.Campaign).toLowerCase() !== "unknown") {
            lineArr.push({
                "Campaign": d.Campaign,
                "Click_Date": d["Click Date"],
                "campaignCount": ''
            });
        }

        return d;
    }

    function getCount(array) {
        var count = {};
        debugger;
        array.forEach(function(a) {
            count[a.Campaign] = (count[a.Campaign] || 0) + 1;
        });
        return Object.keys(count).map(function(k) {
            return { Campaign: k, campaignCount: +count[k] };
        });
    }


})();