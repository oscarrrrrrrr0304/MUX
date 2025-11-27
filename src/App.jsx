import { useEffect, useMemo, useRef, useState } from "react";

const personas = [
  {
    title: "Antojo relámpago",
    detail: "Para quien quiere tacos, helado o farmacia ya mismo sin salir de casa."
  },
  {
    title: "Team RappiPay",
    detail: "Gente que paga servicios, recarga y mueve su lana desde la app sin filas."
  },
  {
    title: "Rappitenderos pro",
    detail: "Quienes manejan pedidos al vuelo y necesitan tener todo claro en el mapa."
  },
  {
    title: "Fans del soporte",
    detail: "Usuarios que quieren ayuda rápida, reembolsos sencillos y cero dramas."
  }
];

const requisitos = [
  "Celular con iOS 13+ o Android 8+",
  "WiFi o datos estables (5 Mbps para ir tranqui)",
  "Número móvil para validar con código",
  "Tarjeta, débito, PayPal o saldo RappiPay listo",
  "Ubicación y notificaciones activadas"
];

const secciones = [
  {
    title: "Descarga y arranca",
    puntos: [
      "Busca Rappi en App Store o Google Play y dale instalar.",
      "Abre la app, acepta notificaciones y elige tu ciudad.",
      "Créate cuenta con correo, Apple, Google o Facebook (lo que uses más).",
      "Confirma el código 6 dígitos que te llega por SMS.",
      "Sube tu nombre, foto chida y guarda tu dirección favorita."
    ]
  },
  {
    title: "Pon la casa a punto",
    puntos: [
      "Guarda varias direcciones con etiquetas tipo Casa, Oficina o Gym.",
      "Agrega contactos de confianza para compartir ruta cuando quieras.",
      "Activa PIN y biometría en RappiPay para compras sin miedo.",
      "Elige idioma, modo oscuro y ajustes de accesibilidad si los necesitas."
    ]
  },
  {
    title: "Tour por el inicio",
    puntos: [
      "La barra superior es tu mejor amiga: busca restaurantes, tiendas o farmacias.",
      "Revisa promos, cupones y combos Prime en el carrusel.",
      "Filtra por tiempo, precio de envío o etiquetas saludables y veganas.",
      "Visita la pestaña RappiPay para recargas, pagos de servicios y transferencias."
    ]
  },
  {
    title: "Arma tu pedido",
    puntos: [
      "Entra a Restaurantes, elige cocina por antojo, rating o promos.",
      "Checa tiempos, costos y sellos de higiene antes de agregar.",
      "Añade platillos, notas especiales y guarda tus favoritos.",
      "Confirma dirección, método de pago y propina antes de dar Pedir."
    ]
  },
  {
    title: "Sigue cada paso",
    puntos: [
      "Ve el timeline: Preparando, Recolectado y En camino en tiempo real.",
      "Ubica al Rappitendero en el mapa y comparte tracking con quien quieras.",
      "Usa chat o llamada para dar indicaciones de entrada o portería.",
      "Al final deja reseña honesta y agrega propina si te salvaron el día."
    ]
  },
  {
    title: "Controla tu dinero",
    puntos: [
      "Guarda tarjetas con CVV dinámico y administra tu saldo RappiPay.",
      "Haz transferencias, recargas o pide CashBack en aliados.",
      "Divide cuentas con Pagos flexibles y descarga comprobantes rápido.",
      "Activa alertas de gasto mensual para no perderte de nada."
    ]
  },
  {
    title: "Prime vibes",
    puntos: [
      "Únete a Prime para envíos gratis en comercios aliados.",
      "Aprovecha descuentos secretos, lives de productos y soporte preferente.",
      "Revisa cuánto ahorraste este mes y en qué categorías.",
      "Cancela o pausa tu plan en cualquier momento sin llamadas eternas."
    ]
  },
  {
    title: "Soporte chill",
    puntos: [
      "En Ayuda encuentras respuestas rápidas por categoría.",
      "Reporta cobros, retrasos o productos faltantes desde Resolver un problema.",
      "Activa Modo seguro y valida entregas con PIN cuando lo necesites.",
      "Si algo no cuadra, levanta ticket dentro de las primeras 24 horas."
    ]
  },
  {
    title: "Tips de la casa",
    puntos: [
      "Actualiza la app cada vez que veas una nueva versión disponible.",
      "Lee reseñas y condiciones dinámicas antes de confirmar para evitar sorpresas.",
      "Crea listas de favoritos para pedidos express con un tap.",
      "Comparte tu código referidos y gana crédito en cada pedido."
    ]
  },
  {
    title: "Cuando algo falla",
    puntos: [
      "Si la app se congela, borra caché o reinstala (no perderás tus datos).",
      "Cobro duplicado: reporta en Pagos y sube captura, te responden súper rápido.",
      "Dirección cambió a medio camino: avisa por chat al Rappitendero.",
      "¿No llegó el código SMS? Espera 60 seg y toca reenviar, también puedes pedir llamada."
    ]
  }
];

