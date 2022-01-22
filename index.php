<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Tribbble</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
  </head>
  <body>
    <h1>Tribbble - Feedback Generator</h1>

    <details open>
    <summary><h2>Step 1) Enter Feedback Comments</h2></summary>
    <p><input type="checkbox" id="autogen" onclick="autogenToggle();"> <label for="autogen">Enable Live Updates</label></p>
    <textarea contenteditable="true" oninput="" id="tribbbs"></textarea>
    <p><input type="button" id="humangen" value="Generate Comments" onclick="tribbbulate();"></p>
   </details>

    <h2>Step 2) Select Comments</h2>
    <p><input type="range" id="numcols" min=1 max=10 value=2 oninput="columnate()"> <label for="numcols">How Many Columns: <span id="howmanycols">2</span></label></p>
    <div id='comments' onclick="generateFeedback()"></div>

    <h2>Step 3) Copy &amp; Paste Feedback</h2>
    <p><input type="checkbox" id="autocopy"> <label for="autocopy">Enable One Click Copy</label></p>
    <div contenteditable="true" id='feedback' onclick="autoCopyMaybe(this)"></div>

  </body>
</html>
