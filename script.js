var tribbbsElm  = document.getElementById("tribbbs");
var autogenElm  = document.getElementById("autogen");
var autocopyElm = document.getElementById("autocopy");
var humangenElm = document.getElementById("humangen");
var commentsElm = document.getElementById("comments");
var feedbackElm = document.getElementById("feedback");
var numcolsElm  = document.getElementById("numcols");
var howmanycolsElm = document.getElementById("howmanycols");

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function safeQuote(str) {
  return String(str).replace(/"/g, '&quot;')
}

function loadTribbbs() {
  if (localStorage.tribbbs) {
    tribbbsElm.value = localStorage.tribbbs;
    tribbbsElm.style.height = (tribbbsElm.scrollHeight+10)+'px';
    numcolsElm.value = localStorage.numcols;
    howmanycolsElm.innerHTML = localStorage.numcols;
    tribbbulate();
  }
}

function tribbbulate() {
  let lines = tribbbsElm.value.trim();
  if (lines == "") {
    localStorage.clear('tribbbs');
    return;
  }
  localStorage.tribbbs = lines;
  lines = lines + "\n";
  lines = lines.split("\n");
  let groups = [];
  let group = [];
  lines.forEach(function(v,i) {
    if (v.trim() == '') {
      if (group.length > 0) {
        groups.push(group);
        group=[];
      }
    } else {
      group.push(v);
    }
  });
  let comments = '';
  groups.forEach(function(group,g) {
    v = htmlEntities(group[0]);
    comments += `<fieldset><legend>${v}</legend>`;
    for(c=1; c<group.length; c++) {
      v = htmlEntities(group[c]);
      comments += `<input type="checkbox" name="G-${g}" id="G-${g}-${c}" value="${v}"><label for="G-${g}-${c}">${v}</label>`;
    }
    comments += "</fieldset>";
  });
  commentsElm.innerHTML = comments;
}

function columnate() {
  howmanycolsElm.innerHTML = numcolsElm.value;
  localStorage.numcols = numcolsElm.value;
  comments.style.gridTemplateColumns = `repeat(${numcolsElm.value}, 1fr)`;
}

function generateFeedback() {
  let feedback = "";
  let fieldsets = document.querySelectorAll("#comments fieldset");
  for (let f=0; f<fieldsets.length; f++) {
    let selected = fieldsets[f].querySelectorAll("input[type=checkbox]:checked");
    selected.forEach(function(s,i) {
      feedback += htmlEntities(s.value) + "\n";
    });
    if (selected.length > 0) {
      feedback += "\n";
    }
  }
  feedbackElm.innerHTML = feedback.trim();
}

function autogenToggle() {
    humangenElm.disabled = autogen.checked;
    if (autogenElm.checked) {
      tribbbsElm.addEventListener("input",tribbbulate);
    } else {
      tribbbsElm.removeEventListener("input",tribbbulate);
    }
}

function autoCopyMaybe(thisP) {
  if (autocopyElm.checked) {
    navigator.clipboard.writeText(thisP.innerHTML).then(() => alert('Copied to Clipboard!'))
  }
}

window.onload = function() {
  placeholder = `
[ Good Git ]
Good commit frequency with helpful messages.

[ Also Git ]
Commit frequency is good, make sure that messages are more descriptive.
Commit frequency is a little low but your messages are descriptive.
Careful not to over commit, not every save point needs to be a commit point.

[ HTML Basics ]
Use more modern semantic elements, eg <articles>s, over generic <div>s so that AI can understand and rank your page content better.
There is a little bit of contrast issues here and there, especially in the footer.
Make sure all six of your headings are larger than the main text and each other in ascending rank.
Try not to used centered text for paragraphs, this is ok for headings and blockquotes, instead use normal alignment or justified alignment.
Quick tip: body { margin: 0px; } removes the small space around the window / page borders.

[ Content Basics ]
Your page is a little text heavy, it will benefit from a mix of images and text.
Web-fonts are missing, you are relying on the user to have the system fonts you have chosen installed.
Make sure that your headings are "more fancy" than the main text.
Watch out for the footer styling, it is blending into the previous (main) content.

[ CSS Basics ]
Make sure that the focus and hover states match, ie use the LoVe HAte F rule.
Navigation is over padded, reduce it in proportion to the content, real estate at the top of the screen is quite valuable.
Seats area is under-developed with just images showing, tell us a little more about the seats near the seats.
Customers do not need to see the seat code in the table, that is more "office use only" content.
Cards are flipping but are not adapting to smaller and larger screens as per the spec.

[ Layout + Design ]
Layout and design is at a very early stage.
Both vertical and horizontal alignment needs attention.
In smaller screens, sacrifice the margin before the content, your form has a percentage left / right margin that leads to a premature crushing of content, eg reflowing radio buttons, instead use a max width and rely on a small left / right padding.
Booking buttons do not contain <a> elements, ie hyperlinks, with ?movie=XXX on the end, ie a get header.

[ Form ]
Form fields should have clickable labels and there is a bit of strange vertical alignment offset.
Make sure fields are padded and sized in proportion to their labels.
Radio buttons are unstyled and do not match the spec. Have another look at the workshops where this was covered step by step.
Movie code field should be hidden.
HTML input attributes are not used to control blank or out of range fields.

[ Big Box Stuff ]
Overall you have chosen some vibrant and attractive colors, experimented with gradients, a few more content images would help to engage customers.
Not too much to fix for assignment 3, just make sure vertical and horizontal alignment issues are addressed and label / field sizing is a bit strange, padding and extra width always help with accessibility.

[ Big Box Emergency ]
Assignment 2 has a strong programming focus, contact your tutor if you need assistance getting your index and booking pages ready for assignment 3 work.
Layout definitely needs attention and a review of the assignment requirements are in order.
  `;
  placeholder = placeholder.trim();
  tribbbsElm.placeholder = placeholder;
  loadTribbbs();
  columnate();
}
