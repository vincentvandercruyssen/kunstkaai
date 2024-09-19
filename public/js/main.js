(() => {
  // <stdin>
  var centerTextDivs = document.querySelectorAll(".table_centertext");
  centerTextDivs.forEach((div) => {
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== "TABLE") {
      nextTable = nextTable.nextElementSibling;
    }
    if (nextTable) {
      const tds = nextTable.querySelectorAll("td");
      tds.forEach((td) => {
        td.style.textAlign = "center";
      });
    }
  });
})();
