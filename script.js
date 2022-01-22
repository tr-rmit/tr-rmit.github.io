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
  `;
  placeholder = placeholder.trim();
  tribbbsElm.placeholder = placeholder;
  loadTribbbs();
  columnate();
}
