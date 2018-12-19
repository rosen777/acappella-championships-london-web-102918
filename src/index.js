// Global variables
const apiURL = 'http://localhost:3000/a_cappella_groups'
const groupTableEl = document.querySelector('#table-body')
const winnerEl = document.querySelector('#winner')
const collegeHeader = document.querySelector('#college_header')
const groupHeader = document.querySelector('#group_header')
const membershipHeader = document.querySelector('#membership_header')
const divisionHeader = document.querySelector('#division_header')
const winnerHeader = document.querySelector('#winner_header')
const deleteHeader = document.querySelector('#delete_header')


const fetchGroups = () => {
  fetch(apiURL)
  .then(response => response.json())
  .then(renderGroups)
}

const renderGroups = (groupsArray) => {
  console.log(groupsArray)
  groupsArray.forEach(renderSingleGroup)
}

const renderSingleGroup = (group) => {

  const groupEl = document.createElement('tr')
  let winnerRowEl = document.createElement('tr')
  groupEl.innerHTML = `<tr class>
  <td class='college_column'>${group.college.name}</td>
  <td class='name_column'>${group.name}</td>
  <td class='membership_column'>${group.membership}</td>
  <td class='group_column'>${group.college.division}</td>
  <td class='winner_column'><img class='winner_button' src='./assets/trophy.png'}'></td>
  <td class='padding center'><button id='delete_button' data-id=${group.id}>Delete</button>
  </tr>`
  groupTableEl.append(groupEl)

  const winnerButton = groupEl.querySelector('.winner_button')
  winnerButton.addEventListener('click', (e) => {
    const hiddenRow = document.querySelector('.hidden')
    if(hiddenRow) { hiddenRow.className = '' }
    winnerEl.innerHTML = `Winner: ${group.name}`
    // winnerRowEl = groupEl
    // groupEl.remove()

    groupEl.className = 'hidden'
    // groupTableEl.appendChild(winnerRowEl)
  })

  const deleteButton = groupEl.querySelector('#delete_button')

  deleteButton.addEventListener('click', (e) => {
      fetch(apiURL + "/" + group.id, {
        method: 'DELETE'
      }).then(() => {
        groupEl.remove()
      })
  })

}

// collegeHeader.addEventListener('click', (e) => sortColumns)
//
// const sortColumns = (e) => {
//
//   console.log('Test')
// }
//
// console.log(collegeHeader)
//
// groupHeader.addEventListener('click', (e) => sortColumns)
// membershipHeader.addEventListener('click', (e) => sortColumns)
// divisionHeader.addEventListener('click', (e) => sortColumns)
// winnerHeader.addEventListener('click', (e) => sortColumns)

fetchGroups()
