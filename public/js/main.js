(() => {
  // <stdin>
  var fixedLayoutDivs = document.querySelectorAll(".table_layoutfixed");
  fixedLayoutDivs.forEach((div) => {
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== "TABLE") {
      nextTable = nextTable.nextElementSibling;
    }
    if (nextTable) {
      nextTable.style.tableLayout = "fixed";
    }
  });
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
  var baselineDivs = document.querySelectorAll(".table_baseline");
  baselineDivs.forEach((div) => {
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== "TABLE") {
      nextTable = nextTable.nextElementSibling;
    }
    if (nextTable) {
      const tds = nextTable.querySelectorAll("td");
      tds.forEach((td) => {
        td.style.verticalAlign = "baseline";
      });
    }
  });
})();
