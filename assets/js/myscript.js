
const url = 'https://api.mediehuset.net/sdg/goals'

goalList();

async function fetchData(url){
    try {
        const response = await fetch(url)
        const result = await response.json()
        return result
    }
    
    catch(err) {
        console.error(err)
    }
}

async function goalList(){
    
    const data = await fetchData('https://api.mediehuset.net/sdg/goals')
    console.log(data)
    data.items.map(item => {
        const listwrapper = document.querySelector('.listwrapper')

        const goalwrapper = document.createElement('div')
        goalwrapper.classList.add('goalwrapper')
        let svgicon = document.createElement('div')
        let siteheader = document.createElement('h2')
        goalwrapper.style.backgroundColor = `#${item.color}`
        siteheader.innerText = item.title
        svgicon.innerHTML = item.icon
        svgicon.children[0].style.fill = 'white'
        goalwrapper.append(siteheader, svgicon)
        
        goalwrapper.addEventListener('click', () =>{
            goalDetails(item.id)
        })
        
        listwrapper.append(goalwrapper)
    })
}

const goalDetails = async (goal_id) => {
    const data = await fetchData(`https://api.mediehuset.net/sdg/goals/${goal_id}`)
    let detailwrapper = document.querySelector('.detailwrapper')
    detailwrapper.innerHTML = ''
    let description = document.createElement('p')
    description.innerText = `${data.item.byline}`
    let colorhex = document.createElement('p')
    colorhex.innerText = data.item.color
    let img = document.createElement('img')
    img.src = `${data.item.image}`
    let detailTitle = document.createElement('h2')
    detailTitle.innerText = `${data.item.title}`
    let detailIcon = document.createElement('div')
    detailIcon.innerHTML = data.item.icon
    detailIcon.children[0].style.fill = 'white'
    img.src = data.item.image

    const button = document.createElement('button')
    button.innerText = 'close'
    button.addEventListener('click', () =>{
        detailwrapper.classList.toggle('active')
    })
    detailwrapper.append(img, detailTitle, description, colorhex, detailIcon,)
    detailwrapper.classList.toggle('active')


}



