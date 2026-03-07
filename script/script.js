const btnContainer = document.getElementById("allBtnContainer");
const openIssueContainer = document.getElementById("open-issues-container");
const closedIssueContainer = document.getElementById("closed-issues-container");

// btn select
// btnContainer.addEventListener("click", (e) => {
//     console.log(e.target);
//     if (e.target.localName === "button") {
//         const buttons = document.querySelectorAll(".btn-nav");
//         buttons.forEach(btn => {
//             btn.classList.remove("btn-primary")
//         })
//         e.target.classList.add("btn-primary")

//     }

//     // selected tabs show cards
//     if (e.target.innerText === "All") {
//         allIssueContainer.classList.remove("hidden")
//         openIssueContainer.classList.add("hidden")
//         closedIssueContainer.classList.add("hidden")

//         updateIssueCount(allIssueContainer)
//     }

//     if (e.target.innerText === "Open") {
//         allIssueContainer.classList.add("hidden")
//         openIssueContainer.classList.remove("hidden")
//         closedIssueContainer.classList.add("hidden")

//         updateIssueCount(openIssueContainer)
//     }

//     if (e.target.innerText === "Closed") {
//         allIssueContainer.classList.add("hidden")
//         openIssueContainer.classList.add("hidden")
//         closedIssueContainer.classList.remove("hidden")

//         updateIssueCount(closedIssueContainer)
//     }
// })

btnContainer.addEventListener("click", async (e) => {
    if(e.target.localName !== "button") return;

    const buttons = document.querySelectorAll(".btn-nav");
    buttons.forEach(btn => btn.classList.remove("btn-primary"));
    e.target.classList.add("btn-primary");

    const tab = e.target.innerText;

    managespinner(true); // spinner ON

    // allow browser to render spinner
    await new Promise(resolve => setTimeout(resolve, 0));

    // fetch all issues
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();

    displayAllIssue(data.data); // this will populate all, open, closed containers

    // show relevant container
    if(tab === "All"){
        allIssueContainer.classList.remove("hidden");
        openIssueContainer.classList.add("hidden");
        closedIssueContainer.classList.add("hidden");
        updateIssueCount(allIssueContainer);
    } else if(tab === "Open"){
        allIssueContainer.classList.add("hidden");
        openIssueContainer.classList.remove("hidden");
        closedIssueContainer.classList.add("hidden");
        updateIssueCount(openIssueContainer);
    } else if(tab === "Closed"){
        allIssueContainer.classList.add("hidden");
        openIssueContainer.classList.add("hidden");
        closedIssueContainer.classList.remove("hidden");
        updateIssueCount(closedIssueContainer);
    }

    managespinner(false); // spinner OFF
});

// issuCount

// const allIssueContainer = document.getElementById("all-issues-container");

const managespinner = status => {
    if (status == true) {
        document.getElementById("spinner")
            .classList.remove("hidden")
        document.getElementById("issue-container")
            .classList.add("hidden")
    } else {
        document.getElementById("issue-container")
            .classList.remove("hidden")
        document.getElementById("spinner")
            .classList.add("hidden")
    }
}

const loadAllIssue = async () => {
    managespinner(true)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url);
    const data = await res.json();
    displayAllIssue(data.data);
    managespinner(false);
}
const allIssueContainer = document.getElementById("all-issues-container");
allIssueContainer.innerHTML = "";

const allIssueCount = document.getElementById("issueCount");

const calculateCount = () => {
    allIssueCount.innerText = allIssueContainer.children.length;
}

// update issue count
const updateIssueCount = (container) => {
    const count = container.children.length;
    document.getElementById("issueCount").innerText = count;
}

