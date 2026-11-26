# context.md — Clon de la interfaz de Airbnb

## Qué estoy construyendo

Un clon del frontend de Airbnb con **Next.js 16 (App Router), TypeScript y Tailwind CSS**, para validar qué componentes necesita una plataforma de alquiler vacacional, qué datos usa cada uno y cómo se conectan las páginas. Los datos están hardcodeados (8 alojamientos en `data/listings.ts`) y la carga desde una API se simula con `useEffect` + `setTimeout`. El diseño es **mobile-first**: primero se diseña para 375 px y desde `sm`/`lg` se adapta a escritorio.

## Usuario

Quien entra es un **viajero que busca dónde alojarse**. Quiere encontrar rápido un lugar que calce con su destino y su estilo de viaje (playa, cabaña, algo de tendencia), comparar precios y, cuando un lugar le gusta, revisar fotos, servicios y quién es el anfitrión antes de decidir cuántos huéspedes van y reservar.

## Las tres páginas

| Ruta | Página | Qué muestra |
|---|---|---|
| `/` | Inicio | Barra superior con búsqueda en vivo, fila de categorías y cuadrícula de alojamientos (1 columna en móvil, hasta 4 en escritorio). |
| `/catalog` | Catálogo (resultados de búsqueda) | Cantidad de resultados, orden por precio (ascendente/descendente), lista de tarjetas y un placeholder del mapa (debajo en móvil, a la derecha en escritorio). |
| `/rooms/[id]` | Detalle de la habitación | Breadcrumb de vuelta al catálogo, galería con anterior/siguiente, cabecera (título, valoración, reseñas, ubicación), anfitrión, servicios y tarjeta de reserva con contador de huéspedes. |

## Componentes por vista (referencia: airbnb.com)

**Compartidos**
- `Navbar`: logo, búsqueda e iconos de usuario. Se usa en las 3 páginas.
- `SearchBar`: input controlado (el estado vive en la Home).
- `UserMenu`: "Hazte anfitrión", idioma, menú y avatar.
- `ListingCard`: foto, ubicación, valoración, título y precio por noche. Es un `<Link>` al detalle y se reutiliza en la Home y en el Catálogo.
- `ListingGrid`: cuadrícula responsive de tarjetas; muestra `LoadingState` mientras carga.
- `LoadingState`: spinner con texto.

**Inicio (`/`)**: `Navbar` (con `SearchBar`) · `CategoryFilter` · `ListingGrid`.

**Catálogo (`/catalog`)**: `Navbar` · `ResultsHeader` (cantidad + orden) · `ListingGrid` · `MapPlaceholder`.

**Detalle (`/rooms/[id]`)**: `Navbar` · `RoomDetail` (carga por id) → `Breadcrumb` · `PhotoGallery` · `ListingHeader` · `HostInfo` · `AmenitiesList` · `BookingCard`.

## Estado y efectos

| Hook | Dónde | Para qué |
|---|---|---|
| `useState` | `app/page.tsx` | Texto de búsqueda, categoría activa, lista cargada y estado de carga |
| `useState` | `app/catalog/page.tsx` | Orden de precio, lista cargada y estado de carga |
| `useState` | `PhotoGallery` | Índice de la foto visible |
| `useState` | `BookingCard` | Número de huéspedes (mínimo 1, máximo `maxGuests`) |
| `useEffect` | Inicio, Catálogo y `RoomDetail` | Simular la carga de datos con `setTimeout` de 1 s (empieza en `isLoading = true` y lo pasa a `false`) |

## Especificaciones derivadas de las capturas (prompts de visión)

> Flujo: captura de cada página de airbnb.com en viewport móvil (375 px, DevTools → modo dispositivo) → adjuntada al agente de código con el prompt de abajo → la especificación resultante se pegó aquí antes de implementar esa vista.

**Prompt usado:**
> "Adjunto una captura de la [página] de Airbnb en un viewport móvil de 375 px. Genera una especificación de componentes para recrearla en Next.js con Tailwind: para cada componente indica el nombre, sus props (con tipos de TypeScript) y su relación de layout dentro de la página (qué contiene a qué, orden vertical, qué es horizontal o con scroll). No escribas código."

### Inicio — especificación
1. Jerarquía general de layout
La página se organiza verticalmente así:

HomePage
Navbar
SearchBar
CategoryFilterRow
CategoryFilterItem
HomeContent
RecommendationSection
SectionHeading
DestinationRail
DestinationCard
ListingSection
SectionHeading
ListingGrid
ListingCard
Más ListingSection con la misma estructura
BottomNavigation
En móvil, la navegación inferior debe permanecer fija en el borde inferior de la pantalla. El contenido debe reservar espacio inferior para que las últimas tarjetas no queden ocultas.

2. HomePage
Responsabilidad: Contenedor de la página de inicio y composición de todas sus secciones.

Props:

No requiere props si obtiene los datos localmente.
Opcionalmente puede recibir:
initialListings: Listing[]
initialDestinations: Destination[]
Layout:

Contiene verticalmente Navbar, CategoryFilterRow, las secciones de contenido y BottomNavigation.
Mantiene el estado de:
Texto de búsqueda.
Categoría activa.
Alojamientos cargados.
Estado de carga.
El ancho máximo del contenido puede crecer en escritorio, pero en móvil utiliza prácticamente todo el ancho disponible con márgenes laterales.
3. Navbar
Responsabilidad: Encabezado superior con acceso a búsqueda.

Props:

searchValue: string
onSearchChange: (value: string) => void
onSearchSubmit: () => void
logoLabel: string
showUserMenu: boolean
Layout:

Es el primer elemento vertical de la página.
En la captura móvil, la barra de búsqueda ocupa casi todo el ancho.
Puede contener el logotipo en escritorio, pero en el viewport de 375 px la búsqueda es el elemento visual principal.
No debe incluir la fila de categorías; esta se renderiza debajo como componente independiente.
Reutilización: se reutiliza en Inicio, Catálogo y Detalle. Su estructura general puede conservarse, adaptando únicamente la visibilidad de elementos según el breakpoint.

4. SearchBar
Responsabilidad: Campo visual de búsqueda “Empieza la búsqueda”.

Props:

value: string
placeholder: string
onChange: (value: string) => void
onSubmit: () => void
isLoading: boolean
disabled: boolean
Layout:

Está contenido dentro de Navbar.
Es una pieza horizontal: icono de búsqueda y texto en una cápsula redondeada.
En móvil ocupa casi todo el ancho, con altura aproximada de 56–64 px.
Tiene borde, sombra ligera, fondo blanco y radio completamente redondeado.
Reutilización: se reutiliza tal cual conceptualmente en las tres vistas. En Inicio puede ser controlado por la página; en Catálogo puede reflejar los criterios de búsqueda actuales.