const timeline = [
  {
    title: "Día 1: ¡Hola Rappi!",
    description: "Instala, verifica tu cuenta y deja listas tus direcciones en menos de 10 minutos.",
    tip: "Ten tu tarjeta a la mano para activar RappiPay de una vez."
  },
  {
    title: "Día 3: Pedido maestro",
    description: "Explora promos, agrega favoritos y prueba Prime gratis para sentir el boost.",
    tip: "Activa notificaciones inteligentes para recibir cupones justo a la hora del antojo."
  },
  {
    title: "Semana 2: Nivel pro",
    description: "Usa RappiPay a diario, crea listas compartidas y aprovecha CashBack en cada compra.",
    tip: "Configura recordatorios de pagos y comparte tu ruta Prime con tus amigos."
  }
];

const quickActions = [
  {
    label: "Recarga en segundos",
    description: "Mete saldo a tu línea o a la de tu persona favorita al instante.",
    action: "Inicio > RappiPay"
  },
  {
    label: "Activa Modo seguro",
    description: "Protege entregas con PIN o Face ID para sentirte tranqui siempre.",
    action: "Perfil > Seguridad"
  },
  {
    label: "Soluciona un pedido",
    description: "Reporta lo que pasó y elige entre reembolso, reemplazo o crédito.",
    action: "Pedidos > Resolver un problema"
  }
];

const advancedHacks = [
  {
    title: "Listas colaborativas",
    items: [
      "Crea una lista por evento y compártela por link para que tu crew agregue lo que necesita.",
      "Activa recordatorios recurrentes para que la lista se refresque cada semana o quincena."
    ]
  },
  {
    title: "Prime Travel & Live",
    items: [
      "Reserva vuelos y hoteles con CashBack y acumula puntos en tus aerolíneas favoritas.",
      "Únete a lives de lanzamiento para comprar productos con descuento antes que nadie."
    ]
  },
  {
    title: "Automatiza pagos",
    items: [
      "Programa pagos de servicios con cargo automático y recibe alertas cuando se ejecuten.",
      "Exporta comprobantes en PDF directamente al correo o a tu Drive."
    ]
  }
];

