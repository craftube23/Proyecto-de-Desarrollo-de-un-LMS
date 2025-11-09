# TODO.md — Proyecto LMS (MVP)

> **Proyecto:** Desarrollo de un LMS (Learning Management System)
> **Institución:** Campus
> **Objetivo:** Diseñar y construir un MVP de un LMS que permita la gestión de docentes, cursos, módulos y lecciones, con autenticación para administrativos y persistencia en `localStorage`.

---

## Índice

1. Resumen del MVP
2. Alcance y restricciones
3. Tecnologías
4. Estructura de carpetas recomendada
5. Lista de tareas (To‑Do) — por prioridad
6. Historias de usuario / Criterios de aceptación
7. Flujo de datos y reglas importantes
8. Pruebas básicas y checklist QA
9. Git / Deploy / README
10. Extensiones posteriores (post‑MVP)

---

## 1. Resumen del MVP

* Interfaz pública para visualizar cursos (sin autenticación).
* Módulo administrativo con login (email + contraseña) para gestionar: docentes, administrativos, cursos, módulos y lecciones.
* Persistencia local con `localStorage`.
* Implementación únicamente con **HTML, CSS y JavaScript (vanilla)**.

---

## 2. Alcance y restricciones

* CRUD completo para: **Docentes**, **Administrativos**, **Cursos**, **Módulos**, **Lecciones**.
* Restricción: **No se puede eliminar un docente que esté asignado a uno o más cursos**.
* Plataforma abierta al público para la visualización de cursos (MVP).
* Autenticación por email y contraseña para perfiles administrativos.
* Guardar sesiones (opcional) en `localStorage` para simular sesión activa.

---

## 3. Tecnologías

* HTML5
* CSS3 (puede usarse un pequeño framework CSS si se desea, pero no es obligatorio)
* JavaScript (ES6+)
* `localStorage` para persistencia
* Git + GitHub para repositorio

---

## 4. Estructura de carpetas (recomendada)

```
lms-mvp/
├─ index.html                # Página pública: listado de cursos
├─ admin.html                # Panel administrativo (dashboard)
├─ login.html                # Login para administrativos
├─ css/
│  └─ styles.css
├─ js/
│  ├─ app.js                 # punto de entrada
│  ├─ auth.js                # lógica de autenticación
│  ├─ storage.js             # wrapper para localStorage (get/set/seed)
│  ├─ courses.js             # CRUD cursos + módulos + lecciones
│  ├─ teachers.js            # CRUD docentes
│  └─ admins.js              # CRUD administrativos
├─ assets/
│  └─ images/
└─ README.md
```

---

## 5. Lista de tareas (To‑Do) — por prioridad

> Usa estas tareas como checklist en GitHub issues o en tu tablero Kanban.

### 5.1 Obligatorias (MVP)

* [X]  **Inicializar proyecto y repo en GitHub** (crear README básico).
* [X]  **Estructura de carpetas** y archivos base (index.html, admin.html, login.html, css, js).
* [X]  **Storage wrapper** (`storage.js`) con funciones: `get(key)`, `set(key, value)`, `remove(key)`, `seedDefaultData()`.
* [ ]  **Auth** (`auth.js`): login por email+password, validación básica, persistir estado en `localStorage`.
* [ ]  **Login UI** (login.html) con mensajes de error.
* [ ]  **Dashboard Admin** (admin.html): mostrar estadísticas (n.º cursos activos, n.º docentes, n.º administrativos).
* [ ]  **CRUD Docentes** (teachers.js + UI): crear/editar/ver/eliminar con validación. Prevent delete if assigned to course.
* [ ]  **CRUD Administrativos** (admins.js + UI): crear/editar/ver/eliminar.
* [ ]  **CRUD Cursos** (courses.js + UI): crear/editar/ver/eliminar. Relacionar curso con docente.
* [ ]  **Módulos y Lecciones** dentro de Cursos: CRUD anidado (módulos → lecciones).
* [ ]  **Subida/gestión de recursos**: permitr asociar URLs de video/pdf/imagen a lecciones (no almacenar binarios — solo URLs).
* [ ]  **Vista pública (index.html)**: listado de cursos con filtro/ búsqueda básica y vista de detalle de curso (módulos y lecciones).
* [ ]  **Validaciones**: formularios con checks (email formato, required, duración numérica, etc).
* [ ]  **Mensajes de confirmación** al eliminar (y explicación cuando no se puede eliminar un docente).
* [ ]  **Seed data**: agregar datos iniciales de ejemplo para facilitar pruebas.

