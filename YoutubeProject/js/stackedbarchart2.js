/*eslint no-undef: 0*/

function createChart2 (svg, data) {

  const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']

  svg = d3.select(svg)
  const margin2 = {top: 30, right: 30, bottom: 30, left: 90}
  const width = 760 - margin2.left - margin2.right
  const height = 400 - margin2.top - margin2.bottom
  const g = svg.append('g2').attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

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
  let nameKeys2 = data[Object.keys(data)[0]].map(obj =>obj.name)
  let valueKeys2 =   ["CA", "DE", "FR", "GB", "US"]

    //fill in empty data entries
    Object.keys(data).forEach((d)=>{
      data[d].forEach(section=>{
        valueKeys2.forEach(k=>{
          if (section.values[k] === undefined) section.values[k] = 0
        })
      })
    })

  x0.domain(nameKeys2)
  x1.domain(valueKeys2).rangeRound([0, x0.bandwidth()])

  const barContainer2 = g2.append('g2')

  const xAxis = g.append('g2')
      .attr('class', 'axis2')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0))

  const yAxis = g.append('g2')
      .attr('class', 'axis2')

  yAxis
    .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Prop value2')

  var legend = g.append('g2')
  .attr('font-size', 10)
  .attr('text-anchor', 'end')

  legend.append('text')
  .text('Different Country')
  .attr('x', width + 31)
  .style('font-weight', 'bold')
  .attr('dy', -10)
  .attr('dx', 20)

  var legendEnter = legend
    .selectAll('g2')
    .data(valueKeys2)
    .enter().append('g2')
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
      .keys(valueKeys2)

  // updates both the year + the chart2 type (group or stacked)
  function updateChart2 (data, chartType2='group') {

    // ========================================================
    //  show grouped view
    // ========================================================

    if (chartType2 === 'group'){

      //find max value2 of a section
      const maxValue = d3.max(data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []))
      y.domain([0, maxValue]).nice()

      yAxis.transition()
      .call(d3.axisLeft(y))

      const barsWithData = barContainer2
      .selectAll('g2')
      .data(data)

      barsWithData.exit().remove()

      const bars = barsWithData
      .enter()
      .append('g2')
      .attr('transform', function (d) { return 'translate(' + x0(d.name) + ',0)' })
      .merge(barsWithData)
      .selectAll('rect2')
      .data(function (d) {
        return Object.keys(d.values).map(k => ({ key: k, value2: d.values[k] }))
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
      .attr('y', d => y(d.value2))
      .attr('height', d => height - y(d.value2))

    }

    // ========================================================
    //  show stacked view
    // ========================================================
    else if (chartType2 === 'stack'){

      //find max value2 of a section
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
        valueKeys2.forEach(k=> defaultData[k] = 0)
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

      const barSections = barContainer2
      .selectAll('g2')
      .data(series)

      const bars = barSections
      .enter()
      .append('g2')
      .merge(barSections)
      .attr('transform', (d,i)=> {console.log(x0(nameKeys2[i])); return 'translate(' + x0(nameKeys2[i]) + ',0)'} )
      .selectAll('rect2')
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
    updateChart2
  }
}

d3.json('./data/data_Freddie_2.json', function(error, data){

  //start with the first year selected
  const chart2 = createChart2(document.querySelector('svg'), data)

  // append the input controls2
  const fieldset1 = d3.select('.controls2').append('fieldset')
  fieldset1.append('legend').text('Year')

  Object.keys(data).forEach((year, index )=>{

    const label = fieldset1.append('label')

    label
    .append('input')
    .attr('type', 'radio')
    .attr('name', 'year')
    .attr('value2', year)
    .attr('checked', function(){
      if (index === 0) return true
      return null
    })

    label.append('span')
    .text(year)

    label.on('click2', function(){
      chart2.updateChart2(data[year], document.querySelector('input[name="graphType"]:checked').value2)
    })
  })

  const fieldset2 = d3.select('.controls2').append('fieldset')
  const types =  ['group', 'stack']
  fieldset2.append('legend').text('Graph Layout')

  types.forEach((graphType, index)=>{
    const label = fieldset2.append('label')
    label.append('input')
    .attr('type', 'radio')
    .attr('name', 'graphType')
    .attr('value2', graphType)
    .attr('checked', function(){
      if (index === 0) return true
      return null
    })
    .on('click2', ()=>{
      chart2.updateChart2(data[document.querySelector('input[name="year"]:checked').value2], graphType)
    })

    label.append('span')
    .text(graphType)

  })

  // render initial chart2
  chart2.updateChart2(data[Object.keys(data)[0]])

})