function App() {
  const mitad = useMemo(() => Math.ceil(secciones.length / 2), []);
  const primeraColumna = secciones.slice(0, mitad);
  const segundaColumna = secciones.slice(mitad);
  const checklistRef = useRef(null);
  const seccionesRef = useRef(null);
  const quickActionsRef = useRef(null);
  const advancedRef = useRef(null);
  const [copiedAction, setCopiedAction] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleQuickAction = (action) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(action)
        .then(() => setCopiedAction(action))
        .catch(() => setCopiedAction(""));
    } else {
      setCopiedAction(action);
      window.prompt("Ruta rápida (cópiala manual):", action);
    }
  };

  const handlePrint = () => window.print();

  const handleToggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  useEffect(() => {
    if (!copiedAction) {
      return;
    }

    const timeout = setTimeout(() => setCopiedAction(""), 2600);
    return () => clearTimeout(timeout);
  }, [copiedAction]);

  useEffect(() => {
    if (showAdvanced && advancedRef.current) {
      advancedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAdvanced]);

  return (
    <div className="min-h-screen bg-sunny bg-no-repeat text-rappi-graphite">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
        <header className="relative z-10 px-6 pt-12 pb-16 sm:px-10 lg:px-24">
          <div className="max-w-5xl">
            <span className="inline-block rounded-full border border-white/70 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rappi-graphite/70 shadow-sm">
              Guía Rappi Lovers 2025
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-rappi-graphite sm:text-5xl lg:text-6xl">
              Todo lo que necesitas para pedir, pagar y disfrutar sin complicarte.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-rappi-graphite/80 sm:text-xl">
              Haz match con la app desde el día uno: consejos reales, lenguaje directo y los trucos que la comunidad usa para sacarle jugo a cada feature.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo(checklistRef)}
                className="rounded-full bg-gradient-to-r from-rappi-orange via-rappi-coral to-rappi-peach px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30"
              >
                Ver recorrido express
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-full border border-rappi-orange/40 bg-white/80 px-7 py-3 text-sm font-semibold text-rappi-orange transition hover:bg-white"
              >
                Guardar en PDF
              </button>
            </div>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-rappi-peach/40 to-transparent" />
          </div>
        </header>
      </div>

      <main className="relative z-10 space-y-24 pb-24">
        <section className="px-6 sm:px-10 lg:px-24">
          <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">¿Quién se enamora de Rappi?</h2>
          <p className="mt-3 max-w-3xl text-sm text-rappi-graphite/70">
            Si te identificas con alguno de estos perfiles, este manual está hecho para ti.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {personas.map(({ title, detail }) => (
              <article key={title} className="section-card h-full p-6 transition hover:-translate-y-1 hover:border-rappi-orange/40">
                <h3 className="text-lg font-semibold text-rappi-graphite">{title}</h3>
                <p className="mt-3 text-sm text-rappi-graphite/70">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={checklistRef} className="px-6 sm:px-10 lg:px-24">
          <div className="section-card p-8 sm:p-10">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-rappi-graphite">Checklist rápido</h2>
                <p className="text-sm text-rappi-graphite/70">Deja todo listo y evita contratiempos en tu primer pedido.</p>
              </div>
              <span className="rounded-full bg-rappi-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">Paso 1</span>
            </header>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {requisitos.map((item) => (
                <div key={item} className="rounded-2xl border border-white/60 bg-white/90 px-4 py-6 text-sm text-rappi-graphite/80 shadow-md">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={seccionesRef} className="px-6 sm:px-10 lg:px-24">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {primeraColumna.map(({ title, puntos }) => (
                <article key={title} className="section-card p-6">
                  <h3 className="text-xl font-semibold text-rappi-graphite">{title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-rappi-graphite/70">
                    {puntos.map((punto) => (
                      <li key={punto} className="flex gap-3">
                        <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-rappi-orange" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="space-y-6">
              {segundaColumna.map(({ title, puntos }) => (
                <article key={title} className="section-card p-6">
                  <h3 className="text-xl font-semibold text-rappi-graphite">{title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-rappi-graphite/70">
                    {puntos.map((punto) => (
                      <li key={punto} className="flex gap-3">
                        <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-rappi-coral" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-24">
          <div className="section-card overflow-hidden">
            <div className="grid gap-0 md:grid-cols-3">
              {timeline.map(({ title, description, tip }) => (
                <article key={title} className="relative px-8 py-10 md:border-l md:border-white/60">
                  <h3 className="text-lg font-semibold text-rappi-graphite">{title}</h3>
                  <p className="mt-3 text-sm text-rappi-graphite/70">{description}</p>
                  <div className="mt-6 rounded-2xl bg-rappi-orange/10 p-4 text-xs text-rappi-graphite/80">
                    <p className="font-semibold uppercase tracking-[0.2em] text-rappi-orange">Tip</p>
                    <p className="mt-2 leading-relaxed">{tip}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={quickActionsRef} className="px-6 sm:px-10 lg:px-24">
          <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">Acciones express</h2>
          <p className="mt-3 max-w-2xl text-sm text-rappi-graphite/70">Botones de confianza para resolver lo que más usas sin dar vueltas.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {quickActions.map(({ label, description, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickAction(action)}
                className="section-card flex h-full flex-col justify-between p-6 text-left transition hover:-translate-y-1 hover:border-rappi-orange/40 focus:outline-none focus:ring-2 focus:ring-rappi-orange/50"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">Destacado</p>
                  <h3 className="mt-3 text-xl font-semibold text-rappi-graphite">{label}</h3>
                  <p className="mt-4 text-sm text-rappi-graphite/70">{description}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-rappi-graphite/80">
                  <span className="rounded-full border border-rappi-orange/40 bg-rappi-orange/10 px-3 py-1">Ruta</span>
                  <span>{action}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-12 pt-10 sm:px-10 lg:px-24">
        <div className="section-card flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-rappi-graphite">Ahora sí, a disfrutar.</h2>
            <p className="mt-2 text-sm text-rappi-graphite/70">Guarda este manual, compártelo con tu crew y vuelve cuando salgan novedades.</p>
          </div>
          <button
            type="button"
            onClick={handleToggleAdvanced}
            className="rounded-full border border-rappi-orange/40 bg-white/80 px-7 py-3 text-sm font-semibold text-rappi-orange transition hover:bg-white"
          >
            {showAdvanced ? "Ocultar hacks" : "Ver hacks avanzados"}
          </button>
        </div>
      </footer>
      {showAdvanced && (
        <section ref={advancedRef} className="relative z-10 px-6 pb-24 pt-10 sm:px-10 lg:px-24">
          <div className="section-card p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">Hacks avanzados</h2>
                <p className="text-sm text-rappi-graphite/70">Ideas pro para sacarle cada gota al ecosistema Rappi y sorprender a tu círculo.</p>
              </div>
              <span className="rounded-full bg-rappi-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">
                Modo experto
              </span>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {advancedHacks.map(({ title, items }) => (
                <article key={title} className="rounded-3xl border border-rappi-orange/20 bg-white/90 p-6 shadow-xl shadow-orange-500/10">
                  <h3 className="text-lg font-semibold text-rappi-graphite">{title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-rappi-graphite/75">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-rappi-peach" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 right-6 z-50 transition ${
          copiedAction ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full bg-rappi-graphite px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20">
          {copiedAction ? `Ruta copiada: ${copiedAction}` : ""}
        </div>
      </div>
    </div>
  );
}

export default App;

