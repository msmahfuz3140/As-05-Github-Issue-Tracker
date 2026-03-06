const btnContainer = document.getElementById("allBtnContainer")

// btn select
btnContainer.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.localName === "button") {
        const buttons = document.querySelectorAll(".btn-nav");
        buttons.forEach(btn => {
            btn.classList.remove("btn-primary")
        })
        e.target.classList.add("btn-primary")
    }
})

// issuCount

// const allIssueContainer = document.getElementById("all-issues-container");



const loadAllIssue = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url);
    const data = await res.json();
    displayAllIssue(data.data);
}
const allIssueContainer = document.getElementById("all-issues-container");
allIssueContainer.innerHTML = "";

const allIssueCount = document.getElementById("issueCount");

const calculateCount = () => {
    allIssueCount.innerText = allIssueContainer.children.length;
}
const displayAllIssue = (issues) => {
    // get the container


    issues.forEach(issue => {
        console.log(issue)
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl p-5 border-t-4 ${issue.status === "open" ? "border-t-green-500" : "border-t-purple-500"} space-y-4">
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
                    <div class="flex gap-3 items-center">
                        <p
                            class="bg-red-100 text-red-500 font-medium text-xl px-2 py-1 rounded-lg border border-red-500">
                            ${issue.labels[0]}</p>
                        <p
                            class="${issue.labels[1] ? 'bg-yellow-100' : 'bg-white'} text-yellow-500 font-medium text-xl px-2 py-1 rounded-lg ${issue.labels[1] ? 'border border-yellow-500' : 'border-none'}">
                            ${issue.labels[1] ? issue.labels[1] : ''}</p>
                    </div>
                    <br>
                    <hr class="text-gray-300"><br>
                    <p class="text-gray-400">#1by john_doe</p>
                    <p class="text-gray-400">1/15/2024</p>

                </div>


        `
        allIssueContainer.append(card)
    });
    calculateCount();

}

loadAllIssue()