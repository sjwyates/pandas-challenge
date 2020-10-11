let content = document.getElementById('content')

content.innerHTML = text

const captions = {
    players: "Number of Players",
    purchasing: "Purchasing Analysis",
    genderDemos: "Gender Demographics",
    genderAnalysis: "Purchasing Analysis (Gender)",
    ageDemos: "Age Demographics",
    ageAnalysis: "Purchasing Analysis (Age)",
    topSpenders: "Top Spenders",
    popularItems: "Most Popular Items",
    profitableItems: "Most Profitable Items"
}

let tables = content.querySelectorAll('table')
tables.forEach(table => {
    table.classList.add('table', 'table-sm', 'table-striped')
    table.classList.remove('dataframe')
    table.removeAttribute('border')
})

let tableContainers = content.querySelectorAll('.table-container')
tableContainers.forEach(tableContainer => {
    let id = tableContainer.id
    let caption = document.createElement('h4')
    caption.innerHTML = captions[id]
    caption.classList.add('h4')
    let table = tableContainer.firstChild
    tableContainer.insertBefore(caption, table)
})

let heads = content.querySelectorAll('thead')
heads.forEach(head => head.classList.add('table-primary'))

let headers = content.querySelectorAll('th')
headers.forEach(header => header.scope = 'col')