const displayAllIssue = (issues) => {
    //empty all container
    allIssueContainer.innerHTML = ""
    openIssueContainer.innerHTML = ""
    closedIssueContainer.innerHTML = ""

    // count calculate
    const openCount = issues.filter(issue => issue.status === "open").length
    const closedCount = issues.filter(issue => issue.status === "closed").length


    issues.forEach(issue => {
        console.log(issue)
        const card = document.createElement("div");
        card.innerHTML = `
        <div onclick="loadIssueDetail(${issue.id})" class="bg-white rounded-xl p-5 border-t-4 ${issue.status === "open" ? "border-t-green-500" : "border-t-purple-500"} space-y-4">
                    <div class="flex justify-between">
                        ${issue.status === "open" ? '<img class="w-8" src="./assets/Open-Status.png" alt=""></img>' :
                '<img class="w-8" src="./assets/Closed- Status .png" alt="">'}
                        <p class="px-3 py-1 rounded-lg font-medium border 
                            ${issue.priority === "high" ? 'bg-red-100 border-red-400 text-red-600' :
                issue.priority === "medium" ? 'bg-yellow-100 border-yellow-400 text-yellow-600' :
                    'bg-gray-300 border-gray-400 text-gray-700'}">
                            ${issue.priority}
                         </p>
                    </div>
                    <h1 class="text-2xl font-semibold">${issue.title}</h1>
                    <p class="text-lg font-medium text-gray-400">${issue.description}</p>
                    <div class="inline-block space-y-2 md:flex gap-3 items-center ">
                        <p
                            class="bg-red-100 text-red-500 font-medium text-xl px-2 py-1 rounded-lg border border-red-500">
                            ${issue.labels[0]}</p>
                        <p
                            class="${issue.labels[1] ? 'bg-yellow-100' : 'bg-white'} text-yellow-500 font-medium text-xl px-2 py-1 rounded-lg ${issue.labels[1] ? 'border border-yellow-500' : 'border-none'}">
                            ${issue.labels[1] ? issue.labels[1] : ''}</p>
                    </div>
                    <br>
                    <hr class="text-gray-300"><br>
                    <p class="text-gray-400">${issue.author}</p>
                    <p class="text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>

                </div>


        `
        // append all card
        allIssueContainer.append(card)

        // append open card
        if (issue.status === "open") {
            const openCard = card.cloneNode(true);
            openIssueContainer.append(openCard);
        }

        // append closed card
        if (issue.status === "closed") {
            const closedCard = card.cloneNode(true);
            closedIssueContainer.append(closedCard);
        }
    });
    calculateCount();
    updateIssueCount(allIssueContainer);
}

const loadIssueDetail = async (id) => {
    managespinner(true)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetails(details.data);
    managespinner(false)
}
const displayIssueDetails = (issue) => {
    console.log(issue)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <div class="bg-white rounded-xl p-5 space-y-4">
                    <div class="flex justify-between">
                        ${issue.status === "open" ? `<p class="font-medium text-xl px-2 py-1 bg-green-400 rounded-lg">${issue.status}</p>` :
                `<p class="font-medium text-xl px-2 py-1 bg-red-400 rounded-lg">${issue.status}</p>`}
                        <p class="px-3 py-1 rounded-lg font-medium border 
                            ${issue.priority === "high" ? 'bg-red-100 border-red-400 text-red-600' :
                issue.priority === "medium" ? 'bg-yellow-100 border-yellow-400 text-yellow-600' :
                    'bg-gray-300 border-gray-400 text-gray-700'}">
                            ${issue.priority}
                         </p>
                    </div>
                    <h1 class="text-2xl font-semibold">${issue.title}</h1>
                    <p class="text-lg font-medium text-gray-400">${issue.description}</p>
                    <div class="inline-block space-y-2 md:flex gap-3 items-center ">
                        <p
                            class="bg-red-100 text-red-500 font-medium text-xl px-2 py-1 rounded-lg border border-red-500">
                            ${issue.labels[0]}</p>
                        <p
                            class="${issue.labels[1] ? 'bg-yellow-100' : 'bg-white'} text-yellow-500 font-medium text-xl px-2 py-1 rounded-lg ${issue.labels[1] ? 'border border-yellow-500' : 'border-none'}">
                            ${issue.labels[1] ? issue.labels[1] : ''}</p>
                    </div>
                    <br>
                    <hr class="text-gray-300"><br>
                    <p class="text-gray-400">${issue.author}</p>
                    <p class="text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>

                </div>


        `;
    document.getElementById("my_modal_5").showModal()
}

loadAllIssue()