5. CategoryFilterRow
Responsabilidad: Fila de filtros por categoría solicitada para la tarea.

Props:

categories: Category[]
activeCategoryId: string
onCategoryChange: (categoryId: string) => void
Layout:

Se coloca inmediatamente debajo de Navbar.
Es una fila horizontal de desplazamiento (overflow-x: auto) en móvil.
No debe envolver los elementos en varias líneas.
Debe ocultar visualmente la barra de scroll.
Tiene separación horizontal constante entre filtros y padding lateral alineado con el contenido.
La fila puede mantenerse sticky debajo de la navbar si se quiere conservar el acceso durante el scroll, aunque la captura no obliga a ello.
Category
Propiedades:

id: string
label: string
icon: string o ReactNode
isActive: boolean
CategoryFilterItem
Responsabilidad: Filtro individual con icono y etiqueta.

Props:

category: Category
isActive: boolean
onSelect: () => void
Layout:

Contiene horizontalmente:
Icono.
Etiqueta.
Cada filtro es una cápsula redondeada.
El filtro activo utiliza mayor contraste visual.
Ejemplos visibles en la captura: “Todo”, “Alojamientos” y “Experiencias”.
Adaptación: este componente no aparece como una fila independiente en la captura original; es una adición obligatoria de la tarea.

6. HomeContent
Responsabilidad: Agrupar el contenido principal debajo de los filtros.

Props:

children: ReactNode
Layout:

Contenedor vertical con separación amplia entre secciones.
Usa márgenes laterales consistentes.
En móvil debe evitar que el contenido quede debajo de BottomNavigation.
7. RecommendationSection
Responsabilidad: Sección superior de recomendaciones como “Destinaciones para ti”.

Props:

title: string
destinations: Destination[]
onDestinationSelect: (destinationId: string) => void
Layout:

Contiene un SectionHeading y un DestinationRail.
La separación vertical entre el título y las tarjetas es reducida.
La sección conserva desplazamiento horizontal porque las recomendaciones de destinos se muestran como una fila en la captura.
8. SectionHeading
Responsabilidad: Título de cada bloque de contenido.

Props:

title: string
actionLabel: string | undefined
onAction: (() => void) | undefined
showArrow: boolean
Layout:

Fila horizontal:
Título alineado a la izquierda.
Botón circular con flecha alineado a la derecha, cuando corresponda.
El título puede ocupar varias líneas si el ancho es reducido.
En la captura, “Quédate en Valparaíso” y “Alojamientos en Concon” tienen un botón circular de avance.
Adaptación: el botón de flecha puede mantenerse visualmente, pero su acción debe llevar al catálogo o cambiar el estado de la sección. No debe implicar necesariamente un carrusel de tarjetas.

9. DestinationRail
Responsabilidad: Fila de destinos recomendados.

Props:

destinations: Destination[]
onSelect: (destinationId: string) => void
Layout:

Contiene horizontalmente varios DestinationCard.
En móvil utiliza scroll horizontal.
Cada tarjeta tiene ancho fijo o semirrígido para que se vean aproximadamente tres tarjetas y parte de la siguiente.
No se convierte en cuadrícula: la tarea solo solicita sustituir los carruseles de alojamientos, no necesariamente el rail de destinos.
Destination
Propiedades:

id: string
name: string
subtitle: string
image: string
alt: string
10. DestinationCard
Responsabilidad: Mostrar un destino sugerido con imagen y texto.

Props:

destination: Destination
onSelect: () => void
Layout:

Contiene verticalmente:
Imagen con esquinas redondeadas.
Nombre del destino.
Subtítulo o motivo de recomendación.
La imagen es cuadrada o ligeramente más alta que ancha.
El texto queda fuera de la imagen, sobre fondo blanco.
No incluye precio ni botón de favorito.
Reutilización: su patrón visual puede reutilizarse para otras recomendaciones, pero no es la tarjeta principal de alojamiento.

11. ListingSection
Responsabilidad: Sección de alojamientos como “Quédate en Valparaíso”.

Props:

title: string
listings: Listing[]
showAction: boolean
onAction: (() => void) | undefined
Layout:

Contiene:
SectionHeading.
ListingGrid.
En la captura cada sección parece utilizar un carrusel horizontal, pero para esta tarea debe usar una cuadrícula responsive.
Puede haber varias instancias de ListingSection, por ejemplo:
“Quédate en Valparaíso”.
“Alojamientos en Concon”.
12. ListingGrid
Responsabilidad: Reemplazar los carruseles de alojamientos por una cuadrícula responsive.

Props:

listings: Listing[]
isLoading: boolean
emptyMessage: string
columns: 1 | 2 | 3 | 4
Layout:

Contiene verticalmente una lista de ListingCard.
En 375 px:
Una columna.
Cada tarjeta ocupa el ancho disponible.
En pantallas pequeñas y medianas:
Puede pasar a dos columnas cuando el ancho lo permita.
En escritorio:
Dos, tres o cuatro columnas según el ancho disponible.
No debe usar overflow-x: auto.
No debe renderizar una tarjeta parcialmente visible como ocurría con el carrusel de la captura.
El espacio entre filas y columnas debe ser uniforme.
Adaptación principal: este componente sustituye directamente la presentación horizontal de alojamientos de la captura por una cuadrícula responsive.

13. ListingCard
Responsabilidad: Tarjeta reutilizable de alojamiento.

Props:

listing: Listing
href: string
showFavoriteButton: boolean
isFavorite: boolean
onFavoriteToggle: (listingId: string) => void
badge: string | undefined
currency: string
priceLabel: string
Listing
Propiedades:

id: string
title: string
location: string
image: string
imageAlt: string
pricePerNight: number
currency: string
rating: number | undefined
reviewCount: number | undefined
badge: string | undefined
isFavorite: boolean
Layout:

La tarjeta puede ser un enlace completo hacia /rooms/[id].
Contiene verticalmente:
ListingImage.
Información textual del alojamiento.
Precio por noche.
Valoración, si está disponible.
La imagen ocupa todo el ancho de la tarjeta y tiene esquinas redondeadas.
El botón de favorito se superpone en la esquina superior derecha.
El distintivo “Favorito entre huéspedes” se superpone en la esquina superior izquierda.
El título puede ocupar una o dos líneas.
La información secundaria utiliza un color menos contrastado que el título.
Precio
La tarjeta debe mostrar explícitamente:

“X CLP por noche”
No debe mostrar el total por dos noches como en la captura, por ejemplo, no usar “$191.334 CLP por 2 noches”. El campo principal de presentación debe ser pricePerNight.

