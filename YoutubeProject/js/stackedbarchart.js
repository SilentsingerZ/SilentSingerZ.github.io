/*eslint no-undef: 0*/

function createChart (svg, data) {

  const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']

  svg = d3.select(svg)
  const margin = {top: 30, right: 30, bottom: 30, left: 90}
  const width = 760 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)

  var x1 = d3.scaleBand()
    .padding(0.05)

  var y = d3.scaleLinear()
    .rangeRound([height, 0])

  var z = d3.scaleOrdinal()
    .range(colors)

  // check each subset of data for possible sections, since not all subsets have every possible section.
  let nameKeys = data[Object.keys(data)[0]].map(obj =>obj.name)
  let valueKeys =   ["CA", "DE", "FR", "GB", "US"]

    //fill in empty data entries
    Object.keys(data).forEach((d)=>{
      data[d].forEach(section=>{
        valueKeys.forEach(k=>{
          if (section.values[k] === undefined) section.values[k] = 0
        })
      })
    })

  x0.domain(nameKeys)
  x1.domain(valueKeys).rangeRound([0, x0.bandwidth()])

  const barContainer = g.append('g')

  const xAxis = g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0))

  const yAxis = g.append('g')
      .attr('class', 'axis')

  yAxis
    .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Prop Value')

  var legend = g.append('g')
  .attr('font-size', 10)
  .attr('text-anchor', 'end')

  legend.append('text')
  .text('Different Country')
  .attr('x', width + 31)
  .style('font-weight', 'bold')
  .attr('dy', -10)
  .attr('dx', 20)

  var legendEnter = legend
    .selectAll('g')
    .data(valueKeys)
    .enter().append('g')
      .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')' })

  legendEnter.append('rect')
      .attr('x', width + 31)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z)

  legendEnter.append('text')
      .attr('x', width + 26)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d)

  const stack = d3.stack()
      .keys(valueKeys)

  // updates both the year + the chart type (group or stacked)
  function updateChart (data, chartType='group') {

    // ========================================================
    //  show grouped view
    // ========================================================

    if (chartType === 'group'){

      //find max value of a section
      const maxValue = d3.max(data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []))
      y.domain([0, maxValue]).nice()

      yAxis.transition()
      .call(d3.axisLeft(y))

      const barsWithData = barContainer
      .selectAll('g')
      .data(data)

      barsWithData.exit().remove()

      const bars = barsWithData
      .enter()
      .append('g')
      .attr('transform', function (d) { return 'translate(' + x0(d.name) + ',0)' })
      .merge(barsWithData)
      .selectAll('rect')
      .data(function (d) {
        return Object.keys(d.values).map(k => ({ key: k, value: d.values[k] }))
      })

      bars.exit().transition().style('opacity', 0).remove()

      bars
      .enter()
      .append('rect')
      .attr('fill', function (d) {
        return z(d.key)
      })
      // start y at height (0) so animation in looks like bars are growing upwards
      .attr('y', height)
      .merge(bars)
      .transition()
      .attr('width', x1.bandwidth())
      .attr('x', function (d) { return x1(d.key) })
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value))

    }

    // ========================================================
    //  show stacked view
    // ========================================================
    else if (chartType === 'stack'){

      //find max value of a section
      const maxValue = d3.max(
        data.map((d) => Object.values(d.values))
      .map((valueArray)=>{
        return valueArray.reduce((a,b)=> a+ b)
      })
    )

      y.domain([0, maxValue]).nice()

      yAxis.transition()
      .call(d3.axisLeft(y))

      //add data for missing bars
      const seriesFlipped = stack(data.map(d=>{
        const defaultData = {}
        valueKeys.forEach(k=> defaultData[k] = 0)
      return Object.assign(defaultData, d.values)
      }))

      const series = []
      //need to reorient the series
      //we want a list of groups, not a list of rects from each level
      seriesFlipped[0].forEach((col, i)=>{
        const arr = []
        seriesFlipped.forEach((row, index2)=>{
          //mimic the key from the grouped data format
          row[i].key = index2 + 1 + ''
          arr.push(row[i])
        })
        series.push(arr)
      })

      const barSections = barContainer
      .selectAll('g')
      .data(series)

      const bars = barSections
      .enter()
      .append('g')
      .merge(barSections)
      .attr('transform', (d,i)=> {console.log(x0(nameKeys[i])); return 'translate(' + x0(nameKeys[i]) + ',0)'} )
      .selectAll('rect')
      .data(d=>d, (d)=> d.key)

      const enterBars = bars.enter().append('rect')
      .attr('fill',  (d)=> z(d.key))
      bars.exit().transition().style('opacity', 0).remove()

      enterBars
      .merge(bars)
      .transition()
      .delay((d,i)=> i * 50)
      .attr('width', x0.bandwidth())
      .attr("y", function(d) {return y(d[1]) })
      .attr("x", 0)
      .attr("height", function(d) { return y(d[0]) - y(d[1]) })

    }

  }


  return {
    updateChart
  }
}

d3.json('https://raw.githubusercontent.com/SilentsingerZ/SilentSingerZ.github.io/master/YoutubeProject/data/data_Freddie.json', function(error, data){

  //start with the first year selected
  const chart = createChart(document.querySelector('svg'), data)

  // append the input controls
  const fieldset1 = d3.select('.controls').append('fieldset')
  fieldset1.append('legend').text('Year')

  Object.keys(data).forEach((year, index )=>{

    const label = fieldset1.append('label')

    label
    .append('input')
    .attr('type', 'radio')
    .attr('name', 'year')
    .attr('value', year)
    .attr('checked', function(){
      if (index === 0) return true
      return null
    })

    label.append('span')
    .text(year)

    label.on('click', function(){
      chart.updateChart(data[year], document.querySelector('input[name="graphType"]:checked').value)
    })
  })

  const fieldset2 = d3.select('.controls').append('fieldset')
  const types =  ['group', 'stack']
  fieldset2.append('legend').text('Graph Layout')

  types.forEach((graphType, index)=>{
    const label = fieldset2.append('label')
    label.append('input')
    .attr('type', 'radio')
    .attr('name', 'graphType')
    .attr('value', graphType)
    .attr('checked', function(){
      if (index === 0) return true
      return null
    })
    .on('click', ()=>{
      chart.updateChart(data[document.querySelector('input[name="year"]:checked').value], graphType)
    })

    label.append('span')
    .text(graphType)

  })

  // render initial chart
  chart.updateChart(data[Object.keys(data)[0]])

})
