# Lab 13 — Analizador de archivos de texto

Script de línea de comandos en **Node.js** que analiza un archivo de texto y reporta
la cantidad de **líneas**, **palabras** y **caracteres**, con salida coloreada en la
terminal. Opcionalmente guarda un resumen del análisis en un archivo nuevo.

Construido con **APIs nativas de Node.js**, sin dependencias externas:

- [`parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig) (`node:util`) — parseo de argumentos.
- [`styleText`](https://nodejs.org/api/util.html#utilstyletextformat-text) (`node:util`) — color en la terminal.
- [`fs/promises`](https://nodejs.org/api/fs.html#promises-api) (`node:fs/promises`) — lectura y escritura asíncrona.

## Requisitos

- Node.js **18+** (probado en v24).

## Uso

```bash
node analizar.js --file <ruta> [--output <ruta>]
```

### Opciones

| Opción          | Alias | Descripción                                      | Obligatorio |
| --------------- | ----- | ------------------------------------------------ | ----------- |
| `--file`        | `-f`  | Ruta del archivo de texto a analizar.            | Sí          |
| `--output`      | `-o`  | Ruta del archivo donde guardar el resumen.       | No          |
| `--help`        | `-h`  | Muestra el modo de uso y finaliza.               | No          |

Si falta `--file` o se solicita `--help`, el script muestra el uso y termina **sin error**.

## Ejemplos

```bash
# Analizar un archivo e imprimir el resultado en consola
node analizar.js --file texto.txt

# Analizar y guardar el resumen en un archivo nuevo
node analizar.js -f texto.txt -o resumen.txt
```

Salida de ejemplo:

```
Analisis de: texto.txt

Lineas:     5
Palabras:   42
Caracteres: 291
```

## Cómo cuenta

- **Líneas**: solo las que tienen contenido real (ignora líneas vacías o de solo espacios).
- **Palabras**: secuencias separadas por espacios o saltos de línea.
- **Caracteres**: todos los del archivo, incluidos espacios y saltos de línea (`\n`), igual que `wc -c`.

## Manejo de errores

Cualquier error de lectura o escritura (archivo inexistente, permisos, etc.) se captura
con `try/catch` y se muestra en **rojo**, sin que el programa se rompa.

```bash
node analizar.js -f noexiste.txt
# Error: ENOENT: no such file or directory, open 'noexiste.txt'
```