Si se necesita mostrar información adicional sobre la estancia, debe aparecer como dato secundario y no sustituir el precio por noche.

Reutilización: la tarjeta de alojamiento es el componente que más se reutiliza:

Se conserva su estructura visual de imagen, badge, favorito, título y valoración.
Se adapta el dato de precio para mostrar precio por noche.
Se reutiliza en Inicio y Catálogo.
Se adapta su contenedor de carrusel a ListingGrid.
Puede enlazar al detalle sin duplicar la lógica visual.
14. ListingImage
Responsabilidad: Imagen principal de un alojamiento.

Props:

src: string
alt: string
aspectRatio: string
badge: string | undefined
priority: boolean
Layout:

Está contenida dentro de ListingCard.
Utiliza una relación de aspecto consistente para que todas las tarjetas de la cuadrícula queden alineadas.
El badge y el botón de favorito se posicionan sobre esta zona.
En móvil puede ser más alta para aprovechar el ancho completo de la tarjeta.
15. ListingBadge
Responsabilidad: Distintivo superpuesto sobre la imagen.

Props:

label: string
variant: 'guest-favorite' | 'default'
Layout:

Se ubica en la esquina superior izquierda de ListingImage.
Tiene fondo claro, bordes redondeados y texto en varias líneas cuando sea necesario.
Debe mantener suficiente contraste sin ocultar completamente la fotografía.
Reutilización: se mantiene prácticamente tal cual aparece en la captura.

16. FavoriteButton
Responsabilidad: Alternar el estado de favorito de un alojamiento.

Props:

isFavorite: boolean
onToggle: () => void
ariaLabel: string
disabled: boolean
Layout:

Se superpone en la esquina superior derecha de la imagen.
Es un botón circular o visualmente compacto.
El icono de corazón cambia entre estado vacío y activo.
Debe ser independiente del enlace principal para evitar activar accidentalmente la navegación al detalle.
Reutilización: se mantiene visualmente igual en Inicio, Catálogo y Detalle cuando corresponda.

17. BottomNavigation
Responsabilidad: Navegación móvil inferior.

Props:

items: BottomNavItem[]
activeItemId: string
onItemSelect: (itemId: string) => void
BottomNavItem
Propiedades:

id: string
label: string
icon: ReactNode
href: string
Layout:

Barra horizontal fija en la parte inferior.
Contiene tres elementos distribuidos uniformemente:
Explora.
Favoritos.
Iniciar sesión.
Cada elemento contiene verticalmente:
Icono.
Etiqueta.
El elemento activo usa el color de énfasis.
Tiene fondo blanco, borde superior sutil y sombra ligera.
En escritorio puede ocultarse o reemplazarse por la navegación de Navbar.
Reutilización: se comparte entre las páginas principales, adaptando solo el elemento activo.

Componentes reutilizados sin cambios sustanciales
Estos elementos pueden conservar prácticamente la apariencia y responsabilidad de la captura:

SearchBar
Navbar como contenedor superior
ListingCard en su estructura visual
ListingImage
ListingBadge
FavoriteButton
SectionHeading
BottomNavigation
DestinationCard
Componentes adaptados por los requisitos de la tarea
CategoryFilterRow: se añade bajo Navbar.
CategoryFilterItem: nuevo filtro con icono y etiqueta.
ListingGrid: reemplaza el carrusel horizontal por una cuadrícula responsive.
ListingCard: conserva la composición visual, pero muestra precio por noche.
ListingSection: deja de depender de una fila desplazable de alojamientos y pasa a contener una cuadrícula.
Botón de flecha de las secciones: puede conservarse visualmente, pero debe navegar o cambiar de sección sin imponer un carrusel.
Decisión de layout final
En móvil, la composición recomendada es:

Navbar → CategoryFilterRow con scroll horizontal → RecommendationSection con destinos en scroll horizontal → ListingSection con cuadrícula de una columna → siguiente ListingSection → BottomNavigation fija

La única zona con scroll horizontal debe ser la fila de categorías y, opcionalmente, la fila de destinos recomendados. Los alojamientos deben presentarse siempre como cuadrícula responsive, no como carrusel.

#### Alcance implementado (v1) a partir de esta especificación

| Componente de la spec | En el código | Nota |
|---|---|---|
| Navbar + SearchBar | `Navbar`, `SearchBar` | Búsqueda controlada por la Home (`useState`); se agregan logo e iconos de usuario que pide el enunciado |
| CategoryFilterRow / CategoryFilterItem | `CategoryFilter` | Categorías del enunciado (Playa, Mansiones, Tendencias, Cabañas, Piscinas) en lugar de Todo / Alojamientos / Experiencias |
| ListingSection + ListingGrid | `ListingGrid` | Una sola cuadrícula filtrable en vez de varias secciones por ciudad, para que la búsqueda y las categorías filtren todo el listado |
| ListingCard | `ListingCard` | Precio **por noche** en USD (los datos de ejemplo están en USD); reutilizada en Inicio y Catálogo |
| ListingImage | placeholder con degradado de Tailwind | Sin imágenes reales en el prototipo |

**Fuera de alcance en v1 (roadmap):** `RecommendationSection` / `DestinationRail` / `DestinationCard`, `SectionHeading` con flecha, `ListingBadge` ("Favorito entre huéspedes"), `FavoriteButton` y `BottomNavigation`. El enunciado no los exige, y la navegación móvil queda cubierta por la Navbar superior.

### Catálogo — especificación
Viewport de referencia: 375 px. La captura muestra una cabecera compacta, un mapa en la parte superior y una lista de resultados en una especie de panel inferior. Sin embargo, para esta tarea se adapta el orden responsive:

Móvil: cabecera → lista de resultados → mapa debajo.
Escritorio: cabecera → contenido dividido con lista a la izquierda y mapa a la derecha.
1. Jerarquía general de layout
Móvil
CatalogPage
ResultsNavbar
BackButton
SearchSummary
FilterButton
ResultsContent
ResultsHeader
PricingNotice
ListingResults
ListingCard
MapPlaceholder
Escritorio
CatalogPage
ResultsNavbar
ResultsContent
ResultsHeader
CatalogSplitLayout
ResultsColumn
PricingNotice
ListingResults
ListingCard
MapPlaceholder
El área de resultados y el mapa comparten una fila en escritorio. En móvil se apilan verticalmente, con el mapa después de la lista.

2. CatalogPage
Responsabilidad: Página principal de resultados de búsqueda.

Props:

initialListings: Listing[]
initialSearch: SearchCriteria
initialSort: SortOrder
Layout:

Contiene verticalmente ResultsNavbar y ResultsContent.
Mantiene el estado de:
Alojamientos cargados.
Orden seleccionado.
Estado de favoritos.
Estado de carga.
Puede recibir los resultados filtrados desde una futura API, pero inicialmente trabaja con datos locales.
SearchCriteria
Propiedades:

destination: string
checkIn: string
checkOut: string
guestCount: number
3. ResultsNavbar
Responsabilidad: Cabecera superior específica para los resultados de búsqueda.

Props:

searchCriteria: SearchCriteria
onBack: () => void
onFilterClick: () => void
Layout:

Ocupa todo el ancho superior.
Contiene horizontalmente:
BackButton a la izquierda.
SearchSummary en el centro.
FilterButton a la derecha.
En móvil puede permanecer fija o sticky en la parte superior.
Tiene fondo blanco, borde inferior y sombra discreta.
Reutilización: reutiliza la idea de Navbar de Inicio, pero se adapta a una cabecera compacta de resultados. No utiliza el SearchBar grande de la página de Inicio.

4. BackButton
Responsabilidad: Volver a la página anterior o a Inicio.

Props:

onClick: () => void
ariaLabel: string
Layout:

Elemento horizontalmente alineado a la izquierda de ResultsNavbar.
Usa un icono de flecha hacia atrás.
Debe tener un área táctil suficientemente grande en móvil.
Reutilización: componente pequeño reutilizable entre Catálogo y Detalle.

5. SearchSummary
Responsabilidad: Resumir los criterios de búsqueda activos.

Props:

destination: string
checkIn: string
checkOut: string
guestCount: number
compact: boolean
Layout:

Está centrado dentro de ResultsNavbar.
Contiene verticalmente:
Destino, por ejemplo “Alojamientos en esta zona”.
Fechas y cantidad de huéspedes.
En móvil limita el texto a una línea y puede truncarlo con elipsis.
En la captura aparece como una cápsula blanca con borde y sombra.
Reutilización: se puede reutilizar el resumen de búsqueda de otras páginas, pero su variante compacta es específica de resultados.

6. FilterButton
Responsabilidad: Abrir filtros adicionales de búsqueda.

Props:

onClick: () => void
activeFilterCount: number
ariaLabel: string
Layout:

Se coloca a la derecha de ResultsNavbar.
Contiene un icono de controles o deslizadores.
Si existen filtros activos, puede mostrar un contador.
En móvil debe ser compacto y táctil.
Reutilización: puede utilizarse también en el Catálogo de escritorio y en futuras hojas modales de filtros.

7. ResultsContent
Responsabilidad: Contenedor responsive del contenido de resultados.

Props:

children: ReactNode
Layout:

En móvil organiza todos los elementos en una columna:
Cabecera de resultados.
Aviso de precios.
Lista de tarjetas.
Mapa.
En escritorio actúa como contenedor del layout dividido entre resultados y mapa.
Debe incluir espacio inferior suficiente para no quedar oculto por elementos fijos, si se añade navegación móvil.
8. ResultsHeader
Responsabilidad: Mostrar el número de alojamientos y controlar la ordenación.

Props:

resultCount: number
sortOrder: SortOrder
onSortChange: (sortOrder: SortOrder) => void
sortLabel: string
SortOrder
Valores permitidos:

'asc': precio ascendente.
'desc': precio descendente.
Layout:

Fila horizontal:
Número de alojamientos a la izquierda.
Control de ordenación a la derecha.
En móvil puede dividirse en dos líneas si el ancho es insuficiente, pero debe conservar una relación visual compacta.
El control puede ser un select, un menú desplegable o un botón que abre opciones.
Las opciones visibles deben ser:
“Precio: ascendente”.
“Precio: descendente”.
Adaptación obligatoria: este componente no aparece de forma explícita en la captura y debe añadirse para cumplir la tarea.

9. PricingNotice
Responsabilidad: Informar sobre la inclusión de tarifas.

Props:

message: string
icon: ReactNode
visible: boolean
Layout:

Se coloca antes de la lista de tarjetas.
Contiene horizontalmente:
Icono de etiqueta.
Texto, por ejemplo “Los precios incluyen todas las tarifas”.
Puede tener fondo blanco o ligeramente contrastado.
Debe mantener una separación clara respecto a la primera tarjeta.
Reutilización: se basa directamente en el aviso visual de la captura. Puede reutilizarse en Inicio o Detalle si se necesita comunicar la misma política de precios.

10. ListingResults
Responsabilidad: Renderizar la colección de alojamientos.

Props:

listings: Listing[]
isLoading: boolean
emptyMessage: string
sortOrder: SortOrder
Layout móvil:

Contiene verticalmente las tarjetas.
Cada ListingCard ocupa el ancho disponible dentro del contenedor.
No debe utilizar scroll horizontal.
La separación entre tarjetas debe ser consistente.
Layout escritorio:

Puede utilizar una cuadrícula de una o dos columnas dentro de la columna de resultados.
La columna de resultados debe poder desplazarse independientemente del mapa si el diseño final utiliza una altura de viewport controlada.
Adaptación: la captura presenta tarjetas apiladas dentro de un panel móvil. La tarea exige reutilizar la tarjeta de Inicio y adaptarla al contexto de resultados, manteniendo una lista vertical en móvil.

11. ListingCard
Responsabilidad: Tarjeta común de alojamiento, compartida con la página de Inicio.

Props:

listing: Listing
href: string
showFavoriteButton: boolean
isFavorite: boolean
onFavoriteToggle: (listingId: string) => void
showRating: boolean
showAmenitiesSummary: boolean
priceDisplayMode: 'per-night'
showOriginalPrice: boolean
Listing
Propiedades:

id: string
title: string
location: string
image: string
imageAlt: string
pricePerNight: number
currency: string
rating: number | undefined
reviewCount: number | undefined
bedroomCount: number | undefined
bedCount: number | undefined
bathroomCount: number | undefined
badge: string | undefined
isFavorite: boolean
originalPricePerNight: number | undefined
hasFreeCancellation: boolean
payLater: boolean
Layout:

La tarjeta contiene verticalmente:

ListingImage
Imagen principal.
Badge opcional.
FavoriteButton.
ListingSummary
Título y ubicación.
Valoración alineada a la derecha o debajo, según el ancho.
Descripción breve de dormitorios, camas y baños.
ListingPrice
Precio actual por noche.
Precio anterior opcional tachado.
Etiquetas de cancelación o pago.
Precio obligatorio:

Debe mostrar el precio actual como:
“X CLP por noche”
No debe mostrar únicamente “X CLP por 3 noches”.
Si se muestran fechas de la búsqueda, el total de la estancia puede ser información secundaria, pero nunca debe reemplazar al precio por noche.
Reutilización y adaptación:

