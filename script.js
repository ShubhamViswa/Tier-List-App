let currentDraggedItem;

const tierInput = document.getElementById("tier");

const submitBtn = document.getElementById('submit');

const tierList = document.querySelectorAll('.tier-list');

tierList.forEach(setupDropZoneInTierList);

const itemContainers = document.querySelectorAll('.item-container');

itemContainers.forEach(itemContainer => {
    setUpItemContainerForDrag(itemContainer);
});



function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart', (event)=> {
        console.log('Started Dragging');
        // console.log(event.target.parentNode);
        currentDraggedItem = event.target.parentNode;
    })

    itemContainer.addEventListener('dblclick' , (event)=>{
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    })

}
submitBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    if(tierInput.value === ""){
        alert('Please Enter a tier Name')
        return 
    }

    createTierList(tierInput.value);
    tierInput.value ="";
})

function createTierList(tierListName){
    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading = document.createElement('h1');
    heading.textContent = tierListName;

    const tierListItem = document.createElement('div');
    tierListItem.classList.add('tier-list-item');

    newTierList.appendChild(heading);
    newTierList.appendChild(tierListItem);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);

    setupDropZoneInTierList(newTierList);

}

// Manipulation Image Form
const imageItem = document.getElementById('image-item');

const submitImageBtn = document.getElementById('submit-image');

submitImageBtn.addEventListener('click' , (event)=> {
    event.preventDefault();
    if(imageItem.value === ''){
        alert("Please Give the ImageURL")
    }
    createNonTierItem(imageItem.value);
    imageItem.value ='';
})

function createNonTierItem(imageURL){
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('item-container');

    imgDiv.setAttribute('draggable', 'true');

    const img = document.createElement('img');
    img.src = imageURL;

    setUpItemContainerForDrag(imgDiv);

    imgDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');

    nonTierSection.appendChild(imgDiv);
}

function setupDropZoneInTierList(tierList){
    tierList.addEventListener('drop', (event)=>{
        event.preventDefault();
        });
        tierList.addEventListener('dragover', function (event) {
            console.log('dragged over a drop zone');
            // console.log("event coming up", event)
            if(this !== currentDraggedItem.parentNode){
                this.appendChild(currentDraggedItem);
            }
            // event.target.appendChild(currentDraggedItem);
        });
}