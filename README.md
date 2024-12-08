# CalcuPromedioCURN

## Descripción

CalcuPromedioCURN es una aplicación web simple y eficiente diseñada para ayudar a los estudiantes de la CURN (Corporación Universitaria Rafael Núñez) a calcular sus promedios de notas y el Promedio Ponderado Semestral (PPS). Esta herramienta permite a los usuarios ingresar las notas de sus asignaturas, calcular las notas finales y el PPS de manera rápida y precisa.

## Características

- Cálculo de notas finales por asignatura
- Cálculo del Promedio Ponderado Semestral (PPS)
- Interfaz de usuario intuitiva y fácil de usar
- Almacenamiento local de datos para acceso rápido y sin conexión
- Diseño responsive que se adapta a dispositivos móviles y de escritorio

## Cómo usar

1. Abra el siguiente link de [CalcuPromedioCURN](https://calcupromediocurn.netlify.app/) en su navegador web.
2. Complete el formulario con la información de cada asignatura:
   - Nombre de la asignatura
   - Número de créditos
   - Notas parciales (OEP, EEP, OES, EES, OEF, EEF)
3. Haga clic en "Agregar Asignatura" para incluirla en la lista.
4. Repita los pasos 2 y 3 para todas sus asignaturas.
5. El PPS se calculará y actualizará automáticamente con cada nueva asignatura añadida.
6. Para eliminar una asignatura, haga clic en el botón "Eliminar" correspondiente.

## Fórmula de cálculo

La nota final de cada asignatura se calcula utilizando la siguiente ponderación:

- OEP (Otras Evaluaciones Primer Parcial): 13.5%
- EEP (Examen Escrito Primer Parcial): 16.5%
- OES (Otras Evaluaciones Segundo Parcial): 13.5%
- EES (Examen Escrito Segundo Parcial): 16.5%
- OEF (Otras Evaluaciones Final): 14%
- EEF (Examen Escrito Final): 26%

El PPS se calcula sumando el producto de cada nota final por sus créditos correspondientes y dividiendo por el total de créditos.

## Almacenamiento de datos

La aplicación utiliza el almacenamiento local del navegador (localStorage) para guardar los datos de las asignaturas. Esto permite que la información persista entre sesiones y esté disponible sin necesidad de conexión a internet.

## Compatibilidad

CalcuPromedioCURN es compatible con la mayoría de los navegadores web modernos, incluyendo:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Contribuciones

Las contribuciones son bienvenidas. Si desea mejorar esta aplicación, por favor, abra un issue o envíe un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo LICENSE para más detalles.

---

Desarrollado con ❤️.