Se reutiliza el mismo componente conceptual y visual de la página de Inicio.
Se conserva:
Imagen.
Badge de “Favorito entre huéspedes”.
Corazón de favoritos.
Título.
Valoración.
Se adapta:
El precio para utilizar pricePerNight.
La información secundaria para mostrar dormitorios, camas y baños, como en la captura.
Las etiquetas de “Pago $0 hoy” y “Cancelación gratuita”, si los datos existen.
El contenedor: en Inicio pertenece a ListingGrid; aquí pertenece a ListingResults.
No debe crearse una segunda tarjeta específica para resultados.
12. ListingImage
Responsabilidad: Mostrar la imagen principal del alojamiento.

Props:

src: string
alt: string
aspectRatio: string
badge: string | undefined
showImageIndicators: boolean
Layout:

Está contenida dentro de ListingCard.
El badge se ubica en la esquina superior izquierda.
El favorito se ubica en la esquina superior derecha.
La captura muestra indicadores de varias fotografías en la parte inferior de la imagen.
Reutilización:

La versión básica se reutiliza tal cual desde Inicio.
Los indicadores de imágenes son una adaptación opcional para Catálogo. Si se incluyen, deben ser visuales y no convertir la tarjeta en un carrusel obligatorio.
13. ListingSummary
Responsabilidad: Agrupar los datos descriptivos del alojamiento.

Props:

title: string
location: string
rating: number | undefined
reviewCount: number | undefined
bedroomCount: number | undefined
bedCount: number | undefined
bathroomCount: number | undefined
Layout:

Está debajo de la imagen.
El título y la valoración pueden compartir la primera fila.
La ubicación y el resumen de habitaciones aparecen debajo.
El texto debe poder ocupar dos líneas sin romper el layout.
Adaptación: la tarjeta de Inicio puede mostrar menos metadatos; en resultados se amplía con dormitorios, camas y baños, tal como aparece en la captura.

14. ListingPrice
Responsabilidad: Presentar precio, descuentos y condiciones.

Props:

pricePerNight: number
currency: string
originalPricePerNight: number | undefined
hasFreeCancellation: boolean
payLater: boolean
Layout:

Se coloca debajo del resumen del alojamiento.
El precio actual debe ser el elemento principal.
El precio anterior, si existe, aparece tachado.
Las condiciones aparecen como etiquetas pequeñas debajo del precio.
Regla de presentación:

La unidad visible y principal es “por noche”.
Si se calcula el precio total de la estancia, debe mostrarse en una línea secundaria claramente diferenciada.
15. CatalogSplitLayout
Responsabilidad: Adaptar la relación entre lista y mapa.

Props:

results: ReactNode
map: ReactNode
Layout responsive:

Móvil: disposición vertical:
Resultados.
Mapa.
Escritorio: disposición horizontal:
ResultsColumn a la izquierda.
MapPlaceholder a la derecha.
El mapa debe ocupar una zona amplia y estable en escritorio.
La columna de resultados puede tener scroll propio si el viewport lo requiere.
No debe aparecer un mapa flotante sobre las tarjetas en móvil, aunque la captura original sugiera ese patrón.
16. ResultsColumn
Responsabilidad: Columna que agrupa la lista de alojamientos en escritorio.

Props:

children: ReactNode
Layout:

Contiene PricingNotice y ListingResults.
En escritorio ocupa aproximadamente la mitad del viewport, según el diseño.
En móvil deja de comportarse como columna lateral y pasa a ocupar todo el ancho.
17. MapPlaceholder
Responsabilidad: Representar temporalmente el mapa.

Props:

label: string
height: string
isInteractive: boolean
Valores esperados:

label: "Mapa"
isInteractive: false
Layout móvil:

Aparece debajo de toda la lista de alojamientos.
Tiene ancho completo del contenedor.
Utiliza fondo gris y una altura suficiente para identificarlo claramente.
El texto “Mapa” se centra horizontal y verticalmente.
Layout escritorio:

Se ubica a la derecha de la lista.
Puede quedar sticky mientras se desplaza la columna de resultados.
Ocupa el alto disponible del viewport o una altura mínima amplia.
El placeholder no debe simular todavía marcadores ni interacción real.
Adaptación obligatoria: sustituye el mapa visual de la captura por un bloque gris con el texto exacto “Mapa”.

Componentes reutilizados tal cual
Estos componentes o patrones se mantienen prácticamente sin cambios:

ListingCard como componente compartido con Inicio.
ListingImage.
ListingBadge o badge de “Favorito entre huéspedes”.
FavoriteButton.
ListingGrid como base de distribución de tarjetas, aunque en Catálogo puede configurarse como lista o cuadrícula de resultados.
LoadingState.
Navbar como patrón general de navegación.
Componentes adaptados
ResultsNavbar: reemplaza la búsqueda grande de Inicio por un resumen compacto.
ResultsHeader: añade el número de alojamientos y la ordenación por precio.
ListingCard: añade metadatos de habitaciones, condiciones de pago y precio por noche.
ListingPrice: cambia la presentación de precio total por el precio principal por noche.
ListingResults: organiza las tarjetas verticalmente en móvil y dentro de una columna en escritorio.
CatalogSplitLayout: coloca el mapa debajo de la lista en móvil y a la derecha en escritorio.
MapPlaceholder: reemplaza el mapa real de la captura por un placeholder gris con el texto “Mapa”.
ListingImage: puede incorporar indicadores de fotografías como mejora visual de la captura.
Flujo final de layout
Móvil, 375 px
ResultsNavbar → ResultsHeader → PricingNotice → ListingResults → MapPlaceholder

La lista debe aparecer antes que el mapa, aunque la captura original muestre el mapa arriba.

Escritorio
ResultsNavbar → CatalogSplitLayout

Dentro de CatalogSplitLayout:

Columna izquierda: ResultsHeader, PricingNotice, ListingResults.
Columna derecha: MapPlaceholder.
El mismo ListingCard de Inicio se utiliza en ambos casos y siempre muestra el precio principal por noche.

#### Alcance implementado (v1) a partir de esta especificación

| Componente de la spec | En el código | Nota |
|---|---|---|
| CatalogPage | `app/catalog/page.tsx` | Estado: alojamientos cargados, `isLoading` y `sortOrder` (`useState`); carga simulada con `useEffect` + `setTimeout` |
| ResultsNavbar (BackButton, SearchSummary, FilterButton) | `Navbar` compartida | Se reutiliza la Navbar de Inicio; la vuelta atrás se hace con el logo (`<Link href="/">`) y no hay filtros avanzados en v1 |
| ResultsHeader | `ResultsHeader` | Número de alojamientos + `<select>` Ascendente / Descendente por precio |
| ListingResults | `ListingGrid` con `columns="sm:grid-cols-2"` | Se reutiliza la cuadrícula de Inicio: 1 columna en móvil, 2 en la columna de resultados |
| ListingCard / ListingImage / ListingSummary / ListingPrice | `ListingCard` (la misma de Inicio) | Precio **por noche** en USD; sin dormitorios/camas/baños, precio tachado ni etiquetas de pago en v1 |
| CatalogSplitLayout / ResultsColumn | `grid lg:grid-cols-5` en la página | Móvil: lista → mapa. Escritorio: lista (3/5) a la izquierda y mapa (2/5) a la derecha |
| MapPlaceholder | `MapPlaceholder` | Bloque gris con el texto "Mapa"; `sticky` en escritorio |

