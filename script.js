let cantidadTitulos;
let datosArray = [];

const agregarDato = () => {
  cantidadTitulos = document.getElementsByClassName("dato").length + 1;

  const dato = document.createElement("div");
  dato.className = "dato";

  const inputLeyenda = crearInput(
    "text",
    "serie",
    "Titulo Cantidad " + cantidadTitulos
  );
  const inputValor = crearInput(
    "text",
    "valor",
    "Cantidad o Valor " + cantidadTitulos
  );

  dato.appendChild(inputLeyenda);
  dato.appendChild(inputValor);
  document.getElementById("datos").appendChild(dato);
};

const crearInput = (type, className, placeholder) => {
  const input = document.createElement("input");
  input.type = type;
  input.className = className;
  input.placeholder = placeholder;
  return input;
};

const cargarGrafico = () => {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
};

const drawChart = () => {
  datosArray = [];

  const datos = document.getElementById("datos").getElementsByTagName("input");

  for (let i = 0; i < datos.length; i++) {
    if (datos[i].value === "") {
      alert("Complete todos los campos !!!");
      return;
    }
  }

  datosArray.push(["Gráfico", ""]);

  for (let i = 0; i < datos.length; i += 2) {
    const t = [datos[i].value, parseInt(datos[i + 1].value)];
    datosArray.push(t);
  }

  const data = google.visualization.arrayToDataTable(datosArray);

  const options = {
    title: document.getElementById("titulo").value,
    width: 600,
  };

  const chartType =
    document.getElementById("tipo").value === "circular"
      ? "PieChart"
      : "ColumnChart";
  const chart = new google.visualization[chartType](
    document.getElementById("piechart")
  );
  chart.draw(data, options);
};