### 5.2 Mejoras de UX / Opcionales (MVP+)

* [ ]  Sistema de notificaciones toasts.
* [ ]  Filtros avanzados en la lista de cursos (estado, fecha, tipo) — al menos por visibilidad y etiquetas.
* [ ]  Drag & drop para reordenar módulos/lecciones (opcional).
* [ ]  Exportar / importar JSON del `localStorage` (backup/restore).

### 5.3 Documentación / Entrega

* [ ]  README completo con instrucciones de ejecución.
* [ ]  Manual breve: cómo probar el login, cuentas administrativas de prueba.
* [ ]  Archivo `todo.md` en repo (este documento).

---

## 6. Historias de usuario & Criterios de aceptación (ejemplos)

* **HU-01 (Login administrativo)**
  * Como administrativo quiero iniciar sesión con mi email y contraseña para gestionar la plataforma.
  * **Criterios**: entrada válida redirige a `admin.html`; credenciales inválidas muestran error; la sesión se mantiene en `localStorage`.
* **HU-02 (Gestionar docentes)**
  * Como administrativo quiero crear/editar/eliminar docentes.
  * **Criterios**: al crear se guardan campo obligatorios; al eliminar docente asignado a curso aparece mensaje y no se elimina.
* **HU-03 (Gestionar cursos)**
  * Como administrativo quiero crear cursos, asignar docente, crear módulos y lecciones.
  * **Criterios**: curso debe quedar disponible en la vista pública; módulos y lecciones deben estar vinculados al curso.
* **HU-04 (Vista pública)**
  * Como visitante quiero ver la lista de cursos y abrir la página del curso para revisar módulos y lecciones.
  * **Criterios**: no requiere autenticación; muestra solo cursos con visibilidad pública.

---

## 7. Flujo de datos y reglas importantes

* **IDs**: usar `UUID` o `timestamp` combinado con prefijo (ej. `course_16234`) para evitar colisiones en `localStorage`.
* **Relaciones**:
  * Curso → `teacherId` (1 docente por curso)
  * Curso → `modules[]` (cada módulo tiene `moduleId`)
  * Módulo → `lessons[]` (cada lección tiene `lessonId`)
* **Eliminación**:
  * Antes de eliminar docente, comprobar si existe algún curso con `teacherId` igual al docente.
  * Si existen relaciones, impedir eliminación y mostrar lista de cursos asociados.

---

## 8. Pruebas básicas y checklist QA

* [ ]  Abrir app en navegador, seed data cargado.
* [ ]  Login con cuenta administrativa de prueba.
* [ ]  Crear docente y asignar a nuevo curso.
* [ ]  Intentar eliminar docente asignado → debe fallar con mensaje.
* [ ]  Crear módulo y varias lecciones con recursos (URLs) y comprobar visualización pública.
* [ ]  Probar filtros y búsqueda en la vista pública.
* [ ]  Refrescar página y confirmar persistencia en `localStorage`.
* [ ]  Probar export/import JSON (si implementado).

---

## 9. Git / Deploy / README

* **Repo:**`lms-mvp` en GitHub.
* **Branches:**
  * `main` (release)
  * `develop` (integración)
  * `feature/<nombre>` para cada tarea importante
* **Convención commits:**`feat:`, `fix:`, `chore:`, `docs:`
* **README.md checklist:**
  * Descripción del proyecto
  * Tecnologías usadas
  * Cómo ejecutar (abrir `index.html` localmente)
  * Cuentas de prueba (email/pass)
  * Estructura de carpetas
  * Consideraciones y limitaciones (uso de `localStorage`)

---

## 10. Extensiones posteriores (post‑MVP)

* Integrar backend real (Node.js + Express + Base de datos SQL/NoSQL).
* Autenticación real con hashing de contraseñas y JWT.
* Roles más granulares y permisos.
* Subida de archivos (almacenamiento S3 o similar).
* Notificaciones por correo y panel de actividades.

---

## Notas finales / Recomendaciones rápidas

* Comenzar por la **persistencia** (storage wrapper) y el **seed data** — facilitan el desarrollo sin crear todo desde cero.
* Mantener componentes JS separados por responsabilidad (auth, storage, cursos, docentes).
* Priorizar experiencia de usuario: formularios claros, validaciones y mensajes.

---

> **Autor:** Documento generado para el entregable del proyecto LMS (MVP).
> **Fecha:** (añadir la fecha de entrega/commit final en el README del repo).
