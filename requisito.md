  Cada requisito → el comando que lo prueba

  # ── Requisito: "--file (o -f): ruta del archivo. Obligatorio"
  node analizar.js --file texto.txt      # forma larga
  node analizar.js -f texto.txt          # forma corta (-f)

  # ── Requisito: "reporte líneas, palabras y caracteres con styleText (coloreado)"
  node analizar.js -f texto.txt
  #   → tenés que VER en colores: Líneas: 5, Palabras: 42, Caracteres: 291

  # ── Requisito: "--output (o -o): guardar el resumen en archivo nuevo. Opcional"
  node analizar.js -f texto.txt -o resumen.txt   # crea resumen.txt
  cat resumen.txt                                # comprobás que se escribió

  # ── Requisito: "--help (o -h): muestra el uso y finaliza"
  node analizar.js --help
  node analizar.js -h

  # ── Requisito: "Si falta --file → mostrar uso y salir SIN error"
  node analizar.js                       # sin argumentos → muestra uso, no crashea

  # ── Requisito: "Todo error de lectura/escritura → try/catch, mostrado en ROJO"
  node analizar.js -f noexiste.txt       # archivo que no existe → Error en rojo