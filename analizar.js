import { parseArgs, styleText } from "node:util";
import { argv } from "node:process";
import { readFile, writeFile } from "node:fs/promises";

// Definicion de las opciones que acepta el script.
// Cada opcion declara su tipo y su forma corta (short).
const options = {
  file: { type: "string", short: "f" },
  output: { type: "string", short: "o" },
  help: { type: "boolean", short: "h" },
};

function mostrarUso() {
  console.log(styleText("cyan", "\nAnalizador de archivos de texto\n"));
  console.log("Uso:");
  console.log("  node analizar.js --file <ruta> [--output <ruta>]\n");
  console.log("Opciones:");
  console.log("  -f, --file     Ruta del archivo de texto a analizar (obligatorio)");
  console.log("  -o, --output   Ruta del archivo donde guardar el resumen (opcional)");
  console.log("  -h, --help     Muestra esta ayuda y finaliza\n");
  console.log("Ejemplos:");
  console.log("  node analizar.js --file texto.txt");
  console.log("  node analizar.js -f texto.txt -o resumen.txt\n");
}

// Calcula lineas, palabras y caracteres a partir del contenido.
function analizar(contenido) {
  // Solo contamos lineas con contenido real: ignoramos las vacias
  // y las que tienen unicamente espacios en blanco.
  const lineas = contenido
    .split("\n")
    .filter((linea) => linea.trim() !== "").length;
  const palabras = contenido.split(/\s+/).filter(Boolean).length;
  const caracteres = contenido.length;

  return { lineas, palabras, caracteres };
}

async function main() {
  const args = argv.slice(2);
  const { values } = parseArgs({ args, options });

  // Si pide ayuda o falta --file: mostrar uso y salir SIN error.
  if (values.help || !values.file) {
    mostrarUso();
    return;
  }

  try {
    const contenido = await readFile(values.file, { encoding: "utf-8" });
    const { lineas, palabras, caracteres } = analizar(contenido);

    console.log(styleText("green", `\nAnalisis de: ${values.file}\n`));
    console.log(`${styleText("yellow", "Lineas:")}     ${lineas}`);
    console.log(`${styleText("yellow", "Palabras:")}   ${palabras}`);
    console.log(`${styleText("yellow", "Caracteres:")} ${caracteres}\n`);

    // Si se pidio --output, escribimos el resumen en un archivo nuevo.
    if (values.output) {
      const resumen =
        `Analisis de: ${values.file}\n` +
        `Lineas: ${lineas}\n` +
        `Palabras: ${palabras}\n` +
        `Caracteres: ${caracteres}\n`;

      await writeFile(values.output, resumen, { encoding: "utf-8" });
      console.log(styleText("green", `Resumen guardado en: ${values.output}\n`));
    }
  } catch (error) {
    console.error(styleText("red", `Error: ${error.message}`));
  }
}

main();