**Fuera de alcance en v1 (roadmap):** `ResultsNavbar` compacta con resumen de búsqueda y filtros, `PricingNotice`, favoritos, badge, indicadores de fotos y metadatos de habitaciones y condiciones de pago en la tarjeta. El enunciado no los exige.

### Detalle — especificación
1. Jerarquía general de layout
RoomDetailPage
RoomDetail
DetailHeader
BackButton
ShareButton
FavoriteButton
PhotoGallery
GalleryControls
GalleryCounter
RoomInfo
ListingHeader
RatingSummary
RecognitionBanner
HighlightsList
HostInfo
DescriptionSection
AmenitiesSection
LocationSection
BookingCard
PriceSummary
GuestCounter
BookingCTA
En móvil, BookingCard debe permanecer fija en la parte inferior. El contenido principal debe tener padding inferior suficiente para que la tarjeta no cubra información.

En escritorio, la información principal puede ocupar la columna izquierda y BookingCard una columna lateral sticky.

2. RoomDetailPage
Responsabilidad: Ruta dinámica para mostrar el detalle de un alojamiento.

Props:

params: objeto con id: string
Layout:

Obtiene el id de la URL /rooms/[id].
Pasa el identificador a RoomDetail.
Puede ser un Server Component que prepara los parámetros y delega la carga interactiva a un componente cliente.
Requisito de carga:

El detalle debe cargarse usando useEffect.
Mientras se obtiene el alojamiento, debe mostrarse LoadingState.
Si el id no corresponde a ningún alojamiento, debe mostrarse un estado de error o “Alojamiento no encontrado”, no una página vacía.
3. RoomDetail
Responsabilidad: Contenedor cliente que carga y coordina los datos del alojamiento.

Props:

listingId: string
Estado interno:

listing: Listing | null
isLoading: boolean
error: string | null
Comportamiento:

Usa useEffect cuando cambia listingId.
Inicia con isLoading en true.
Simula o ejecuta la carga de datos usando el id.
Cambia a estado cargado cuando obtiene el alojamiento.
Expone los datos a todos los componentes hijos.
Layout:

Contiene todo el contenido de detalle.
No debe mezclar la lógica del contador de huéspedes ni el índice de galería; cada interacción debe permanecer en su componente correspondiente.
4. LoadingState
Responsabilidad: Estado visible mientras se cargan los datos.

Props:

message: string
fullPage: boolean
Layout:

Si fullPage es verdadero, ocupa la altura principal disponible.
Puede mostrar un indicador y el texto “Cargando alojamiento…”.
Debe reemplazar el contenido de detalle hasta que RoomDetail tenga datos.
Reutilización: se reutiliza desde Inicio y Catálogo.

5. DetailHeader
Responsabilidad: Acciones superiores sobre la habitación.

Props:

onBack: () => void
onShare: () => void
isFavorite: boolean
onFavoriteToggle: () => void
Layout:

Se superpone sobre la parte superior de la galería.
Contiene horizontalmente:
BackButton a la izquierda.
Acciones de compartir y favorito a la derecha.
Los botones son circulares y tienen fondo claro semitransparente o sólido.
Debe permanecer visible sobre la imagen sin ocultar el contenido principal.
Reutilización:

BackButton y FavoriteButton se reutilizan desde Catálogo e Inicio.
La disposición superpuesta sobre la galería es una adaptación específica del detalle.
6. BackButton
Responsabilidad: Volver al Catálogo.

Props:

href: string
ariaLabel: string
Valor recomendado:

href: "/catalog"
Layout:

Se ubica en la esquina superior izquierda de DetailHeader.
Puede funcionar como enlace, no necesariamente como acción imperativa.
Debe cumplir explícitamente el requisito de ofrecer una ruta de vuelta al Catálogo.
Reutilización: se reutiliza tal cual desde la cabecera de resultados.

7. ShareButton
Responsabilidad: Compartir el alojamiento.

Props:

onClick: () => void
ariaLabel: string
Layout:

Se ubica a la derecha de la galería, junto a FavoriteButton.
Es un botón circular.
En esta fase puede abrir un comportamiento simulado o no tener integración externa.
Reutilización: patrón visual tomado directamente de la captura.

8. PhotoGallery
Responsabilidad: Mostrar las fotografías del alojamiento y cambiar la foto visible.

Props:

photos: Photo[]
initialIndex: number
altPrefix: string
Photo
Propiedades:

src: string
alt: string
Estado interno:

currentIndex: number
Requisito obligatorio:

El índice debe gestionarse con useState.
El componente debe mostrar una sola foto visible en cada momento.
Anterior reduce el índice sin bajar de 0.
Siguiente aumenta el índice sin superar photos.length - 1.
Si se alcanza el primer o último elemento, el botón correspondiente debe deshabilitarse o comportarse como navegación circular, pero la decisión debe ser consistente.
Layout:

Es el primer bloque visual principal de la página.
Ocupa todo el ancho del viewport en móvil.
La imagen debe tener una altura considerable y usar object-fit: cover.
GalleryControls se coloca sobre la imagen.
GalleryCounter se ubica en una esquina inferior, por ejemplo “2 / 10”.
En escritorio puede transformarse en una cuadrícula de fotografías, pero la interacción de Anterior/Siguiente debe seguir disponible.
9. GalleryControls
Responsabilidad: Controlar la navegación de la galería.

Props:

onPrevious: () => void
onNext: () => void
canGoPrevious: boolean
canGoNext: boolean
Layout:

Contiene horizontalmente dos botones:
Anterior.
Siguiente.
Puede mostrarse como botones con texto, como exige la tarea.
En móvil pueden colocarse sobre la parte inferior de la imagen para no aumentar demasiado la altura.
Deben ser accesibles y tener estados disabled claros.
Adaptación: la captura muestra principalmente controles icónicos, pero la especificación exige botones denominados Anterior y Siguiente.

10. GalleryCounter
Responsabilidad: Indicar la posición actual dentro de la galería.

Props:

currentIndex: number
total: number
Layout:

Se superpone a la imagen.
Muestra una numeración basada en uno, por ejemplo “2 / 10”.
Debe actualizarse cada vez que cambia currentIndex.
Reutilización: patrón visual tomado de la captura, con estado dinámico.

11. RoomInfo
Responsabilidad: Agrupar la información principal del alojamiento.

Props:

listing: Listing
Layout:

Aparece inmediatamente después de PhotoGallery.
Contiene verticalmente:
ListingHeader.
RatingSummary.
RecognitionBanner.
En móvil tiene fondo blanco y puede presentar esquinas superiores redondeadas, como en la captura.
12. ListingHeader
Responsabilidad: Presentar título y características básicas.

Props:

title: string
subtitle: string
guestCount: number
bedroomCount: number
bedCount: number
bathroomCount: number
location: string
Layout:

Contiene verticalmente:
Título principal, por ejemplo “Departamento en Viña del Mar”.
Subtítulo, por ejemplo “Alojamiento entero”.
Resumen de huéspedes, habitaciones, camas y baños.
El título puede ocupar dos líneas en 375 px.
La información secundaria utiliza un color menos contrastado.
Reutilización: reutiliza datos de ListingCard, pero se adapta a una presentación más grande y descriptiva.

13. RatingSummary
Responsabilidad: Mostrar puntuación, reconocimiento y cantidad de reseñas.

Props:

rating: number
reviewCount: number
isGuestFavorite: boolean
recognitionLabel: string | undefined
Layout:

Fila horizontal dividida en tres zonas:
Puntuación y estrellas.
Reconocimiento “Favorito entre huéspedes”.
Número de reseñas.
Usa separadores verticales entre las zonas.
En una pantalla de 375 px puede reducir el tamaño del texto, pero debe conservar la jerarquía.
Debe adaptarse a dos líneas si el texto de reconocimiento es largo.
Reutilización: reutiliza el rating y el badge de ListingCard, pero en una versión más prominente.

14. RecognitionBanner
Responsabilidad: Explicar el reconocimiento del alojamiento.

Props:

icon: ReactNode
title: string
description: string
Layout:

Se coloca debajo de RatingSummary.
Contiene horizontalmente:
Icono o trofeo.
Bloque de título y descripción.
Está separado del contenido por una línea divisoria superior o inferior.
El texto puede ocupar varias líneas.
Contenido de ejemplo:

Título: “En el 10 % de los alojamientos mejor valorados”.
Descripción explicativa sobre las valoraciones y reseñas.
Reutilización: se basa directamente en el bloque visual de la captura.

15. HighlightsList
Responsabilidad: Mostrar los puntos destacados del alojamiento.

Props:

highlights: Highlight[]
Highlight
Propiedades:

icon: ReactNode
title: string
description: string
variant: 'rating' | 'location' | 'amenities' | 'host' | 'info'
Layout:

Lista vertical.
Cada fila contiene:
Icono a la izquierda.
Título y descripción a la derecha.
Los elementos están separados verticalmente con espacio amplio.
Puede incluir:
Reconocimiento del alojamiento.
Cercanía a Quinta Vergara.
Cocina y terraza.
Anfitriona atenta.
Identidad del anfitrión.
Información adicional.
Adaptación: los textos y bloques se extraen visualmente de la captura, pero se modelan como datos para no crear componentes duplicados.

16. HostInfo
Responsabilidad: Mostrar quién hospeda el alojamiento.

Props:

hostName: string
hostAvatar: string | undefined
hostingDuration: string
isSuperhost: boolean
Layout:

Puede vivir como un elemento de HighlightsList o como una sección independiente.
Contiene horizontalmente:
Avatar o inicial del anfitrión.
Nombre.
Tiempo como anfitrión.
En la captura aparece como una fila con la inicial “R” y el texto “Anfitrión: Ruth”.
Reutilización: comparte el concepto de información del anfitrión con el detalle, pero no se necesita en las tarjetas de Inicio.

17. DescriptionSection
Responsabilidad: Presentar la descripción extensa del alojamiento y su entorno.

Props:

title: string | undefined
description: string
isExpandable: boolean
onExpand: (() => void) | undefined
Layout:

Se coloca después de los destacados y antes de servicios o ubicación.
Contiene texto de párrafo con buena legibilidad.
Puede mostrar una versión truncada y un control “Mostrar más”.
Está separada de otras secciones mediante una línea horizontal.
Reutilización: patrón general reutilizable para cualquier descripción larga.

18. AmenitiesSection
Responsabilidad: Mostrar los servicios disponibles.

Props:

amenities: Amenity[]
totalAmenityCount: number
onShowAll: () => void
Amenity
Propiedades:

id: string
name: string
icon: ReactNode
isUnavailable: boolean
Layout:

Contiene verticalmente:
Título “Lo que este lugar ofrece”.
Lista de servicios.
Botón “Mostrar los 26 servicios”.
Cada servicio es una fila horizontal con icono y texto.
Los servicios no disponibles aparecen tachados o con menor énfasis.
El botón de mostrar todos ocupa casi todo el ancho disponible y tiene fondo gris claro.
Contenido visible de la captura:

Estacionamiento gratuito.
Cocina.
Lavadora.
Wifi.
Cámaras de seguridad.
Detectores no disponibles.
Reutilización: componente específico del detalle, aunque la lista genérica puede reutilizarse en otros alojamientos.

19. LocationSection
Responsabilidad: Mostrar la ubicación del alojamiento.

Props:

title: string
address: string
mapPreview: string | undefined
onOpenMap: () => void
Layout:

Se coloca después de AmenitiesSection.
Contiene verticalmente:
Título “A dónde irás”.
Dirección o ciudad.
Vista previa del mapa.
En móvil el mapa ocupa el ancho disponible y tiene bordes redondeados.
Puede incluir un botón para ampliar o abrir el mapa.
Reutilización: puede compartir la implementación de mapa visual con MapPlaceholder del Catálogo, pero en Detalle debe aceptar una dirección y una vista previa.

20. BookingCard
Responsabilidad: Permitir configurar huéspedes y comenzar la reserva.

Props:

pricePerNight: number
currency: string
originalPricePerNight: number | undefined
minGuests: number
maxGuests: number
initialGuests: number
checkIn: string | undefined
checkOut: string | undefined
onReserve: (guestCount: number) => void
ctaLabel: string
Estado interno:

guestCount: number
Requisito obligatorio:

El contador debe gestionarse con useState.
El número de huéspedes nunca puede ser menor que minGuests.
Nunca puede superar maxGuests.
El botón − se deshabilita en el mínimo.
El botón + se deshabilita en el máximo.
onReserve recibe el valor final de guestCount.
Layout móvil:

Se fija en la parte inferior de la pantalla.
Tiene fondo blanco y borde superior.
Contiene:
PriceSummary.
GuestCounter.
BookingCTA.
Debe usar una sombra o separación visual para distinguirse del contenido.
El contenido principal debe reservar espacio inferior para no quedar cubierto.
Layout escritorio:

Se ubica en una columna lateral.
Puede utilizar position: sticky.
Mantiene la misma composición interna, pero con más espacio.
21. PriceSummary
Responsabilidad: Mostrar el precio de reserva.

Props:

pricePerNight: number
currency: string
originalPricePerNight: number | undefined
checkIn: string | undefined
checkOut: string | undefined
nightCount: number | undefined
hasFreeCancellation: boolean
payLater: boolean
Layout:

Se coloca en la parte superior de BookingCard.
El precio actual es el dato principal.
El precio anterior puede aparecer tachado.
Debe mostrar explícitamente:
“X CLP por noche”
Las fechas y el total de noches son información secundaria.
Las condiciones como “$0 hoy” y “Cancelación gratuita” aparecen en etiquetas separadas.
Adaptación obligatoria: la captura muestra un precio total por tres noches; para esta tarea se conserva el estilo visual, pero se cambia la unidad principal a por noche.

22. GuestCounter
Responsabilidad: Controlar la cantidad de huéspedes.

Props:

value: number
min: number
max: number
onChange: (value: number) => void
label: string
Layout:

Puede aparecer dentro de BookingCard, entre el precio y el CTA.
Contiene horizontalmente:
Etiqueta “Huéspedes”.
Botón −.
Número actual.
Botón +.
Los botones deben ser circulares o claramente delimitados.
Debe mostrar visualmente cuándo el valor está en el mínimo o máximo.
Estado:

El estado principal guestCount vive en BookingCard mediante useState.
GuestCounter recibe el valor y emite cambios mediante onChange.
23. BookingCTA
Responsabilidad: Acción principal para comenzar la reserva.

Props:

label: string
disabled: boolean
onClick: () => void
Layout:

Botón ancho, redondeado y con color de énfasis.
Ocupa prácticamente todo el ancho de BookingCard.
En la captura utiliza el texto “Reserva”.
Debe quedar visualmente separado de las etiquetas de precio y cancelación.
Reutilización: patrón de botón CTA reutilizable, con estilo específico de reserva.

Componentes reutilizados tal cual
FavoriteButton de las tarjetas de alojamiento.
BackButton para volver al Catálogo.
LoadingState.
ListingHeader como fuente de datos, adaptado a una versión más grande.
AmenitiesList como base de la lista de servicios.
Elementos de precio compartidos con ListingCard.
Información de anfitrión y valoración como datos comunes del alojamiento.
Componentes adaptados a los requisitos
PhotoGallery:
Añade estado currentIndex mediante useState.
Incorpora botones explícitos Anterior y Siguiente.
BookingCard:
Se convierte en una tarjeta interactiva.
Incluye precio por noche, contador y CTA.
GuestCounter:
Añade botones + y −.
Respeta límites mínimo y máximo.
PriceSummary:
Cambia el precio total de la captura por un precio principal por noche.
RoomDetail:
Carga los datos mediante useEffect usando el id de la URL.
Muestra estado de carga y error.
LocationSection:
Reutiliza el concepto de mapa del Catálogo, pero lo presenta como ubicación del alojamiento.
DetailHeader:
Mantiene el patrón de acciones de la captura y añade un enlace claro al Catálogo.
Flujo responsive final
Móvil, 375 px
DetailHeader sobre PhotoGallery → RoomInfo → HighlightsList → DescriptionSection → AmenitiesSection → LocationSection

En paralelo, pero visualmente fijo:

BookingCard inferior con precio por noche → GuestCounter → Reserva

Escritorio
DetailHeader y PhotoGallery → Layout de dos columnas

Columna principal: información, destacados, descripción, servicios y ubicación.
Columna lateral sticky: BookingCard.
La galería, el precio por noche, el contador de huéspedes y el enlace al Catálogo son los elementos interactivos esenciales de esta vista.

#### Alcance implementado (v1) a partir de esta especificación

| Componente de la spec | En el código | Nota |
|---|---|---|
| RoomDetailPage | `app/rooms/[id]/page.tsx` | Server Component: lee el `id` de la URL y lo pasa a `RoomDetail`; usa `generateStaticParams` (requisito de `cacheComponents` en Next 16) |
| RoomDetail | `RoomDetail` | Cliente: `useEffect` + `setTimeout` con el `id`; muestra `LoadingState` y "No encontramos este alojamiento" si el id no existe |
| LoadingState | `LoadingState` | Reutilizado desde Inicio y Catálogo |
| DetailHeader / BackButton | `Breadcrumb` ("← Catálogo / título") | Vuelta al Catálogo con `<Link>`, sobre la galería en vez de superpuesto |
| PhotoGallery + GalleryControls + GalleryCounter | `PhotoGallery` | Índice con `useState`, botones Anterior / Siguiente y contador "n / total". Decisión: navegación **circular** (después de la última vuelve a la primera) |
| ListingHeader + RatingSummary | `ListingHeader` | Título, ★, nº de reseñas y ubicación en una sola cabecera |
| DescriptionSection | párrafo en `RoomDetail` | Descripción corta, sin "Mostrar más" |
| HostInfo | `HostInfo` | Avatar con inicial, nombre y años como anfitrión |
| AmenitiesSection | `AmenitiesList` | Cuadrícula de icono + etiqueta |
| BookingCard + PriceSummary + GuestCounter + BookingCTA | `BookingCard` | Precio **por noche** en USD, contador con `useState` (− deshabilitado en 1 y + en `maxGuests`) y botón "Reservar". En escritorio va en columna lateral `sticky`; en móvil, al final del contenido |

**Fuera de alcance en v1 (roadmap):** ShareButton, FavoriteButton, RecognitionBanner, HighlightsList, LocationSection, precio tachado y etiquetas de pago, BookingCard fija abajo en móvil y "Mostrar todos los servicios". El enunciado no los exige.

## Decisiones

- **`/rooms/[id]` con `generateStaticParams`:** Next 16 trae `cacheComponents` activo, así que una ruta dinámica necesita conocer sus parámetros en el build o envolver su lectura en `<Suspense>`. Como los alojamientos están hardcodeados, se declaran los 8 ids.
- **La página de detalle es un Server Component** que lee el `id` y se lo pasa a `RoomDetail` (Client Component), que es quien usa `useEffect`.
- **Las fotos son placeholders con degradados de Tailwind** (`photos: string[]` con clases), sin imágenes ni librerías externas.
- **Sin librerías de componentes:** solo Tailwind y componentes propios.
